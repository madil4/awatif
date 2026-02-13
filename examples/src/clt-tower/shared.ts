import van from "vanjs-core";
import {
  CLTLayup,
  Mesh,
  analyze,
  createCachedDeformSolver,
  deform,
} from "awatif-fem";
import { Parameters } from "awatif-ui";

import { Building } from "../building/data-model";
import { getMesh } from "../building/getMesh";

export const TOWER_FLOOR_HEIGHT = 3.2;
const KNM2_TO_NM2 = 1e3;

const FOOTPRINT: [number, number][] = [
  [0, 0],
  [24, 0],
  [24, 10],
  [14, 10],
  [14, 18],
  [0, 18],
];

type ParameterConfig = {
  value: ReturnType<typeof van.state<number>>;
  min: number;
  max: number;
  step: number;
  label: string;
};

export type TowerParameters = Parameters & {
  stories: ParameterConfig;
  grid: ParameterConfig;
  meshSize: ParameterConfig;
  load: ParameterConfig;
};

export type TowerInputValues = {
  stories: number;
  grid: number;
  meshSize: number;
  load: number;
};

export type TowerMeshResult = {
  nodes: Mesh["nodes"]["val"];
  elements: Mesh["elements"]["val"];
  nodeInputs: Mesh["nodeInputs"]["val"];
  elementInputs: Mesh["elementInputs"]["val"];
};

export type TowerSolveState = {
  deformOutputs: Mesh["deformOutputs"]["val"];
  analyzeOutputs: Mesh["analyzeOutputs"]["val"];
  solveMs: number;
};

type SolverCache = {
  key: string;
  solver: ReturnType<typeof createCachedDeformSolver>;
};

let solverCache: SolverCache | null = null;
let preferCachedSolver = false;

function resetSolverCache() {
  solverCache?.solver.dispose?.();
  solverCache = null;
}

export function createTowerParameters(): TowerParameters {
  return {
    stories: {
      value: van.state(6),
      min: 3,
      max: 20,
      step: 1,
      label: "stories",
    },
    grid: {
      value: van.state(2.4),
      min: 1.8,
      max: 4,
      step: 0.2,
      label: "grid (m)",
    },
    meshSize: {
      value: van.state(2),
      min: 0.6,
      max: 3.5,
      step: 0.1,
      label: "mesh size (m)",
    },
    load: {
      value: van.state(3.5),
      min: -10,
      max: 10,
      step: 0.1,
      label: "load (kN/m²)",
    },
  };
}

export function normalizeTowerInputs(raw: TowerInputValues): TowerInputValues {
  return {
    stories: clampInt(raw.stories, 3, 20),
    grid: clampNumber(raw.grid, 1.8, 4),
    meshSize: clampNumber(raw.meshSize, 0.6, 3.5),
    load: clampNumber(raw.load, -10, 10),
  };
}

export function getTowerInputValues(parameters: TowerParameters): TowerInputValues {
  return {
    stories: parameters.stories.value.val,
    grid: parameters.grid.value.val,
    meshSize: parameters.meshSize.value.val,
    load: parameters.load.value.val,
  };
}

export function applyTowerInputValues(
  parameters: TowerParameters,
  values: TowerInputValues,
) {
  if (parameters.stories.value.val !== values.stories) {
    parameters.stories.value.val = values.stories;
  }
  if (parameters.grid.value.val !== values.grid) {
    parameters.grid.value.val = values.grid;
  }
  if (parameters.meshSize.value.val !== values.meshSize) {
    parameters.meshSize.value.val = values.meshSize;
  }
  if (parameters.load.value.val !== values.load) {
    parameters.load.value.val = values.load;
  }
}

export function buildSevenLayerCLTLayup(): CLTLayup {
  const mmToM = 1e-3;
  const nmm2ToNm2 = 1e6;
  const pattern = [30, 40, 30, 40, 30, 40, 30];
  const angles = [0, 90, 0, 90, 0, 90, 0];

  return {
    layers: pattern.map((thkMm, i) => ({
      thickness: thkMm * mmToM,
      thetaDeg: angles[i],
      Ex: 11000 * nmm2ToNm2,
      Ey: 370 * nmm2ToNm2,
      nuXY: 0.2,
      Gxy: 690 * nmm2ToNm2,
      Gxz: 690 * nmm2ToNm2,
      Gyz: 69 * nmm2ToNm2,
    })),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };
}

