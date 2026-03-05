import van from "vanjs-core";
import {
  analyze,
  CLTLayup,
  Element,
  Mesh,
  Node,
  NodeInputs,
  createCachedDeformSolverCpp,
  getRelativeErrorPercent,
  recoverCltInPlaneStressProfiles,
} from "awatif-fem";
import { getMesh } from "awatif-mesh";
import { getViewer } from "awatif-ui";

import "./styles.css";

const { div } = van.tags;

type MembraneField = Map<number, [number, number, number]>;

const PANEL_LENGTH_M = 2.4;
const PANEL_HEIGHT_M = 0.6;
const PANEL_THICKNESS_M = 0.1;
const SECTION_A_X_M = 0.525;
const SECTION_WINDOW_M = 0.15;
const LOAD_TOTAL_REF_KN = 237;
const LOAD_PATCH_WIDTH_M = 0.1;
const LOAD_1_CENTER_X_M = 1.05;
const LOAD_2_CENTER_X_M = 1.35;
const SUPPORT_PATCH_WIDTH_M = 0.2;
const N_VERTICAL_PLANKS = 3;
const FTOR_MPA = 3.5;
const FR_MPA = 1.5;

const REF_NXY_KN_PER_M = 264.65;
const REF_TAU_TOR_MPA = 2.647;
const REF_TAU_INPLANE_MPA = 0.3292;
const REF_UTIL = 0.9758;

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const maxMeshSizeState = van.state(0.03);
const loadTotalState = van.state(LOAD_TOTAL_REF_KN);

const nodeCountState = van.state(0);
const elementCountState = van.state(0);
const dofCountState = van.state(0);
const setupMsState = van.state(0);
const solveMsState = van.state(0);

const nxyCenterState = van.state(0);
const nxyWindowAvgState = van.state(0);
const nxyWindowAbsMaxState = van.state(0);
const tauTorState = van.state(0);
const tauTorFromWindowAbsState = van.state(0);
const tauInplaneState = van.state(0);
const tauInplaneVerticalState = van.state(0);
const utilizationState = van.state(0);

const nxyCenterErrState = van.state(0);
const nxyWindowAvgErrState = van.state(0);
const nxyWindowAbsErrState = van.state(0);
const tauTorErrState = van.state(0);
const tauTorFromWindowAbsErrState = van.state(0);
const tauInplaneErrState = van.state(0);
const tauInplaneVerticalErrState = van.state(0);
const utilizationErrState = van.state(0);

let cachedSolver:
  | ReturnType<typeof createCachedDeformSolverCpp>
  | undefined;

render();
van.derive(() => {
  maxMeshSizeState.val;
  loadTotalState.val;
  recompute();
});

