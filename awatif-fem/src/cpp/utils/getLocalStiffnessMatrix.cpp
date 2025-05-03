#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <iostream>
#include <iomanip>
#include <stdexcept>

// Utils
template <typename K, typename V>
V getMapValueOrDefault(const std::map<K, V> &map, const K &key, const V &defaultValue)
{
    auto it = map.find(key);
    if (it != map.end())
    {
        return it->second;
    }
    return defaultValue;
}

Eigen::MatrixXd getLocalStiffnessMatrixFrame(
    const std::vector<Node> &nodes,
    const ElementInputs &elementInputs,
    int index)
{
    double Iz = getMapValueOrDefault(elementInputs.momentsOfInertiaZ, index, 0.0);
    double Iy = getMapValueOrDefault(elementInputs.momentsOfInertiaY, index, 0.0);
    double E = getMapValueOrDefault(elementInputs.elasticities, index, 0.0);
    double A = getMapValueOrDefault(elementInputs.areas, index, 0.0);
    double G = getMapValueOrDefault(elementInputs.shearModuli, index, 0.0);
    double J = getMapValueOrDefault(elementInputs.torsionalConstants, index, 0.0);

    Eigen::Vector3d node0(nodes[0][0], nodes[0][1], nodes[0][2]);
    Eigen::Vector3d node1(nodes[1][0], nodes[1][1], nodes[1][2]);
    double L = (node1 - node0).norm();

    if (L == 0)
    {
        std::cerr << "  Warning: Zero length element!" << std::endl;
        return Eigen::MatrixXd::Zero(12, 12);
    }

    const double EA = (E * A) / L;
    const double EIz = (E * Iz) / (L * L * L);
    const double EIy = (E * Iy) / (L * L * L);
    const double GJ = (G * J) / L;

    Eigen::MatrixXd kLocal(12, 12);
    kLocal << EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0,
        0, 12 * EIz / (L * L * L), 0, 0, 0, 6 * EIz / (L * L), 0, -12 * EIz / (L * L * L), 0, 0, 0, 6 * EIz / (L * L),
        0, 0, 12 * EIy / (L * L * L), 0, -6 * EIy / (L * L), 0, 0, 0, -12 * EIy / (L * L * L), 0, -6 * EIy / (L * L), 0,
        0, 0, 0, GJ / L, 0, 0, 0, 0, 0, -GJ / L, 0, 0,
        0, 0, -6 * EIy / (L * L), 0, 4 * EIy / L, 0, 0, 0, 6 * EIy / (L * L), 0, 2 * EIy / L, 0,
        0, 6 * EIz / (L * L), 0, 0, 0, 4 * EIz / L, 0, -6 * EIz / (L * L), 0, 0, 0, 2 * EIz / L,
        -EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0,
        0, -12 * EIz / (L * L * L), 0, 0, 0, -6 * EIz / (L * L), 0, 12 * EIz / (L * L * L), 0, 0, 0, -6 * EIz / (L * L),
        0, 0, -12 * EIy / (L * L * L), 0, 6 * EIy / (L * L), 0, 0, 0, 12 * EIy / (L * L * L), 0, 6 * EIy / (L * L), 0,
        0, 0, 0, -GJ / L, 0, 0, 0, 0, 0, GJ / L, 0, 0,
        0, 0, -6 * EIy / (L * L), 0, 2 * EIy / L, 0, 0, 0, 6 * EIy / (L * L), 0, 4 * EIy / L, 0,
        0, 6 * EIz / (L * L), 0, 0, 0, 2 * EIz / L, 0, -6 * EIz / (L * L), 0, 0, 0, 4 * EIz / L;

    return kLocal;
}

Eigen::MatrixXd getLocalStiffnessMatrix(
    const std::vector<Node> &elementNodes,
    const ElementInputs &elementInputs,
    int elementIndex)
{
    if (elementNodes.size() == 2)
    {
        return getLocalStiffnessMatrixFrame(elementNodes, elementInputs, elementIndex);
    }
    // if (elementNodes.size() == 3)
    // {
    //     return getLocalStiffnessMatrixPlate(elementNodes, elementInputs, elementIndex);
    // }

    throw std::runtime_error("Unsupported element type in getLocalStiffnessMatrix");
}

// // --- Plate Stiffness Matrix Helper Functions --- //

// // Structure to hold edge coefficients
// struct EdgeCoeffs
// {
//     double x12, y12, x23, y23, x31, y31;
//     double l12, l23, l31;
//     double P4, P5, P6, q4, q5, q6, r4, r5, r6, t4, t5, t6;
// };

