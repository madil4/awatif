import van from "vanjs-core";
import {
  CLTLayup,
  Element,
  Mesh,
  Node,
  NodeInputs,
  createCachedDeformSolver,
  deform,
} from "awatif-fem";
import { getViewer } from "awatif-ui";

import "./styles.css";

const { div, h3, p } = van.tags;

const LENGTH = 10;
const WIDTH = 2.45;
const NX = 28;
const NY = 6;

const qState = van.state(4.335); // kN/m2
const currentSolveMsState = van.state(0);
const medianSolveMsState = van.state(0);
const firstSolveMsState = van.state(0);
const freshStartWallMsState = van.state(0);
const dofState = van.state(0);
const nodeCountState = van.state(0);
const elementCountState = van.state(0);

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

let nodalAreas: number[] = [];
let supports: NodeInputs["supports"] = new Map();
let loads: NodeInputs["loads"] = new Map();
let elementInputs: Mesh["elementInputs"]["val"] = {};
let cachedSolver: ReturnType<typeof createCachedDeformSolver> | undefined;
let isInitialized = false;
let skipNextDerivedSolve = true;
let solveScheduled = false;
const solveHistoryMs: number[] = [];

const freshStartT0 = performance.now();
initModelGeometry();
const firstSolveMs = runSolve("cpp");
firstSolveMsState.val = firstSolveMs ?? 0;
freshStartWallMsState.val = performance.now() - freshStartT0;
render();
isInitialized = true;
setTimeout(() => warmCachedSolver(mesh.nodes!.val, mesh.elements!.val), 0);

van.derive(() => {
  qState.val;
  if (!isInitialized) return;
  if (skipNextDerivedSolve) {
    skipNextDerivedSolve = false;
    return;
  }
  scheduleSolve();
});

function initModelGeometry() {
  const { nodes, elements } = buildRectMesh(LENGTH, WIDTH, NX, NY);
  nodeCountState.val = nodes.length;
  elementCountState.val = elements.length;
  dofState.val = nodes.length * 6;

  supports = getSupports(nodes);
  nodalAreas = getNodalAreas(nodes, elements);
  loads = buildLoads(nodes, qState.val, nodalAreas);

  const layup = getSevenLayerCLTLayup();
  elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, layup])),
  };

  mesh.nodes!.val = nodes;
  mesh.elements!.val = elements;
  mesh.elementInputs!.val = elementInputs;
  mesh.nodeInputs!.val = {
    supports,
    loads,
  };
}

function warmCachedSolver(nodes: Node[], elements: Element[]) {
  cachedSolver?.dispose?.();
  cachedSolver = createCachedDeformSolver(nodes, elements, supports, elementInputs);

  // Reset history to benchmark interactive mode independently from first solve.
  solveHistoryMs.length = 0;
  runSolve("cached");
}

function runSolve(mode: "auto" | "cpp" | "cached" = "auto"): number | undefined {
  if (!mesh.nodes?.val?.length || !mesh.elements?.val?.length) return undefined;
  updateLoads(loads, qState.val, nodalAreas);

  const nodeInputs: NodeInputs = {
    supports,
    loads,
  };

  const t0 = performance.now();
  const useCached = mode === "cached" || (mode === "auto" && !!cachedSolver);
  const deformOutputs = useCached
    ? cachedSolver!.solve(loads, { includeReactions: false })
    : deform(mesh.nodes.val, mesh.elements.val, nodeInputs, elementInputs, {
        includeReactions: false,
      });
  const solveMs = performance.now() - t0;

  solveHistoryMs.push(solveMs);
  if (solveHistoryMs.length > 40) solveHistoryMs.shift();

  currentSolveMsState.val = solveMs;
  medianSolveMsState.val = median(solveHistoryMs);

  mesh.nodeInputs!.val = nodeInputs;
  mesh.deformOutputs!.val = deformOutputs;

  return solveMs;
}

function scheduleSolve() {
  if (solveScheduled) return;
  solveScheduled = true;
  requestAnimationFrame(() => {
    solveScheduled = false;
    runSolve("auto");
  });
}