function recompute() {
  const model = buildModel(maxMeshSizeState.val, loadTotalState.val);
  if (!model) return;

  cachedSolver?.dispose?.();
  cachedSolver = createCachedDeformSolverCpp(
    model.nodes,
    model.elements,
    model.supports,
    model.elementInputs,
  );

  setupMsState.val = cachedSolver.setupTimeMs;
  const t0 = performance.now();
  const deformOutputs = cachedSolver.solve(model.loads, {
    includeReactions: true,
  });
  solveMsState.val = performance.now() - t0;

  const analyzeOutputs = analyze(
    model.nodes,
    model.elements,
    model.elementInputs,
    deformOutputs,
  );
  const inPlaneProfiles = recoverCltInPlaneStressProfiles(
    model.nodes,
    model.elements,
    model.elementInputs,
    deformOutputs,
    { mode: "coupled" },
  );

  mesh.nodes!.val = model.nodes;
  mesh.elements!.val = model.elements;
  mesh.nodeInputs!.val = {
    supports: model.supports,
    loads: model.loads,
  };
  mesh.elementInputs!.val = model.elementInputs;
  mesh.deformOutputs!.val = {
    deformations: deformOutputs.deformations,
    reactions: deformOutputs.reactions,
  };
  mesh.analyzeOutputs!.val = analyzeOutputs;

  nodeCountState.val = model.nodes.length;
  elementCountState.val = model.elements.length;
  dofCountState.val = model.nodes.length * 6;

  const section = evaluateSectionCheck(
    model.nodes,
    model.elements,
    analyzeOutputs,
    inPlaneProfiles,
  );

  nxyCenterState.val = section.nxyCenter;
  nxyWindowAvgState.val = section.nxyWindowAvg;
  nxyWindowAbsMaxState.val = section.nxyWindowAbsMax;
  tauTorState.val = section.tauTorMpa;
  tauTorFromWindowAbsState.val = section.tauTorFromWindowAbsMpa;
  tauInplaneState.val = section.tauInplaneMpa;
  tauInplaneVerticalState.val = section.tauInplaneVerticalMpa;
  utilizationState.val = section.utilization;

  nxyCenterErrState.val = getRelativeErrorPercent(
    section.nxyCenter,
    REF_NXY_KN_PER_M,
  );
  nxyWindowAvgErrState.val = getRelativeErrorPercent(
    section.nxyWindowAvg,
    REF_NXY_KN_PER_M,
  );
  nxyWindowAbsErrState.val = getRelativeErrorPercent(
    section.nxyWindowAbsMax,
    REF_NXY_KN_PER_M,
  );
  tauTorErrState.val = getRelativeErrorPercent(
    Math.abs(section.tauTorMpa),
    REF_TAU_TOR_MPA,
  );
  tauTorFromWindowAbsErrState.val = getRelativeErrorPercent(
    Math.abs(section.tauTorFromWindowAbsMpa),
    REF_TAU_TOR_MPA,
  );
  tauInplaneErrState.val = getRelativeErrorPercent(
    Math.abs(section.tauInplaneMpa),
    REF_TAU_INPLANE_MPA,
  );
  tauInplaneVerticalErrState.val = getRelativeErrorPercent(
    Math.abs(section.tauInplaneVerticalMpa),
    REF_TAU_INPLANE_MPA,
  );
  utilizationErrState.val = getRelativeErrorPercent(section.utilization, REF_UTIL);
}

