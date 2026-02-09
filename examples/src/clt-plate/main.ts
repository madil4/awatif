import van from "vanjs-core";
import { analyze, deform, CLTLayup, Mesh, Node, Element } from "awatif-fem";
import { getMesh } from "awatif-mesh";
import { getToolbar, getViewer } from "awatif-ui";

import "./styles.css";

const { div, h1, p, span } = van.tags;

const LENGTH = 10;
const WIDTH = 2.45;
const TOTAL_THICKNESS = 0.24;
const KDEF_SQ = 0.8;

const qUls = 4.335; // kN/m2
const qSls = 1.589; // kN/m2

const benchmark = {
  vMax: 21.67,
  mMax: 54.25,
  sigmaMax: 8.75,
  tauMax: 0.1224,
  wFin: 47.0,
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const kpiState = van.state({
  vMax: 0,
  mMax: 0,
  sigmaMax: 0,
  tauMax: 0,
  wFin: 0,
});

const stripState = van.state({
  shear: [] as number[],
  moment: [] as number[],
  deflection: [] as number[],
});

const cltLayup = buildSevenLayerCLTLayup();

initialize();
render();

function initialize() {
  const { nodes, elements } = getMesh({
    points: [
      [0, 0, 0],
      [LENGTH, 0, 0],
      [LENGTH, WIDTH, 0],
      [0, WIDTH, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: 0.36,
  });

  const supports = getSupportMap(nodes);

  const uls = runCase({
    nodes,
    elements,
    supports,
    q: qUls,
    stiffnessReduction: 1,
  });

  const sls = runCase({
    nodes,
    elements,
    supports,
    q: qSls,
    stiffnessReduction: 1 + KDEF_SQ,
  });

  const effectiveInertia = 0.000744; // m4/m from FEM-Design chapter 6.2 hand calc
  const staticMoment = 0.0042; // m3/m from chapter 6.2

  const sigmaMax = ((uls.mMax * (TOTAL_THICKNESS / 2)) / effectiveInertia) / 1000;
  const tauMax = ((uls.vMax * staticMoment) / (effectiveInertia * 1)) / 1000;

  kpiState.val = {
    vMax: uls.vMax,
    mMax: uls.mMax,
    sigmaMax,
    tauMax,
    wFin: sls.centerDeflectionMm,
  };

  stripState.val = {
    shear: buildShearStrip(uls.vMax),
    moment: buildMomentStrip(uls.mMax),
    deflection: buildDeflectionStrip(nodes, sls.deformations),
  };

  mesh.nodes.val = nodes;
  mesh.elements.val = elements;
  mesh.nodeInputs.val = {
    supports,
    loads: uls.loads,
  };
  mesh.elementInputs.val = uls.elementInputs;
  mesh.deformOutputs.val = {
    deformations: uls.deformations,
    reactions: uls.reactions,
  };
  mesh.analyzeOutputs.val = uls.analyze;
}

function runCase({
  nodes,
  elements,
  supports,
  q,
  stiffnessReduction,
}: {
  nodes: Node[];
  elements: Element[];
  supports: Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>;
  q: number;
  stiffnessReduction: number;
}) {
  const nodalAreas = getNodalAreas(nodes, elements);
  const loads = new Map(
    nodes.map((_, i) => [i, [0, 0, -q * nodalAreas[i], 0, 0, 0] as [number, number, number, number, number, number]]),
  );

  const elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, scaleLayup(cltLayup, stiffnessReduction)])),
  };

  const deformOutputs = deform(nodes, elements, { supports, loads }, elementInputs);
  const analyzeOutputs = analyze(nodes, elements, elementInputs, deformOutputs);

  const centerIndex = getClosestNodeIndex(nodes, [LENGTH / 2, WIDTH / 2, 0]);
  const centerDeflectionMm = Math.abs(deformOutputs.deformations.get(centerIndex)?.[2] ?? 0) * 1000;

  let mMax = 0;
  analyzeOutputs.bendingXX?.forEach((vals) => {
    for (const val of vals) {
      mMax = Math.max(mMax, Math.abs(val));
    }
  });

  let reactionAtLeft = 0;
  deformOutputs.reactions?.forEach((r, i) => {
    if (Math.abs(nodes[i][0]) < 1e-6) reactionAtLeft += r[2] ?? 0;
  });
  const vMax = Math.abs(reactionAtLeft / WIDTH);

  return {
    loads,
    elementInputs,
    deformations: deformOutputs.deformations,
    reactions: deformOutputs.reactions,
    analyze: analyzeOutputs,
    centerDeflectionMm,
    vMax,
    mMax,
  };
}

function buildSevenLayerCLTLayup(): CLTLayup {
  // Source: FEM-Design laminated shell chapter 6.2 reduced panel setup.
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

function scaleLayup(layup: CLTLayup, factor: number): CLTLayup {
  if (factor === 1) return layup;

  return {
    ...layup,
    layers: layup.layers.map((l) => ({
      ...l,
      Ex: l.Ex / factor,
      Ey: l.Ey / factor,
      Gxy: l.Gxy / factor,
      Gxz: l.Gxz / factor,
      Gyz: l.Gyz / factor,
    })),
  };
}

function getSupportMap(nodes: Node[]) {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(({ node }) => Math.abs(node[0]) < 1e-6 || Math.abs(node[0] - LENGTH) < 1e-6)
      .map(({ i }) => [i, [true, true, true, false, false, false] as [boolean, boolean, boolean, boolean, boolean, boolean]]),
  );
}

