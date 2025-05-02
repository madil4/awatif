// #include "data-model.h"
#include <vector>
#include <map>
#include <Eigen/Dense>
#include <Eigen/Sparse>
#include <Eigen/Cholesky>
#include <iostream>
#include <cstdlib> // For malloc and free

// Helper function to parse map data from flat arrays (key-value pairs)
template <typename K, typename V>
std::map<K, V> parseMapFromFlat(K *keys_ptr, V *values_ptr, int size)
{
    std::map<K, V> map_data;
    for (int i = 0; i < size; ++i)
    {
        map_data[keys_ptr[i]] = values_ptr[i];
    }
    return map_data;
}

// Helper function to parse map data with vector values from flat arrays
// Assumes keys_ptr points to keys, values_ptr points to flattened vector data,
// value_size is the size of each vector value (e.g., 6 for supports/loads)
template <typename K, typename V>
std::map<K, std::vector<V>> parseMapVecFromFlat(K *keys_ptr, V *values_ptr, int size, int value_size)
{
    std::map<K, std::vector<V>> map_data;
    for (int i = 0; i < size; ++i)
    {
        std::vector<V> vec_value;
        vec_value.reserve(value_size);
        for (int j = 0; j < value_size; ++j)
        {
            vec_value.push_back(values_ptr[i * value_size + j]);
        }
        map_data[keys_ptr[i]] = vec_value;
    }
    return map_data;
}

// Helper function to parse map data with boolean vector values
template <typename K>
std::map<K, std::vector<bool>> parseMapBoolVecFromFlat(K *keys_ptr, bool *values_ptr, int size, int value_size)
{
    std::map<K, std::vector<bool>> map_data;
    for (int i = 0; i < size; ++i)
    {
        std::vector<bool> vec_value;
        vec_value.reserve(value_size);
        for (int j = 0; j < value_size; ++j)
        {
            vec_value.push_back(values_ptr[i * value_size + j]);
        }
        map_data[keys_ptr[i]] = vec_value;
    }
    return map_data;
}