function buildModel(maxMeshSize: number, totalLoadKn: number) {
  const { nodes: rawNodes, elements: rawElements } = getMesh({
    points: [
      [0, 0, 0],
      [PANEL_LENGTH_M, 0, 0],
      [PANEL_LENGTH_M, 0, PANEL_HEIGHT_M],
      [0, 0, PANEL_HEIGHT_M],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize,
  });

  const nodes = rawNodes as Node[];
  const elements = rawElements as Element[];
  if (!nodes.length || !elements.length) return undefined;

  const supports = getSupports(nodes);
  const loads = getPatchLoads(nodes, totalLoadKn);

  const layup = getExample64Layup();
  const elementInputs = {
    cltLayups: new Map(elements.map((_, elementIndex) => [elementIndex, layup])),
  };

  return {
    nodes,
    elements,
    supports,
    loads,
    elementInputs,
  };
}

function getSupports(nodes: Node[]): NodeInputs["supports"] {
  const supports: NodeInputs["supports"] = new Map();

  // Left pin zone: x in [0, 0.2], z = 0
  const leftSupportNodes = getBottomPatchNodeIds(
    nodes,
    0.5 * SUPPORT_PATCH_WIDTH_M,
    SUPPORT_PATCH_WIDTH_M,
  );
  leftSupportNodes.forEach((nodeIndex) => {
    supports.set(nodeIndex, [true, true, true, false, false, false]);
  });

  // Right roller zone: x in [2.2, 2.4], z = 0
  const rightSupportNodes = getBottomPatchNodeIds(
    nodes,
    PANEL_LENGTH_M - 0.5 * SUPPORT_PATCH_WIDTH_M,
    SUPPORT_PATCH_WIDTH_M,
  );
  rightSupportNodes.forEach((nodeIndex) => {
    supports.set(nodeIndex, [false, true, true, false, false, false]);
  });

  return supports;
}

function getPatchLoads(
  nodes: Node[],
  totalLoadKn: number,
): NodeInputs["loads"] {
  const loads = new Map<number, [number, number, number, number, number, number]>();

  const halfLoad = totalLoadKn * 0.5;
  const patch1 = getTopPatchNodeIds(nodes, LOAD_1_CENTER_X_M, LOAD_PATCH_WIDTH_M);
  const patch2 = getTopPatchNodeIds(nodes, LOAD_2_CENTER_X_M, LOAD_PATCH_WIDTH_M);

  addNodeSetFz(loads, patch1, -halfLoad);
  addNodeSetFz(loads, patch2, -halfLoad);

  return loads;
}

function getTopPatchNodeIds(
  nodes: Node[],
  xCenter: number,
  width: number,
): number[] {
  const half = width * 0.5;
  const xMin = xCenter - half;
  const xMax = xCenter + half;
  const tol = 1e-8;

  const topNodes = nodes
    .map((node, nodeIndex) => ({ node, nodeIndex }))
    .filter(
      ({ node }) =>
        Math.abs(node[2] - PANEL_HEIGHT_M) < tol &&
        node[0] >= xMin - tol &&
        node[0] <= xMax + tol,
    )
    .map(({ nodeIndex }) => nodeIndex);

  if (topNodes.length > 0) return topNodes;
  return [closestNode(nodes, [xCenter, 0, PANEL_HEIGHT_M])];
}

function getBottomPatchNodeIds(
  nodes: Node[],
  xCenter: number,
  width: number,
): number[] {
  const half = width * 0.5;
  const xMin = xCenter - half;
  const xMax = xCenter + half;
  const tol = 1e-8;

  const bottomNodes = nodes
    .map((node, nodeIndex) => ({ node, nodeIndex }))
    .filter(
      ({ node }) =>
        Math.abs(node[2]) < tol &&
        node[0] >= xMin - tol &&
        node[0] <= xMax + tol,
    )
    .map(({ nodeIndex }) => nodeIndex);

  if (bottomNodes.length > 0) return bottomNodes;
  return [closestNode(nodes, [xCenter, 0, 0])];
}

function addNodeSetFz(
  loads: NodeInputs["loads"],
  nodeIds: number[],
  fzTotalKn: number,
) {
  if (!nodeIds.length) return;
  const perNode = fzTotalKn / nodeIds.length;

  nodeIds.forEach((nodeIndex) => {
    const prev = loads.get(nodeIndex) ?? [0, 0, 0, 0, 0, 0];
    loads.set(nodeIndex, [
      prev[0],
      prev[1],
      prev[2] + perNode,
      prev[3],
      prev[4],
      prev[5],
    ]);
  });
}

function evaluateSectionCheck(
  nodes: Node[],
  elements: Element[],
  analyzeOutputs: ReturnType<typeof analyze>,
  inPlaneProfiles: Map<number, any>,
) {
  const membraneXY = analyzeOutputs.membraneXY ?? new Map();
  const membraneYY = analyzeOutputs.membraneYY ?? new Map();

  const xMid = SECTION_A_X_M;
  const zMid = PANEL_HEIGHT_M * 0.5;
  const half = SECTION_WINDOW_M * 0.5;

  const nxyCenter = sampleMembraneAverageAt(
    nodes,
    elements,
    membraneXY,
    [xMid, zMid],
  );
  const nxyWindow = sampleMembraneStatsInWindow(
    nodes,
    elements,
    membraneXY,
    [xMid, zMid],
    SECTION_WINDOW_M,
  );

  const nyTL = sampleMembraneAverageAt(
    nodes,
    elements,
    membraneYY,
    [xMid - half, zMid + half],
  );
  const nyTR = sampleMembraneAverageAt(
    nodes,
    elements,
    membraneYY,
    [xMid + half, zMid + half],
  );
  const nyBL = sampleMembraneAverageAt(
    nodes,
    elements,
    membraneYY,
    [xMid - half, zMid - half],
  );
  const nyBR = sampleMembraneAverageAt(
    nodes,
    elements,
    membraneYY,
    [xMid + half, zMid - half],
  );

  // 6.4 in-plane rolling shear term is based on middle vertical plank force
  // (layer 2, perpendicular-to-grain normal force), evaluated left-right in A-A.
  const nPerpTL = sampleMiddleLayerPerpForceAt(nodes, elements, inPlaneProfiles, [
    xMid - half,
    zMid + half,
  ]);
  const nPerpTR = sampleMiddleLayerPerpForceAt(nodes, elements, inPlaneProfiles, [
    xMid + half,
    zMid + half,
  ]);
  const nPerpBL = sampleMiddleLayerPerpForceAt(nodes, elements, inPlaneProfiles, [
    xMid - half,
    zMid - half,
  ]);
  const nPerpBR = sampleMiddleLayerPerpForceAt(nodes, elements, inPlaneProfiles, [
    xMid + half,
    zMid - half,
  ]);
  const nPerpLeftAvg = 0.5 * (nPerpTL + nPerpBL);
  const nPerpRightAvg = 0.5 * (nPerpTR + nPerpBR);
  const dNPerpDxKnPerM2 = (nPerpLeftAvg - nPerpRightAvg) / SECTION_WINDOW_M;
  const tauInplaneMpa = dNPerpDxKnPerM2 / (N_VERTICAL_PLANKS - 1) / 1000;

  // Keep vertical gradient as diagnostic (previous implementation path).
  const nyTopAvg = 0.5 * (nyTL + nyTR);
  const nyBottomAvg = 0.5 * (nyBL + nyBR);
  const dNyDyKnPerM2 = (nyBottomAvg - nyTopAvg) / SECTION_WINDOW_M;
  const tauInplaneVerticalMpa = dNyDyKnPerM2 / (N_VERTICAL_PLANKS - 1) / 1000;

  const tauTorMpa =
    (3 * nxyCenter) / (SECTION_WINDOW_M * (N_VERTICAL_PLANKS - 1)) / 1000;
  const tauTorFromWindowAbsMpa =
    (3 * nxyWindow.absMax) / (SECTION_WINDOW_M * (N_VERTICAL_PLANKS - 1)) / 1000;

  const utilization =
    Math.abs(tauTorMpa) / FTOR_MPA + Math.abs(tauInplaneMpa) / FR_MPA;

  return {
    nxy: nxyCenter,
    nxyCenter,
    nxyWindowAvg: nxyWindow.avg,
    nxyWindowAbsMax: nxyWindow.absMax,
    tauTorMpa,
    tauTorFromWindowAbsMpa,
    tauInplaneMpa,
    tauInplaneVerticalMpa,
    utilization,
  };
}

function sampleMiddleLayerPerpForceAt(
  nodes: Node[],
  elements: Element[],
  inPlaneProfiles: Map<number, any>,
  target: [number, number],
): number {
  const elementIndex = findClosestElementByCentroidZX(
    nodes,
    elements,
    target,
    (idx) => inPlaneProfiles.has(idx),
  );
  if (elementIndex === undefined) return 0;
  const layers = inPlaneProfiles.get(elementIndex) as any[] | undefined;
  const middle = layers?.[1];
  if (!middle) return 0;

  const topPoint = middle.points?.find((p: any) => p.point === "top");
  if (!topPoint) return 0;

  // In layer local system, sigma2 is perpendicular-to-grain normal stress.
  // Convert stress [kN/m^2] to specific force [kN/m] by multiplying layer thickness [m].
  const sigma2 = topPoint.stressLayer?.[1] ?? 0;
  const t = middle.thickness ?? 0;
  return sigma2 * t;
}

function sampleMembraneAverageAt(
  nodes: Node[],
  elements: Element[],
  field: MembraneField,
  target: [number, number],
): number {
  const elementIndex = findClosestElementByCentroidZX(
    nodes,
    elements,
    target,
    (idx) => field.has(idx),
  );

  if (elementIndex === undefined) return 0;
  const value = field.get(elementIndex);
  if (!value) return 0;

  return (value[0] + value[1] + value[2]) / 3;
}

function findClosestElementByCentroidZX(
  nodes: Node[],
  elements: Element[],
  target: [number, number],
  includeElement?: (elementIndex: number) => boolean,
): number | undefined {
  let closestElement: number | undefined;
  let minDistance = Number.POSITIVE_INFINITY;

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;
    if (includeElement && !includeElement(elementIndex)) return;

    const n1 = nodes[element[0]];
    const n2 = nodes[element[1]];
    const n3 = nodes[element[2]];
    const cx = (n1[0] + n2[0] + n3[0]) / 3;
    const cz = (n1[2] + n2[2] + n3[2]) / 3;
    const distance = Math.hypot(cx - target[0], cz - target[1]);

    if (distance < minDistance) {
      minDistance = distance;
      closestElement = elementIndex;
    }
  });

  return closestElement;
}

