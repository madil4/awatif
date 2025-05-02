#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <iostream>
#include <iomanip>
#include <stdexcept>

// --- Implementation of getTransformationMatrix --- //

Eigen::MatrixXd getTransformationMatrix(
    const std::vector<Node> &elementNodes)
{
    // std::cout << std::fixed << std::setprecision(15);
    // std::cout << "--- getTransformationMatrix ---" << std::endl;

    Eigen::Vector3d p1(elementNodes[0][0], elementNodes[0][1], elementNodes[0][2]);
    Eigen::Vector3d p2(elementNodes[1][0], elementNodes[1][1], elementNodes[1][2]);
    Eigen::Vector3d p3 = (elementNodes.size() > 2) ? Eigen::Vector3d(elementNodes[2][0], elementNodes[2][1], elementNodes[2][2]) : Eigen::Vector3d(0, 0, 0); // Handle 2-node elements

    // std::cout << "  Nodes: p1=" << p1.transpose() << ", p2=" << p2.transpose();
    // if (elementNodes.size() > 2) std::cout << ", p3=" << p3.transpose();
    // std::cout << std::endl;

    Eigen::Vector3d v12 = p2 - p1;
    double L = v12.norm();
    if (L == 0)
    {
        std::cerr << "  Warning: Zero length element in getTransformationMatrix!" << std::endl;
        int matrixSize = elementNodes.size() * 6;
        return Eigen::MatrixXd::Identity(matrixSize, matrixSize);
    }

    Eigen::Vector3d x = v12.normalized();
    Eigen::Vector3d y, z;

    if (elementNodes.size() == 2)
    { // Frame element
        // Simplified approach: Assume Z is vertical unless the member is vertical
        Eigen::Vector3d globalZ(0, 0, 1);
        if (std::abs(x.dot(globalZ)) > 0.999)
        { // Member is nearly vertical
            Eigen::Vector3d globalY(0, 1, 0);
            z = x.cross(globalY).normalized();
            y = z.cross(x).normalized();
        }
        else
        {
            y = globalZ.cross(x).normalized();
            z = x.cross(y).normalized();
        }
    }
    else
    { // Plate element (assuming p3 defines the plane)
        Eigen::Vector3d v13 = p3 - p1;
        z = v12.cross(v13).normalized(); // Normal to the plate
        y = z.cross(x).normalized();     // In-plane y-axis
    }

    Eigen::Matrix3d R;
    R.col(0) = x;
    R.col(1) = y;
    R.col(2) = z;

    // std::cout << "  Rotation Matrix R:\n" << R << std::endl;

    int numNodes = elementNodes.size();
    int matrixSize = numNodes * 6;
    Eigen::MatrixXd T = Eigen::MatrixXd::Zero(matrixSize, matrixSize);

    for (int i = 0; i < numNodes; ++i)
    {
        T.block<3, 3>(i * 6, i * 6) = R;
        T.block<3, 3>(i * 6 + 3, i * 6 + 3) = R;
    }

    // std::cout << "  Transformation Matrix T (size " << matrixSize << "x" << matrixSize << "):\n" << T.block(0,0,std::min(12, matrixSize), std::min(12, matrixSize)) << "..." << std::endl; // Print first 12x12 block

    return T;
}
