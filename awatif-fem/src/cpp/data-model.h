#pragma once

#include <vector>
#include <map>
#include <string>
#include <Eigen/Core>
#include <Eigen/Dense>
#include <Eigen/Sparse>

// Define basic types similar to data-model.ts
using Node = std::vector<double>;          // [x, y, z]
using Element = std::vector<unsigned int>; // Node indices

struct ElementInputs
{
    std::map<int, double> elasticities;
    std::map<int, double> elasticitiesOrthogonal;
    std::map<int, double> shearModuli;
    std::map<int, double> areas;
    std::map<int, double> momentsOfInertiaZ;
    std::map<int, double> momentsOfInertiaY;
    std::map<int, double> torsionalConstants;
    std::map<int, double> thicknesses;
    std::map<int, double> poissonsRatios;
};

struct NodeInputs
{
    std::map<int, std::vector<bool>> supports; // Map<node_index, [tx, ty, tz, rx, ry, rz]>
    std::map<int, std::vector<double>> loads;  // Map<node_index, [fx, fy, fz, mx, my, mz]>
};

struct DeformOutputs
{
    std::map<int, std::vector<double>> deformations; // Map<node_index, [dx, dy, dz, rx, ry, rz]>
    std::map<int, std::vector<double>> reactions;    // Map<node_index, [fx, fy, fz, mx, my, mz]>
};

// Utils
Eigen::MatrixXd getLocalStiffnessMatrix(
    const std::vector<Node> &elementNodes,
    const ElementInputs &elementInputs,
    int elementIndex);

Eigen::MatrixXd getTransformationMatrix(
    const std::vector<Node> &elementNodes);

Eigen::SparseMatrix<double> getGlobalStiffnessMatrix(
    const std::vector<Node> &nodes,
    const std::vector<unsigned int> &element_indices, // Flat list of indices
    const std::vector<unsigned int> &elementSizes,    // Size of each element
    const ElementInputs &elementInputs,
    int dof);