function sampleMembraneStatsInWindow(
  nodes: Node[],
  elements: Element[],
  field: MembraneField,
  center: [number, number],
  size: number,
): { avg: number; absMax: number; min: number; max: number; count: number } {
  const half = size * 0.5;
  const values: number[] = [];

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;
    const fieldValue = field.get(elementIndex);
    if (!fieldValue) return;

    const n1 = nodes[element[0]];
    const n2 = nodes[element[1]];
    const n3 = nodes[element[2]];
    const cx = (n1[0] + n2[0] + n3[0]) / 3;
    const cz = (n1[2] + n2[2] + n3[2]) / 3;

    if (Math.abs(cx - center[0]) > half || Math.abs(cz - center[1]) > half) return;

    values.push((fieldValue[0] + fieldValue[1] + fieldValue[2]) / 3);
  });

  if (!values.length) {
    return { avg: 0, absMax: 0, min: 0, max: 0, count: 0 };
  }

  const sum = values.reduce((a, b) => a + b, 0);
  return {
    avg: sum / values.length,
    absMax: Math.max(...values.map((v) => Math.abs(v))),
    min: Math.min(...values),
    max: Math.max(...values),
    count: values.length,
  };
}

function closestNode(nodes: Node[], target: Node): number {
  let bestIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  nodes.forEach((node, nodeIndex) => {
    const distance = Math.hypot(
      node[0] - target[0],
      node[1] - target[1],
      node[2] - target[2],
    );

    if (distance < minDistance) {
      minDistance = distance;
      bestIndex = nodeIndex;
    }
  });

  return bestIndex;
}

