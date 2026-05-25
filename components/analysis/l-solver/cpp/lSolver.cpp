#include <Eigen/Dense>
#include <Eigen/Sparse>
#include <Eigen/SparseLU>
#include <cmath>
#include <cstdlib>
#include <map>
#include <vector>

struct ElementProps
{
    double elasticity = 0.0;
    double area = 0.0;
    double momentInertiaZ = 0.0;
    double momentInertiaY = 0.0;
    double shearModulus = 0.0;
    double torsionalConstant = 0.0;
};

std::map<int, double> parseMap(int *keys, double *values, int count)
{
    std::map<int, double> out;
    for (int i = 0; i < count; i++)
        out[keys[i]] = values[i];
    return out;
}

std::map<int, std::vector<double>> parseVectorMap(int *keys, double *values, int count, int width)
{
    std::map<int, std::vector<double>> out;
    for (int i = 0; i < count; i++)
    {
        std::vector<double> row(width, 0.0);
        for (int j = 0; j < width; j++)
            row[j] = values[i * width + j];
        out[keys[i]] = row;
    }
    return out;
}

std::map<int, std::vector<bool>> parseBoolVectorMap(int *keys, bool *values, int count, int width)
{
    std::map<int, std::vector<bool>> out;
    for (int i = 0; i < count; i++)
    {
        std::vector<bool> row(width, false);
        for (int j = 0; j < width; j++)
            row[j] = values[i * width + j];
        out[keys[i]] = row;
    }
    return out;
}

Eigen::Matrix<double, 12, 12> getTransformationMatrix(
    const Eigen::Vector3d &node0,
    const Eigen::Vector3d &node1)
{
    const Eigen::Vector3d vector = node1 - node0;
    const double length = vector.norm();
    const double l = vector.x() / length;
    const double m = vector.y() / length;
    const double n = vector.z() / length;
    const double D = std::sqrt(l * l + m * m);

    Eigen::Matrix3d lambda;
    if (std::abs(n - 1.0) < 1e-12)
    {
        lambda << 0, 0, 1,
            0, 1, 0,
            -1, 0, 0;
    }
    else if (std::abs(n + 1.0) < 1e-12)
    {
        lambda << 0, 0, -1,
            0, 1, 0,
            1, 0, 0;
    }
    else
    {
        lambda << l, m, n,
            -m / D, l / D, 0,
            (-l * n) / D, (-m * n) / D, D;
    }

    Eigen::Matrix<double, 12, 12> T = Eigen::Matrix<double, 12, 12>::Zero();
    for (int block = 0; block < 4; block++)
        T.block<3, 3>(block * 3, block * 3) = lambda;
    return T;
}

Eigen::Matrix<double, 12, 12> condenseStiffnessMatrix(
    const Eigen::Matrix<double, 12, 12> &K,
    const std::vector<int> &released)
{
    if (released.empty())
        return K;

    std::vector<bool> isReleased(12, false);
    for (int idx : released)
        isReleased[idx] = true;

    std::vector<int> free;
    for (int i = 0; i < 12; i++)
        if (!isReleased[i])
            free.push_back(i);

    Eigen::MatrixXd Kff(free.size(), free.size());
    Eigen::MatrixXd Kfr(free.size(), released.size());
    Eigen::MatrixXd Krf(released.size(), free.size());
    Eigen::MatrixXd Krr(released.size(), released.size());

    for (int r = 0; r < (int)free.size(); r++)
        for (int c = 0; c < (int)free.size(); c++)
            Kff(r, c) = K(free[r], free[c]);
    for (int r = 0; r < (int)free.size(); r++)
        for (int c = 0; c < (int)released.size(); c++)
            Kfr(r, c) = K(free[r], released[c]);
    for (int r = 0; r < (int)released.size(); r++)
        for (int c = 0; c < (int)free.size(); c++)
            Krf(r, c) = K(released[r], free[c]);
    for (int r = 0; r < (int)released.size(); r++)
        for (int c = 0; c < (int)released.size(); c++)
            Krr(r, c) = K(released[r], released[c]);

    Eigen::MatrixXd condensed = Kff - Kfr * Krr.partialPivLu().solve(Krf);

    Eigen::Matrix<double, 12, 12> out = Eigen::Matrix<double, 12, 12>::Zero();
    for (int r = 0; r < (int)free.size(); r++)
        for (int c = 0; c < (int)free.size(); c++)
            out(free[r], free[c]) = condensed(r, c);
    return out;
}

