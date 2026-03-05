import van from "vanjs-core";
import {
  analyze,
  CLTLayup,
  Element,
  Mesh,
  Node,
  deform,
  getOneWaySectionMetrics,
  getRelativeErrorPercent,
} from "awatif-fem";
import { getMesh } from "awatif-mesh";
import { getViewer } from "awatif-ui";

import "./styles.css";

const { div } = van.tags;

type ScenarioId = "s361" | "s362";

type LayerSpec = {
  thicknessMm: number;
  thetaDeg: 0 | 90;
  exMpa: number;
  eyMpa: number;
  nuXY: number;
  gxyMpa: number;
  gxzMpa: number;
  gyzMpa: number;
};

type Scenario = {
  label: string;
  lengthM: number;
  widthM: number;
  layers: LayerSpec[];
  refs: {
    zSmm: number;
    iNetMm4: number;
    wBottomMm3: number;
    wTopMm3: number;
    q3kNDeflectionMm?: number;
  };
};

type SectionProperties = {
  hMm: number;
  zSmm: number;
  iNetMm4: number;
  wBottomMm3: number;
  wTopMm3: number;
};

const E_REF_MPA = 11000;
const PANEL_WIDTH_MM = 1000;

const SCENARIOS: Record<ScenarioId, Scenario> = {
  s361: {
    label: "3.6.1 Symmetrical 5-layer",
    lengthM: 6,
    widthM: 1,
    layers: [
      makeLayer(20, 0, 11000, 0.1, 0, 650, 650, 50),
      makeLayer(40, 90, 11000, 0.1, 0, 650, 650, 50),
      makeLayer(20, 0, 11000, 0.1, 0, 650, 650, 50),
      makeLayer(40, 90, 11000, 0.1, 0, 650, 650, 50),
      makeLayer(20, 0, 11000, 0.1, 0, 650, 650, 50),
    ],
    refs: {
      zSmm: 70.0,
      iNetMm4: 14600e4,
      wBottomMm3: 2086e3,
      wTopMm3: 2086e3,
      q3kNDeflectionMm: 33.0,
    },
  },
  s362: {
    label: "3.6.2 Non-symmetrical 5-layer",
    lengthM: 6,
    widthM: 1,
    layers: [
      makeLayer(40, 0, 11000, 0.1, 0, 650, 650, 50),
      makeLayer(30, 90, 8000, 0.1, 0, 650, 650, 50),
      makeLayer(40, 0, 8000, 0.1, 0, 650, 650, 50),
      makeLayer(30, 90, 8000, 0.1, 0, 650, 650, 50),
      makeLayer(20, 0, 11000, 0.1, 0, 650, 650, 50),
    ],
    refs: {
      zSmm: 72.1,
      iNetMm4: 24920e4,
      wBottomMm3: 3456e3,
      wTopMm3: 2835e3,
    },
  },
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const scenarioState = van.state<ScenarioId>("s361");
const qKnPerM2State = van.state(3.0);
const maxMeshSizeState = van.state(0.35);

const maxDeflectionMmState = van.state(0);
const supportShearState = van.state(0);
const maxMomentState = van.state(0);

const zSmmState = van.state(0);
const iNetMm4State = van.state(0);
const wBottomMm3State = van.state(0);
const wTopMm3State = van.state(0);

const zSErrState = van.state(0);
const iNetErrState = van.state(0);
const wBottomErrState = van.state(0);
const wTopErrState = van.state(0);
const deflectionErrState = van.state(0);

van.derive(() => {
  scenarioState.val;
  qKnPerM2State.val;
  maxMeshSizeState.val;
  recompute();
});

render();

function recompute() {
  const scenario = SCENARIOS[scenarioState.val];
  const { nodes, elements } = getMesh({
    points: [
      [0, 0, 0],
      [scenario.lengthM, 0, 0],
      [scenario.lengthM, scenario.widthM, 0],
      [0, scenario.widthM, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: maxMeshSizeState.val,
  });

  const supports = getSupports(nodes, scenario.lengthM);
  const nodalAreas = getNodalAreas(nodes, elements);
  const loads = new Map(
    nodes.map((_, i) => [
      i,
      [0, 0, -qKnPerM2State.val * nodalAreas[i], 0, 0, 0] as [
        number,
        number,
        number,
        number,
        number,
        number,
      ],
    ]),
  );

  const layup = toLayup(scenario.layers);
  const elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, layup])),
  };

  const deformOutputs = deform(nodes, elements, { supports, loads }, elementInputs);
  const analyzeOutputs = analyze(nodes, elements, elementInputs, deformOutputs);
  const oneWay = getOneWaySectionMetrics(
    nodes,
    elements,
    analyzeOutputs,
    deformOutputs.deformations,
    deformOutputs.reactions,
    {
      xMin: 0,
      xMax: scenario.lengthM,
      slabWidth: scenario.widthM,
    },
  );

  mesh.nodes!.val = nodes;
  mesh.elements!.val = elements;
  mesh.nodeInputs!.val = { supports, loads };
  mesh.elementInputs!.val = elementInputs;
  mesh.deformOutputs!.val = {
    deformations: deformOutputs.deformations,
    reactions: deformOutputs.reactions,
  };
  mesh.analyzeOutputs!.val = analyzeOutputs;

  maxDeflectionMmState.val = oneWay.maxDownwardDeflectionMm;
  supportShearState.val = oneWay.specificSupportShearKnPerM;
  maxMomentState.val = oneWay.maxSpecificBendingMomentKnmPerM;

  const section = computeLongLayerSectionProperties(
    scenario.layers,
    E_REF_MPA,
    PANEL_WIDTH_MM,
  );
  zSmmState.val = section.zSmm;
  iNetMm4State.val = section.iNetMm4;
  wBottomMm3State.val = section.wBottomMm3;
  wTopMm3State.val = section.wTopMm3;

  zSErrState.val = getRelativeErrorPercent(section.zSmm, scenario.refs.zSmm);
  iNetErrState.val = getRelativeErrorPercent(section.iNetMm4, scenario.refs.iNetMm4);
  wBottomErrState.val = getRelativeErrorPercent(
    section.wBottomMm3,
    scenario.refs.wBottomMm3,
  );
  wTopErrState.val = getRelativeErrorPercent(section.wTopMm3, scenario.refs.wTopMm3);

  deflectionErrState.val =
    scenario.refs.q3kNDeflectionMm === undefined
      ? 0
      : getRelativeErrorPercent(
          oneWay.maxDownwardDeflectionMm,
          scenario.refs.q3kNDeflectionMm,
        );
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
          shellResultScales: { displacementZ: 1000 },
          shellResultUnits: { displacementZ: "mm" },
          showFrameResults: false,
          nodes: false,
          nodesIndexes: false,
          elementsIndexes: false,
          loads: true,
          supports: true,
          displayScale: -3,
          customSelects: [
            {
              folder: "Textbook Case",
              label: "Scenario",
              state: scenarioState,
              options: {
                s361: SCENARIOS.s361.label,
                s362: SCENARIOS.s362.label,
              },
            },
          ],
          customNumbers: [
            {
              folder: "Textbook Case",
              label: "q [kN/m2]",
              state: qKnPerM2State,
              min: -20,
              max: 20,
              step: 0.01,
            },
            {
              folder: "Textbook Case",
              label: "Max mesh size [m]",
              state: maxMeshSizeState,
              min: 0.05,
              max: 1.0,
              step: 0.01,
            },
          ],
        },
      }),
    ),
    div(
      { id: "handbook-stats" },
      div({ class: "title" }, "CLT Handbook 3.6 Comparison"),
      div(() => `Scenario: ${SCENARIOS[scenarioState.val].label}`),
      div(() => `FE max deflection [mm]: ${maxDeflectionMmState.val.toFixed(3)}`),
      div(() => `FE specific shear @ support [kN/m]: ${supportShearState.val.toFixed(3)}`),
      div(() => `FE max bending moment [kNm/m]: ${maxMomentState.val.toFixed(3)}`),
      div({ class: "section" }, "Section properties (longitudinal layers, transformed):"),
      div(
        () =>
          `z_s [mm]: ${zSmmState.val.toFixed(2)} (ref ${SCENARIOS[scenarioState.val].refs.zSmm.toFixed(2)}, err ${zSErrState.val.toFixed(2)}%)`,
      ),
      div(
        () =>
          `I_x,net [mm^4]: ${iNetMm4State.val.toExponential(4)} (ref ${SCENARIOS[scenarioState.val].refs.iNetMm4.toExponential(4)}, err ${iNetErrState.val.toFixed(2)}%)`,
      ),
      div(
        () =>
          `W_bottom [mm^3]: ${wBottomMm3State.val.toExponential(4)} (ref ${SCENARIOS[scenarioState.val].refs.wBottomMm3.toExponential(4)}, err ${wBottomErrState.val.toFixed(2)}%)`,
      ),
      div(
        () =>
          `W_top [mm^3]: ${wTopMm3State.val.toExponential(4)} (ref ${SCENARIOS[scenarioState.val].refs.wTopMm3.toExponential(4)}, err ${wTopErrState.val.toFixed(2)}%)`,
      ),
      div(() =>
        SCENARIOS[scenarioState.val].refs.q3kNDeflectionMm === undefined
          ? "Deflection benchmark (q=3 kN/m2): n/a in shown table"
          : `Deflection benchmark (q=3 kN/m2): ref ${SCENARIOS[scenarioState.val].refs.q3kNDeflectionMm!.toFixed(2)} mm, err ${deflectionErrState.val.toFixed(2)}%`,
      ),
    ),
  );
  document.body.append(root);
}