function buildRectMesh(
  L: number,
  W: number,
  nx: number,
  ny: number,
): { nodes: Node[]; elements: Element[] } {
  const nodes: Node[] = [];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      nodes.push([(i * L) / (nx - 1), (j * W) / (ny - 1), 0]);
    }
  }

  const elements: Element[] = [];
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const bl = j * nx + i;
      const br = bl + 1;
      const tl = (j + 1) * nx + i;
      const tr = tl + 1;
      elements.push([bl, br, tl]);
      elements.push([br, tr, tl]);
    }
  }

  return { nodes, elements };
}

function getSupports(nodes: Node[]): NodeInputs["supports"] {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(
        ({ node }) =>
          Math.abs(node[0]) < 1e-8 || Math.abs(node[0] - LENGTH) < 1e-8,
      )
      .map(({ i }) => [
        i,
        [true, true, true, false, false, false] as [
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
          boolean,
        ],
      ]),
  );
}

function getNodalAreas(nodes: Node[], elements: Element[]): number[] {
  const areas = Array(nodes.length).fill(0);

  for (const e of elements) {
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const area =
      Math.abs(
        (n2[0] - n1[0]) * (n3[1] - n1[1]) - (n3[0] - n1[0]) * (n2[1] - n1[1]),
      ) * 0.5;
    const lumped = area / 3;
    areas[e[0]] += lumped;
    areas[e[1]] += lumped;
    areas[e[2]] += lumped;
  }

  return areas;
}

function buildLoads(
  nodes: Node[],
  qKnPerM2: number,
  nodalAreasM2: number[],
): NodeInputs["loads"] {
  return new Map(
    nodes.map((_, i) => [
      i,
      [0, 0, -qKnPerM2 * nodalAreasM2[i], 0, 0, 0] as [
        number,
        number,
        number,
        number,
        number,
        number,
      ],
    ]),
  );
}

function updateLoads(
  targetLoads: NodeInputs["loads"],
  qKnPerM2: number,
  nodalAreasM2: number[],
) {
  if (!targetLoads) return;
  for (let i = 0; i < nodalAreasM2.length; i++) {
    const load = targetLoads.get(i);
    if (load) {
      load[2] = -qKnPerM2 * nodalAreasM2[i];
    } else {
      targetLoads.set(i, [0, 0, -qKnPerM2 * nodalAreasM2[i], 0, 0, 0]);
    }
  }
}

function getSevenLayerCLTLayup(): CLTLayup {
  const mmToM = 1e-3;
  const nmm2TokNm2 = 1e3;
  const pattern = [30, 40, 30, 40, 30, 40, 30];
  const angles = [0, 90, 0, 90, 0, 90, 0];

  return {
    layers: pattern.map((thkMm, i) => ({
      thickness: thkMm * mmToM,
      thetaDeg: angles[i],
      Ex: 11000 * nmm2TokNm2,
      Ey: 0.1 * nmm2TokNm2,
      nuXY: 0,
      Gxy: 690 * nmm2TokNm2,
      Gxz: 690 * nmm2TokNm2,
      Gyz: 69 * nmm2TokNm2,
    })),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? 0.5 * (sorted[mid - 1] + sorted[mid])
    : sorted[mid];
}

function render() {
  const root = div({ id: "page" });

  const stats = div(
    { id: "stats" },
    h3("CLT Realtime Benchmark"),
    p("Fresh-start solver path: C++/WASM one-shot"),
    p("Interactive solver path: JS cached factorization"),
    p(() => `Nodes: ${nodeCountState.val}`),
    p(() => `Elements: ${elementCountState.val}`),
    p(() => `DOF: ${dofState.val}`),
    p(() => `Fresh start wall (model init + first solve): ${freshStartWallMsState.val.toFixed(2)} ms`),
    p(() => `First solve (assemble + factorize + solve): ${firstSolveMsState.val.toFixed(2)} ms`),
    p(() => `Current solve: ${currentSolveMsState.val.toFixed(2)} ms`),
    p(() => `Median solve (last ${solveHistoryMs.length}): ${medianSolveMsState.val.toFixed(2)} ms`),
  );

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
          displayScale: -3,
          customNumbers: [
            {
              folder: "Analysis Inputs",
              label: "q [kN/m2]",
              state: qState,
              min: -50,
              max: 50,
              step: 0.01,
            },
          ],
        },
      }),
    ),
    stats,
  );

  document.body.append(root);
}
