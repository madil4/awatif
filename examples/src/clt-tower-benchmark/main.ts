import van from "vanjs-core";
import { CLTLayup, Mesh, analyze, deform } from "awatif-fem";
import { Parameters, getParameters, getToolbar, getViewer } from "awatif-ui";
import { Building } from "../building/data-model";
import { getBase, getBaseGeometry } from "../building/getBase";
import { getMesh } from "../building/getMesh";
import { getSolids, getSolidsGeometry } from "../building/getSolids";

import "./styles.css";

const { div, h3, p } = van.tags;

const FLOOR_HEIGHT = 3.2;
const KNM2_TO_NM2 = 1e3;

const footprint: [number, number][] = [
  [0, 0],
  [24, 0],
  [24, 10],
  [14, 10],
  [14, 18],
  [0, 18],
];

const parameters: Parameters = {
  stories: { value: van.state(12), min: 3, max: 20, step: 1, label: "stories" },
  grid: { value: van.state(2.4), min: 1.8, max: 4, step: 0.2, label: "grid (m)" },
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

const building: Building = {
  points: van.state([]),
  stories: van.state([]),
  columns: van.state([]),
  slabs: van.state([]),
  columnsByStory: van.state(new Map()),
  slabsByStory: van.state(new Map()),
  columnData: van.state(new Map()),
  slabData: van.state(new Map()),
};

const solidsMesh = getSolids();
const base = getBase();
const objects3D = van.state([base]);
const solids = van.state([solidsMesh]);

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const nodeCountState = van.state(0);
const elementCountState = van.state(0);
const dofState = van.state(0);
const currentSolveMsState = van.state(0);
const firstSolveMsState = van.state(0);
const freshStartWallMsState = van.state(0);
const medianSolveMsState = van.state(0);
const historyCountState = van.state(0);

const solveHistoryMs: number[] = [];
const appStartMs = performance.now();
let hasFirstSolve = false;

const cltLayup = buildSevenLayerCLTLayup();

van.derive(() => {
  const stories = clampInt(parameters.stories.value.val, 3, 20);
  const grid = clampNumber(parameters.grid.value.val, 1.8, 4);
  const meshSize = clampNumber(parameters.meshSize.value.val, 0.6, 3.5);
  const load = clampNumber(parameters.load.value.val, -10, 10);

  if (parameters.stories.value.val !== stories) parameters.stories.value.val = stories;
  if (parameters.grid.value.val !== grid) parameters.grid.value.val = grid;
  if (parameters.meshSize.value.val !== meshSize) parameters.meshSize.value.val = meshSize;
  if (parameters.load.value.val !== load) parameters.load.value.val = load;

  rebuildBuilding();
});

van.derive(() => {
  base.geometry = getBaseGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val,
  );
  solidsMesh.geometry = getSolidsGeometry(
    building.points.val,
    building.slabs.val,
    building.columns.val,
  );
  objects3D.val = [...objects3D.rawVal];

  let nodes: Mesh["nodes"]["val"] = [];
  let elements: Mesh["elements"]["val"] = [];
  let nodeInputs: Mesh["nodeInputs"]["val"] = {};
  let elementInputs: Mesh["elementInputs"]["val"] = {};

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
    nodes = result.nodes;
    elements = result.elements;
    nodeInputs = result.nodeInputs;
    elementInputs = result.elementInputs;
  } catch (error) {
    console.error("CLT tower benchmark mesh build failed", error);
  }

  if (!nodes.length || !elements.length) {
    mesh.nodes.val = [];
    mesh.elements.val = [];
    mesh.nodeInputs.val = {};
    mesh.elementInputs.val = {};
    mesh.deformOutputs.val = {};
    mesh.analyzeOutputs.val = {};
    nodeCountState.val = 0;
    elementCountState.val = 0;
    dofState.val = 0;
    return;
  }

  nodeCountState.val = nodes.length;
  elementCountState.val = elements.length;
  dofState.val = nodes.length * 6;

  const solveT0 = performance.now();
  const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);
  const solveMs = performance.now() - solveT0;

  if (!hasFirstSolve) {
    hasFirstSolve = true;
    firstSolveMsState.val = solveMs;
    freshStartWallMsState.val = performance.now() - appStartMs;
  }

  solveHistoryMs.push(solveMs);
  if (solveHistoryMs.length > 50) solveHistoryMs.shift();
  historyCountState.val = solveHistoryMs.length;
  currentSolveMsState.val = solveMs;
  medianSolveMsState.val = median(solveHistoryMs);

  mesh.deformOutputs.val = deformOutputs;
  mesh.analyzeOutputs.val = analyze(nodes, elements, elementInputs, deformOutputs);
  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = nodeInputs;
  mesh.elementInputs.val = elementInputs;
});