extern "C"
{

    void deform(
        // Inputs from TypeScript
        double *nodes_flat_ptr, int num_nodes,                      // nodes.flat()
        unsigned int *element_indices_ptr, int num_element_indices, // elements.flat() indices
        unsigned int *element_sizes_ptr, int num_elements,          // Size of each element

        // NodeInputs
        int *support_keys_ptr, bool *support_values_ptr, int num_supports,
        int *load_keys_ptr, double *load_values_ptr, int num_loads,

        // ElementInputs (pass all potential properties)
        int *elasticity_keys_ptr, double *elasticity_values_ptr, int num_elasticities,
        int *area_keys_ptr, double *area_values_ptr, int num_areas,
        int *moi_z_keys_ptr, double *moi_z_values_ptr, int num_moi_z,
        int *moi_y_keys_ptr, double *moi_y_values_ptr, int num_moi_y,
        int *shear_mod_keys_ptr, double *shear_mod_values_ptr, int num_shear_mod,
        int *torsion_keys_ptr, double *torsion_values_ptr, int num_torsion,
        int *thickness_keys_ptr, double *thickness_values_ptr, int num_thickness,
        int *poisson_keys_ptr, double *poisson_values_ptr, int num_poisson,
        // Add pointers/sizes for other ElementInputs like elasticitiesOrthogonal if needed

        // Output pointers (to be allocated by C++ and filled)
        // These pointers will point to memory allocated via malloc
        double **deformations_data_ptr_out, // Pointer to pointer for flat deformation data [nodeIdx, d1..d6, nodeIdx, d1..d6, ...]
        int *deformations_size_out,         // Total number of doubles in deformations_data_ptr_out (num_def_nodes * 7)
        double **reactions_data_ptr_out,    // Pointer to pointer for flat reaction data [nodeIdx, r1..r6, nodeIdx, r1..r6, ...]
        int *reactions_size_out             // Total number of doubles in reactions_data_ptr_out (num_react_nodes * 7)
    )
    {
        if (num_nodes == 0)
        {
            *deformations_data_ptr_out = nullptr;
            *deformations_size_out = 0;
            *reactions_data_ptr_out = nullptr;
            *reactions_size_out = 0;
            return;
        }

        // // 1. Parse input data from pointers into C++ data structures
        // std::vector<Node> nodes(num_nodes, Node(3));
        // for (int i = 0; i < num_nodes; ++i)
        // {
        //     nodes[i][0] = nodes_flat_ptr[i * 3 + 0];
        //     nodes[i][1] = nodes_flat_ptr[i * 3 + 1];
        //     nodes[i][2] = nodes_flat_ptr[i * 3 + 2];
        // }

        // // Element indices (already flat)
        // std::vector<unsigned int> element_indices(element_indices_ptr, element_indices_ptr + num_element_indices);
        // std::vector<unsigned int> element_sizes(element_sizes_ptr, element_sizes_ptr + num_elements);

        // NodeInputs nodeInputs;
        // nodeInputs.supports = parseMapBoolVecFromFlat(support_keys_ptr, support_values_ptr, num_supports, 6);
        // nodeInputs.loads = parseMapVecFromFlat(load_keys_ptr, load_values_ptr, num_loads, 6);

        // ElementInputs elementInputs;
        // elementInputs.elasticities = parseMapFromFlat(elasticity_keys_ptr, elasticity_values_ptr, num_elasticities);
        // elementInputs.areas = parseMapFromFlat(area_keys_ptr, area_values_ptr, num_areas);
        // elementInputs.momentsOfInertiaZ = parseMapFromFlat(moi_z_keys_ptr, moi_z_values_ptr, num_moi_z);
        // elementInputs.momentsOfInertiaY = parseMapFromFlat(moi_y_keys_ptr, moi_y_values_ptr, num_moi_y);
        // elementInputs.shearModuli = parseMapFromFlat(shear_mod_keys_ptr, shear_mod_values_ptr, num_shear_mod);
        // elementInputs.torsionalConstants = parseMapFromFlat(torsion_keys_ptr, torsion_values_ptr, num_torsion);
        // elementInputs.thicknesses = parseMapFromFlat(thickness_keys_ptr, thickness_values_ptr, num_thickness);
        // elementInputs.poissonsRatios = parseMapFromFlat(poisson_keys_ptr, poisson_values_ptr, num_poisson);
        // // Parse other element inputs similarly

        // // 2. Implement the core logic from deform.ts using Eigen
        // int dof = num_nodes * 6;

        // Eigen::VectorXd forces = getForces(nodeInputs, num_nodes, dof);
        // Eigen::SparseMatrix<double> stiffnesses = getGlobalStiffnessMatrix(nodes, element_indices, element_sizes, elementInputs, dof);

        // std::vector<int> freeIndices = getFreeIndices(nodeInputs, num_nodes, dof);
        // std::vector<int> zeroIndices = getZerosIndices(stiffnesses);

        // // Filter freeIndices to remove those corresponding to zero columns/rows in stiffness matrix
        // std::vector<int> reducedIndices;
        // std::sort(zeroIndices.begin(), zeroIndices.end()); // Ensure zeroIndices is sorted for binary_search
        // for (int idx : freeIndices)
        // {
        //     if (!std::binary_search(zeroIndices.begin(), zeroIndices.end(), idx))
        //     {
        //         reducedIndices.push_back(idx);
        //     }
        // }

        // if (reducedIndices.empty())
        // {
        //     // Handle case with no effective DOFs (e.g., fully constrained or singular)
        //     std::cerr << "Warning: No effective degrees of freedom after reduction. Result might be zero." << std::endl;
        //     // Still need to prepare output structures, likely filled with zeros
        // }
        // else
        // {
        //     Eigen::SparseMatrix<double> K_reduced = getReducedMatrix(stiffnesses, reducedIndices);
        //     Eigen::VectorXd F_reduced = getReducedVector(forces, reducedIndices);

        //     // Solve K_reduced * U_reduced = F_reduced using Cholesky
        //     // Use SimplicialLDLT as it's more robust than LLT for potentially non-positive definite matrices arising from modeling issues
        //     Eigen::SimplicialLDLT<Eigen::SparseMatrix<double>> cholesky(K_reduced);
        //     Eigen::VectorXd U_reduced = cholesky.solve(F_reduced);

        //     if (cholesky.info() != Eigen::Success)
        //     {
        //         std::cerr << "Error: Cholesky decomposition failed. The matrix might be singular or ill-conditioned." << std::endl;
        //         // Handle error - maybe return empty results or specific error code?
        //         // For now, proceed but results will be unreliable.
        //     }

        //     // Map reduced deformations back to full deformation vector
        //     Eigen::VectorXd deformationsAll = Eigen::VectorXd::Zero(dof);
        //     for (size_t i = 0; i < reducedIndices.size(); ++i)
        //     {
        //         deformationsAll(reducedIndices[i]) = U_reduced(i);
        //     }

        //     // Calculate full reactions
        //     Eigen::VectorXd reactionsAll = stiffnesses * deformationsAll;

        //     // 3. Prepare output data (deformations, reactions)
        //     DeformOutputs outputs;
        //     for (int i = 0; i < num_nodes; ++i)
        //     {
        //         std::vector<double> node_def(6);
        //         std::vector<double> node_react(6);
        //         bool hasReaction = false;
        //         auto support_it = nodeInputs.supports.find(i);
        //         if (support_it != nodeInputs.supports.end())
        //         {
        //             for (bool fixed : support_it->second)
        //             {
        //                 if (fixed)
        //                 {
        //                     hasReaction = true;
        //                     break;
        //                 }
        //             }
        //         }

        //         for (int j = 0; j < 6; ++j)
        //         {
        //             node_def[j] = deformationsAll(i * 6 + j);
        //             if (hasReaction)
        //             {
        //                 // Reaction is typically -ForceInternal, but FEM convention often uses K*U directly
        //                 // Matching TS implementation: reactionsAll = stiffnesses.matMul(deformationsAll)
        //                 node_react[j] = reactionsAll(i * 6 + j);
        //             }
        //         }
        //         outputs.deformations[i] = node_def;
        //         if (hasReaction)
        //         {
        //             outputs.reactions[i] = node_react;
        //         }
        //     }

        //     // 4. Allocate memory for output arrays using malloc
        //     *deformations_size_out = outputs.deformations.size() * 7; // nodeIdx + 6 values
        //     *deformations_data_ptr_out = (double *)malloc(*deformations_size_out * sizeof(double));

        //     *reactions_size_out = outputs.reactions.size() * 7; // nodeIdx + 6 values
        //     *reactions_data_ptr_out = (double *)malloc(*reactions_size_out * sizeof(double));

        //     if (!(*deformations_data_ptr_out) || (outputs.reactions.size() > 0 && !(*reactions_data_ptr_out)))
        //     {
        //         std::cerr << "Error: Memory allocation failed for output arrays." << std::endl;
        //         // Free any allocated memory before returning
        //         free(*deformations_data_ptr_out);
        //         free(*reactions_data_ptr_out);
        //         *deformations_data_ptr_out = nullptr;
        //         *deformations_size_out = 0;
        //         *reactions_data_ptr_out = nullptr;
        //         *reactions_size_out = 0;
        //         return;
        //     }

        //     // 5. Copy output data to allocated memory (flattened map format)
        //     int def_idx = 0;
        //     for (const auto &pair : outputs.deformations)
        //     {
        //         (*deformations_data_ptr_out)[def_idx++] = static_cast<double>(pair.first); // Node index
        //         for (double val : pair.second)
        //         {
        //             (*deformations_data_ptr_out)[def_idx++] = val;
        //         }
        //     }

        //     int react_idx = 0;
        //     for (const auto &pair : outputs.reactions)
        //     {
        //         (*reactions_data_ptr_out)[react_idx++] = static_cast<double>(pair.first); // Node index
        //         for (double val : pair.second)
        //         {
        //             (*reactions_data_ptr_out)[react_idx++] = val;
        //         }
        //     }
        // }

        // // If reducedIndices was empty, allocate and return zero-filled arrays or nullptrs
        // if (reducedIndices.empty())
        // {
        //     DeformOutputs outputs; // Create empty output struct
        //     for (int i = 0; i < num_nodes; ++i)
        //     {
        //         outputs.deformations[i] = std::vector<double>(6, 0.0);
        //         auto support_it = nodeInputs.supports.find(i);
        //         if (support_it != nodeInputs.supports.end())
        //         {
        //             bool hasReaction = false;
        //             for (bool fixed : support_it->second)
        //             {
        //                 if (fixed)
        //                 {
        //                     hasReaction = true;
        //                     break;
        //                 }
        //             }
        //             if (hasReaction)
        //                 outputs.reactions[i] = std::vector<double>(6, 0.0);
        //         }
        //     }

        //     // Allocate and copy zero data (similar logic as above)
        //     *deformations_size_out = outputs.deformations.size() * 7;
        //     *deformations_data_ptr_out = (double *)malloc(*deformations_size_out * sizeof(double));
        //     *reactions_size_out = outputs.reactions.size() * 7;
        //     *reactions_data_ptr_out = (double *)malloc(*reactions_size_out * sizeof(double));

        //     if (!(*deformations_data_ptr_out) || (outputs.reactions.size() > 0 && !(*reactions_data_ptr_out)))
        //     {
        //         std::cerr << "Error: Memory allocation failed for zero output arrays." << std::endl;
        //         free(*deformations_data_ptr_out);
        //         free(*reactions_data_ptr_out);
        //         *deformations_data_ptr_out = nullptr;
        //         *deformations_size_out = 0;
        //         *reactions_data_ptr_out = nullptr;
        //         *reactions_size_out = 0;
        //         return;
        //     }

        //     int def_idx = 0;
        //     for (const auto &pair : outputs.deformations)
        //     {
        //         (*deformations_data_ptr_out)[def_idx++] = static_cast<double>(pair.first);
        //         for (double val : pair.second)
        //             (*deformations_data_ptr_out)[def_idx++] = val;
        //     }
        //     int react_idx = 0;
        //     for (const auto &pair : outputs.reactions)
        //     {
        //         (*reactions_data_ptr_out)[react_idx++] = static_cast<double>(pair.first);
        //         for (double val : pair.second)
        //             (*reactions_data_ptr_out)[react_idx++] = val;
        //     }
        // }

        // // 6. Output pointers and sizes are already set via arguments
        // // Memory allocated here must be freed by the caller (TypeScript) using module._free()
    }
}

