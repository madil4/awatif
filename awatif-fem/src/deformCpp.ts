import {
  Node,
  Element,
  ElementInputs,
  NodeInputs,
  DeformOutputs,
} from "./data-model.js";
import createModule from "./cpp/dist/deform.js";

// @ts-ignore, load wasm
const mod = await createModule();

export function deformCpp(
  nodes: Node[],
  elements: Element[],
  nodeInputs: NodeInputs,
  elementInputs: ElementInputs
): DeformOutputs {
  if (nodes.length === 0) return;

  const allocatedMemory: number[] = [];

  // --- Prepare Input Data ---
  // Nodes (Float64Array)
  const nodesFlat = nodes.flat();
  const nodeData = getMemoryData(nodesFlat, Float64Array, mod.HEAPF64);
  allocatedMemory.push(nodeData.dataPtr);

  // Elements (Indices and Sizes - Uint32Array)
  const elementIndicesFlat = elements.flat();
  const elementSizes = elements.map((e) => e.length);
  const elementIndicesData = getMemoryData(
    elementIndicesFlat,
    Uint32Array,
    mod.HEAPU32
  );
  allocatedMemory.push(elementIndicesData.dataPtr);
  const elementSizesData = getMemoryData(
    elementSizes,
    Uint32Array,
    mod.HEAPU32
  );
  allocatedMemory.push(elementSizesData.dataPtr);

  // NodeInputs.supports (Keys: Uint32Array, Values: Uint8Array for boolean)
  const supportKeys = nodeInputs.supports
    ? Array.from(nodeInputs.supports.keys())
    : [];
  const supportValuesFlat = nodeInputs.supports
    ? Array.from(nodeInputs.supports.values())
        .flat()
        .map((b) => (b ? 1 : 0))
    : [];
  const supportKeysData = getMemoryData(supportKeys, Uint32Array, mod.HEAPU32);
  allocatedMemory.push(supportKeysData.dataPtr);
  // Use HEAPU8 for boolean values represented as 0 or 1
  const supportValuesData = getMemoryData(
    supportValuesFlat,
    Uint8Array,
    mod.HEAPU8
  );
  allocatedMemory.push(supportValuesData.dataPtr);

  // NodeInputs.loads (Keys: Uint32Array, Values: Float64Array)
  const loadKeys = nodeInputs.loads ? Array.from(nodeInputs.loads.keys()) : [];
  const loadValuesFlat = nodeInputs.loads
    ? Array.from(nodeInputs.loads.values()).flat()
    : [];
  const loadKeysData = getMemoryData(loadKeys, Uint32Array, mod.HEAPU32);
  allocatedMemory.push(loadKeysData.dataPtr);
  const loadValuesData = getMemoryData(
    loadValuesFlat,
    Float64Array,
    mod.HEAPF64
  );
  allocatedMemory.push(loadValuesData.dataPtr);

  // ElementInputs (Keys: Uint32Array, Values: Float64Array)
  const processElementInput = (inputMap: Map<number, number> | undefined) => {
    const keys = inputMap ? Array.from(inputMap.keys()) : [];
    const values = inputMap ? Array.from(inputMap.values()) : [];
    const keysData = getMemoryData(keys, Uint32Array, mod.HEAPU32);
    allocatedMemory.push(keysData.dataPtr);
    const valuesData = getMemoryData(values, Float64Array, mod.HEAPF64);
    allocatedMemory.push(valuesData.dataPtr);
    return {
      keysPtr: keysData.dataPtr,
      valuesPtr: valuesData.dataPtr,
      size: keys.length,
    };
  };

  const elasticities = processElementInput(elementInputs.elasticities);
  const areas = processElementInput(elementInputs.areas);
  const moiZ = processElementInput(elementInputs.momentsOfInertiaZ);
  const moiY = processElementInput(elementInputs.momentsOfInertiaY);
  const shearMod = processElementInput(elementInputs.shearModuli);
  const torsion = processElementInput(elementInputs.torsionalConstants);
  const thickness = processElementInput(elementInputs.thicknesses);
  const poisson = processElementInput(elementInputs.poissonsRatios);
  // Add other element inputs if needed (e.g., elasticitiesOrthogonal)

  // --- Prepare Output Pointers ---
  // Allocate memory for the pointers that C++ will write the results pointers to
  const deformationsDataPtrOutPtr = mod._malloc(4); // Pointer to a pointer (size 4 for 32-bit WASM)
  allocatedMemory.push(deformationsDataPtrOutPtr);
  const deformationsSizeOutPtr = mod._malloc(4); // Pointer to an int (size 4)
  allocatedMemory.push(deformationsSizeOutPtr);
  const reactionsDataPtrOutPtr = mod._malloc(4);
  allocatedMemory.push(reactionsDataPtrOutPtr);
  const reactionsSizeOutPtr = mod._malloc(4);
  allocatedMemory.push(reactionsSizeOutPtr);

  // --- Call C++ Function ---
  mod._deform(
    nodeData.dataPtr,
    nodes.length,
    elementIndicesData.dataPtr,
    elementIndicesFlat.length,
    elementSizesData.dataPtr,
    elements.length,
    supportKeysData.dataPtr,
    supportValuesData.dataPtr, // Pass the Uint8 pointer
    supportKeys.length,
    loadKeysData.dataPtr,
    loadValuesData.dataPtr,
    loadKeys.length,
    elasticities.keysPtr,
    elasticities.valuesPtr,
    elasticities.size,
    areas.keysPtr,
    areas.valuesPtr,
    areas.size,
    moiZ.keysPtr,
    moiZ.valuesPtr,
    moiZ.size,
    moiY.keysPtr,
    moiY.valuesPtr,
    moiY.size,
    shearMod.keysPtr,
    shearMod.valuesPtr,
    shearMod.size,
    torsion.keysPtr,
    torsion.valuesPtr,
    torsion.size,
    thickness.keysPtr,
    thickness.valuesPtr,
    thickness.size,
    poisson.keysPtr,
    poisson.valuesPtr,
    poisson.size,
    // Output pointers
    deformationsDataPtrOutPtr,
    deformationsSizeOutPtr,
    reactionsDataPtrOutPtr,
    reactionsSizeOutPtr
  );

  // --- Read Output Data ---
  // Read the pointers and sizes written by C++
  const deformationsDataPtr = mod.HEAPU32[deformationsDataPtrOutPtr / 4];
  const deformationsSize = mod.HEAPU32[deformationsSizeOutPtr / 4];
  const reactionsDataPtr = mod.HEAPU32[reactionsDataPtrOutPtr / 4];
  const reactionsSize = mod.HEAPU32[reactionsSizeOutPtr / 4];

  // Read the actual data from the pointers
  const deformationsFlat = new Float64Array(
    mod.HEAPF64.buffer,
    deformationsDataPtr,
    deformationsSize
  );
  const reactionsFlat = new Float64Array(
    mod.HEAPF64.buffer,
    reactionsDataPtr,
    reactionsSize
  );

  // Convert flat output arrays back to Map format
  const deformations: DeformOutputs["deformations"] = new Map();
  for (let i = 0; i < deformationsSize; i += 7) {
    const nodeIndex = deformationsFlat[i];
    deformations.set(
      nodeIndex,
      Array.from(deformationsFlat.slice(i + 1, i + 7)) as [
        number,
        number,
        number,
        number,
        number,
        number
      ]
    );
  }

  const reactions: DeformOutputs["reactions"] = new Map();
  for (let i = 0; i < reactionsSize; i += 7) {
    const nodeIndex = reactionsFlat[i];
    reactions.set(
      nodeIndex,
      Array.from(reactionsFlat.slice(i + 1, i + 7)) as [
        number,
        number,
        number,
        number,
        number,
        number
      ]
    );
  }

  // Add pointers to C++ allocated output data to the list for freeing
  if (deformationsDataPtr) allocatedMemory.push(deformationsDataPtr);
  if (reactionsDataPtr) allocatedMemory.push(reactionsDataPtr);

  // --- Free Memory ---
  allocatedMemory.forEach((ptr) => {
    if (ptr !== 0) {
      // Avoid freeing null pointers
      mod._free(ptr);
    }
  });

  return {
    deformations,
    reactions,
  };
}

