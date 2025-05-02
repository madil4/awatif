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

  const gc: number[] = []; // Garage Collector

  // Allocate data
  // Nodes
  const nodesPtr = allocate(nodes.flat(), Float64Array, mod.HEAPF64);
  gc.push(nodesPtr);

  // Elements
  const elementIndices = elements.flat();
  const elementsPtr = allocate(elementIndices, Uint32Array, mod.HEAPU32);
  gc.push(elementsPtr);
  const elementSizes = elements.map((e) => e.length);
  const elementSizesPtz = allocate(elementSizes, Uint32Array, mod.HEAPU32);
  gc.push(elementSizesPtz);

  // NodeInputs.supports
  const supportKeys = nodeInputs.supports
    ? Array.from(nodeInputs.supports.keys())
    : [];
  const supportValues = nodeInputs.supports
    ? Array.from(nodeInputs.supports.values())
        .flat()
        .map((b) => (b ? 1 : 0))
    : [];
  const supportKeysPtr = allocate(supportKeys, Uint32Array, mod.HEAPU32);
  gc.push(supportKeysPtr);
  const supportValuesPtr = allocate(supportValues, Uint8Array, mod.HEAPU8);
  gc.push(supportValuesPtr);

  // NodeInputs.loads
  const loadKeys = nodeInputs.loads ? Array.from(nodeInputs.loads.keys()) : [];
  const loadValues = nodeInputs.loads
    ? Array.from(nodeInputs.loads.values()).flat()
    : [];
  const loadKeysPtr = allocate(loadKeys, Uint32Array, mod.HEAPU32);
  gc.push(loadKeysPtr);
  const loadValuesPtr = allocate(loadValues, Float64Array, mod.HEAPF64);
  gc.push(loadValuesPtr);

  // ElementInputs
  const processElementInput = (inputMap: Map<number, number> | undefined) => {
    const keys = inputMap ? Array.from(inputMap.keys()) : [];
    const values = inputMap ? Array.from(inputMap.values()) : [];
    const keysPtr = allocate(keys, Uint32Array, mod.HEAPU32);
    gc.push(keysPtr);
    const valuesPtr = allocate(values, Float64Array, mod.HEAPF64);
    gc.push(valuesPtr);

    return {
      keysPtr,
      valuesPtr,
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
  gc.push(deformationsDataPtrOutPtr);
  const deformationsSizeOutPtr = mod._malloc(4); // Pointer to an int (size 4)
  gc.push(deformationsSizeOutPtr);
  const reactionsDataPtrOutPtr = mod._malloc(4);
  gc.push(reactionsDataPtrOutPtr);
  const reactionsSizeOutPtr = mod._malloc(4);
  gc.push(reactionsSizeOutPtr);

  // --- Call C++ Function ---
  mod._deform(
    nodesPtr,
    nodes.length,
    elementsPtr,
    elementIndices.length,
    elementSizesPtz,
    elements.length,
    supportKeysPtr,
    supportValuesPtr,
    supportKeys.length,
    loadKeysPtr,
    loadValuesPtr,
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
  if (deformationsDataPtr) gc.push(deformationsDataPtr);
  if (reactionsDataPtr) gc.push(reactionsDataPtr);

  // --- Free Memory ---
  gc.forEach((ptr) => {
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

function allocate<T extends TypedArrayConstructor>(
  data: number[], // flatten list
  TypedArrayCtor: T,
  heapTypedArray: InstanceType<T>
): number {
  const buffer = new TypedArrayCtor(data);
  const pointer = mod._malloc(buffer.length * buffer.BYTES_PER_ELEMENT);

  heapTypedArray.set(buffer, pointer / buffer.BYTES_PER_ELEMENT);

  return pointer;
}
