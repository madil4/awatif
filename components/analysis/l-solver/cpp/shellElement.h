#pragma once

#include <Eigen/Dense>
#include <algorithm>
#include <array>
#include <cmath>
#include <limits>

struct ShellGeometry
{
    Eigen::Matrix3d axes;
    Eigen::Matrix<double, 3, 2> points;
    double area = 0.0;
    Eigen::Vector3d dNdx;
    Eigen::Vector3d dNdy;
};

inline bool getShellGeometry(
    const std::array<Eigen::Vector3d, 3> &nodes,
    ShellGeometry &geometry)
{
    for (const auto &node : nodes)
        if (!node.allFinite())
            return false;

    const Eigen::Vector3d edge12 = nodes[1] - nodes[0];
    const Eigen::Vector3d edge13 = nodes[2] - nodes[0];
    const double length12 = edge12.norm();
    const double length13 = edge13.norm();
    const double length23 = (nodes[2] - nodes[1]).norm();
    const double lengthScale = std::max({length12, length13, length23});
    const double tolerance = 64.0 * std::numeric_limits<double>::epsilon();
    if (!(lengthScale > 0.0) || length12 <= tolerance * lengthScale)
        return false;

    const Eigen::Vector3d areaVector = edge12.cross(edge13);
    const double twiceArea = areaVector.norm();
    if (twiceArea <= tolerance * lengthScale * lengthScale)
        return false;

    const Eigen::Vector3d localX = edge12 / length12;
    const Eigen::Vector3d localZ = areaVector / twiceArea;
    const Eigen::Vector3d localY = localZ.cross(localX);
    geometry.axes.row(0) = localX.transpose();
    geometry.axes.row(1) = localY.transpose();
    geometry.axes.row(2) = localZ.transpose();
    geometry.points << 0.0, 0.0,
        length12, 0.0,
        localX.dot(edge13), localY.dot(edge13);

    const double twiceSignedArea =
        (geometry.points(1, 0) - geometry.points(0, 0)) * (geometry.points(2, 1) - geometry.points(0, 1)) -
        (geometry.points(2, 0) - geometry.points(0, 0)) * (geometry.points(1, 1) - geometry.points(0, 1));
    if (!(twiceSignedArea > 0.0))
        return false;

    geometry.area = twiceSignedArea / 2.0;
    geometry.dNdx <<
        (geometry.points(1, 1) - geometry.points(2, 1)) / twiceSignedArea,
        (geometry.points(2, 1) - geometry.points(0, 1)) / twiceSignedArea,
        (geometry.points(0, 1) - geometry.points(1, 1)) / twiceSignedArea;
    geometry.dNdy <<
        (geometry.points(2, 0) - geometry.points(1, 0)) / twiceSignedArea,
        (geometry.points(0, 0) - geometry.points(2, 0)) / twiceSignedArea,
        (geometry.points(1, 0) - geometry.points(0, 0)) / twiceSignedArea;
    return true;
}

inline Eigen::Matrix<double, 18, 18> getShellTransformationMatrix(
    const ShellGeometry &geometry)
{
    Eigen::Matrix<double, 18, 18> transformation = Eigen::Matrix<double, 18, 18>::Zero();
    for (int block = 0; block < 6; block++)
        transformation.block<3, 3>(block * 3, block * 3) = geometry.axes;
    return transformation;
}

inline Eigen::Matrix3d getPlaneStressHooke(double elasticity, double poissonRatio)
{
    const double factor = elasticity / (1.0 - poissonRatio * poissonRatio);
    Eigen::Matrix3d hooke;
    hooke << factor, factor * poissonRatio, 0.0,
        factor * poissonRatio, factor, 0.0,
        0.0, 0.0, factor * (1.0 - poissonRatio) / 2.0;
    return hooke;
}