function makeLayer(
  thicknessMm: number,
  thetaDeg: 0 | 90,
  exMpa: number,
  eyMpa: number,
  nuXY: number,
  gxyMpa: number,
  gxzMpa: number,
  gyzMpa: number,
): LayerSpec {
  return {
    thicknessMm,
    thetaDeg,
    exMpa,
    eyMpa,
    nuXY,
    gxyMpa,
    gxzMpa,
    gyzMpa,
  };
}

function toLayup(layers: LayerSpec[]): CLTLayup {
  return {
    layers: layers.map((layer) => ({
      thickness: layer.thicknessMm / 1000,
      thetaDeg: layer.thetaDeg,
      Ex: layer.exMpa * 1000,
      Ey: layer.eyMpa * 1000,
      nuXY: layer.nuXY,
      Gxy: layer.gxyMpa * 1000,
      Gxz: layer.gxzMpa * 1000,
      Gyz: layer.gyzMpa * 1000,
    })),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: false,
    },
  };
}

function computeLongLayerSectionProperties(
  layers: LayerSpec[],
  eRefMpa: number,
  panelWidthMm: number,
): SectionProperties {
  const hMm = layers.reduce((sum, layer) => sum + layer.thicknessMm, 0);

  let zBottom = 0;
  const longLayers = layers
    .map((layer, index) => {
      const zLayerBottom = zBottom;
      const zLayerTop = zBottom + layer.thicknessMm;
      zBottom = zLayerTop;
      return {
        index,
        layer,
        zLayerBottom,
        oMm: zLayerBottom + layer.thicknessMm * 0.5,
      };
    })
    .filter((entry) => entry.layer.thetaDeg === 0);

  const weightedAreaSum = longLayers.reduce(
    (sum, entry) =>
      sum +
      (entry.layer.exMpa / eRefMpa) * panelWidthMm * entry.layer.thicknessMm,
    0,
  );
  const firstMoment = longLayers.reduce(
    (sum, entry) =>
      sum +
      (entry.layer.exMpa / eRefMpa) *
        panelWidthMm *
        entry.layer.thicknessMm *
        entry.oMm,
    0,
  );
  const zSmm = firstMoment / Math.max(1e-12, weightedAreaSum);

  const iNetMm4 = longLayers.reduce((sum, entry) => {
    const eRatio = entry.layer.exMpa / eRefMpa;
    const t = entry.layer.thicknessMm;
    const a = entry.oMm - zSmm;
    return (
      sum +
      eRatio * ((panelWidthMm * t ** 3) / 12 + panelWidthMm * t * a ** 2)
    );
  }, 0);

  return {
    hMm,
    zSmm,
    iNetMm4,
    wBottomMm3: iNetMm4 / Math.max(1e-12, zSmm),
    wTopMm3: iNetMm4 / Math.max(1e-12, hMm - zSmm),
  };
}

function getSupports(
  nodes: Node[],
  lengthM: number,
): Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]> {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(
        ({ node }) =>
          Math.abs(node[0]) < 1e-8 || Math.abs(node[0] - lengthM) < 1e-8,
      )
      .map(({ i }) => [i, [true, true, true, false, false, false]]),
  );
}

function getNodalAreas(nodes: Node[], elements: Element[]): number[] {
  const areas = Array(nodes.length).fill(0);
  for (const e of elements) {
    if (e.length !== 3) continue;
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