Eigen::Matrix<double, 12, 12> getLocalStiffnessMatrix(
    const Eigen::Vector3d &node0,
    const Eigen::Vector3d &node1,
    const ElementProps &props,
    const std::vector<bool> &releaseFlags)
{
    const double L = (node0 - node1).norm();
    const double EA = props.elasticity * props.area / L;
    const double EIz = props.elasticity * props.momentInertiaZ / std::pow(L, 3);
    const double EIy = props.elasticity * props.momentInertiaY / std::pow(L, 3);
    const double GJ = props.shearModulus * props.torsionalConstant / L;

    Eigen::Matrix<double, 12, 12> K = Eigen::Matrix<double, 12, 12>::Zero();
    K << EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0,
        0, 12 * EIz, 0, 0, 0, 6 * L * EIz, 0, -12 * EIz, 0, 0, 0, 6 * L * EIz,
        0, 0, 12 * EIy, 0, -6 * L * EIy, 0, 0, 0, -12 * EIy, 0, -6 * L * EIy, 0,
        0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0,
        0, 0, -6 * L * EIy, 0, 4 * EIy * L * L, 0, 0, 0, 6 * L * EIy, 0, 2 * EIy * L * L, 0,
        0, 6 * L * EIz, 0, 0, 0, 4 * EIz * L * L, 0, -6 * L * EIz, 0, 0, 0, 2 * EIz * L * L,
        -EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0,
        0, -12 * EIz, 0, 0, 0, -6 * EIz * L, 0, 12 * EIz, 0, 0, 0, -6 * EIz * L,
        0, 0, -12 * EIy, 0, 6 * L * EIy, 0, 0, 0, 12 * EIy, 0, 6 * L * EIy, 0,
        0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0,
        0, 0, -6 * L * EIy, 0, 2 * EIy * L * L, 0, 0, 0, 6 * L * EIy, 0, 4 * EIy * L * L, 0,
        0, 6 * L * EIz, 0, 0, 0, 2 * EIz * L * L, 0, -6 * L * EIz, 0, 0, 0, 4 * EIz * L * L;

    std::vector<int> released;
    if (releaseFlags.size() >= 4)
    {
        if (releaseFlags[0])
            released.push_back(4);
        if (releaseFlags[1])
            released.push_back(5);
        if (releaseFlags[2])
            released.push_back(10);
        if (releaseFlags[3])
            released.push_back(11);
    }

    return condenseStiffnessMatrix(K, released);
}