inline Eigen::Matrix<double, 9, 9> getShellMembraneStiffness(
    const ShellGeometry &geometry,
    double elasticity,
    double poissonRatio,
    double thickness)
{
    const auto &p = geometry.points;
    const double area = geometry.area;
    const auto x = [&](int first, int second) { return p(first, 0) - p(second, 0); };
    const auto y = [&](int first, int second) { return p(first, 1) - p(second, 1); };
    const auto lengthSquared = [&](int first, int second) {
        return x(first, second) * x(first, second) + y(first, second) * y(first, second);
    };
    const double alpha = 1.0 / 8.0;
    const Eigen::Matrix3d hooke = getPlaneStressHooke(elasticity, poissonRatio);

    Eigen::Matrix<double, 9, 3> lumping;
    lumping <<
        y(1, 2), 0.0, x(2, 1),
        0.0, x(2, 1), y(1, 2),
        alpha / 6.0 * y(1, 2) * (y(0, 2) - y(1, 0)), alpha / 6.0 * x(2, 1) * (x(2, 0) - x(0, 1)), alpha / 3.0 * (x(2, 0) * y(0, 2) - x(0, 1) * y(1, 0)),
        y(2, 0), 0.0, x(0, 2),
        0.0, x(0, 2), y(2, 0),
        alpha / 6.0 * y(2, 0) * (y(1, 0) - y(2, 1)), alpha / 6.0 * x(0, 2) * (x(0, 1) - x(1, 2)), alpha / 3.0 * (x(0, 1) * y(1, 0) - x(1, 2) * y(2, 1)),
        y(0, 1), 0.0, x(1, 0),
        0.0, x(1, 0), y(0, 1),
        alpha / 6.0 * y(0, 1) * (y(2, 1) - y(0, 2)), alpha / 6.0 * x(1, 0) * (x(1, 2) - x(2, 0)), alpha / 3.0 * (x(1, 2) * y(2, 1) - x(2, 0) * y(0, 2));
    lumping *= thickness / 2.0;
    Eigen::Matrix<double, 9, 9> stiffness =
        lumping * hooke * lumping.transpose() / (area * thickness);

    Eigen::Matrix<double, 3, 9> hierarchicalRotation;
    hierarchicalRotation <<
        x(2, 1), y(2, 1), 4.0 * area, x(0, 2), y(0, 2), 0.0, x(1, 0), y(1, 0), 0.0,
        x(2, 1), y(2, 1), 0.0, x(0, 2), y(0, 2), 4.0 * area, x(1, 0), y(1, 0), 0.0,
        x(2, 1), y(2, 1), 0.0, x(0, 2), y(0, 2), 0.0, x(1, 0), y(1, 0), 4.0 * area;
    hierarchicalRotation /= 4.0 * area;

    const double l21 = lengthSquared(1, 0);
    const double l32 = lengthSquared(2, 1);
    const double l13 = lengthSquared(0, 2);
    Eigen::Matrix3d naturalRows;
    naturalRows <<
        y(1, 2) * y(0, 2) * l21, x(1, 2) * x(0, 2) * l21, (y(1, 2) * x(2, 0) + x(2, 1) * y(0, 2)) * l21,
        y(2, 0) * y(1, 0) * l32, x(2, 0) * x(1, 0) * l32, (y(2, 0) * x(0, 1) + x(0, 2) * y(1, 0)) * l32,
        y(0, 1) * y(2, 1) * l13, x(0, 1) * x(2, 1) * l13, (y(0, 1) * x(1, 2) + x(1, 0) * y(2, 1)) * l13;
    const Eigen::Matrix3d naturalTransformation = naturalRows.transpose() / (4.0 * area * area);
    const Eigen::Matrix3d naturalHooke = naturalTransformation.transpose() * hooke * naturalTransformation;

    const std::array<double, 9> beta = {1, 2, 1, 0, 1, -1, -1, -1, -2};
    const double qFactor = 2.0 * area / 3.0;
    Eigen::Matrix3d q1, q2, q3;
    q1 << beta[0] / l21, beta[1] / l21, beta[2] / l21,
        beta[3] / l32, beta[4] / l32, beta[5] / l32,
        beta[6] / l13, beta[7] / l13, beta[8] / l13;
    q2 << beta[8] / l21, beta[6] / l21, beta[7] / l21,
        beta[2] / l32, beta[0] / l32, beta[1] / l32,
        beta[5] / l13, beta[3] / l13, beta[4] / l13;
    q3 << beta[4] / l21, beta[5] / l21, beta[3] / l21,
        beta[7] / l32, beta[8] / l32, beta[6] / l32,
        beta[1] / l13, beta[2] / l13, beta[0] / l13;
    q1 *= qFactor;
    q2 *= qFactor;
    q3 *= qFactor;

    Eigen::Matrix3d rotationStiffness = Eigen::Matrix3d::Zero();
    for (const Eigen::Matrix3d &mode : std::array<Eigen::Matrix3d, 3>{(q1 + q2) / 2.0, (q2 + q3) / 2.0, (q1 + q3) / 2.0})
        rotationStiffness += thickness / 3.0 * mode.transpose() * naturalHooke * mode;

    const double beta0 = alpha * alpha / 4.0;
    stiffness += beta0 * (9.0 / 4.0) * hierarchicalRotation.transpose() * rotationStiffness * hierarchicalRotation;
    return stiffness;
}

