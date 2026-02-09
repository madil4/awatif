import van from "vanjs-core";
import { analyze, CLTLayup, Element, Mesh, Node } from "awatif-fem";
import { deform } from "awatif-fem/src/deform";
import { getMesh } from "awatif-mesh";
import { getToolbar, getViewer } from "awatif-ui";

import "./styles.css";

const { div, h2, p, span, button, label, input, table, thead, tbody, tr, th, td } = van.tags;

const LENGTH = 10;
const WIDTH = 2.45;
const TOTAL_THICKNESS = 0.24;
const MAX_MESH_SIZE = 0.36;

type DisplayCase = "ULS" | "SLS";

type LayerRow = {
  id: number;
  material: string;
  thicknessMm: number;
  thetaDeg: number;
  Ex: number;
  Ey: number;
  nuXY: number;
  Gxy: number;
  Gxz: number;
  Gyz: number;
  rho: number;
};

type ScenarioInputs = {
  qUls: number;
  qSls: number;
  kDefSls: number;
  shearCoupling: boolean;
  noGlueAtNarrowSide: boolean;
  strictSymmetryForElement: boolean;
};

type CaseResult = {
  loads: Map<number, [number, number, number, number, number, number]>;
  elementInputs: { cltLayups: Map<number, CLTLayup> };
  deformations?: Map<number, [number, number, number, number, number, number]>;
  reactions?: Map<number, [number, number, number, number, number, number]>;
  analyze: ReturnType<typeof analyze>;
  centerDeflectionMm: number;
  vMax: number;
  mMax: number;
};

type Summary = {
  uls: {
    vMax: number;
    mMax: number;
    sigmaMax: number;
    tauMax: number;
    centerDeflectionMm: number;
  };
  sls: {
    centerDeflectionMm: number;
  };
};

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

const panelOpen = van.state(true);
const displayCase = van.state<DisplayCase>("SLS");

const scenarioState = van.state<ScenarioInputs>({
  qUls: 4.335,
  qSls: 1.589,
  kDefSls: 0.8,
  shearCoupling: true,
  noGlueAtNarrowSide: false,
  strictSymmetryForElement: true,
});

const layersState = van.state<LayerRow[]>(defaultLayers());
const caseState = van.state<{ ULS?: CaseResult; SLS?: CaseResult }>({});
const supportsState = van.state<Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]> | undefined>(undefined);

const summaryState = van.state<Summary>({
  uls: { vMax: 0, mMax: 0, sigmaMax: 0, tauMax: 0, centerDeflectionMm: 0 },
  sls: { centerDeflectionMm: 0 },
});

let nextLayerId = 100;

initialize();
render();

function initialize() {
  recomputeModel();
}

