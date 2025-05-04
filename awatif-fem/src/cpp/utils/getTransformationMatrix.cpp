#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <iostream> // Keep for potential warnings
#include <iomanip>
#include <stdexcept>

// Declarations
Eigen::MatrixXd getTransformationMatrixFrame(const Node &n0, const Node &n1);
Eigen::MatrixXd getTransformationMatrixPlate(const Node &n1, const Node &n2, const Node &n3);

// Main dispatch function based on number of nodes
Eigen::MatrixXd getTransformationMatrix(const std::vector<Node> &nodes)
{
    if (nodes.size() == 2)
    {
        return getTransformationMatrixFrame(nodes[0], nodes[1]);
    }

    if (nodes.size() == 3)
    {
        return getTransformationMatrixPlate(nodes[0], nodes[1], nodes[2]);
    }

    throw std::runtime_error("Unsupported element type in getTransformationMatrix (must have 2 or 3 nodes).");
}

// Transformation matrix for 2-node frame/truss elements
Eigen::MatrixXd getTransformationMatrixFrame(const Node &n0, const Node &n1)
{
    Eigen::Vector3d vector(n1[0] - n0[0], n1[1] - n0[1], n1[2] - n0[2]);
    double length = vector.norm();
    if (length < 1e-12) { // Avoid division by zero for zero-length elements
        std::cerr << "Warning: Zero length element detected in getTransformationMatrixFrame. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(12, 12);
    }
    double l = vector.x() / length;
    double m = vector.y() / length;
    double n = vector.z() / length;
    double D = std::sqrt(l * l + m * m);

    Eigen::Matrix3d lambda; // Direction cosine matrix
    if (std::abs(D) < 1e-9) { // Element aligned with global Z-axis
         if (n > 0) { // Pointing up (positive Z)
            lambda << 0, 0, 1,
                       0, 1, 0,
                      -1, 0, 0;
        } else { // Pointing down (negative Z)
            lambda << 0, 0, -1,
                       0, 1, 0,
                       1, 0, 0;
        }
    } else { // General case
        lambda << l, m, n,
            -m / D, l / D, 0,
            (-l * n) / D, (-m * n) / D, D;
    }

    // Construct the 12x12 transformation matrix T
    Eigen::MatrixXd T = Eigen::MatrixXd::Zero(12, 12);
    for (int i = 0; i < 4; ++i)
    {
        T.block<3, 3>(i * 3, i * 3) = lambda;
    }

    return T;
}

// Transformation matrix for 3-node plate elements
Eigen::MatrixXd getTransformationMatrixPlate(const Node &n1_node, const Node &n2_node, const Node &n3_node)
{
    Eigen::Vector3d n1(n1_node[0], n1_node[1], n1_node[2]);
    Eigen::Vector3d n2(n2_node[0], n2_node[1], n2_node[2]);
    Eigen::Vector3d n3(n3_node[0], n3_node[1], n3_node[2]);

    // Calculate midpoints i, j, k of the edges
    Eigen::Vector3d j = (n2 + n3) / 2.0; // Midpoint of edge 2-3
    Eigen::Vector3d k = (n1 + n3) / 2.0; // Midpoint of edge 1-3
    Eigen::Vector3d i = (n1 + n2) / 2.0; // Midpoint of edge 1-2

    // Calculate local x-axis (vector from k to j)
    Eigen::Vector3d x_vec = j - k;
    if (x_vec.norm() < 1e-12) {
        std::cerr << "Warning: Vector j-k (local x-axis) has zero length in getTransformationMatrixPlate. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(18, 18);
    }
    Eigen::Vector3d x = x_vec.normalized();

    // Calculate auxiliary vector r (vector from i to n3)
    Eigen::Vector3d r_vec = n3 - i;
     if (r_vec.norm() < 1e-12) {
        std::cerr << "Warning: Vector n3-i (auxiliary r) has zero length in getTransformationMatrixPlate. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(18, 18);
    }
    Eigen::Vector3d r = r_vec.normalized();

    // Calculate local z-axis (x cross r)
    Eigen::Vector3d z_vec = x.cross(r);
     if (z_vec.norm() < 1e-12) { // Check if x and r are parallel (collinear nodes)
        std::cerr << "Warning: Vectors x and r are parallel in getTransformationMatrixPlate (collinear nodes). Attempting fallback for z-axis." << std::endl;
        // Fallback: Try crossing x with global Z
        Eigen::Vector3d globalZ(0,0,1);
        z_vec = x.cross(globalZ);
        if (z_vec.norm() < 1e-12) { // If x is also parallel to global Z, try global Y
             Eigen::Vector3d globalY(0,1,0);
             z_vec = x.cross(globalY);
        }
        // If still zero norm, something is fundamentally wrong (x should not be zero here)
        if (z_vec.norm() < 1e-12) {
             std::cerr << "Error: Cannot determine local z-axis even with fallbacks in getTransformationMatrixPlate. Returning identity matrix." << std::endl;
             return Eigen::MatrixXd::Identity(18, 18);
        }
    }
    Eigen::Vector3d z = z_vec.normalized();

    // Calculate local y-axis (z cross x)
    Eigen::Vector3d y = z.cross(x); // Already normalized if z and x are orthonormal

    // Construct lambda matrix (local axes as columns)
    Eigen::Matrix3d lambda;
    lambda.col(0) = x;
    lambda.col(1) = y;
    lambda.col(2) = z;

    // Construct the 18x18 transformation matrix T
    Eigen::MatrixXd T = Eigen::MatrixXd::Zero(18, 18);
    for (int block_idx = 0; block_idx < 6; ++block_idx)
    {
        T.block<3, 3>(block_idx * 3, block_idx * 3) = lambda;
    }

    return T;
}

