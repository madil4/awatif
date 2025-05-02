#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <Eigen/Sparse>
#include <iostream>
#include <iomanip>
#include <stdexcept>

// --- Implementation of getGlobalStiffnessMatrix --- //

Eigen::SparseMatrix<double> getGlobalStiffnessMatrix(
    const std::vector<Node> &nodes,
    const std::vector<unsigned int> &element_indices, // Corrected type
    const std::vector<unsigned int> &elementSizes,
    const ElementInputs &elementInputs,
    int dof)
{
    // std::cout << std::fixed << std::setprecision(15);
    // std::cout << "--- getGlobalStiffnessMatrix ---" << std::endl;

    std::vector<Eigen::Triplet<double>> tripletList;
    tripletList.reserve(elementSizes.size() * 18 * 18); // Estimate size

    int current_element_node_idx = 0;
    for (int i = 0; i < elementSizes.size(); ++i)
    {
        // std::cout << "  Processing Element " << i << std::endl;
        unsigned int numElementNodes = elementSizes[i];
        std::vector<Node> elmNodes;
        Element currentElementIndices;
        elmNodes.reserve(numElementNodes);
        currentElementIndices.reserve(numElementNodes);

        // std::cout << "    Node Indices: ";
        for (unsigned int j = 0; j < numElementNodes; ++j)
        {
            unsigned int nodeIndex = element_indices[current_element_node_idx + j];
            elmNodes.push_back(nodes[nodeIndex]);
            currentElementIndices.push_back(nodeIndex);
            // std::cout << nodeIndex << " ";
        }
        // std::cout << std::endl;

        Eigen::MatrixXd kLocal = getLocalStiffnessMatrix(elmNodes, elementInputs, i);
        Eigen::MatrixXd T = getTransformationMatrix(elmNodes);
        // Use original formula: T^T * K_local * T
        Eigen::MatrixXd kGlobalElement = T.transpose() * kLocal * T;

        // std::cout << "    kGlobalElement (size " << kGlobalElement.rows() << "x" << kGlobalElement.cols() << ") first 6x6 block:\n" << kGlobalElement.block(0,0,6,6) << std::endl;

        // Assemble into global stiffness matrix
        int elementDof = numElementNodes * 6;
        for (unsigned int rowNodeIdx = 0; rowNodeIdx < numElementNodes; ++rowNodeIdx)
        {
            for (int rowDof = 0; rowDof < 6; ++rowDof)
            {
                int globalRow = currentElementIndices[rowNodeIdx] * 6 + rowDof;
                for (unsigned int colNodeIdx = 0; colNodeIdx < numElementNodes; ++colNodeIdx)
                {
                    for (int colDof = 0; colDof < 6; ++colDof)
                    {
                        int globalCol = currentElementIndices[colNodeIdx] * 6 + colDof;
                        double value = kGlobalElement(rowNodeIdx * 6 + rowDof, colNodeIdx * 6 + colDof);
                        if (std::abs(value) > 1e-15)
                        { // Tolerance for adding triplets
                            tripletList.emplace_back(globalRow, globalCol, value);
                        }
                    }
                }
            }
        }
        current_element_node_idx += numElementNodes;
    }

    Eigen::SparseMatrix<double> K(dof, dof);
    K.setFromTriplets(tripletList.begin(), tripletList.end());
    // std::cout << "  Assembled Global Stiffness Matrix K (Non-zeros: " << K.nonZeros() << ")" << std::endl;
    // std::cout << K << std::endl; // Avoid printing large sparse matrix
    return K;
}