function getExample64Layup(): CLTLayup {
  const mmToM = 1e-3;
  const nPerMm2TokNPerM2 = 1e3;

  return {
    layers: [
      {
        thickness: 40 * mmToM,
        thetaDeg: 0,
        Ex: 12000 * nPerMm2TokNPerM2,
        Ey: 400 * nPerMm2TokNPerM2,
        nuXY: 0.5,
        Gxy: 750 * nPerMm2TokNPerM2,
        Gxz: 750 * nPerMm2TokNPerM2,
        Gyz: 75 * nPerMm2TokNPerM2,
      },
      {
        thickness: 20 * mmToM,
        thetaDeg: 90,
        Ex: 12000 * nPerMm2TokNPerM2,
        Ey: 400 * nPerMm2TokNPerM2,
        nuXY: 0.5,
        Gxy: 750 * nPerMm2TokNPerM2,
        Gxz: 750 * nPerMm2TokNPerM2,
        Gyz: 75 * nPerMm2TokNPerM2,
      },
      {
        thickness: 40 * mmToM,
        thetaDeg: 0,
        Ex: 12000 * nPerMm2TokNPerM2,
        Ey: 400 * nPerMm2TokNPerM2,
        nuXY: 0.5,
        Gxy: 750 * nPerMm2TokNPerM2,
        Gxz: 750 * nPerMm2TokNPerM2,
        Gyz: 75 * nPerMm2TokNPerM2,
      },
    ],
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: true,
      strictSymmetryForElement: true,
    },
  };
}