inline Eigen::Matrix<double, 2, 9> getSubtriangleShearB(
    const Eigen::Matrix<double, 3, 2> &points,
    const Eigen::Matrix3d &vertexWeights)
{
    Eigen::Matrix<double, 2, 9> edgeGaps = Eigen::Matrix<double, 2, 9>::Zero();
    for (int edge = 0; edge < 2; edge++)
    {
        const int end = edge + 1;
        const double dx = points(end, 0) - points(0, 0);
        const double dy = points(end, 1) - points(0, 1);
        for (int node = 0; node < 3; node++)
        {
            const double startWeight = vertexWeights(0, node);
            const double endWeight = vertexWeights(end, node);
            edgeGaps(edge, node * 3) += endWeight - startWeight;
            edgeGaps(edge, node * 3 + 1) -= 0.5 * dy * (startWeight + endWeight);
            edgeGaps(edge, node * 3 + 2) += 0.5 * dx * (startWeight + endWeight);
        }
    }

    const double dx1 = points(1, 0) - points(0, 0);
    const double dy1 = points(1, 1) - points(0, 1);
    const double dx2 = points(2, 0) - points(0, 0);
    const double dy2 = points(2, 1) - points(0, 1);
    const double determinant = dx1 * dy2 - dx2 * dy1;
    Eigen::Matrix<double, 2, 9> shearB;
    shearB.row(0) = (dy2 * edgeGaps.row(0) - dy1 * edgeGaps.row(1)) / determinant;
    shearB.row(1) = (-dx2 * edgeGaps.row(0) + dx1 * edgeGaps.row(1)) / determinant;
    return shearB;
}

inline double stableMean3(double first, double second, double third)
{
    std::array<double, 3> values = {first, second, third};
    std::sort(values.begin(), values.end(), [](double left, double right) {
        return std::abs(left) < std::abs(right);
    });
    return (values[0] + values[1] + values[2]) / 3.0;
}

