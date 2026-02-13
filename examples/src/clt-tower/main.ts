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
  normalizeTowerInputs,
  rebuildTowerBuilding,
  solveTowerMesh,
  TowerInputValues,
  TowerMeshResult,
} from "./shared";

import "./styles.css";

const PREVIEW_MIN_MESH_SIZE = 1.4;
const MAX_SOLVER_DOF = 18000;
const USE_WORKER_SOLVE = false;

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

const cltLayup = buildSevenLayerCLTLayup();
let activeMesh: TowerMeshResult | null = null;
let activeSolverKey: string | null = null;
let lastWorkerCacheKey: string | null = null;
let latestSolveRequestId = 0;
let previousInputValues: TowerInputValues | null = null;
let isSliderInteraction = false;
let workerBusy = false;
let pendingSolveMessage: SolveWorkerRequest | null = null;
let lastOverLimitKey: string | null = null;

const solverWorker = USE_WORKER_SOLVE
  ? new Worker(new URL("./solverWorker.ts", import.meta.url), {
      type: "module",
    })
  : null;

type SolverTopologyPayload = {
  nodes: TowerMeshResult["nodes"];
  elements: TowerMeshResult["elements"];
  supports: TowerMeshResult["nodeInputs"]["supports"];
  elementInputs: TowerMeshResult["elementInputs"];
};

type SolveWorkerRequest =
  | { type: "reset" }
  | {
      type: "solve";
      requestId: number;
      cacheKey: string;
      loads: TowerMeshResult["nodeInputs"]["loads"];
      topology?: SolverTopologyPayload;
    };

type SolveWorkerResponse =
  | {
      type: "solved";
      requestId: number;
      deformOutputs: Mesh["deformOutputs"]["val"];
      solveMs: number;
    }
  | {
      type: "failed";
      requestId: number;
      error: string;
    };

if (solverWorker) {
  solverWorker.onmessage = (event: MessageEvent<SolveWorkerResponse>) => {
    workerBusy = false;
    const message = event.data;
    const isLatest = message.requestId === latestSolveRequestId;

    if (isLatest && message.type === "failed") {
      console.error("CLT tower worker solve failed", message.error);
      runSolveOnMainThread();
    }

    if (isLatest && message.type === "solved") {
      mesh.deformOutputs.val = message.deformOutputs;
      mesh.analyzeOutputs.val = {};
    }

    flushPendingSolve();
  };

  window.addEventListener("beforeunload", () => {
    solverWorker.terminate();
  });
}

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

const parametersElm = getParameters(parameters);

document.body.append(
  parametersElm,
  getViewer({
    objects3D,
    solids,
    mesh,
    settingsObj: getTowerViewerSettings(),
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/clt-tower/main.ts",
    author: "https://www.linkedin.com/in/musaabmahjoub/",
  }),
);

bindSliderInteraction(parametersElm);

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

  const meshResult = buildTowerMesh(building, "CLT tower mesh build failed");
  if (!meshResult) {
    activeMesh = null;
    activeSolverKey = null;
    lastWorkerCacheKey = null;
    lastOverLimitKey = null;
    pendingSolveMessage = null;
    latestSolveRequestId++;
    clearMesh(mesh);
    if (solverWorker) {
      const resetMessage: SolveWorkerRequest = { type: "reset" };
      solverWorker.postMessage(resetMessage);
    }
    return;
  }

  activeMesh = meshResult;
  activeSolverKey = `${values.stories}|${values.grid.toFixed(3)}|${values.meshSize.toFixed(3)}`;
  applyTowerMeshResult(mesh, meshResult);
  runSolve();
}

function runSolve() {
  if (!activeMesh || !activeSolverKey) return;
  const dof = activeMesh.nodes.length * 6;
  if (dof > MAX_SOLVER_DOF) {
    if (lastOverLimitKey !== activeSolverKey) {
      console.warn(
        `CLT tower solve skipped: DOF ${dof} exceeds safe limit ${MAX_SOLVER_DOF}. Increase mesh size or reduce stories.`,
      );
      lastOverLimitKey = activeSolverKey;
    }
    latestSolveRequestId++;
    pendingSolveMessage = null;
    mesh.deformOutputs.val = {};
    mesh.analyzeOutputs.val = {};
    return;
  }
  lastOverLimitKey = null;

  if (!solverWorker) {
    runSolveOnMainThread();
    return;
  }

  const requestId = ++latestSolveRequestId;
  const topologyChanged = activeSolverKey !== lastWorkerCacheKey;

  const solveMessage: SolveWorkerRequest = {
    type: "solve",
    requestId,
    cacheKey: activeSolverKey,
    loads: activeMesh.nodeInputs.loads,
    topology: topologyChanged
      ? {
          nodes: activeMesh.nodes,
          elements: activeMesh.elements,
          supports: activeMesh.nodeInputs.supports,
          elementInputs: activeMesh.elementInputs,
        }
      : undefined,
  };

  if (workerBusy) {
    pendingSolveMessage = solveMessage;
    return;
  }

  workerBusy = true;
  solverWorker.postMessage(solveMessage);
  if (solveMessage.topology) {
    lastWorkerCacheKey = solveMessage.cacheKey;
  }
}

function flushPendingSolve() {
  if (!solverWorker || workerBusy || !pendingSolveMessage) return;
  const message = pendingSolveMessage;
  pendingSolveMessage = null;

  if (message.type !== "solve") return;

  workerBusy = true;
  solverWorker.postMessage(message);
  if (message.topology) {
    lastWorkerCacheKey = message.cacheKey;
  }
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
  applyTowerSolveState(mesh, solved);
}