extern "C"
{
    void lSolve(
        double *nodes_ptr, int num_nodes,
        unsigned int *elements_ptr, int num_elements,
        int *support_keys_ptr, bool *support_values_ptr, int num_supports,
        int *load_keys_ptr, double *load_values_ptr, int num_loads,
        int *elasticity_keys_ptr, double *elasticity_values_ptr, int num_elasticities,
        int *area_keys_ptr, double *area_values_ptr, int num_areas,
        int *moment_inertia_z_keys_ptr, double *moment_inertia_z_values_ptr, int num_moment_inertias_z,
        int *moment_inertia_y_keys_ptr, double *moment_inertia_y_values_ptr, int num_moment_inertias_y,
        int *shear_modulus_keys_ptr, double *shear_modulus_values_ptr, int num_shear_moduli,
        int *torsional_constant_keys_ptr, double *torsional_constant_values_ptr, int num_torsional_constants,
        int *release_keys_ptr, bool *release_values_ptr, int num_releases,
        double **positions_out, int *positions_size,
        double **forces_out, int *forces_size,
        int *status_out)
    {
        *positions_out = nullptr;
        *positions_size = 0;
        *forces_out = nullptr;
        *forces_size = 0;
        *status_out = 0;

        if (num_nodes <= 0 || num_elements <= 0)
            return;

        std::vector<Eigen::Vector3d> nodes(num_nodes);
        for (int i = 0; i < num_nodes; i++)
            nodes[i] = Eigen::Vector3d(nodes_ptr[i * 3], nodes_ptr[i * 3 + 1], nodes_ptr[i * 3 + 2]);

        std::vector<std::vector<int>> elements(num_elements, std::vector<int>(2));
        for (int i = 0; i < num_elements; i++)
        {
            elements[i][0] = (int)elements_ptr[i * 2];
            elements[i][1] = (int)elements_ptr[i * 2 + 1];
        }

        const auto supports = parseBoolVectorMap(support_keys_ptr, support_values_ptr, num_supports, 6);
        const auto loads = parseVectorMap(load_keys_ptr, load_values_ptr, num_loads, 6);
        const auto releases = parseBoolVectorMap(release_keys_ptr, release_values_ptr, num_releases, 4);

        const auto elasticities = parseMap(elasticity_keys_ptr, elasticity_values_ptr, num_elasticities);
        const auto areas = parseMap(area_keys_ptr, area_values_ptr, num_areas);
        const auto momentInertiasZ = parseMap(moment_inertia_z_keys_ptr, moment_inertia_z_values_ptr, num_moment_inertias_z);
        const auto momentInertiasY = parseMap(moment_inertia_y_keys_ptr, moment_inertia_y_values_ptr, num_moment_inertias_y);
        const auto shearModuli = parseMap(shear_modulus_keys_ptr, shear_modulus_values_ptr, num_shear_moduli);
        const auto torsionalConstants = parseMap(torsional_constant_keys_ptr, torsional_constant_values_ptr, num_torsional_constants);

        std::vector<ElementProps> props(num_elements);
        for (int i = 0; i < num_elements; i++)
        {
            if (elasticities.count(i))
                props[i].elasticity = elasticities.at(i);
            if (areas.count(i))
                props[i].area = areas.at(i);
            if (momentInertiasZ.count(i))
                props[i].momentInertiaZ = momentInertiasZ.at(i);
            if (momentInertiasY.count(i))
                props[i].momentInertiaY = momentInertiasY.at(i);
            if (shearModuli.count(i))
                props[i].shearModulus = shearModuli.at(i);
            if (torsionalConstants.count(i))
                props[i].torsionalConstant = torsionalConstants.at(i);
        }

        const int dof = num_nodes * 6;
        Eigen::VectorXd appliedForces = Eigen::VectorXd::Zero(dof);
        for (const auto &load : loads)
        {
            const int nodeIndex = load.first;
            if (nodeIndex < 0 || nodeIndex >= num_nodes)
                continue;
            for (int j = 0; j < 6; j++)
                appliedForces(nodeIndex * 6 + j) = load.second[j];
        }

        std::vector<bool> fixed(dof, false);
        for (const auto &support : supports)
        {
            const int nodeIndex = support.first;
            if (nodeIndex < 0 || nodeIndex >= num_nodes)
                continue;
            for (int j = 0; j < 6; j++)
                fixed[nodeIndex * 6 + j] = support.second[j];
        }

        std::vector<int> freeInd;
        std::vector<int> globalToFree(dof, -1);
        for (int i = 0; i < dof; i++)
        {
            if (!fixed[i])
            {
                globalToFree[i] = (int)freeInd.size();
                freeInd.push_back(i);
            }
        }

        std::vector<Eigen::Triplet<double>> stiffnessTriplets;
        stiffnessTriplets.reserve(num_elements * 144);

        for (int i = 0; i < num_elements; i++)
        {
            const int n0 = elements[i][0];
            const int n1 = elements[i][1];
            const std::vector<bool> releaseFlags = releases.count(i) ? releases.at(i) : std::vector<bool>();
            const auto kLocal = getLocalStiffnessMatrix(nodes[n0], nodes[n1], props[i], releaseFlags);
            const auto T = getTransformationMatrix(nodes[n0], nodes[n1]);
            const Eigen::Matrix<double, 12, 12> kGlobal = T.transpose() * kLocal * T;
            const int dofMap[12] = {
                n0 * 6, n0 * 6 + 1, n0 * 6 + 2, n0 * 6 + 3, n0 * 6 + 4, n0 * 6 + 5,
                n1 * 6, n1 * 6 + 1, n1 * 6 + 2, n1 * 6 + 3, n1 * 6 + 4, n1 * 6 + 5};

            for (int r = 0; r < 12; r++)
            {
                const int reducedRow = globalToFree[dofMap[r]];
                if (reducedRow < 0)
                    continue;
                for (int c = 0; c < 12; c++)
                {
                    const int reducedCol = globalToFree[dofMap[c]];
                    if (reducedCol >= 0 && kGlobal(r, c) != 0.0)
                        stiffnessTriplets.push_back(Eigen::Triplet<double>(reducedRow, reducedCol, kGlobal(r, c)));
                }
            }
        }

        Eigen::VectorXd deformations = Eigen::VectorXd::Zero(dof);
        if (!freeInd.empty())
        {
            std::vector<bool> activeFree(freeInd.size(), false);
            for (const auto &triplet : stiffnessTriplets)
            {
                if (std::abs(triplet.value()) <= 1e-14)
                    continue;
                activeFree[triplet.row()] = true;
                activeFree[triplet.col()] = true;
            }

            std::vector<int> freeToActive(freeInd.size(), -1);
            std::vector<int> activeToFree;
            for (int i = 0; i < (int)freeInd.size(); i++)
            {
                if (activeFree[i])
                {
                    freeToActive[i] = (int)activeToFree.size();
                    activeToFree.push_back(i);
                }
                else if (std::abs(appliedForces(freeInd[i])) > 1e-12)
                {
                    *status_out = 3;
                    return;
                }
            }

            std::vector<Eigen::Triplet<double>> activeTriplets;
            activeTriplets.reserve(stiffnessTriplets.size());
            for (const auto &triplet : stiffnessTriplets)
            {
                const int row = freeToActive[triplet.row()];
                const int col = freeToActive[triplet.col()];
                if (row >= 0 && col >= 0)
                    activeTriplets.push_back(Eigen::Triplet<double>(row, col, triplet.value()));
            }

            Eigen::SparseMatrix<double> stiffnessFree((int)activeToFree.size(), (int)activeToFree.size());
            stiffnessFree.setFromTriplets(activeTriplets.begin(), activeTriplets.end());

            Eigen::VectorXd forcesFree(activeToFree.size());
            for (int i = 0; i < (int)activeToFree.size(); i++)
                forcesFree(i) = appliedForces(freeInd[activeToFree[i]]);

            Eigen::SparseLU<Eigen::SparseMatrix<double>> solver;
            solver.compute(stiffnessFree);
            if (solver.info() != Eigen::Success)
            {
                *status_out = 1;
                return;
            }

            const Eigen::VectorXd deformationFree = solver.solve(forcesFree);
            if (solver.info() != Eigen::Success)
            {
                *status_out = 2;
                return;
            }

            for (int i = 0; i < (int)activeToFree.size(); i++)
                deformations(freeInd[activeToFree[i]]) = deformationFree(i);
        }

        *positions_size = num_nodes * 3;
        *positions_out = (double *)malloc(*positions_size * sizeof(double));
        for (int i = 0; i < num_nodes; i++)
        {
            (*positions_out)[i * 3] = nodes[i].x() + deformations(i * 6);
            (*positions_out)[i * 3 + 1] = nodes[i].y() + deformations(i * 6 + 1);
            (*positions_out)[i * 3 + 2] = nodes[i].z() + deformations(i * 6 + 2);
        }

        *forces_size = num_elements * 13;
        *forces_out = (double *)malloc(*forces_size * sizeof(double));
        int fidx = 0;
        for (int i = 0; i < num_elements; i++)
        {
            const int n0 = elements[i][0];
            const int n1 = elements[i][1];
            const std::vector<bool> releaseFlags = releases.count(i) ? releases.at(i) : std::vector<bool>();
            const auto kLocal = getLocalStiffnessMatrix(nodes[n0], nodes[n1], props[i], releaseFlags);
            const auto T = getTransformationMatrix(nodes[n0], nodes[n1]);

            Eigen::Matrix<double, 12, 1> dxGlobal;
            dxGlobal << deformations(n0 * 6), deformations(n0 * 6 + 1), deformations(n0 * 6 + 2),
                deformations(n0 * 6 + 3), deformations(n0 * 6 + 4), deformations(n0 * 6 + 5),
                deformations(n1 * 6), deformations(n1 * 6 + 1), deformations(n1 * 6 + 2),
                deformations(n1 * 6 + 3), deformations(n1 * 6 + 4), deformations(n1 * 6 + 5);

            Eigen::Matrix<double, 12, 1> fLocal = kLocal * T * dxGlobal;
            if (releaseFlags.size() >= 4)
            {
                if (releaseFlags[0])
                    fLocal(4) = 0.0;
                if (releaseFlags[1])
                    fLocal(5) = 0.0;
                if (releaseFlags[2])
                    fLocal(10) = 0.0;
                if (releaseFlags[3])
                    fLocal(11) = 0.0;
            }

            (*forces_out)[fidx++] = (double)i;
            (*forces_out)[fidx++] = fLocal(0);
            (*forces_out)[fidx++] = -fLocal(6);
            (*forces_out)[fidx++] = fLocal(1);
            (*forces_out)[fidx++] = -fLocal(7);
            (*forces_out)[fidx++] = fLocal(2);
            (*forces_out)[fidx++] = -fLocal(8);
            (*forces_out)[fidx++] = fLocal(3);
            (*forces_out)[fidx++] = -fLocal(9);
            (*forces_out)[fidx++] = fLocal(4);
            (*forces_out)[fidx++] = -fLocal(10);
            (*forces_out)[fidx++] = fLocal(5);
            (*forces_out)[fidx++] = -fLocal(11);
        }
    }
}
