#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <iostream> // Keep for potential warnings
#include <iomanip>
#include <stdexcept>

// Declarations
template <typename K, typename V>
V getMapValueOrDefault(const std::map<K, V> &map, const K &key, const V &defaultValue);
Eigen::MatrixXd getLocalStiffnessMatrixFrame(
    const std::vector<Node> &nodes,
    const ElementInputs &elementInputs,
    int index);
Eigen::MatrixXd getLocalStiffnessMatrixPlate(
    const std::vector<Node> &nodes,
    const ElementInputs &elementInputs,
    int index);

// Main dispatch function based on number of nodes
Eigen::MatrixXd getLocalStiffnessMatrix(
    const std::vector<Node> &elementNodes,
    const ElementInputs &elementInputs,
    int elementIndex)
{
    if (elementNodes.size() == 2)
    {
        return getLocalStiffnessMatrixFrame(elementNodes, elementInputs, elementIndex);
    }
    if (elementNodes.size() == 3)
    {
        return getLocalStiffnessMatrixPlate(elementNodes, elementInputs, elementIndex);
    }

    throw std::runtime_error("Unsupported element type in getLocalStiffnessMatrix (must have 2 or 3 nodes).");
}

// --- Utility Functions ---

// Safely get a value from a map, returning a default if the key is not found.
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

// --- Frame Element (2 Nodes) ---

// Calculates the local stiffness matrix for a 2-node frame element.
Eigen::MatrixXd getLocalStiffnessMatrixFrame(
    const std::vector<Node> &nodes,
    const ElementInputs &elementInputs,
    int index)
{
    // Get element properties, using defaults if not specified
    double Iz = getMapValueOrDefault(elementInputs.momentsOfInertiaZ, index, 0.0);
    double Iy = getMapValueOrDefault(elementInputs.momentsOfInertiaY, index, 0.0);
    double E = getMapValueOrDefault(elementInputs.elasticities, index, 0.0);
    double A = getMapValueOrDefault(elementInputs.areas, index, 0.0);
    double G = getMapValueOrDefault(elementInputs.shearModuli, index, 0.0);
    double J = getMapValueOrDefault(elementInputs.torsionalConstants, index, 0.0);

    // Calculate element length
    Eigen::Vector3d node0(nodes[0][0], nodes[0][1], nodes[0][2]);
    Eigen::Vector3d node1(nodes[1][0], nodes[1][1], nodes[1][2]);
    double L = (node1 - node0).norm();

    if (L < 1e-12) // Check for zero length
    {
        std::cerr << "Warning: Zero length element detected in getLocalStiffnessMatrixFrame. Returning zero matrix." << std::endl;
        return Eigen::MatrixXd::Zero(12, 12);
    }

    // Pre-calculate stiffness terms
    const double EA_L = E * A / L;
    const double EIz_L3 = E * Iz / (L * L * L);
    const double EIy_L3 = E * Iy / (L * L * L);
    const double GJ_L = G * J / L;
    const double EIz_L2 = E * Iz / (L * L);
    const double EIy_L2 = E * Iy / (L * L);
    const double EIz_L = E * Iz / L;
    const double EIy_L = E * Iy / L;

    // Assemble the 12x12 local stiffness matrix (standard formulation)
    Eigen::MatrixXd kLocal(12, 12);
    kLocal << EA_L, 0, 0, 0, 0, 0, -EA_L, 0, 0, 0, 0, 0,
        0, 12 * EIz_L3, 0, 0, 0, 6 * EIz_L2, 0, -12 * EIz_L3, 0, 0, 0, 6 * EIz_L2,
        0, 0, 12 * EIy_L3, 0, -6 * EIy_L2, 0, 0, 0, -12 * EIy_L3, 0, -6 * EIy_L2, 0,
        0, 0, 0, GJ_L, 0, 0, 0, 0, 0, -GJ_L, 0, 0,
        0, 0, -6 * EIy_L2, 0, 4 * EIy_L, 0, 0, 0, 6 * EIy_L2, 0, 2 * EIy_L, 0,
        0, 6 * EIz_L2, 0, 0, 0, 4 * EIz_L, 0, -6 * EIz_L2, 0, 0, 0, 2 * EIz_L,
        -EA_L, 0, 0, 0, 0, 0, EA_L, 0, 0, 0, 0, 0,
        0, -12 * EIz_L3, 0, 0, 0, -6 * EIz_L2, 0, 12 * EIz_L3, 0, 0, 0, -6 * EIz_L2,
        0, 0, -12 * EIy_L3, 0, 6 * EIy_L2, 0, 0, 0, 12 * EIy_L3, 0, 6 * EIy_L2, 0,
        0, 0, 0, -GJ_L, 0, 0, 0, 0, 0, GJ_L, 0, 0,
        0, 0, -6 * EIy_L2, 0, 2 * EIy_L, 0, 0, 0, 6 * EIy_L2, 0, 4 * EIy_L, 0,
        0, 6 * EIz_L2, 0, 0, 0, 2 * EIz_L, 0, -6 * EIz_L2, 0, 0, 0, 4 * EIz_L;

    return kLocal;
}

