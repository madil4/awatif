// WASM wrapper for the C++ linear solver (cpp/lSolver.cpp).
import type { Mesh } from "../../data-model";
import createModule from "./cpp/built/lSolver.js";

let mod: any = null;
let _initPromise: Promise<void> | null = null;

export function initPositionsAndForcesCpp(): Promise<void> {
  if (!_initPromise) {
    _initPromise = (async () => {
      mod = await createModule();
    })();
  }
  return _initPromise;
}

initPositionsAndForcesCpp();

export function getPositionsAndForcesCpp(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  loads: Mesh["loads"]["val"],
  supports: Mesh["supports"]["val"],
  elementsProps: Mesh["elementsProps"]["val"],
  releases?: Mesh["releases"]["val"],
): {
  positions: NonNullable<Mesh["positions"]["val"]>;
  internalForces: Mesh["internalForces"]["val"];
} {
  if (!mod) {
    throw new Error(
      "Linear WASM module not loaded yet. Call initPositionsAndForcesCpp() first.",
    );
  }

  const internalForces: Mesh["internalForces"]["val"] = new Map();
  if (!nodes || !elements) return { positions: [], internalForces };
  if (nodes.length === 0 || elements.length === 0) {
    return { positions: [], internalForces };
  }

  const gc: number[] = [];

  try {
    const nodesFlat = nodes.flat();
    const nodesPtr = allocate(nodesFlat, Float64Array, mod.HEAPF64);
    gc.push(nodesPtr);

    const elementsFlat = elements.flat();
    const elementsPtr = allocate(elementsFlat, Uint32Array, mod.HEAPU32);
    gc.push(elementsPtr);

    const supportKeys = supports ? Array.from(supports.keys()) : [];
    const supportValues = supports
      ? Array.from(supports.values())
          .flat()
          .map((b) => (b ? 1 : 0))
      : [];
    const supportKeysPtr = allocate(supportKeys, Int32Array, mod.HEAP32);
    gc.push(supportKeysPtr);
    const supportValuesPtr = allocate(supportValues, Uint8Array, mod.HEAPU8);
    gc.push(supportValuesPtr);

    const loadKeys = loads ? Array.from(loads.keys()) : [];
    const loadValues = loads ? Array.from(loads.values()).flat() : [];
    const loadKeysPtr = allocate(loadKeys, Int32Array, mod.HEAP32);
    gc.push(loadKeysPtr);
    const loadValuesPtr = allocate(loadValues, Float64Array, mod.HEAPF64);
    gc.push(loadValuesPtr);

    const processElementInput = (inputMap: Map<number, number>) => {
      const keys = Array.from(inputMap.keys());
      const values = Array.from(inputMap.values());
      const keysPtr = allocate(keys, Int32Array, mod.HEAP32);
      gc.push(keysPtr);
      const valuesPtr = allocate(values, Float64Array, mod.HEAPF64);
      gc.push(valuesPtr);

      return {
        keysPtr,
        valuesPtr,
        size: keys.length,
      };
    };

    const elasticityMap = new Map<number, number>();
    const areaMap = new Map<number, number>();
    const momentInertiaZMap = new Map<number, number>();
    const momentInertiaYMap = new Map<number, number>();
    const shearModulusMap = new Map<number, number>();
    const torsionalConstantMap = new Map<number, number>();

    elementsProps?.forEach((props, idx) => {
      if (props.elasticity !== undefined)
        elasticityMap.set(idx, props.elasticity);
      if (props.area !== undefined) areaMap.set(idx, props.area);
      if (props.momentInertiaZ !== undefined)
        momentInertiaZMap.set(idx, props.momentInertiaZ);
      if (props.momentInertiaY !== undefined)
        momentInertiaYMap.set(idx, props.momentInertiaY);
      if (props.shearModulus !== undefined)
        shearModulusMap.set(idx, props.shearModulus);
      if (props.torsionalConstant !== undefined)
        torsionalConstantMap.set(idx, props.torsionalConstant);
    });

    const elasticities = processElementInput(elasticityMap);
    const areas = processElementInput(areaMap);
    const momentInertiasZ = processElementInput(momentInertiaZMap);
    const momentInertiasY = processElementInput(momentInertiaYMap);
    const shearModuli = processElementInput(shearModulusMap);
    const torsionalConstants = processElementInput(torsionalConstantMap);

    const releaseKeys = releases ? Array.from(releases.keys()) : [];
    const releaseValues = releases
      ? Array.from(releases.values())
          .flat()
          .map((b) => (b ? 1 : 0))
      : [];
    const releaseKeysPtr = allocate(releaseKeys, Int32Array, mod.HEAP32);
    gc.push(releaseKeysPtr);
    const releaseValuesPtr = allocate(releaseValues, Uint8Array, mod.HEAPU8);
    gc.push(releaseValuesPtr);

    const positionsDataPtrOutPtr = mod._malloc(4);
    gc.push(positionsDataPtrOutPtr);
    const positionsSizeOutPtr = mod._malloc(4);
    gc.push(positionsSizeOutPtr);
    const forcesDataPtrOutPtr = mod._malloc(4);
    gc.push(forcesDataPtrOutPtr);
    const forcesSizeOutPtr = mod._malloc(4);
    gc.push(forcesSizeOutPtr);
    const statusOutPtr = mod._malloc(4);
    gc.push(statusOutPtr);

    mod._lSolve(
      nodesPtr,
      nodes.length,
      elementsPtr,
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
      momentInertiasZ.keysPtr,
      momentInertiasZ.valuesPtr,
      momentInertiasZ.size,
      momentInertiasY.keysPtr,
      momentInertiasY.valuesPtr,
      momentInertiasY.size,
      shearModuli.keysPtr,
      shearModuli.valuesPtr,
      shearModuli.size,
      torsionalConstants.keysPtr,
      torsionalConstants.valuesPtr,
      torsionalConstants.size,
      releaseKeysPtr,
      releaseValuesPtr,
      releaseKeys.length,
      positionsDataPtrOutPtr,
      positionsSizeOutPtr,
      forcesDataPtrOutPtr,
      forcesSizeOutPtr,
      statusOutPtr,
    );

    const status = mod.HEAP32[statusOutPtr / 4];
    if (status !== 0) {
      throw new Error(`Linear solver failed with status ${status}`);
    }

    const positionsDataPtr = mod.HEAPU32[positionsDataPtrOutPtr / 4];
    const positionsSize = mod.HEAPU32[positionsSizeOutPtr / 4];
    const forcesDataPtr = mod.HEAPU32[forcesDataPtrOutPtr / 4];
    const forcesSize = mod.HEAPU32[forcesSizeOutPtr / 4];

    if (!positionsDataPtr || !forcesDataPtr) {
      throw new Error("Linear WASM function returned null pointers");
    }

    const positionsFlat = new Float64Array(
      mod.HEAPF64.buffer,
      positionsDataPtr,
      positionsSize,
    );
    const forcesFlat = new Float64Array(
      mod.HEAPF64.buffer,
      forcesDataPtr,
      forcesSize,
    );

    const positions = Array.from(positionsFlat);

    for (let i = 0; i < forcesSize; i += 13) {
      const elemIdx = forcesFlat[i];
      internalForces.set(elemIdx, {
        N: [forcesFlat[i + 1], forcesFlat[i + 2]],
        Vy: [forcesFlat[i + 3], forcesFlat[i + 4]],
        Vz: [forcesFlat[i + 5], forcesFlat[i + 6]],
        Mx: [forcesFlat[i + 7], forcesFlat[i + 8]],
        My: [forcesFlat[i + 9], forcesFlat[i + 10]],
        Mz: [forcesFlat[i + 11], forcesFlat[i + 12]],
      });
    }

    gc.push(positionsDataPtr);
    gc.push(forcesDataPtr);

    return { positions, internalForces };
  } finally {
    gc.forEach((ptr) => mod._free(ptr));
  }
}

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
  heapTypedArray: InstanceType<T>,
): number {
  const buffer = new TypedArrayCtor(data);
  const pointer = mod._malloc(buffer.length * buffer.BYTES_PER_ELEMENT);

  heapTypedArray.set(buffer, pointer / buffer.BYTES_PER_ELEMENT);

  return pointer;
}
