import {
  CLTLayup,
  DeformOutputs,
  Element,
  ElementInputs,
  Node,
  NodeInputs,
} from "./data-model.js";
import createModule from "./cpp/built/deform.js";

const mod = (await createModule()) as any;

type ElementInputPtr = {
  keysPtr: number;
  valuesPtr: number;
  size: number;
};

type CltLayupPtr = {
  keysPtr: number;
  layerCountsPtr: number;
  optionsPtr: number;
  layersFlatPtr: number;
  size: number;
};

export type CachedDeformCppSolver = {
  dof: number;
  freeDof: number;
  setupTimeMs: number;
  solve: (
    loads?: NodeInputs["loads"],
    options?: {
      includeReactions?: boolean;
    },
  ) => DeformOutputs;
  dispose: () => void;
};

export function deformCpp(
  nodes: Node[],
  elements: Element[],
  nodeInputs: NodeInputs,
  elementInputs: ElementInputs,
  options?: {
    includeReactions?: boolean;
  },
): DeformOutputs {
  if (nodes.length === 0) return;

  const gc: number[] = [];
  const geometry = processGeometry(nodes, elements, gc);
  const supports = processSupports(nodeInputs.supports, gc);
  const loads = processLoads(nodeInputs.loads, gc);
  const elementProps = processElementInputs(elementInputs, gc);
  const cltLayups = processCltLayups(elementInputs.cltLayups, gc);

  const out = allocateOutputPointers(gc);
  const includeReactions = options?.includeReactions ?? true;

  const deformFn = mod._deform as (...args: number[]) => void;
  deformFn(
    geometry.nodesPtr,
    nodes.length,
    geometry.elementsPtr,
    geometry.elementIndicesLength,
    geometry.elementSizesPtr,
    elements.length,
    supports.keysPtr,
    supports.valuesPtr,
    supports.size,
    loads.keysPtr,
    loads.valuesPtr,
    loads.size,
    elementProps.elasticities.keysPtr,
    elementProps.elasticities.valuesPtr,
    elementProps.elasticities.size,
    elementProps.areas.keysPtr,
    elementProps.areas.valuesPtr,
    elementProps.areas.size,
    elementProps.moiZ.keysPtr,
    elementProps.moiZ.valuesPtr,
    elementProps.moiZ.size,
    elementProps.moiY.keysPtr,
    elementProps.moiY.valuesPtr,
    elementProps.moiY.size,
    elementProps.shearMod.keysPtr,
    elementProps.shearMod.valuesPtr,
    elementProps.shearMod.size,
    elementProps.torsion.keysPtr,
    elementProps.torsion.valuesPtr,
    elementProps.torsion.size,
    elementProps.thickness.keysPtr,
    elementProps.thickness.valuesPtr,
    elementProps.thickness.size,
    elementProps.poisson.keysPtr,
    elementProps.poisson.valuesPtr,
    elementProps.poisson.size,
    elementProps.elasticitiesOrthogonal.keysPtr,
    elementProps.elasticitiesOrthogonal.valuesPtr,
    elementProps.elasticitiesOrthogonal.size,
    cltLayups.keysPtr,
    cltLayups.layerCountsPtr,
    cltLayups.optionsPtr,
    cltLayups.layersFlatPtr,
    cltLayups.size,
    includeReactions ? 1 : 0,
    out.deformationsDataPtrOutPtr,
    out.deformationsSizeOutPtr,
    out.reactionsDataPtrOutPtr,
    out.reactionsSizeOutPtr,
  );

  const result = readOutputMaps(out);
  if (includeReactions && result.reactions.size) {
    subtractAppliedLoadsFromReactions(result.reactions, nodeInputs.loads);
  }

  if (result.deformationsDataPtr) gc.push(result.deformationsDataPtr);
  if (result.reactionsDataPtr) gc.push(result.reactionsDataPtr);
  freePointers(gc);

  return {
    deformations: result.deformations,
    reactions: result.reactions,
  };
}