// --- Plate Element (3 Nodes) ---

// Structure to hold intermediate edge coefficients for plate calculations
struct EdgeCoeffs
{
    double x12, y12, x23, y23, x31, y31;                   // Edge vector components
    double l12, l23, l31;                                  // Squared edge lengths
    double P4, P5, P6, q4, q5, q6, r4, r5, r6, t4, t5, t6; // Intermediate terms
};

// Calculates intermediate coefficients based on triangle node coordinates.
EdgeCoeffs buildEdgeCoeffs(
    double x1, double y1, double x2, double y2, double x3, double y3)
{
    EdgeCoeffs ec;
    ec.x12 = x1 - x2;
    ec.y12 = y1 - y2;
    ec.x23 = x2 - x3;
    ec.y23 = y2 - y3;
    ec.x31 = x3 - x1;
    ec.y31 = y3 - y1;

    ec.l12 = ec.x12 * ec.x12 + ec.y12 * ec.y12;
    ec.l23 = ec.x23 * ec.x23 + ec.y23 * ec.y23;
    ec.l31 = ec.x31 * ec.x31 + ec.y31 * ec.y31;

    // Avoid division by zero for coincident nodes (zero length edges)
    ec.P4 = (ec.l23 != 0) ? (-6 * ec.x23) / ec.l23 : 0;
    ec.P5 = (ec.l31 != 0) ? (-6 * ec.x31) / ec.l31 : 0;
    ec.P6 = (ec.l12 != 0) ? (-6 * ec.x12) / ec.l12 : 0;

    ec.q4 = (ec.l23 != 0) ? (3 * ec.x23 * ec.y23) / ec.l23 : 0;
    ec.q5 = (ec.l31 != 0) ? (3 * ec.x31 * ec.y31) / ec.l31 : 0;
    ec.q6 = (ec.l12 != 0) ? (3 * ec.x12 * ec.y12) / ec.l12 : 0;

    ec.r4 = (ec.l23 != 0) ? (3 * (ec.y23 * ec.y23)) / ec.l23 : 0;
    ec.r5 = (ec.l31 != 0) ? (3 * (ec.y31 * ec.y31)) / ec.l31 : 0;
    ec.r6 = (ec.l12 != 0) ? (3 * (ec.y12 * ec.y12)) / ec.l12 : 0;

    ec.t4 = (ec.l23 != 0) ? (-6 * ec.y23) / ec.l23 : 0;
    ec.t5 = (ec.l31 != 0) ? (-6 * ec.y31) / ec.l31 : 0;
    ec.t6 = (ec.l12 != 0) ? (-6 * ec.y12) / ec.l12 : 0;

    return ec;
}

