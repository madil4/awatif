#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <Eigen/Sparse>
#include <iostream> // Keep for potential warnings
#include <iomanip>
#include <stdexcept>

// Function to assemble the global stiffness matrix from individual element stiffness matrices.
Eigen::SparseMatrix<double> getGlobalStiffnessMatrix(
    const std::vector<Node> &nodes,                    // All nodes in the model
    const std::vector<unsigned int> &element_indices, // Flat list of node indices for all elements
    const std::vector<unsigned int> &elementSizes,     // List of node counts for each element
    const ElementInputs &elementInputs,                // Material and geometric properties for elements
    int dof)                                           // Total degrees of freedom for the model (num_nodes * 6)
{
    // Use a triplet list for efficient sparse matrix construction
    std::vector<Eigen::Triplet<double>> tripletList;
    // Reserve space to potentially avoid reallocations (rough estimate)
    tripletList.reserve(elementSizes.size() * 18 * 18); // Max size for plate elements

    int current_element_node_idx = 0; // Tracks the starting index in element_indices for the current element
    for (int i = 0; i < elementSizes.size(); ++i) // Loop through each element
    {
        unsigned int numElementNodes = elementSizes[i]; // Number of nodes in the current element (2 or 3)
        std::vector<Node> elmNodes;                     // Nodes belonging to the current element
        Element currentElementIndices;                  // Global indices of the nodes in the current element
        elmNodes.reserve(numElementNodes);
        currentElementIndices.reserve(numElementNodes);

        // Extract nodes and their global indices for the current element
        for (unsigned int j = 0; j < numElementNodes; ++j)
        {
            unsigned int nodeIndex = element_indices[current_element_node_idx + j];
            elmNodes.push_back(nodes[nodeIndex]);
            currentElementIndices.push_back(nodeIndex);
        }

        // Calculate the local stiffness matrix (kLocal) for the element
        Eigen::MatrixXd kLocal = getLocalStiffnessMatrix(elmNodes, elementInputs, i);

        // Calculate the transformation matrix (T) for the element
        Eigen::MatrixXd T = getTransformationMatrix(elmNodes);

        // Transform the local stiffness matrix to global coordinates: K_global_element = T^T * kLocal * T
        Eigen::MatrixXd kGlobalElement = T.transpose() * kLocal * T;

        // Assemble the element's global stiffness matrix into the overall global stiffness matrix (triplet list)
        for (unsigned int rowNodeIdx = 0; rowNodeIdx < numElementNodes; ++rowNodeIdx) // Iterate over element's nodes (rows)
        {
            for (int rowDof = 0; rowDof < 6; ++rowDof) // Iterate over DOFs for the row node
            {
                int globalRow = currentElementIndices[rowNodeIdx] * 6 + rowDof; // Map element DOF to global DOF index

                for (unsigned int colNodeIdx = 0; colNodeIdx < numElementNodes; ++colNodeIdx) // Iterate over element's nodes (columns)
                {
                    for (int colDof = 0; colDof < 6; ++colDof) // Iterate over DOFs for the column node
                    {
                        int globalCol = currentElementIndices[colNodeIdx] * 6 + colDof; // Map element DOF to global DOF index

                        // Get the value from the transformed element stiffness matrix
                        double value = kGlobalElement(rowNodeIdx * 6 + rowDof, colNodeIdx * 6 + colDof);

                        // Add the value to the triplet list if it's non-negligible
                        if (std::abs(value) > 1e-15) // Tolerance to avoid adding tiny floating point errors
                        {
                            tripletList.emplace_back(globalRow, globalCol, value);
                        }
                    }
                }
            }
        }

        // Move to the next element's starting index in element_indices
        current_element_node_idx += numElementNodes;
    }

    // Create the final sparse global stiffness matrix from the triplets
    Eigen::SparseMatrix<double> K(dof, dof);
    K.setFromTriplets(tripletList.begin(), tripletList.end());
    // Eigen automatically sums up duplicate entries in setFromTriplets

    return K;
}