// EdgeCoeffs buildEdgeCoeffs(
//     double x1, double y1, double x2, double y2, double x3, double y3)
// {
//     EdgeCoeffs ec;
//     ec.x12 = x1 - x2;
//     ec.y12 = y1 - y2;
//     ec.x23 = x2 - x3;
//     ec.y23 = y2 - y3;
//     ec.x31 = x3 - x1;
//     ec.y31 = y3 - y1;

//     ec.l12 = ec.x12 * ec.x12 + ec.y12 * ec.y12;
//     ec.l23 = ec.x23 * ec.x23 + ec.y23 * ec.y23;
//     ec.l31 = ec.x31 * ec.x31 + ec.y31 * ec.y31;

//     // Avoid division by zero for coincident nodes
//     ec.P4 = (ec.l23 != 0) ? (-6 * ec.x23) / ec.l23 : 0;
//     ec.P5 = (ec.l31 != 0) ? (-6 * ec.x31) / ec.l31 : 0;
//     ec.P6 = (ec.l12 != 0) ? (-6 * ec.x12) / ec.l12 : 0;

//     ec.q4 = (ec.l23 != 0) ? (3 * ec.x23 * ec.y23) / ec.l23 : 0;
//     ec.q5 = (ec.l31 != 0) ? (3 * ec.x31 * ec.y31) / ec.l31 : 0;
//     ec.q6 = (ec.l12 != 0) ? (3 * ec.x12 * ec.y12) / ec.l12 : 0;

//     ec.r4 = (ec.l23 != 0) ? (3 * (ec.y23 * ec.y23)) / ec.l23 : 0;
//     ec.r5 = (ec.l31 != 0) ? (3 * (ec.y31 * ec.y31)) / ec.l31 : 0;
//     ec.r6 = (ec.l12 != 0) ? (3 * (ec.y12 * ec.y12)) / ec.l12 : 0;

//     ec.t4 = (ec.l23 != 0) ? (-6 * ec.y23) / ec.l23 : 0;
//     ec.t5 = (ec.l31 != 0) ? (-6 * ec.y31) / ec.l31 : 0;
//     ec.t6 = (ec.l12 != 0) ? (-6 * ec.y12) / ec.l12 : 0;

//     return ec;
// }

// std::vector<double> buildHxk(double k, double e, const EdgeCoeffs &ec)
// {
//     return {
//         ec.P6 * (1 - 2 * k) + (ec.P5 - ec.P6) * e,
//         ec.q6 * (1 - 2 * k) - (ec.q5 + ec.q6) * e,
//         -4 + 6 * (k + e) + ec.r6 * (1 - 2 * k) - e * (ec.r5 + ec.r6),
//         -ec.P6 * (1 - 2 * k) + e * (ec.P4 + ec.P6),
//         ec.q6 * (1 - 2 * k) - e * (ec.q6 - ec.q4),
//         -2 + 6 * k + ec.r6 * (1 - 2 * k) + e * (ec.r4 - ec.r6),
//         -e * (ec.P5 + ec.P4),
//         e * (ec.q4 - ec.q5),
//         -e * (ec.r5 - ec.r4),
//     };
// }

// std::vector<double> buildHyk(double k, double e, const EdgeCoeffs &ec)
// {
//     return {
//         ec.t6 * (1 - 2 * k) + e * (ec.t5 - ec.t6),
//         1 + ec.r6 * (1 - 2 * k) - e * (ec.r5 + ec.r6),
//         -ec.q6 * (1 - 2 * k) + e * (ec.q5 + ec.q6),
//         -ec.t6 * (1 - 2 * k) + e * (ec.t4 + ec.t6),
//         -1 + ec.r6 * (1 - 2 * k) + e * (ec.r4 - ec.r6),
//         -ec.q6 * (1 - 2 * k) - e * (ec.q4 - ec.q6),
//         -e * (ec.t4 + ec.t5),
//         e * (ec.r4 - ec.r5),
//         -e * (ec.q4 - ec.q5),
//     };
// }

// std::vector<double> buildHxe(double k, double e, const EdgeCoeffs &ec)
// {
//     return {
//         -ec.P5 * (1 - 2 * e) - k * (ec.P6 - ec.P5),
//         ec.q5 * (1 - 2 * e) - k * (ec.q5 + ec.q6),
//         -4 + 6 * (k + e) + ec.r5 * (1 - 2 * e) - k * (ec.r5 + ec.r6),
//         k * (ec.P4 + ec.P6),
//         k * (ec.q4 - ec.q6),
//         -k * (ec.r6 - ec.r4),
//         ec.P5 * (1 - 2 * e) - k * (ec.P4 + ec.P5),
//         ec.q5 * (1 - 2 * e) + k * (ec.q4 - ec.q5),
//         -2 + 6 * e + ec.r5 * (1 - 2 * e) + k * (ec.r4 - ec.r5),
//     };
// }