// Helper functions to build H vectors used in B matrix calculation
std::vector<double> buildHxk(double k, double e, const EdgeCoeffs &ec)
{
    return {
        ec.P6 * (1 - 2 * k) + (ec.P5 - ec.P6) * e,
        ec.q6 * (1 - 2 * k) - (ec.q5 + ec.q6) * e,
        -4 + 6 * (k + e) + ec.r6 * (1 - 2 * k) - e * (ec.r5 + ec.r6),
        -ec.P6 * (1 - 2 * k) + e * (ec.P4 + ec.P6),
        ec.q6 * (1 - 2 * k) - e * (ec.q6 - ec.q4),
        -2 + 6 * k + ec.r6 * (1 - 2 * k) + e * (ec.r4 - ec.r6),
        -e * (ec.P5 + ec.P4),
        e * (ec.q4 - ec.q5),
        -e * (ec.r5 - ec.r4),
    };
}

std::vector<double> buildHyk(double k, double e, const EdgeCoeffs &ec)
{
    return {
        ec.t6 * (1 - 2 * k) + e * (ec.t5 - ec.t6),
        1 + ec.r6 * (1 - 2 * k) - e * (ec.r5 + ec.r6),
        -ec.q6 * (1 - 2 * k) + e * (ec.q5 + ec.q6),
        -ec.t6 * (1 - 2 * k) + e * (ec.t4 + ec.t6),
        -1 + ec.r6 * (1 - 2 * k) + e * (ec.r4 - ec.r6),
        -ec.q6 * (1 - 2 * k) - e * (ec.q4 - ec.q6),
        -e * (ec.t4 + ec.t5),
        e * (ec.r4 - ec.r5),
        -e * (ec.q4 - ec.q5),
    };
}

std::vector<double> buildHxe(double k, double e, const EdgeCoeffs &ec)
{
    return {
        -ec.P5 * (1 - 2 * e) - k * (ec.P6 - ec.P5),
        ec.q5 * (1 - 2 * e) - k * (ec.q5 + ec.q6),
        -4 + 6 * (k + e) + ec.r5 * (1 - 2 * e) - k * (ec.r5 + ec.r6),
        k * (ec.P4 + ec.P6),
        k * (ec.q4 - ec.q6),
        -k * (ec.r6 - ec.r4),
        ec.P5 * (1 - 2 * e) - k * (ec.P4 + ec.P5),
        ec.q5 * (1 - 2 * e) + k * (ec.q4 - ec.q5),
        -2 + 6 * e + ec.r5 * (1 - 2 * e) + k * (ec.r4 - ec.r5),
    };
}

std::vector<double> buildHye(double k, double e, const EdgeCoeffs &ec)
{
    return {
        -ec.t5 * (1 - 2 * e) - k * (ec.t6 - ec.t5),
        1 + ec.r5 * (1 - 2 * e) - k * (ec.r5 + ec.r6),
        -ec.q5 * (1 - 2 * e) + k * (ec.q5 + ec.q6),
        k * (ec.t4 + ec.t6),
        k * (ec.r4 - ec.r6),
        -k * (ec.q4 - ec.q6),
        ec.t5 * (1 - 2 * e) - k * (ec.t4 + ec.t5),
        -1 + ec.r5 * (1 - 2 * e) + k * (ec.r4 - ec.r5),
        -ec.q5 * (1 - 2 * e) - k * (ec.q4 - ec.q5),
    };
}

