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

struct CLTLayer
{
    double thickness = 0.0;
    double thetaDeg = 0.0;
    double Ex = 0.0;
    double Ey = 0.0;
    double nuXY = 0.0;
    double Gxy = 0.0;
    double Gxz = 0.0;
    double Gyz = 0.0;
};

struct CLTOptions
{
    bool shearCoupling = true;
    bool noGlueAtNarrowSide = false;
    bool strictSymmetryForElement = true;
    double symmetryTolerance = 1e-6;
    double r33 = 1.0;
    double r66 = 1.0;
    double r77 = 1.0;
    double r88 = 1.0;
};

struct CLTLayup
{
    std::vector<CLTLayer> layers;
    CLTOptions options;
};

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
    std::map<int, CLTLayup> cltLayups;
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