// std::vector<double> buildHye(double k, double e, const EdgeCoeffs &ec)
// {
//     return {
//         -ec.t5 * (1 - 2 * e) - k * (ec.t6 - ec.t5),
//         1 + ec.r5 * (1 - 2 * e) - k * (ec.r5 + ec.r6),
//         -ec.q5 * (1 - 2 * e) + k * (ec.q5 + ec.q6),
//         k * (ec.t4 + ec.t6),
//         k * (ec.r4 - ec.r6),
//         -k * (ec.q4 - ec.q6),
//         ec.t5 * (1 - 2 * e) - k * (ec.t4 + ec.t5),
//         -1 + ec.r5 * (1 - 2 * e) + k * (ec.r4 - ec.r5),
//         -ec.q5 * (1 - 2 * e) - k * (ec.q4 - ec.q5),
//     };
// }

// Eigen::MatrixXd buildBMatrix(
//     double k, double e,
//     double x1, double y1, double x2, double y2, double x3, double y3)
// {
//     double twoA = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
//     if (std::abs(twoA) < 1e-12)
//     { // Avoid division by zero for degenerate triangles
//         std::cerr << "Warning: Degenerate triangle detected in buildBMatrix." << std::endl;
//         return Eigen::MatrixXd::Zero(3, 9);
//     }

//     EdgeCoeffs ec = buildEdgeCoeffs(x1, y1, x2, y2, x3, y3);

//     std::vector<double> Hxk = buildHxk(k, e, ec);
//     std::vector<double> Hxe = buildHxe(k, e, ec);
//     std::vector<double> Hyk = buildHyk(k, e, ec);
//     std::vector<double> Hye = buildHye(k, e, ec);

//     Eigen::MatrixXd B = Eigen::MatrixXd::Zero(3, 9);
//     for (int i = 0; i < 9; ++i)
//     {
//         B(0, i) = (ec.y31 * Hxk[i] + ec.y12 * Hxe[i]) / twoA;                                      // kappa_x
//         B(1, i) = (-ec.x31 * Hyk[i] - ec.x12 * Hye[i]) / twoA;                                     // kappa_y
//         B(2, i) = (-ec.x31 * Hxk[i] - ec.x12 * Hxe[i] + ec.y31 * Hyk[i] + ec.y12 * Hye[i]) / twoA; // kappa_xy
//     }
//     return B;
// }

// Eigen::Matrix3d buildIsoDb(double E, double nu, double t)
// {
//     if (std::abs(1 - nu * nu) < 1e-12)
//     { // Avoid division by zero
//         std::cerr << "Warning: Poisson's ratio close to 1 or -1 in buildIsoDb." << std::endl;
//         return Eigen::Matrix3d::Zero();
//     }
//     double factor = (E * t * t * t) / (12 * (1 - nu * nu));
//     Eigen::Matrix3d Db;
//     Db << 1, nu, 0,
//         nu, 1, 0,
//         0, 0, (1 - nu) / 2;
//     return Db * factor;
// }

// // NOTE: buildOrthotropicDb requires implementation from 'awatif-proprietary'
// // We will add a placeholder or throw an error if Eo is provided.
// Eigen::Matrix3d buildOrthotropicDb(double E, double Eo, double Gxy, double nu, double t)
// {
//     // Placeholder - requires proprietary implementation
//     std::cerr << "Warning: Orthotropic material properties provided, but buildOrthotropicDb is not implemented. Using isotropic calculation as fallback." << std::endl;
//     // Fallback to isotropic for now, or throw an error:
//     // throw std::runtime_error("Orthotropic material calculation not implemented.");
//     return buildIsoDb(E, nu, t); // Using isotropic as fallback
// }

// Eigen::MatrixXd mapK9x9ToK18x18(const Eigen::MatrixXd &k9)
// {
//     Eigen::MatrixXd k18 = Eigen::MatrixXd::Zero(18, 18);
//     if (k9.rows() != 9 || k9.cols() != 9)
//     {
//         throw std::runtime_error("Input matrix for mapK9x9ToK18x18 must be 9x9.");
//     }

//     for (int i = 0; i < 3; ++i)
//     { // Node block row
//         for (int j = 0; j < 3; ++j)
//         { // Node block col
//             // Map k9(r, c) to k18(global_r, global_c)
//             // k9 indices: 0=w1, 1=rx1, 2=ry1, 3=w2, 4=rx2, 5=ry2, 6=w3, 7=rx3, 8=ry3
//             // k18 indices: 0=u, 1=v, 2=w, 3=rx, 4=ry, 5=rz

//             // Mapping based on the TypeScript code structure:
//             // w_i <-> k9 row/col (i*3 + 0)
//             // ry_i <-> k9 row/col (i*3 + 1)
//             // rx_i <-> k9 row/col (i*3 + 2)