export function rebuildTowerBuilding(
  building: Building,
  values: TowerInputValues,
  cltLayup: CLTLayup,
) {
  const points: [number, number, number][] = [];
  const stories: number[] = [];
  const columns: number[] = [];
  const slabs: number[][] = [];
  const columnsByStory: Map<number, number[]> = new Map();
  const slabsByStory: Map<number, number[]> = new Map();
  const columnData: Building["columnData"]["val"] = new Map();
  const slabData: Building["slabData"]["val"] = new Map();

  const columnPlan = buildColumnPlan(values.grid);

  for (let story = 0; story < values.stories; story++) {
    const z = TOWER_FLOOR_HEIGHT * (story + 1);

    const slabStart = points.length;
    FOOTPRINT.forEach(([x, y]) => points.push([x, y, z]));
    const slab = FOOTPRINT.map((_, i) => slabStart + i);
    slabs.push(slab);
    const slabIndex = slabs.length - 1;

    stories.push(slabStart);
    slabsByStory.set(story, [slabIndex]);
    slabData.set(slabIndex, {
      analysisInput: {
        meshSize: values.meshSize,
        areaLoad: -values.load * KNM2_TO_NM2,
        isOpening: false,
        cltLayup,
      },
    });

    const storyColumnIndices: number[] = [];
    columnPlan.forEach(([x, y]) => {
      points.push([x, y, z]);
      columns.push(points.length - 1);
      const columnIndex = columns.length - 1;
      storyColumnIndices.push(columnIndex);

      if (story === 0) {
        columnData.set(columnIndex, {
          analysisInput: {
            support: [true, true, true, true, true, true],
          },
        });
      }
    });
    columnsByStory.set(story, storyColumnIndices);
  }

  building.points.val = points;
  building.stories.val = stories;
  building.columns.val = columns;
  building.slabs.val = slabs;
  building.columnsByStory.val = columnsByStory;
  building.slabsByStory.val = slabsByStory;
  building.columnData.val = columnData;
  building.slabData.val = slabData;
}

export function buildTowerMesh(
  building: Building,
  errorLabel: string,
): TowerMeshResult | null {
  try {
    const result = getMesh(
      building.points.val,
      building.stories.val,
      building.columns.val,
      building.slabs.val,
      building.columnsByStory.val,
      building.slabsByStory.val,
      building.columnData.val,
      building.slabData.val,
    );
    if (!result.nodes.length || !result.elements.length) return null;
    return {
      nodes: result.nodes,
      elements: result.elements,
      nodeInputs: result.nodeInputs,
      elementInputs: result.elementInputs,
    };
  } catch (error) {
    console.error(errorLabel, error);
    return null;
  }
}

export function solveTowerMesh(
  meshResult: TowerMeshResult,
  options?: {
    includeAnalyze?: boolean;
    includeReactions?: boolean;
    cacheKey?: string;
    useCached?: boolean;
  },
): TowerSolveState | null {
  const includeAnalyze = options?.includeAnalyze ?? false;
  const includeReactions = options?.includeReactions ?? false;
  const useCached = options?.useCached ?? false;
  const cacheKey =
    options?.cacheKey ??
    `n:${meshResult.nodes.length}|e:${meshResult.elements.length}`;

  const runAnalyze = (deformOutputs: TowerSolveState["deformOutputs"]) =>
    includeAnalyze
      ? analyze(
          meshResult.nodes,
          meshResult.elements,
          meshResult.elementInputs,
          deformOutputs,
        )
      : {};

  const isInvalidDeformation = (out: TowerSolveState["deformOutputs"]) =>
    !out?.deformations || out.deformations.size === 0;

  try {
    const solveT0 = performance.now();
    const shouldUseCached = useCached || preferCachedSolver;
    const deformOutputs = shouldUseCached
      ? solveWithCached(meshResult, includeReactions, cacheKey)
      : deform(
          meshResult.nodes,
          meshResult.elements,
          meshResult.nodeInputs,
          meshResult.elementInputs,
          { includeReactions },
        );
    if (isInvalidDeformation(deformOutputs)) {
      throw new Error("deform produced empty deformation map");
    }
    const solveMs = performance.now() - solveT0;
    const analyzeOutputs = runAnalyze(deformOutputs);

    return {
      deformOutputs,
      analyzeOutputs,
      solveMs,
    };
  } catch (error) {
    if (!useCached) {
      // If C++/WASM fails once, stick to cached JS solver for session stability.
      preferCachedSolver = true;
      resetSolverCache();
      console.warn("Tower one-shot solve failed, switching to cached JS solver", error);
      try {
        const solveT0 = performance.now();
        const deformOutputs = solveWithCached(
          meshResult,
          includeReactions,
          cacheKey,
        );
        if (isInvalidDeformation(deformOutputs)) {
          throw new Error("cached solver produced empty deformation map");
        }
        const solveMs = performance.now() - solveT0;
        const analyzeOutputs = runAnalyze(deformOutputs);
        return {
          deformOutputs,
          analyzeOutputs,
          solveMs,
        };
      } catch (fallbackError) {
        console.error("Tower solve failed after JS fallback", fallbackError);
        return null;
      }
    }

    // Cached path failed: invalidate factorization and report.
    resetSolverCache();
    console.error("Tower cached solve failed", error);
    return null;
  }
}