// --- Implementation of getForces --- //

// Eigen::VectorXd getForces(
//     const NodeInputs &nodeInputs,
//     int numNodes,
//     int dof)
// {
//     // std::cout << std::fixed << std::setprecision(15);
//     // std::cout << "--- getForces ---" << std::endl;
//     Eigen::VectorXd forces = Eigen::VectorXd::Zero(dof);
//     for (const auto &pair : nodeInputs.loads)
//     {
//         int nodeIndex = pair.first;
//         const auto &loadVector = pair.second;
//         if (loadVector.size() == 6)
//         {
//             // std::cout << "  Load at Node " << nodeIndex << ": [ ";
//             for (int i = 0; i < 6; ++i)
//             {
//                 forces(nodeIndex * 6 + i) = loadVector[i];
//                 // std::cout << loadVector[i] << " ";
//             }
//             // std::cout << "]" << std::endl;
//         }
//     }
//     // std::cout << "  Force Vector F (size " << forces.size() << ") first 12 elements:\n" << forces.head(std::min((long)forces.size(), 12L)).transpose() << "..." << std::endl;
//     return forces;
// }

// // --- Implementation of getFreeIndices --- //

// std::vector<int> getFreeIndices(
//     const NodeInputs &nodeInputs,
//     int numNodes,
//     int dof)
// {
//     // std::cout << "--- getFreeIndices ---" << std::endl;
//     std::vector<bool> isFixed(dof, false);
//     for (const auto &pair : nodeInputs.supports)
//     {
//         int nodeIndex = pair.first;
//         const auto &supportFlags = pair.second;
//         if (supportFlags.size() == 6)
//         {
//             // std::cout << "  Support at Node " << nodeIndex << ": [ ";
//             for (int i = 0; i < 6; ++i)
//             {
//                 if (supportFlags[i])
//                 {
//                     isFixed[nodeIndex * 6 + i] = true;
//                     // std::cout << "T ";
//                 }
//                 else
//                 {
//                     // std::cout << "F ";
//                 }
//             }
//             // std::cout << "]" << std::endl;
//         }
//     }