// Builds the B matrix (strain-displacement matrix) for a plate element at a given Gauss point (k, e).
Eigen::MatrixXd buildBMatrix(
    double k, double e,                                               // Natural coordinates (ksi, eta) of the Gauss point
    double x1, double y1, double x2, double y2, double x3, double y3) // Node coordinates
{
    // Calculate twice the area of the triangle
    double twoA = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
    if (std::abs(twoA) < 1e-12) // Avoid division by zero for degenerate triangles
    {
        std::cerr << "Warning: Degenerate triangle (zero area) detected in buildBMatrix. Returning zero matrix." << std::endl;
        return Eigen::MatrixXd::Zero(3, 9);
    }

    // Calculate intermediate edge coefficients
    EdgeCoeffs ec = buildEdgeCoeffs(x1, y1, x2, y2, x3, y3);

    // Calculate H vectors based on Gauss point coordinates and edge coefficients
    std::vector<double> Hxk = buildHxk(k, e, ec);
    std::vector<double> Hxe = buildHxe(k, e, ec);
    std::vector<double> Hyk = buildHyk(k, e, ec);
    std::vector<double> Hye = buildHye(k, e, ec);

    // Assemble the 3x9 B matrix
    Eigen::MatrixXd B = Eigen::MatrixXd::Zero(3, 9);
    for (int i = 0; i < 9; ++i)
    {
        B(0, i) = (ec.y31 * Hxk[i] + ec.y12 * Hxe[i]) / twoA;                                      // Curvature kappa_x
        B(1, i) = (-ec.x31 * Hyk[i] - ec.x12 * Hye[i]) / twoA;                                     // Curvature kappa_y
        B(2, i) = (-ec.x31 * Hxk[i] - ec.x12 * Hxe[i] + ec.y31 * Hyk[i] + ec.y12 * Hye[i]) / twoA; // Twisting kappa_xy
    }
    return B;
}

// Builds the Db matrix (material constitutive matrix) for an isotropic plate.
Eigen::Matrix3d buildIsoDb(double E, double nu, double t)
{
    if (std::abs(1 - nu * nu) < 1e-12) // Avoid division by zero
    {
        std::cerr << "Warning: Poisson's ratio causing division by zero (nu=1 or nu=-1) in buildIsoDb. Returning zero matrix." << std::endl;
        return Eigen::Matrix3d::Zero();
    }
    double factor = (E * t * t * t) / (12 * (1 - nu * nu));
    Eigen::Matrix3d Db;
    Db << 1, nu, 0,
        nu, 1, 0,
        0, 0, (1 - nu) / 2;
    return Db * factor;
}

// Maps the 9x9 stiffness matrix (related to w, rx, ry DOFs) to the full 18x18 local stiffness matrix.
Eigen::MatrixXd mapK9x9ToK18x18(const Eigen::MatrixXd &k9)
{
    Eigen::MatrixXd k18 = Eigen::MatrixXd::Zero(18, 18);
    if (k9.rows() != 9 || k9.cols() != 9)
    {
        throw std::runtime_error("Input matrix for mapK9x9ToK18x18 must be 9x9.");
    }

    // Mapping based on DOF order: [u, v, w, rx, ry, rz] for each node
    // k9 relates DOFs [w1, ry1, rx1, w2, ry2, rx2, w3, ry3, rx3]
    // k18 relates DOFs [u1..rz1, u2..rz2, u3..rz3]
    for (int i = 0; i < 3; ++i)
    { // Node block row (node i+1)
        for (int j = 0; j < 3; ++j)
        { // Node block col (node j+1)
            // k9 indices (w=0, ry=1, rx=2 within 3x3 block)
            int k9_r_w = i * 3 + 0;
            int k9_r_ry = i * 3 + 1;
            int k9_r_rx = i * 3 + 2;

            int k9_c_w = j * 3 + 0;
            int k9_c_ry = j * 3 + 1;
            int k9_c_rx = j * 3 + 2;

            // k18 indices (w=2, rx=3, ry=4 within 6x6 block)
            int k18_r_w = i * 6 + 2;
            int k18_r_rx = i * 6 + 3;
            int k18_r_ry = i * 6 + 4;

            int k18_c_w = j * 6 + 2;
            int k18_c_rx = j * 6 + 3;
            int k18_c_ry = j * 6 + 4;

            // Map w-w, w-rx, w-ry
            k18(k18_r_w, k18_c_w) = k9(k9_r_w, k9_c_w);
            k18(k18_r_w, k18_c_rx) = k9(k9_r_w, k9_c_rx);
            k18(k18_r_w, k18_c_ry) = k9(k9_r_w, k9_c_ry);

            // Map rx-w, rx-rx, rx-ry
            k18(k18_r_rx, k18_c_w) = k9(k9_r_rx, k9_c_w);
            k18(k18_r_rx, k18_c_rx) = k9(k9_r_rx, k9_c_rx);
            k18(k18_r_rx, k18_c_ry) = k9(k9_r_rx, k9_c_ry);

            // Map ry-w, ry-rx, ry-ry
            k18(k18_r_ry, k18_c_w) = k9(k9_r_ry, k9_c_w);
            k18(k18_r_ry, k18_c_rx) = k9(k9_r_ry, k9_c_rx);
            k18(k18_r_ry, k18_c_ry) = k9(k9_r_ry, k9_c_ry);
        }
    }

    return k18;
}