function render() {
  const root = div({ id: "page" });
  const stats = div(
    { id: "stats" },
    h3("CLT Tower Benchmark"),
    p(() => `Nodes: ${nodeCountState.val}`),
    p(() => `Elements: ${elementCountState.val}`),
    p(() => `DOF: ${dofState.val}`),
    p(() => `Fresh start wall: ${freshStartWallMsState.val.toFixed(2)} ms`),
    p(() => `First solve: ${firstSolveMsState.val.toFixed(2)} ms`),
    p(() => `Current solve: ${currentSolveMsState.val.toFixed(2)} ms`),
    p(
      () =>
        `Median solve (last ${historyCountState.val}): ${medianSolveMsState.val.toFixed(2)} ms`,
    ),
  );

  root.append(
    div(
      { id: "viewer-wrap" },
      getViewer({
        objects3D,
        solids,
        mesh,
        settingsObj: {
          solids: true,
          elements: true,
          nodes: false,
          loads: false,
          deformedShape: true,
          shellResults: "displacementZ",
          shellResultScales: { displacementZ: 1000 },
          shellResultUnits: { displacementZ: "mm" },
          showFrameResults: false,
        },
      }),
    ),
    getParameters(parameters),
    getToolbar({
      sourceCode:
        "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower-benchmark/main.ts",
      author: "https://www.linkedin.com/in/musaabmahjoub/",
    }),
    stats,
  );

  document.body.append(root);
}

render();

function rebuildBuilding() {
  const storiesCount = clampInt(parameters.stories.value.val, 3, 20);
  const gridSpacing = clampNumber(parameters.grid.value.val, 1.8, 4);
  const meshSize = clampNumber(parameters.meshSize.value.val, 0.6, 3.5);
  const loadKNm2 = clampNumber(parameters.load.value.val, -10, 10);

  const points: [number, number, number][] = [];
  const stories: number[] = [];
  const columns: number[] = [];
  const slabs: number[][] = [];
  const columnsByStory: Map<number, number[]> = new Map();
  const slabsByStory: Map<number, number[]> = new Map();
  const columnData: Building["columnData"]["val"] = new Map();
  const slabData: Building["slabData"]["val"] = new Map();

  const columnPlan = buildColumnPlan(gridSpacing);

  for (let story = 0; story < storiesCount; story++) {
    const z = FLOOR_HEIGHT * (story + 1);

    const slabStart = points.length;
    footprint.forEach(([x, y]) => points.push([x, y, z]));
    const slab = footprint.map((_, i) => slabStart + i);
    slabs.push(slab);
    const slabIndex = slabs.length - 1;

    stories.push(slabStart);
    slabsByStory.set(story, [slabIndex]);
    slabData.set(slabIndex, {
      analysisInput: {
        meshSize,
        areaLoad: -loadKNm2 * KNM2_TO_NM2,
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

function buildColumnPlan(spacing: number): [number, number][] {
  const [minX, maxX, minY, maxY] = bounds(footprint);
  const cols: [number, number][] = [];
  const tol = 1e-6;

  for (let x = minX; x <= maxX + tol; x += spacing) {
    for (let y = minY; y <= maxY + tol; y += spacing) {
      const p: [number, number] = [round3(x), round3(y)];
      if (pointInPolygon2d(p, footprint)) cols.push(p);
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

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? 0.5 * (sorted[mid - 1] + sorted[mid])
    : sorted[mid];
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

function buildSevenLayerCLTLayup(): CLTLayup {
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