//     std::vector<int> freeIndices;
//     for (int i = 0; i < dof; ++i)
//     {
//         if (!isFixed[i])
//         {
//             freeIndices.push_back(i);
//         }
//     }
//     // std::cout << "  Found " << freeIndices.size() << " free DOFs." << std::endl;
//     return freeIndices;
// }

// // --- Implementation of getZerosIndices --- //

// std::vector<int> getZerosIndices(
//     const Eigen::SparseMatrix<double> &matrix)
// {
//     // std::cout << "--- getZerosIndices ---" << std::endl;
//     std::vector<int> zeroIndices;
//     int size = matrix.rows(); // Assuming square matrix
//     for (int i = 0; i < size; ++i)
//     {
//         // Check if the diagonal element is zero (or very close to zero)
//         // A more robust check might involve checking the entire column/row sum or norm
//         if (std::abs(matrix.coeff(i, i)) < 1e-12)
//         { // Tolerance for floating point
//             // Check if the entire column is effectively zero
//             bool column_is_zero = true;
//             for (Eigen::SparseMatrix<double>::InnerIterator it(matrix, i); it; ++it)
//             {
//                 if (std::abs(it.value()) > 1e-12)
//                 {
//                     column_is_zero = false;
//                     break;
//                 }
//             }
//             if (column_is_zero)
//             {
//                 zeroIndices.push_back(i);
//             }
//         }
//     }
//     // std::cout << "  Found " << zeroIndices.size() << " zero DOFs." << std::endl;
//     return zeroIndices;
// }