function solveWithCached(
  meshResult: TowerMeshResult,
  includeReactions: boolean,
  cacheKey: string,
) {
  if (!solverCache || solverCache.key !== cacheKey) {
    resetSolverCache();
    solverCache = {
      key: cacheKey,
      solver: createCachedDeformSolver(
        meshResult.nodes,
        meshResult.elements,
        meshResult.nodeInputs.supports,
        meshResult.elementInputs,
      ),
    };
  }

  return solverCache.solver.solve(meshResult.nodeInputs.loads, {
    includeReactions,
  });
}

export function clearMesh(mesh: Mesh) {
  resetSolverCache();
  mesh.nodes.val = [];
  mesh.elements.val = [];
  mesh.nodeInputs.val = {};
  mesh.elementInputs.val = {};
  mesh.deformOutputs.val = {};
  mesh.analyzeOutputs.val = {};
}

export function applyTowerMeshResult(mesh: Mesh, result: TowerMeshResult) {
  mesh.nodes.val = result.nodes;
  mesh.elements.val = result.elements;
  mesh.nodeInputs.val = result.nodeInputs;
  mesh.elementInputs.val = result.elementInputs;
}

export function applyTowerSolveState(mesh: Mesh, result: TowerSolveState) {
  mesh.deformOutputs.val = result.deformOutputs;
  mesh.analyzeOutputs.val = result.analyzeOutputs;
}

export function getTowerViewerSettings() {
  return {
    solids: true,
    elements: true,
    nodes: false,
    loads: false,
    deformedShape: true,
    shellResults: "displacementZ" as const,
    shellResultScales: { displacementZ: 1000 },
    shellResultUnits: { displacementZ: "mm" },
    showFrameResults: false,
  };
}

export function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? 0.5 * (sorted[mid - 1] + sorted[mid])
    : sorted[mid];
}

function buildColumnPlan(spacing: number): [number, number][] {
  const [minX, maxX, minY, maxY] = bounds(FOOTPRINT);
  const cols: [number, number][] = [];
  const tol = 1e-6;

  for (let x = minX; x <= maxX + tol; x += spacing) {
    for (let y = minY; y <= maxY + tol; y += spacing) {
      const p: [number, number] = [round3(x), round3(y)];
      if (pointInPolygon2d(p, FOOTPRINT)) cols.push(p);
    }
  }

  const unique = new Map<string, [number, number]>();
  cols.forEach((p) => unique.set(`${p[0]}_${p[1]}`, p));
  return Array.from(unique.values());
}

function bounds(poly: [number, number][]) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  poly.forEach(([x, y]) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });
  return [minX, maxX, minY, maxY] as const;
}

function pointInPolygon2d(
  point: [number, number],
  polygon: [number, number][],
): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function round3(v: number): number {
  return Math.round(v * 1000) / 1000;
}

function clampNumber(v: number, min: number, max: number): number {
  if (!Number.isFinite(v)) return min;
  return Math.max(min, Math.min(max, v));
}

function clampInt(v: number, min: number, max: number): number {
  return Math.round(clampNumber(v, min, max));
}
