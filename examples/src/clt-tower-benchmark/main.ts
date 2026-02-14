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

const PREVIEW_MIN_MESH_SIZE = 1.4;
const MAX_SOLVER_DOF = 18000;

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

const cltLayup = buildSevenLayerCLTLayup();
let activeMesh: TowerMeshResult | null = null;
let activeSolverKey: string | null = null;
let previousInputValues: TowerInputValues | null = null;
let isSliderInteraction = false;
let lastOverLimitKey: string | null = null;

van.derive(() => {
  const values = normalizeTowerInputs(getTowerInputValues(parameters));
  applyTowerInputValues(parameters, values);

  const isTopologyChange =
    !previousInputValues ||
    previousInputValues.stories !== values.stories ||
    previousInputValues.grid !== values.grid ||
    previousInputValues.meshSize !== values.meshSize;

  const effectiveValues =
    isSliderInteraction && isTopologyChange
      ? ({
          ...values,
          meshSize: Math.max(values.meshSize, PREVIEW_MIN_MESH_SIZE),
        } satisfies TowerInputValues)
      : values;

  previousInputValues = values;
  recompute(effectiveValues);
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

  const parametersElm = getParameters(parameters);
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
    parametersElm,
    getToolbar({
      sourceCode:
        "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower-benchmark/main.ts",
      author: "https://www.linkedin.com/in/musaabmahjoub/",
    }),
    stats,
  );

  document.body.append(root);
  bindSliderInteraction(parametersElm);
}

render();

function bindSliderInteraction(parametersRoot: HTMLElement) {
  let pointerCaptured = false;

  parametersRoot.addEventListener("pointerdown", () => {
    pointerCaptured = true;
    isSliderInteraction = true;
  });

  window.addEventListener("pointerup", () => {
    if (!pointerCaptured) return;
    pointerCaptured = false;
    if (!isSliderInteraction) return;

    isSliderInteraction = false;
    const values = normalizeTowerInputs(getTowerInputValues(parameters));
    applyTowerInputValues(parameters, values);
    recompute(values);
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
    lastOverLimitKey = null;
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
  runSolve();
}

function runSolve() {
  if (!activeMesh || !activeSolverKey) return;
  const dof = activeMesh.nodes.length * 6;
  if (dof > MAX_SOLVER_DOF) {
    if (lastOverLimitKey !== activeSolverKey) {
      console.warn(
        `CLT tower benchmark solve skipped: DOF ${dof} exceeds safe limit ${MAX_SOLVER_DOF}. Increase mesh size or reduce stories.`,
      );
      lastOverLimitKey = activeSolverKey;
    }
    mesh.deformOutputs.val = {};
    mesh.analyzeOutputs.val = {};
    return;
  }
  lastOverLimitKey = null;
  runSolveOnMainThread();
}

function runSolveOnMainThread() {
  if (!activeMesh) return;
  const solved = solveTowerMesh(activeMesh, {
    includeAnalyze: false,
    cacheKey: activeSolverKey ?? undefined,
    useCached: false,
  });
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