//             // k18 row indices
//             int r_w = i * 6 + 2;
//             int r_rx = i * 6 + 3;
//             int r_ry = i * 6 + 4;

//             // k18 col indices
//             int c_w = j * 6 + 2;
//             int c_rx = j * 6 + 3;
//             int c_ry = j * 6 + 4;

//             // k9 indices
//             int k9_r_w = i * 3 + 0;
//             int k9_r_ry = i * 3 + 1; // Note: ry in TS maps to k9 index 1
//             int k9_r_rx = i * 3 + 2; // Note: rx in TS maps to k9 index 2

//             int k9_c_w = j * 3 + 0;
//             int k9_c_ry = j * 3 + 1;
//             int k9_c_rx = j * 3 + 2;

//             // Perform the mapping according to the TS structure
//             k18(r_w, c_w) = k9(k9_r_w, k9_c_w);
//             k18(r_w, c_rx) = k9(k9_r_w, k9_c_rx);
//             k18(r_w, c_ry) = k9(k9_r_w, k9_c_ry);

//             k18(r_rx, c_w) = k9(k9_r_rx, k9_c_w);
//             k18(r_rx, c_rx) = k9(k9_r_rx, k9_c_rx);
//             k18(r_rx, c_ry) = k9(k9_r_rx, k9_c_ry);

//             k18(r_ry, c_w) = k9(k9_r_ry, k9_c_w);
//             k18(r_ry, c_rx) = k9(k9_r_ry, k9_c_rx);
//             k18(r_ry, c_ry) = k9(k9_r_ry, k9_c_ry);
//         }
//     }
//     return k18;
// }

// // --- Implementation of getLocalStiffnessMatrixPlate --- //
// Eigen::MatrixXd getLocalStiffnessMatrixPlate(
//     const std::vector<Node> &nodes,
//     const ElementInputs &elementInputs,
//     int index)
// {
//     if (nodes.size() != 3)
//     {
//         throw std::runtime_error("Plate element must have 3 nodes.");
//     }

//     double E = getMapValueOrDefault(elementInputs.elasticities, index, 0.0);
//     double Eo = getMapValueOrDefault(elementInputs.elasticitiesOrthogonal, index, 0.0); // Check for orthotropic
//     double nu = getMapValueOrDefault(elementInputs.poissonsRatios, index, 0.0);
//     double Gxy = getMapValueOrDefault(elementInputs.shearModuli, index, 0.0);
//     double thickness = getMapValueOrDefault(elementInputs.thicknesses, index, 0.0);

//     Eigen::Matrix3d Db;
//     if (Eo != 0.0)
//     { // Check if orthotropic elasticity is provided
//         Db = buildOrthotropicDb(E, Eo, Gxy, nu, thickness);
//     }
//     else
//     {
//         Db = buildIsoDb(E, nu, thickness);
//     }

//     double x1 = nodes[0][0], y1 = nodes[0][1];
//     double x2 = nodes[1][0], y2 = nodes[1][1];
//     double x3 = nodes[2][0], y3 = nodes[2][1];

//     double twoA = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
//     double A = 0.5 * std::abs(twoA);
//     if (A < 1e-12)
//     { // Check for degenerate triangle area
//         std::cerr << "Warning: Degenerate triangle area in getLocalStiffnessMatrixPlate." << std::endl;
//         return Eigen::MatrixXd::Zero(18, 18);
//     }

//     // Gauss points for triangle (ksi, eta, weight)
//     const std::vector<std::tuple<double, double, double>> gaussPoints = {
//         {0.5, 0.0, 1.0 / 3.0},
//         {0.0, 0.5, 1.0 / 3.0},
//         {0.5, 0.5, 1.0 / 3.0}};

//     Eigen::MatrixXd K9x9 = Eigen::MatrixXd::Zero(9, 9);

//     for (const auto &gp : gaussPoints)
//     {
//         double k = std::get<0>(gp);
//         double e = std::get<1>(gp);
//         double w = std::get<2>(gp);

//         Eigen::MatrixXd B = buildBMatrix(k, e, x1, y1, x2, y2, x3, y3);
//         Eigen::MatrixXd Bt = B.transpose();

//         // Factor for integration over reference triangle area (1/2) scaled to actual area (A)
//         // The factor is A * w (since reference area is 1/2, the 2A * w / (1/2) simplifies to A * w? No, the TS code uses 2A*w. Let's stick to that.)
//         // The reference thesis uses A * w. Let's re-check the TS code factor. It uses 2*A*w.
//         double factor = A * w * 2.0; // Match TS code: 2 * A * w

//         K9x9 += Bt * Db * B * factor;
//     }

//     return mapK9x9ToK18x18(K9x9);
// }