// Calculates the local stiffness matrix for a 3-node plate element using numerical integration (Gauss quadrature).
Eigen::MatrixXd getLocalStiffnessMatrixPlate(
    const std::vector<Node> &nodes,
    const ElementInputs &elementInputs,
    int index)
{
    if (nodes.size() != 3)
    {
        throw std::runtime_error("Plate element must have 3 nodes.");
    }

    // Get element properties
    double E = getMapValueOrDefault(elementInputs.elasticities, index, 0.0);
    double Eo = getMapValueOrDefault(elementInputs.elasticitiesOrthogonal, index, 0.0); // Check for orthotropic
    double nu = getMapValueOrDefault(elementInputs.poissonsRatios, index, 0.0);
    double Gxy = getMapValueOrDefault(elementInputs.shearModuli, index, 0.0);
    double thickness = getMapValueOrDefault(elementInputs.thicknesses, index, 0.0);

    // Build material constitutive matrix Db
    Eigen::Matrix3d Db;
    if (Eo != 0.0) // Check if orthotropic elasticity is provided
    {
        Db = buildOrthotropicDb(E, Eo, Gxy, nu, thickness);
    }
    else // Isotropic material
    {
        Db = buildIsoDb(E, nu, thickness);
    }

    // Node coordinates
    double x1 = nodes[0][0], y1 = nodes[0][1];
    double x2 = nodes[1][0], y2 = nodes[1][1];
    double x3 = nodes[2][0], y3 = nodes[2][1];

    // Calculate triangle area
    double twoA = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
    double A = 0.5 * std::abs(twoA);

    if (A < 1e-12) // Check for degenerate triangle area
    {
        std::cerr << "Warning: Degenerate triangle (zero area) detected in getLocalStiffnessMatrixPlate. Returning zero matrix." << std::endl;
        return Eigen::MatrixXd::Zero(18, 18);
    }

    // Gauss points for 3-point quadrature over a triangle (ksi, eta, weight)
    const std::vector<std::tuple<double, double, double>> gaussPoints = {
        {0.5, 0.0, 1.0 / 3.0},
        {0.0, 0.5, 1.0 / 3.0},
        {0.5, 0.5, 1.0 / 3.0}};

    Eigen::MatrixXd K9x9 = Eigen::MatrixXd::Zero(9, 9);

    // Numerical integration using Gauss quadrature
    for (const auto &gp : gaussPoints)
    {
        double k = std::get<0>(gp); // ksi coordinate
        double e = std::get<1>(gp); // eta coordinate
        double w = std::get<2>(gp); // weight

        // Calculate B matrix at the current Gauss point
        Eigen::MatrixXd B = buildBMatrix(k, e, x1, y1, x2, y2, x3, y3);
        Eigen::MatrixXd Bt = B.transpose();

        // Add contribution to the 9x9 stiffness matrix
        // Factor matches TS code: 2 * A * w (Jacobian * weight)
        K9x9 += Bt * Db * B * (A * w * 2.0);
    }

    // Map the 9x9 matrix to the full 18x18 local stiffness matrix
    Eigen::MatrixXd K18x18 = mapK9x9ToK18x18(K9x9);

    return K18x18;
}