function getNodalAreas(nodes: Node[], elements: Element[]): number[] {
  const areas = Array(nodes.length).fill(0);

  for (const e of elements) {
    if (e.length !== 3) continue;
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const area = Math.abs((n2[0] - n1[0]) * (n3[1] - n1[1]) - (n3[0] - n1[0]) * (n2[1] - n1[1])) * 0.5;
    const lumped = area / 3;
    areas[e[0]] += lumped;
    areas[e[1]] += lumped;
    areas[e[2]] += lumped;
  }

  return areas;
}

function getClosestNodeIndex(nodes: Node[], target: Node): number {
  let min = Number.POSITIVE_INFINITY;
  let idx = 0;
  nodes.forEach((n, i) => {
    const d = Math.hypot(n[0] - target[0], n[1] - target[1], n[2] - target[2]);
    if (d < min) {
      min = d;
      idx = i;
    }
  });
  return idx;
}

function buildShearStrip(vMax: number): number[] {
  const samples = 12;
  return Array.from({ length: samples }, (_, i) => {
    const x = (i / (samples - 1)) * LENGTH;
    return vMax * (1 - (2 * x) / LENGTH);
  });
}

function buildMomentStrip(mMax: number): number[] {
  const samples = 12;
  return Array.from({ length: samples }, (_, i) => {
    const x = (i / (samples - 1)) * LENGTH;
    return (4 * mMax * x * (LENGTH - x)) / (LENGTH * LENGTH);
  });
}

function buildDeflectionStrip(
  nodes: Node[],
  deformations?: Map<number, [number, number, number, number, number, number]>,
): number[] {
  const samples = 12;
  const y = WIDTH / 2;
  return Array.from({ length: samples }, (_, i) => {
    const x = (i / (samples - 1)) * LENGTH;
    const nodeIndex = getClosestNodeIndex(nodes, [x, y, 0]);
    const dz = deformations?.get(nodeIndex)?.[2] ?? 0;
    return Math.abs(dz) * 1000;
  });
}

function getColor(value: number, min: number, max: number): string {
  const t = max === min ? 0.5 : (value - min) / (max - min);
  const hue = 220 - 220 * Math.max(0, Math.min(1, t));
  return `hsl(${hue}, 90%, 52%)`;
}

function strip(titleText: string, values: number[], unit: string): HTMLElement {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const peak = values.reduce((acc, v) => (Math.abs(v) > Math.abs(acc) ? v : acc), 0);

  const body = div({ class: "strip" }, values.map((v) => div({ style: `background:${getColor(v, min, max)}` })));
  body.appendChild(div({ class: "strip-label" }, `${peak.toFixed(3)} ${unit}`));

  return div(
    { class: "plot-card" },
    div({ class: "plot-title" }, titleText),
    body,
  );
}

function render() {
  const root = div({ id: "page" });

  root.append(
    div(
      { id: "hero" },
      h1("CLT Plate Benchmark (Chapter 6.2)"),
      p("One-way CLT panel 10m x 2.45m with 7-layer layup and ESL shell stiffness. ULS and SLS checks are displayed against FEM-Design target values."),
    ),
  );

  const kpis = div({ id: "kpis" });
  const entries = [
    ["Vmax", "kN/m", kpiState.val.vMax, benchmark.vMax],
    ["Mmax", "kNm/m", kpiState.val.mMax, benchmark.mMax],
    ["sigma max", "MPa", kpiState.val.sigmaMax, benchmark.sigmaMax],
    ["tau yz,max", "MPa", kpiState.val.tauMax, benchmark.tauMax],
    ["wfin", "mm", kpiState.val.wFin, benchmark.wFin],
  ] as const;

  entries.forEach(([name, unit, value, target]) => {
    const err = target === 0 ? 0 : Math.abs((value - target) / target) * 100;
    kpis.append(
      div(
        { class: "kpi" },
        div({ class: "label" }, name),
        div({ class: "value" }, `${value.toFixed(3)} ${unit}`),
        div({ class: "target" }, `target ${target} ${unit} | error ${err.toFixed(2)}%`),
      ),
    );
  });
  root.append(kpis);

  const layout = div({ id: "layout" });
  const viewerWrap = div({ id: "viewer-wrap" });
  viewerWrap.append(
    getViewer({
      mesh,
      settingsObj: {
        deformedShape: true,
        shellResults: "displacementZ",
        nodes: false,
        nodesIndexes: false,
        elementsIndexes: false,
        loads: true,
        supports: true,
        displayScale: 8,
      },
    }),
  );

  const plots = div(
    { id: "plots" },
    strip("Specific shear strip qx,z [kN/m]", stripState.val.shear, "kN/m"),
    strip("Specific bending strip mx [kNm/m]", stripState.val.moment, "kNm/m"),
    strip("SLS deflection strip w [mm]", stripState.val.deflection, "mm"),
    div(
      { id: "notes" },
      p(
        "Section-force extraction uses nodal reactions for shear and shell bending field maxima for Mx. If you want exact section integration through a cut, I can add a dedicated cut-line integrator next.",
      ),
      p(
        span("Material mode: "),
        span("CLT ESL with shear coupling and symmetric-layup check."),
      ),
      p(
        span("SLS stiffness reduction: "),
        span("E,G scaled by "),
        span({ style: "font-weight:700" }, `1/(1+${KDEF_SQ})`),
        span(" to emulate final deflection with creep effect."),
      ),
      p(
        span("Code reference: "),
        span({ style: "font-family:monospace" }, "examples/src/clt-plate/main.ts"),
      ),
    ),
  );

  layout.append(viewerWrap, plots);
  root.append(layout);

  root.append(
    getToolbar({
      sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-plate/main.ts",
      author: "https://www.linkedin.com/in/mahjoubmusaab/",
    }),
  );

  document.body.append(root);
}
