#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <iostream>
#include <iomanip>
#include <stdexcept>

// Declarations
Eigen::MatrixXd getTransformationMatrixFrame(const Node &n0, const Node &n1);
Eigen::MatrixXd getTransformationMatrixPlate(const Node &n1, const Node &n2, const Node &n3);

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

    return Eigen::MatrixXd();
}

// Utils
Eigen::MatrixXd getTransformationMatrixFrame(const Node &n0, const Node &n1)
{
    Eigen::Vector3d vector(n1[0] - n0[0], n1[1] - n0[1], n1[2] - n0[2]);
    double length = vector.norm();
    double l = vector.dot(Eigen::Vector3d::UnitX()) / length;
    double m = vector.dot(Eigen::Vector3d::UnitY()) / length;
    double n = vector.dot(Eigen::Vector3d::UnitZ()) / length;
    double D = std::sqrt(l * l + m * m);

    Eigen::MatrixXd lambda(3, 3);
    if (std::abs(n - 1.0) < 1e-9)
    { // Handle n === 1
        lambda << 0, 0, 1,
            0, 1, 0,
            -1, 0, 0;
    }
    else if (std::abs(n + 1.0) < 1e-9)
    { // Handle n === -1
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

    Eigen::MatrixXd t = Eigen::MatrixXd::Zero(12, 12);
    for (int i = 0; i < 4; ++i)
    {
        t.block<3, 3>(i * 3, i * 3) = lambda;
    }

    return t;
}

Eigen::MatrixXd getTransformationMatrixPlate(const Node &n1, const Node &n2, const Node &n3)
{
    auto getAverage = [](const std::vector<Node> &nodes)
    {
        Eigen::Vector3d sum = Eigen::Vector3d::Zero();
        for (const auto &node : nodes)
        {
            sum += Eigen::Vector3d(node[0], node[1], node[2]);
        }
        return sum / static_cast<double>(nodes.size());
    };

    Eigen::Vector3d j = getAverage({n2, n3});
    Eigen::Vector3d k = getAverage({n1, n3});
    Eigen::Vector3d i = getAverage({n1, n2});
    Eigen::Vector3d x = (j - k).normalized();
    Eigen::Vector3d r = (Eigen::Vector3d(n3[0], n3[1], n3[2]) - i).normalized();
    Eigen::Vector3d z = x.cross(r).normalized();
    Eigen::Vector3d y = z.cross(x).normalized();

    Eigen::MatrixXd lambda(3, 3);
    lambda << x(0), y(0), z(0),
        x(1), y(1), z(1),
        x(2), y(2), z(2);

    Eigen::MatrixXd t = Eigen::MatrixXd::Zero(18, 18); // Initialize an 18x18 zero matrix
    for (int i = 0; i < 6; ++i)
    {
        t.block<3, 3>(i * 3, i * 3) = lambda;
    }

    return t;
}