export function createCachedDeformSolverCpp(
  nodes: Node[],
  elements: Element[],
  supports: NodeInputs["supports"],
  elementInputs: ElementInputs,
): CachedDeformCppSolver {
  if (nodes.length === 0 || elements.length === 0) {
    throw new Error("createCachedDeformSolverCpp requires non-empty nodes/elements");
  }

  const gc: number[] = [];
  const geometry = processGeometry(nodes, elements, gc);
  const supportData = processSupports(supports, gc);
  const elementProps = processElementInputs(elementInputs, gc);
  const cltLayups = processCltLayups(elementInputs.cltLayups, gc);

  const solverIdOutPtr = mod._malloc(4);
  gc.push(solverIdOutPtr);
  const dofOutPtr = mod._malloc(4);
  gc.push(dofOutPtr);
  const freeDofOutPtr = mod._malloc(4);
  gc.push(freeDofOutPtr);
  const setupMsOutPtr = mod._malloc(8);
  gc.push(setupMsOutPtr);

  const createFn = mod._create_cached_solver as (...args: number[]) => number;
  const status = createFn(
    geometry.nodesPtr,
    nodes.length,
    geometry.elementsPtr,
    geometry.elementIndicesLength,
    geometry.elementSizesPtr,
    elements.length,
    supportData.keysPtr,
    supportData.valuesPtr,
    supportData.size,
    elementProps.elasticities.keysPtr,
    elementProps.elasticities.valuesPtr,
    elementProps.elasticities.size,
    elementProps.areas.keysPtr,
    elementProps.areas.valuesPtr,
    elementProps.areas.size,
    elementProps.moiZ.keysPtr,
    elementProps.moiZ.valuesPtr,
    elementProps.moiZ.size,
    elementProps.moiY.keysPtr,
    elementProps.moiY.valuesPtr,
    elementProps.moiY.size,
    elementProps.shearMod.keysPtr,
    elementProps.shearMod.valuesPtr,
    elementProps.shearMod.size,
    elementProps.torsion.keysPtr,
    elementProps.torsion.valuesPtr,
    elementProps.torsion.size,
    elementProps.thickness.keysPtr,
    elementProps.thickness.valuesPtr,
    elementProps.thickness.size,
    elementProps.poisson.keysPtr,
    elementProps.poisson.valuesPtr,
    elementProps.poisson.size,
    elementProps.elasticitiesOrthogonal.keysPtr,
    elementProps.elasticitiesOrthogonal.valuesPtr,
    elementProps.elasticitiesOrthogonal.size,
    cltLayups.keysPtr,
    cltLayups.layerCountsPtr,
    cltLayups.optionsPtr,
    cltLayups.layersFlatPtr,
    cltLayups.size,
    solverIdOutPtr,
    dofOutPtr,
    freeDofOutPtr,
    setupMsOutPtr,
  );

  const solverId = mod.HEAPU32[solverIdOutPtr / 4];
  const dof = mod.HEAPU32[dofOutPtr / 4];
  const freeDof = mod.HEAPU32[freeDofOutPtr / 4];
  const setupTimeMs = mod.HEAPF64[setupMsOutPtr / 8];

  freePointers(gc);

  if (!status || !solverId) {
    throw new Error("create_cached_solver failed");
  }

  const solveFn = mod._solve_cached_solver as (...args: number[]) => void;
  const freeFn = mod._free_cached_solver as (solverId: number) => void;

  let disposed = false;

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    freeFn(solverId);
  };

  const solve = (
    loads: NodeInputs["loads"] = new Map(),
    options: { includeReactions?: boolean } = {},
  ): DeformOutputs => {
    if (disposed) {
      throw new Error("Cached C++ solver was already disposed");
    }

    const solveGc: number[] = [];
    const loadData = processLoads(loads, solveGc);
    const out = allocateOutputPointers(solveGc);

    solveFn(
      solverId,
      loadData.keysPtr,
      loadData.valuesPtr,
      loadData.size,
      options.includeReactions ? 1 : 0,
      out.deformationsDataPtrOutPtr,
      out.deformationsSizeOutPtr,
      out.reactionsDataPtrOutPtr,
      out.reactionsSizeOutPtr,
    );

    const result = readOutputMaps(out);
    if ((options.includeReactions ?? false) && result.reactions.size) {
      subtractAppliedLoadsFromReactions(result.reactions, loads);
    }

    if (!result.deformations.size) {
      freePointers(solveGc);
      throw new Error("solve_cached_solver returned empty deformation map");
    }

    if (result.deformationsDataPtr) solveGc.push(result.deformationsDataPtr);
    if (result.reactionsDataPtr) solveGc.push(result.reactionsDataPtr);
    freePointers(solveGc);

    return {
      deformations: result.deformations,
      reactions: result.reactions,
    };
  };

  return {
    dof,
    freeDof,
    setupTimeMs,
    solve,
    dispose,
  };
}

function processGeometry(nodes: Node[], elements: Element[], gc: number[]) {
  const nodesPtr = allocate(nodes.flat(), Float64Array, mod.HEAPF64);
  gc.push(nodesPtr);

  const elementIndices = elements.flat();
  const elementsPtr = allocate(elementIndices, Uint32Array, mod.HEAPU32);
  gc.push(elementsPtr);

  const elementSizes = elements.map((e) => e.length);
  const elementSizesPtr = allocate(elementSizes, Uint32Array, mod.HEAPU32);
  gc.push(elementSizesPtr);

  return {
    nodesPtr,
    elementsPtr,
    elementIndicesLength: elementIndices.length,
    elementSizesPtr,
  };
}

