import {
  Node,
  Element,
  ElementInputs,
  CLTLayup,
  NodeInputs,
  DeformOutputs,
} from "./data-model.js";
import createModule from "./cpp/built/deform.js";
import { deform } from "./deform";

const WASM_CLT_DEFORM_ARITY = 48;

// @ts-ignore, load wasm
const mod = await createModule();

export function deformCpp(
  nodes: Node[],
  elements: Element[],
  nodeInputs: NodeInputs,
  elementInputs: ElementInputs
): DeformOutputs {
  if (nodes.length === 0) return;

  const hasCltLayups = (elementInputs.cltLayups?.size ?? 0) > 0;
  const supportsCltWasm = mod._deform.length >= WASM_CLT_DEFORM_ARITY;
  if (hasCltLayups && !supportsCltWasm) {
    // Compatibility fallback while older wasm builds are still in use.
    return deform(nodes, elements, nodeInputs, elementInputs);
  }

  const gc: number[] = []; // Garage Collector

  // 1- Allocate data
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
  const elasticitiesOrthogonal = processElementInput(
    elementInputs.elasticitiesOrthogonal
  );
  const areas = processElementInput(elementInputs.areas);
  const moiZ = processElementInput(elementInputs.momentsOfInertiaZ);
  const moiY = processElementInput(elementInputs.momentsOfInertiaY);
  const shearMod = processElementInput(elementInputs.shearModuli);
  const torsion = processElementInput(elementInputs.torsionalConstants);
  const thickness = processElementInput(elementInputs.thicknesses);
  const poisson = processElementInput(elementInputs.poissonsRatios);
  const cltLayups = processCltLayups(elementInputs.cltLayups);

  // Allocate memory for the pointers that C++ will write the results pointers to
  const deformationsDataPtrOutPtr = mod._malloc(4); // Pointer to a pointer (size 4 for 32-bit WASM)
  gc.push(deformationsDataPtrOutPtr);
  const deformationsSizeOutPtr = mod._malloc(4); // Pointer to an int (size 4)
  gc.push(deformationsSizeOutPtr);
  const reactionsDataPtrOutPtr = mod._malloc(4);
  gc.push(reactionsDataPtrOutPtr);
  const reactionsSizeOutPtr = mod._malloc(4);
  gc.push(reactionsSizeOutPtr);

  // 2- Call C++ Function
  const deformFn = mod._deform as unknown as (...args: number[]) => void;
  if (supportsCltWasm) {
    deformFn(
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
      elasticitiesOrthogonal.keysPtr,
      elasticitiesOrthogonal.valuesPtr,
      elasticitiesOrthogonal.size,
      cltLayups.keysPtr,
      cltLayups.layerCountsPtr,
      cltLayups.optionsPtr,
      cltLayups.layersFlatPtr,
      cltLayups.size,
      // Output pointers
      deformationsDataPtrOutPtr,
      deformationsSizeOutPtr,
      reactionsDataPtrOutPtr,
      reactionsSizeOutPtr
    );
  } else {
    deformFn(
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
      elasticitiesOrthogonal.keysPtr,
      elasticitiesOrthogonal.valuesPtr,
      elasticitiesOrthogonal.size,
      // Output pointers
      deformationsDataPtrOutPtr,
      deformationsSizeOutPtr,
      reactionsDataPtrOutPtr,
      reactionsSizeOutPtr
    );
  }

  // 3- Read Output Data
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

  // 4- Convert flat output arrays back to Map format
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
  if (deformationsDataPtr) gc.push(deformationsDataPtr);
  if (reactionsDataPtr) gc.push(reactionsDataPtr);

  // Free Memory
  gc.forEach((ptr) => mod._free(ptr));

  return {
    deformations,
    reactions,
  };

  function processCltLayups(cltMap: Map<number, CLTLayup> | undefined) {
    const entries = cltMap ? Array.from(cltMap.entries()) : [];
    const keys: number[] = [];
    const layerCounts: number[] = [];
    const optionsFlat: number[] = [];
    const layersFlat: number[] = [];

    for (const [elementIndex, layup] of entries) {
      keys.push(elementIndex);
      layerCounts.push(layup.layers.length);

      optionsFlat.push(
        layup.options.shearCoupling ? 1 : 0,
        layup.options.noGlueAtNarrowSide ? 1 : 0,
        (layup.options.strictSymmetryForElement ?? true) ? 1 : 0,
        layup.options.symmetryTolerance ?? 1e-6,
        layup.options.r33 ?? 1,
        layup.options.r66 ?? 1,
        layup.options.r77 ?? 1,
        layup.options.r88 ?? 1
      );

      for (const layer of layup.layers) {
        layersFlat.push(
          layer.thickness,
          layer.thetaDeg,
          layer.Ex,
          layer.Ey,
          layer.nuXY,
          layer.Gxy,
          layer.Gxz,
          layer.Gyz
        );
      }
    }

    const keysPtr = allocate(keys, Uint32Array, mod.HEAPU32);
    gc.push(keysPtr);
    const layerCountsPtr = allocate(layerCounts, Uint32Array, mod.HEAPU32);
    gc.push(layerCountsPtr);
    const optionsPtr = allocate(optionsFlat, Float64Array, mod.HEAPF64);
    gc.push(optionsPtr);
    const layersFlatPtr = allocate(layersFlat, Float64Array, mod.HEAPF64);
    gc.push(layersFlatPtr);

    return {
      keysPtr,
      layerCountsPtr,
      optionsPtr,
      layersFlatPtr,
      size: entries.length,
    };
  }
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
  data: number[],
  TypedArrayCtor: T,
  heapTypedArray: InstanceType<T>
): number {
  const buffer = new TypedArrayCtor(data);
  const pointer = mod._malloc(buffer.length * buffer.BYTES_PER_ELEMENT);

  heapTypedArray.set(buffer, pointer / buffer.BYTES_PER_ELEMENT);

  return pointer;
}