function render() {
  const root = div({ id: "page" });
  root.append(
    div(
      { id: "viewer-wrap" },
      getViewer({
        mesh,
        settingsObj: {
          deformedShape: true,
          shellResults: "displacementZ",
          shellResultScales: {
            displacementZ: 1000,
          },
          shellResultUnits: {
            displacementZ: "mm",
          },
          showFrameResults: false,
          nodes: false,
          nodesIndexes: false,
          elementsIndexes: false,
          loads: true,
          supports: true,
          displayScale: -2,
          customNumbers: [
            {
              folder: "Example 6.4",
              label: "F total [kN]",
              state: loadTotalState,
              min: 50,
              max: 400,
              step: 1,
            },
            {
              folder: "Example 6.4",
              label: "Max mesh size [m]",
              state: maxMeshSizeState,
              min: 0.02,
              max: 0.12,
              step: 0.005,
            },
          ],
        },
      }),
    ),
    div(
      { id: "check-stats" },
      div({ class: "title" }, "CLT 6.4 In-plane Shear Check"),
      div("Solver path: C++ cached (WASM)"),
      div(() => `Nodes: ${nodeCountState.val}`),
      div(() => `Elements: ${elementCountState.val}`),
      div(() => `DOF: ${dofCountState.val}`),
      div(() => `Setup (factorize): ${setupMsState.val.toFixed(2)} ms`),
      div(() => `Solve: ${solveMsState.val.toFixed(2)} ms`),
      div({ class: "spacer" }),
      div(() => `n_xy @ A-A center [kN/m]: ${nxyCenterState.val.toFixed(2)} (ref ${REF_NXY_KN_PER_M.toFixed(2)})`),
      div(() => `n_xy in 150x150 avg [kN/m]: ${nxyWindowAvgState.val.toFixed(2)}`),
      div(() => `n_xy in 150x150 |max| [kN/m]: ${nxyWindowAbsMaxState.val.toFixed(2)}`),
      div(() => `tau_tor,d [MPa]: ${tauTorState.val.toFixed(4)} (ref ${REF_TAU_TOR_MPA.toFixed(4)})`),
      div(() => `tau_tor,d from |n_xy|max [MPa]: ${tauTorFromWindowAbsState.val.toFixed(4)}`),
      div(() => `tau_yz,d,inplane (left-right) [MPa]: ${tauInplaneState.val.toFixed(4)} (ref ${REF_TAU_INPLANE_MPA.toFixed(4)})`),
      div(() => `tau_yz,d,inplane (top-bottom) [MPa]: ${tauInplaneVerticalState.val.toFixed(4)}`),
      div(() => `Utilization [-]: ${utilizationState.val.toFixed(4)} (ref ${REF_UTIL.toFixed(4)})`),
      div({ class: "spacer" }),
      div(() => `Err n_xy center [%]: ${nxyCenterErrState.val.toFixed(2)}`),
      div(() => `Err n_xy window avg [%]: ${nxyWindowAvgErrState.val.toFixed(2)}`),
      div(() => `Err n_xy window |max| [%]: ${nxyWindowAbsErrState.val.toFixed(2)}`),
      div(() => `Err tau_tor [%]: ${tauTorErrState.val.toFixed(2)}`),
      div(() => `Err tau_tor(|n_xy|max) [%]: ${tauTorFromWindowAbsErrState.val.toFixed(2)}`),
      div(() => `Err tau_inplane(left-right) [%]: ${tauInplaneErrState.val.toFixed(2)}`),
      div(() => `Err tau_inplane(top-bottom) [%]: ${tauInplaneVerticalErrState.val.toFixed(2)}`),
      div(() => `Err utilization [%]: ${utilizationErrState.val.toFixed(2)}`),
      div({ class: "foot" }, "Reference: FEM-Design Theory of Laminated Composite Shells, Example 6.4"),
    ),
  );

  document.body.replaceChildren(root);
}