// // --- Implementation of getReducedMatrix --- //

// Eigen::SparseMatrix<double> getReducedMatrix(
//     const Eigen::SparseMatrix<double> &matrix,
//     const std::vector<int> &reducedIndices)
// {
//     // std::cout << "--- getReducedMatrix ---" << std::endl;
//     int reducedSize = reducedIndices.size();
//     Eigen::SparseMatrix<double> reducedMatrix(reducedSize, reducedSize);
//     std::vector<Eigen::Triplet<double>> tripletList;
//     tripletList.reserve(reducedSize * reducedSize / 10); // Rough estimate

//     std::map<int, int> globalToReducedIndex;
//     for (int i = 0; i < reducedSize; ++i)
//     {
//         globalToReducedIndex[reducedIndices[i]] = i;
//     }

//     for (int k = 0; k < matrix.outerSize(); ++k)
//     {
//         for (Eigen::SparseMatrix<double>::InnerIterator it(matrix, k); it; ++it)
//         {
//             auto rowIt = globalToReducedIndex.find(it.row());
//             auto colIt = globalToReducedIndex.find(it.col());
//             if (rowIt != globalToReducedIndex.end() && colIt != globalToReducedIndex.end())
//             {
//                 tripletList.emplace_back(rowIt->second, colIt->second, it.value());
//             }
//         }
//     }

//     reducedMatrix.setFromTriplets(tripletList.begin(), tripletList.end());
//     // std::cout << "  Reduced Matrix K_red (size " << reducedSize << "x" << reducedSize << ", Non-zeros: " << reducedMatrix.nonZeros() << ")" << std::endl;
//     // std::cout << reducedMatrix << std::endl; // Avoid printing large matrix
//     return reducedMatrix;
// }

// // --- Implementation of getReducedVector --- //

// Eigen::VectorXd getReducedVector(
//     const Eigen::VectorXd &vector,
//     const std::vector<int> &reducedIndices)
// {
//     // std::cout << "--- getReducedVector ---" << std::endl;
//     int reducedSize = reducedIndices.size();
//     Eigen::VectorXd reducedVector(reducedSize);
//     for (int i = 0; i < reducedSize; ++i)
//     {
//         reducedVector(i) = vector(reducedIndices[i]);
//     }
//     // std::cout << "  Reduced Vector F_red (size " << reducedSize << "):\n" << reducedVector.transpose() << std::endl;
//     return reducedVector;
// }
