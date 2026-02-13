import van from "vanjs-core";
import { Mesh } from "awatif-fem";
import { getParameters, getToolbar, getViewer } from "awatif-ui";

import { Building } from "../building/data-model";
import { getBase, getBaseGeometry } from "../building/getBase";
import { getSolids, getSolidsGeometry } from "../building/getSolids";
import {
  applyTowerInputValues,
  applyTowerMeshResult,
  applyTowerSolveState,
  buildSevenLayerCLTLayup,
  buildTowerMesh,
  clearMesh,
  createTowerParameters,
  getTowerInputValues,
  getTowerViewerSettings,
  median,
  normalizeTowerInputs,
  rebuildTowerBuilding,
  solveTowerMesh,
  TowerInputValues,
  TowerMeshResult,
} from "../clt-tower/shared";

import "./styles.css";

const { div, h3, p } = van.tags;

const parameters = createTowerParameters();

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
let queuedValues: TowerInputValues | null = null;
let recomputeQueued = false;
let solveTimer: number | undefined;
let solveSeq = 0;
let activeMesh: TowerMeshResult | null = null;
let activeSolverKey: string | null = null;
let previousValues: TowerInputValues | null = null;
let lastOverLimitKey: string | null = null;
const SOLVE_DEBOUNCE_MS = 120;
const MAX_INTERACTIVE_DOF = 4500;

const cltLayup = buildSevenLayerCLTLayup();

van.derive(() => {
  const values = normalizeTowerInputs(getTowerInputValues(parameters));
  applyTowerInputValues(parameters, values);
  scheduleRecompute(values);
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
        settingsObj: getTowerViewerSettings(),
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

function scheduleRecompute(values: TowerInputValues) {
  queuedValues = values;
  if (recomputeQueued) return;
  recomputeQueued = true;

  requestAnimationFrame(() => {
    recomputeQueued = false;
    if (!queuedValues) return;
    const latest = queuedValues;
    queuedValues = null;
    recompute(latest);
  });
}

function recompute(values: TowerInputValues) {
  rebuildTowerBuilding(building, values, cltLayup);

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

  const meshResult = buildTowerMesh(building, "CLT tower benchmark mesh build failed");
  if (!meshResult) {
    activeMesh = null;
    activeSolverKey = null;
    previousValues = values;
    clearMesh(mesh);
    nodeCountState.val = 0;
    elementCountState.val = 0;
    dofState.val = 0;
    return;
  }

  activeMesh = meshResult;
  activeSolverKey = `${values.stories}|${values.grid.toFixed(3)}|${values.meshSize.toFixed(3)}`;
  applyTowerMeshResult(mesh, meshResult);

  nodeCountState.val = meshResult.nodes.length;
  elementCountState.val = meshResult.elements.length;
  dofState.val = meshResult.nodes.length * 6;
  if (dofState.val > MAX_INTERACTIVE_DOF) {
    if (lastOverLimitKey !== activeSolverKey) {
      console.warn(
        `CLT tower benchmark solve skipped: DOF ${dofState.val} exceeds safe interactive limit ${MAX_INTERACTIVE_DOF}. Increase mesh size or reduce stories/grid.`,
      );
      lastOverLimitKey = activeSolverKey;
    }
    return;
  }
  lastOverLimitKey = null;

  const isTopologyChange =
    !previousValues ||
    previousValues.stories !== values.stories ||
    previousValues.grid !== values.grid ||
    previousValues.meshSize !== values.meshSize;
  previousValues = values;

  const seq = ++solveSeq;
  if (!hasFirstSolve || isTopologyChange) {
    if (solveTimer !== undefined) {
      window.clearTimeout(solveTimer);
      solveTimer = undefined;
    }
    runSolve(seq);
    return;
  }

  scheduleSolve(seq, SOLVE_DEBOUNCE_MS);
}

function scheduleSolve(seq: number, delayMs: number) {
  if (solveTimer !== undefined) window.clearTimeout(solveTimer);
  solveTimer = window.setTimeout(() => {
    solveTimer = undefined;
    runSolve(seq);
  }, delayMs);
}

function runSolve(seq: number) {
  if (!activeMesh) return;

  const solved = solveTowerMesh(activeMesh, {
    includeAnalyze: false,
    cacheKey: activeSolverKey ?? undefined,
    useCached: false,
  });
  if (seq !== solveSeq) return;
  if (!solved) {
    mesh.deformOutputs.val = {};
    mesh.analyzeOutputs.val = {};
    return;
  }

  if (!hasFirstSolve) {
    hasFirstSolve = true;
    firstSolveMsState.val = solved.solveMs;
    freshStartWallMsState.val = performance.now() - appStartMs;
  }

  solveHistoryMs.push(solved.solveMs);
  if (solveHistoryMs.length > 50) solveHistoryMs.shift();
  historyCountState.val = solveHistoryMs.length;
  currentSolveMsState.val = solved.solveMs;
  medianSolveMsState.val = median(solveHistoryMs);

  applyTowerSolveState(mesh, solved);
}