function processSupports(
  supports: NodeInputs["supports"],
  gc: number[],
): { keysPtr: number; valuesPtr: number; size: number } {
  const keys = supports ? Array.from(supports.keys()) : [];
  const values = supports
    ? Array.from(supports.values())
        .flat()
        .map((b) => (b ? 1 : 0))
    : [];

  const keysPtr = allocate(keys, Uint32Array, mod.HEAPU32);
  gc.push(keysPtr);
  const valuesPtr = allocate(values, Uint8Array, mod.HEAPU8);
  gc.push(valuesPtr);

  return {
    keysPtr,
    valuesPtr,
    size: keys.length,
  };
}

function processLoads(
  loads: NodeInputs["loads"],
  gc: number[],
): { keysPtr: number; valuesPtr: number; size: number } {
  const keys = loads ? Array.from(loads.keys()) : [];
  const values = loads ? Array.from(loads.values()).flat() : [];

  const keysPtr = allocate(keys, Uint32Array, mod.HEAPU32);
  gc.push(keysPtr);
  const valuesPtr = allocate(values, Float64Array, mod.HEAPF64);
  gc.push(valuesPtr);

  return {
    keysPtr,
    valuesPtr,
    size: keys.length,
  };
}

function processElementInput(
  inputMap: Map<number, number> | undefined,
  gc: number[],
): ElementInputPtr {
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
}

function processElementInputs(elementInputs: ElementInputs, gc: number[]) {
  return {
    elasticities: processElementInput(elementInputs.elasticities, gc),
    elasticitiesOrthogonal: processElementInput(
      elementInputs.elasticitiesOrthogonal,
      gc,
    ),
    areas: processElementInput(elementInputs.areas, gc),
    moiZ: processElementInput(elementInputs.momentsOfInertiaZ, gc),
    moiY: processElementInput(elementInputs.momentsOfInertiaY, gc),
    shearMod: processElementInput(elementInputs.shearModuli, gc),
    torsion: processElementInput(elementInputs.torsionalConstants, gc),
    thickness: processElementInput(elementInputs.thicknesses, gc),
    poisson: processElementInput(elementInputs.poissonsRatios, gc),
  };
}

function processCltLayups(
  cltMap: Map<number, CLTLayup> | undefined,
  gc: number[],
): CltLayupPtr {
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
      layup.options.r88 ?? 1,
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
        layer.Gyz,
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

function allocateOutputPointers(gc: number[]) {
  const deformationsDataPtrOutPtr = mod._malloc(4);
  gc.push(deformationsDataPtrOutPtr);

  const deformationsSizeOutPtr = mod._malloc(4);
  gc.push(deformationsSizeOutPtr);

  const reactionsDataPtrOutPtr = mod._malloc(4);
  gc.push(reactionsDataPtrOutPtr);

  const reactionsSizeOutPtr = mod._malloc(4);
  gc.push(reactionsSizeOutPtr);

  return {
    deformationsDataPtrOutPtr,
    deformationsSizeOutPtr,
    reactionsDataPtrOutPtr,
    reactionsSizeOutPtr,
  };
}

function readOutputMaps(out: {
  deformationsDataPtrOutPtr: number;
  deformationsSizeOutPtr: number;
  reactionsDataPtrOutPtr: number;
  reactionsSizeOutPtr: number;
}) {
  const deformationsDataPtr = mod.HEAPU32[out.deformationsDataPtrOutPtr / 4];
  const deformationsSize = mod.HEAPU32[out.deformationsSizeOutPtr / 4];
  const reactionsDataPtr = mod.HEAPU32[out.reactionsDataPtrOutPtr / 4];
  const reactionsSize = mod.HEAPU32[out.reactionsSizeOutPtr / 4];

  const deformationsFlat = new Float64Array(
    mod.HEAPF64.buffer,
    deformationsDataPtr,
    deformationsSize,
  );
  const reactionsFlat = new Float64Array(
    mod.HEAPF64.buffer,
    reactionsDataPtr,
    reactionsSize,
  );

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
        number,
      ],
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
        number,
      ],
    );
  }

  return {
    deformationsDataPtr,
    reactionsDataPtr,
    deformations,
    reactions,
  };
}

function subtractAppliedLoadsFromReactions(
  reactions: NonNullable<DeformOutputs["reactions"]>,
  loads?: NodeInputs["loads"],
): void {
  if (!loads?.size) return;

  reactions.forEach((reaction, nodeIndex) => {
    const applied = loads.get(nodeIndex);
    if (!applied) return;

    reactions.set(nodeIndex, [
      reaction[0] - applied[0],
      reaction[1] - applied[1],
      reaction[2] - applied[2],
      reaction[3] - applied[3],
      reaction[4] - applied[4],
      reaction[5] - applied[5],
    ]);
  });
}

function freePointers(gc: number[]) {
  gc.forEach((ptr) => mod._free(ptr));
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