function recomputeModel() {
  const { nodes, elements } = getMesh({
    points: [
      [0, 0, 0],
      [LENGTH, 0, 0],
      [LENGTH, WIDTH, 0],
      [0, WIDTH, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: MAX_MESH_SIZE,
  });

  const supports = getSupportMap(nodes);
  const layup = buildLayupFromRows(layersState.val, scenarioState.val);

  const uls = runCase({
    nodes,
    elements,
    supports,
    layup,
    q: scenarioState.val.qUls,
    stiffnessReduction: 1,
  });

  const sls = runCase({
    nodes,
    elements,
    supports,
    layup,
    q: scenarioState.val.qSls,
    stiffnessReduction: 1 + scenarioState.val.kDefSls,
  });

  const effectiveInertia = 0.000744;
  const staticMoment = 0.0042;

  const sigmaMax = ((uls.mMax * (TOTAL_THICKNESS / 2)) / effectiveInertia) / 1000;
  const tauMax = ((uls.vMax * staticMoment) / effectiveInertia) / 1000;

  summaryState.val = {
    uls: {
      vMax: uls.vMax,
      mMax: uls.mMax,
      sigmaMax,
      tauMax,
      centerDeflectionMm: uls.centerDeflectionMm,
    },
    sls: {
      centerDeflectionMm: sls.centerDeflectionMm,
    },
  };

  supportsState.val = supports;
  caseState.val = { ULS: uls, SLS: sls };

  mesh.nodes!.val = nodes;
  mesh.elements!.val = elements;
  applyDisplayCase(displayCase.val);
}

function applyDisplayCase(name: DisplayCase) {
  const selected = caseState.val[name];
  const supports = supportsState.val;
  if (!selected || !supports) return;

  displayCase.val = name;

  mesh.nodeInputs!.val = {
    supports,
    loads: selected.loads,
  };
  mesh.elementInputs!.val = selected.elementInputs;
  mesh.deformOutputs!.val = {
    deformations: selected.deformations,
    reactions: selected.reactions,
  };
  mesh.analyzeOutputs!.val = selected.analyze;
}

function runCase({
  nodes,
  elements,
  supports,
  layup,
  q,
  stiffnessReduction,
}: {
  nodes: Node[];
  elements: Element[];
  supports: Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>;
  layup: CLTLayup;
  q: number;
  stiffnessReduction: number;
}): CaseResult {
  const nodalAreas = getNodalAreas(nodes, elements);
  const loads = new Map(
    nodes.map((_, i) => [i, [0, 0, -q * nodalAreas[i], 0, 0, 0] as [number, number, number, number, number, number]]),
  );

  const elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, scaleLayup(layup, stiffnessReduction)])),
  };

  const deformOutputs = deform(nodes, elements, { supports, loads }, elementInputs);
  const analyzeOutputs = analyze(nodes, elements, elementInputs, deformOutputs);

  const centerIndex = getClosestNodeIndex(nodes, [LENGTH / 2, WIDTH / 2, 0]);
  const centerDeflectionMm = Math.abs(deformOutputs.deformations?.get(centerIndex)?.[2] ?? 0) * 1000;

  const momentCurve = sampleCenterlineBendingCurve(nodes, elements, analyzeOutputs.bendingXX, 16);
  const mMax = maxAbs(momentCurve);

  let reactionAtLeft = 0;
  deformOutputs.reactions?.forEach((r, i) => {
    if (Math.abs(nodes[i][0]) < 1e-8) reactionAtLeft += r[2] ?? 0;
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

function defaultLayers(): LayerRow[] {
  const pattern = [30, 40, 30, 40, 30, 40, 30];
  const angles = [0, 90, 0, 90, 0, 90, 0];

  return pattern.map((thicknessMm, i) => ({
    id: i + 1,
    material: "C24",
    thicknessMm,
    thetaDeg: angles[i],
    Ex: 11000,
    Ey: 0.1,
    nuXY: 0,
    Gxy: 690,
    Gxz: 690,
    Gyz: 69,
    rho: 420,
  }));
}

function buildLayupFromRows(rows: LayerRow[], settings: ScenarioInputs): CLTLayup {
  return {
    layers: rows.map((row) => ({
      thickness: row.thicknessMm * 1e-3,
      thetaDeg: row.thetaDeg,
      Ex: row.Ex * 1e3,
      Ey: row.Ey * 1e3,
      nuXY: row.nuXY,
      Gxy: row.Gxy * 1e3,
      Gxz: row.Gxz * 1e3,
      Gyz: row.Gyz * 1e3,
    })),
    options: {
      shearCoupling: settings.shearCoupling,
      noGlueAtNarrowSide: settings.noGlueAtNarrowSide,
      strictSymmetryForElement: settings.strictSymmetryForElement,
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

function sampleCenterlineBendingCurve(
  nodes: Node[],
  elements: Element[],
  bendingXX?: Map<number, [number, number, number]>,
  samples = 16,
): number[] {
  const dx = LENGTH / (samples - 1);
  const halfBin = dx * 0.5;

  const centroids = elements.map((e) => {
    const n1 = nodes[e[0]];
    const n2 = nodes[e[1]];
    const n3 = nodes[e[2]];
    return [(n1[0] + n2[0] + n3[0]) / 3, (n1[1] + n2[1] + n3[1]) / 3];
  });

  return Array.from({ length: samples }, (_, i) => {
    const x = (i / (samples - 1)) * LENGTH;
    const vals: number[] = [];

    elements.forEach((_, elementIndex) => {
      if (Math.abs(centroids[elementIndex][0] - x) > halfBin) return;
      const m = bendingXX?.get(elementIndex);
      if (!m) return;
      vals.push((m[0] + m[1] + m[2]) / 3);
    });

    if (!vals.length) return 0;
    return vals.reduce((sum, v) => sum + v, 0) / vals.length;
  });
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

function maxAbs(values: number[]): number {
  return values.reduce((acc, v) => Math.max(acc, Math.abs(v)), 0);
}

function numericInput(value: number, onChange: (v: number) => void, step = "0.01") {
  return input({
    type: "number",
    value,
    step,
    oninput: (event: Event) => {
      const parsed = Number((event.target as HTMLInputElement).value);
      if (!Number.isFinite(parsed)) return;
      onChange(parsed);
    },
  });
}

function updateLayer(id: number, patch: Partial<LayerRow>) {
  layersState.val = layersState.val.map((row) => (row.id === id ? { ...row, ...patch } : row));
}

function addLayer() {
  const last = layersState.val.at(-1) ?? defaultLayers()[0];
  layersState.val = [
    ...layersState.val,
    {
      ...last,
      id: nextLayerId++,
      thetaDeg: last.thetaDeg === 0 ? 90 : 0,
    },
  ];
}

function removeLayer(id: number) {
  if (layersState.val.length <= 1) return;
  layersState.val = layersState.val.filter((row) => row.id !== id);
}

function mirrorLayup() {
  const rows = layersState.val;
  if (!rows.length) return;

  const half = rows.slice(0, Math.ceil(rows.length / 2));
  const mirrored = half
    .slice(0, rows.length % 2 === 1 ? half.length - 1 : half.length)
    .reverse()
    .map((row) => ({ ...row, id: nextLayerId++ }));

  layersState.val = [...half, ...mirrored];
}

function getLayerTexture(theta: number): string {
  const normalized = ((theta % 180) + 180) % 180;
  if (Math.abs(normalized - 90) < 1e-6) {
    return "repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 2px, rgba(0,0,0,0) 2px 12px)";
  }
  if (Math.abs(normalized) < 1e-6) {
    return "repeating-linear-gradient(0deg, rgba(0,0,0,0.14) 0 2px, rgba(0,0,0,0) 2px 12px)";
  }
  return "repeating-linear-gradient(135deg, rgba(0,0,0,0.14) 0 2px, rgba(0,0,0,0) 2px 12px)";
}

function render() {
  const root = div({ id: "clt-page" });

  const viewerShell = div(
    { id: "viewer-shell" },
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
        displayScale: 10,
      },
    }),
    div(
      { id: "viewer-overlay" },
      div({ class: "badge" }, "CLT Plate Studio"),
      div(
        { class: "case-toggle" },
        button(
          {
            class: () => (displayCase.val === "ULS" ? "toggle-btn active" : "toggle-btn"),
            onclick: () => applyDisplayCase("ULS"),
          },
          "ULS",
        ),
        button(
          {
            class: () => (displayCase.val === "SLS" ? "toggle-btn active" : "toggle-btn"),
            onclick: () => applyDisplayCase("SLS"),
          },
          "SLS",
        ),
      ),
      div(
        { class: "result-chip" },
        span(() => `${displayCase.val} center w = `),
        span({ class: "mono" }, () => {
          const mm =
            displayCase.val === "SLS"
              ? summaryState.val.sls.centerDeflectionMm
              : summaryState.val.uls.centerDeflectionMm;
          return `${mm.toFixed(3)} mm`;
        }),
      ),
    ),
    button(
      {
        id: "panel-toggle",
        onclick: () => {
          panelOpen.val = !panelOpen.val;
        },
      },
      () => (panelOpen.val ? "Close CLT Menu" : "Open CLT Menu"),
    ),
  );

  const panel = div(
    {
      id: "designer-panel",
      class: () => (panelOpen.val ? "open" : ""),
    },
    div(
      { class: "panel-header" },
      h2("CLT Layup + Loads"),
      p("Edit the layered orthotropic layup and load cases, then run to refresh the full viewer."),
    ),
    div(
      { class: "section" },
      div({ class: "section-title" }, "Loads & Combinations"),
      div(
        { class: "field-grid" },
        div(label("ULS q [kN/m2]"), numericInput(scenarioState.val.qUls, (v) => (scenarioState.val = { ...scenarioState.val, qUls: v }), "0.001")),
        div(label("SLS q [kN/m2]"), numericInput(scenarioState.val.qSls, (v) => (scenarioState.val = { ...scenarioState.val, qSls: v }), "0.001")),
        div(
          label("kdef (SLS creep)"),
          numericInput(scenarioState.val.kDefSls, (v) => (scenarioState.val = { ...scenarioState.val, kDefSls: v }), "0.01"),
        ),
      ),
      div(
        { class: "checks" },
        label(
          input({
            type: "checkbox",
            checked: scenarioState.val.shearCoupling,
            onchange: (e: Event) => {
              scenarioState.val = {
                ...scenarioState.val,
                shearCoupling: (e.target as HTMLInputElement).checked,
              };
            },
          }),
          span("Use shear coupling (rho method)"),
        ),
        label(
          input({
            type: "checkbox",
            checked: scenarioState.val.noGlueAtNarrowSide,
            onchange: (e: Event) => {
              scenarioState.val = {
                ...scenarioState.val,
                noGlueAtNarrowSide: (e.target as HTMLInputElement).checked,
              };
            },
          }),
          span("No glue at narrow side (Ey = 0 in homogenization)"),
        ),
        label(
          input({
            type: "checkbox",
            checked: scenarioState.val.strictSymmetryForElement,
            onchange: (e: Event) => {
              scenarioState.val = {
                ...scenarioState.val,
                strictSymmetryForElement: (e.target as HTMLInputElement).checked,
              };
            },
          }),
          span("Require symmetric layup for shell element"),
        ),
      ),
    ),
    div(
      { class: "section" },
      div({ class: "section-title" }, "Layers (top-down order)"),
      div(
        { class: "table-wrap" },
        table(
          thead(
            tr(
              th("No"),
              th("Mat"),
              th("t [mm]"),
              th("Beta"),
              th("Ex"),
              th("Ey"),
              th("nuxy"),
              th("Gxy"),
              th("Gxz"),
              th("Gyz"),
              th("Rho"),
              th(""),
            ),
          ),
          tbody(() =>
            layersState.val.map((row, idx) =>
              tr(
                td(String(idx + 1)),
                td(input({ value: row.material, oninput: (e: Event) => updateLayer(row.id, { material: (e.target as HTMLInputElement).value }) })),
                td(numericInput(row.thicknessMm, (v) => updateLayer(row.id, { thicknessMm: v }), "0.1")),
                td(numericInput(row.thetaDeg, (v) => updateLayer(row.id, { thetaDeg: v }), "1")),
                td(numericInput(row.Ex, (v) => updateLayer(row.id, { Ex: v }), "1")),
                td(numericInput(row.Ey, (v) => updateLayer(row.id, { Ey: v }), "0.01")),
                td(numericInput(row.nuXY, (v) => updateLayer(row.id, { nuXY: v }), "0.01")),
                td(numericInput(row.Gxy, (v) => updateLayer(row.id, { Gxy: v }), "1")),
                td(numericInput(row.Gxz, (v) => updateLayer(row.id, { Gxz: v }), "1")),
                td(numericInput(row.Gyz, (v) => updateLayer(row.id, { Gyz: v }), "1")),
                td(numericInput(row.rho, (v) => updateLayer(row.id, { rho: v }), "1")),
                td(button({ class: "small danger", onclick: () => removeLayer(row.id) }, "-")),
              ),
            ),
          ),
        ),
      ),
      div(
        { class: "actions" },
        button({ class: "small", onclick: addLayer }, "+ Add Layer"),
        button({ class: "small", onclick: mirrorLayup }, "Mirror Layup"),
        button({ class: "small", onclick: () => (layersState.val = defaultLayers()) }, "Reset Example"),
        button({ class: "primary", onclick: recomputeModel }, "Run Analysis"),
      ),
    ),
    div(
      { class: "section split" },
      div(
        { class: "stack-card" },
        div({ class: "section-title" }, "Layup Figure"),
        div(
          { id: "stack-preview" },
          () => {
            const total = layersState.val.reduce((sum, row) => sum + Math.max(0.1, row.thicknessMm), 0);
            return layersState.val.map((row, idx) => {
              const h = Math.max(16, (Math.max(0.1, row.thicknessMm) / total) * 210);
              const color = idx % 2 === 0 ? "#d39b5b" : "#f2c893";
              return div(
                {
                  class: "layer-band",
                  style: `height:${h}px;background:${getLayerTexture(row.thetaDeg)}, ${color};`,
                },
                span({ class: "layer-tag" }, `${idx + 1}: ${row.thetaDeg}deg, ${row.thicknessMm}mm`),
              );
            });
          },
        ),
      ),
      div(
        { class: "summary-card" },
        div({ class: "section-title" }, "Quick Checks vs Benchmark"),
        metricLine("ULS Vmax", () => `${summaryState.val.uls.vMax.toFixed(2)} / ${benchmark.vMax} kN/m`),
        metricLine("ULS Mmax", () => `${summaryState.val.uls.mMax.toFixed(2)} / ${benchmark.mMax} kNm/m`),
        metricLine("ULS sigma", () => `${summaryState.val.uls.sigmaMax.toFixed(3)} / ${benchmark.sigmaMax} MPa`),
        metricLine("ULS tau", () => `${summaryState.val.uls.tauMax.toFixed(4)} / ${benchmark.tauMax} MPa`),
        metricLine("SLS wfin", () => `${summaryState.val.sls.centerDeflectionMm.toFixed(3)} / ${benchmark.wFin} mm`),
      ),
    ),
  );

  root.append(viewerShell, panel);

  root.append(
    getToolbar({
      sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/clt-plate/main.ts",
      author: "https://www.linkedin.com/in/mahjoubmusaab/",
    }),
  );

  document.body.append(root);
}

function metricLine(name: string, value: () => string) {
  return div(
    { class: "metric-row" },
    span({ class: "metric-name" }, name),
    span({ class: "metric-value mono" }, value),
  );
}