inline Eigen::Matrix<double, 9, 9> getShellPlateStiffness(
    const ShellGeometry &geometry,
    double elasticity,
    double poissonRatio,
    double thickness)
{
    Eigen::Matrix<double, 3, 9> bendingB = Eigen::Matrix<double, 3, 9>::Zero();
    for (int node = 0; node < 3; node++)
    {
        const int offset = node * 3;
        bendingB(0, offset + 2) = geometry.dNdx(node);
        bendingB(1, offset + 1) = -geometry.dNdy(node);
        bendingB(2, offset + 1) = -geometry.dNdx(node);
        bendingB(2, offset + 2) = geometry.dNdy(node);
    }
    Eigen::Matrix<double, 9, 9> stiffness =
        geometry.area * std::pow(thickness, 3) / 12.0 *
        bendingB.transpose() * getPlaneStressHooke(elasticity, poissonRatio) * bendingB;

    Eigen::RowVector2d centroid;
    centroid << stableMean3(geometry.points(0, 0), geometry.points(1, 0), geometry.points(2, 0)),
        stableMean3(geometry.points(0, 1), geometry.points(1, 1), geometry.points(2, 1));
    const std::array<std::array<int, 2>, 3> subtriangles = {{{0, 1}, {1, 2}, {2, 0}}};
    std::array<Eigen::Matrix<double, 2, 9>, 3> subtriangleMatrices;
    for (int index = 0; index < 3; index++)
    {
        const int first = subtriangles[index][0];
        const int second = subtriangles[index][1];
        Eigen::Matrix<double, 3, 2> points;
        points.row(0) = geometry.points.row(first);
        points.row(1) = geometry.points.row(second);
        points.row(2) = centroid;
        Eigen::Matrix3d weights;
        weights.row(0).setZero();
        weights(0, first) = 1.0;
        weights.row(1).setZero();
        weights(1, second) = 1.0;
        weights.row(2).setConstant(1.0 / 3.0);
        subtriangleMatrices[index] = getSubtriangleShearB(points, weights);
    }

    Eigen::Matrix<double, 2, 9> smoothedShearB;
    for (int row = 0; row < 2; row++)
        for (int column = 0; column < 9; column++)
            smoothedShearB(row, column) = stableMean3(
                subtriangleMatrices[0](row, column),
                subtriangleMatrices[1](row, column),
                subtriangleMatrices[2](row, column));

    const double shearModulus = elasticity / (2.0 * (1.0 + poissonRatio));
    stiffness += geometry.area * thickness * (5.0 / 6.0) * shearModulus *
                 smoothedShearB.transpose() * smoothedShearB;
    return stiffness;
}

inline Eigen::Matrix<double, 18, 18> getShellLocalStiffnessMatrix(
    const std::array<Eigen::Vector3d, 3> &nodes,
    double elasticity,
    double poissonRatio,
    double thickness,
    ShellGeometry *geometryOut = nullptr)
{
    Eigen::Matrix<double, 18, 18> stiffness = Eigen::Matrix<double, 18, 18>::Zero();
    ShellGeometry geometry;
    if (!getShellGeometry(nodes, geometry) || !std::isfinite(elasticity) || !std::isfinite(poissonRatio) ||
        !std::isfinite(thickness) || elasticity <= 0.0 || thickness <= 0.0 ||
        poissonRatio <= -1.0 || poissonRatio >= 0.5)
        return stiffness;
    if (geometryOut)
        *geometryOut = geometry;

    const Eigen::Matrix<double, 9, 9> membrane =
        getShellMembraneStiffness(geometry, elasticity, poissonRatio, thickness);
    const Eigen::Matrix<double, 9, 9> plate =
        getShellPlateStiffness(geometry, elasticity, poissonRatio, thickness);
    const std::array<int, 9> membraneIndices = {0, 1, 5, 6, 7, 11, 12, 13, 17};
    const std::array<int, 9> plateIndices = {2, 3, 4, 8, 9, 10, 14, 15, 16};
    for (int row = 0; row < 9; row++)
        for (int column = 0; column < 9; column++)
        {
            stiffness(membraneIndices[row], membraneIndices[column]) += membrane(row, column);
            stiffness(plateIndices[row], plateIndices[column]) += plate(row, column);
        }
    stiffness = (stiffness + stiffness.transpose()).eval() / 2.0;
    return stiffness;
}