// Utils
type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor;

// Simplified memory allocation helper
function getMemoryData<T extends TypedArrayConstructor>(
  data: ArrayLike<number>,
  TypedArrayCtor: T,
  heapTypedArray: InstanceType<T> | undefined // Make heap optional as it might not be ready initially
): {
  dataPtr: number; // Pointer to data
} {
  if (!data || data.length === 0) {
    return { dataPtr: 0 }; // Return null pointer if data is empty
  }

  const dataBuf = new TypedArrayCtor(data);
  const dataByteLength = dataBuf.length * dataBuf.BYTES_PER_ELEMENT;
  const dataPtr = mod._malloc(dataByteLength);

  if (dataPtr === 0) {
    throw new Error("Memory allocation failed in WASM module.");
  }

  // Ensure heapTypedArray is valid before using set
  if (!heapTypedArray) {
    // This error should ideally not happen if EXPORTED_RUNTIME_METHODS is used correctly
    // and the module is awaited properly in tests.
    throw new Error(
      `WASM heap array (e.g., HEAPF64) is not available for ${TypedArrayCtor.name}. Check module initialization and EXPORTED_RUNTIME_METHODS.`
    );
  }

  // Copy data to WASM heap
  // Offset is in elements for set(), but pointer is in bytes
  heapTypedArray.set(dataBuf, dataPtr / dataBuf.BYTES_PER_ELEMENT);

  return {
    dataPtr,
  };
}
