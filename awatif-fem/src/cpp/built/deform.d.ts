export interface DeformCppModule {
  _deform(
    // Geometry
    nodes_flat_ptr: number, // double*
    num_nodes: number, // int
    element_indices_ptr: number, // unsigned int*
    num_element_indices: number, // int
    element_sizes_ptr: number, // unsigned int*
    num_elements: number, // int

    // Node Inputs
    support_keys_ptr: number, // int*
    support_values_ptr: number, // bool* (passed as number pointer)
    num_supports: number, // int
    load_keys_ptr: number, // int*
    load_values_ptr: number, // double*
    num_loads: number, // int

    // Element Inputs
    elasticity_keys_ptr: number, // int*
    elasticity_values_ptr: number, // double*
    num_elasticities: number, // int
    area_keys_ptr: number, // int*
    area_values_ptr: number, // double*
    num_areas: number, // int
    moi_z_keys_ptr: number, // int*
    moi_z_values_ptr: number, // double*
    num_moi_z: number, // int
    moi_y_keys_ptr: number, // int*
    moi_y_values_ptr: number, // double*
    num_moi_y: number, // int
    shear_mod_keys_ptr: number, // int*
    shear_mod_values_ptr: number, // double*
    num_shear_mod: number, // int
    torsion_keys_ptr: number, // int*
    torsion_values_ptr: number, // double*
    num_torsion: number, // int
    thickness_keys_ptr: number, // int*
    thickness_values_ptr: number, // double*
    num_thickness: number, // int
    poisson_keys_ptr: number, // int*
    poisson_values_ptr: number, // double*
    num_poisson: number, // int

    // Output Pointers (Pointers to Pointers/Ints)
    deformations_data_ptr_out: number, // double**
    deformations_size_out: number, // int*
    reactions_data_ptr_out: number, // double**
    reactions_size_out: number // int*
  ): void;

  _malloc(size: number): number;
  _free(ptr: number): void;

  HEAPU8: Uint8Array;
  HEAPU32: Uint32Array;
  HEAPF64: Float64Array;
}

declare function createModule(): Promise<DeformCppModule>;

export default createModule;
