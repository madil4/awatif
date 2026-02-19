import van from "vanjs-core";
import {
  analyze,
  CLTLayup,
  CltInPlaneStressProfiles,
  CltTransverseStressProfiles,
  Element,
  InPlaneProbeComponent,
  Mesh,
  Node,
  ThroughThicknessPoint,
  TransverseProbeComponent,
  deform,
  recoverCltInPlaneStressProfiles,
  recoverCltTransverseShearProfiles,
  sampleClosestInPlaneStressMpa,
  sampleClosestInPlaneThroughThicknessMpa,
  sampleClosestTransverseStressMpa,
  sampleClosestTransverseThroughThicknessMpa,
  getThroughThicknessExtrema,
  getOneWaySectionMetrics,
} from "awatif-fem";
import { getMesh } from "awatif-mesh";
import { getViewer } from "awatif-ui";

import "./styles.css";

const { div } = van.tags;

const LENGTH = 10;
const WIDTH = 2.45;
const TAU_PROBE_X = 1.0;

type DisplayCase = "ULS" | "SLS";

type CaseResult = {
  loads: Map<number, [number, number, number, number, number, number]>;
  elementInputs: { cltLayups: Map<number, CLTLayup> };
  deformations?: Map<number, [number, number, number, number, number, number]>;
  reactions?: Map<number, [number, number, number, number, number, number]>;
  analyze: ReturnType<typeof analyze>;
  inPlaneProfiles: CltInPlaneStressProfiles;
  transverseProfiles: CltTransverseStressProfiles;
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const displayCaseState = van.state<DisplayCase>("SLS");
const displayCases: { ULS?: CaseResult; SLS?: CaseResult } = {};
let displaySupports:
  | Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>
  | undefined;
const maxMeshSizeState = van.state(0.36);
const qUlsState = van.state(4.335); // kN/m2
const qSlsState = van.state(1.589); // kN/m2
const kDefSqState = van.state(0.8);
const layerIndexState = van.state(3);
const inPlaneComponentState = van.state<InPlaneProbeComponent>("sigma1");
const inPlanePointState = van.state<ThroughThicknessPoint>("top");
const transverseComponentState = van.state<TransverseProbeComponent>("tauYZ");
const transversePointState = van.state<ThroughThicknessPoint>("mid");
const maxDeflectionMmState = van.state(0);
const inPlaneProbeMpaState = van.state(0);
const transverseProbeMpaState = van.state(0);
const inPlaneMaxAbsMpaState = van.state(0);
const transverseMaxAbsMpaState = van.state(0);
const supportShearKnPerMState = van.state(0);
const maxSpecificMomentKnmPerMState = van.state(0);

const cltLayup = buildSevenLayerCLTLayup();

van.derive(() => {
  maxMeshSizeState.val;
  qUlsState.val;
  qSlsState.val;
  kDefSqState.val;
  recomputeModel();
});
van.derive(() => {
  displayCaseState.val;
  layerIndexState.val;
  inPlaneComponentState.val;
  inPlanePointState.val;
  transverseComponentState.val;
  transversePointState.val;
  applyDisplayCase();
});
render();

function recomputeModel() {
  const { nodes, elements } = getMesh({
    points: [
      [0, 0, 0],
      [LENGTH, 0, 0],
      [LENGTH, WIDTH, 0],
      [0, WIDTH, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: maxMeshSizeState.val,
  });

  const supports = getSupportMap(nodes);

  displayCases.ULS = runCase({
    nodes,
    elements,
    supports,
    q: qUlsState.val,
    stiffnessReduction: 1,
  });

  displayCases.SLS = runCase({
    nodes,
    elements,
    supports,
    q: qSlsState.val,
    stiffnessReduction: 1 + kDefSqState.val,
  });

  displaySupports = supports;

  mesh.nodes!.val = nodes;
  mesh.elements!.val = elements;

  applyDisplayCase();
}

function applyDisplayCase() {
  const selected = displayCases[displayCaseState.val];
  if (!selected || !displaySupports) return;

  mesh.nodeInputs!.val = {
    supports: displaySupports,
    loads: selected.loads,
  };
  mesh.elementInputs!.val = selected.elementInputs;
  mesh.deformOutputs!.val = {
    deformations: selected.deformations,
    reactions: selected.reactions,
  };
  mesh.analyzeOutputs!.val = selected.analyze;
  maxDeflectionMmState.val = getMaximumDownwardDeflectionMm(
    selected.deformations,
  );

  const layerIndex = getSelectedLayerIndex();
  if (layerIndexState.val !== layerIndex) {
    layerIndexState.val = layerIndex;
  }

  const nodes = mesh.nodes!.val as Node[];
  const elements = mesh.elements!.val as Element[];
  const sectionMetrics = getOneWaySectionMetrics(
    nodes,
    elements,
    selected.analyze,
    selected.deformations,
    selected.reactions,
  );
  supportShearKnPerMState.val = sectionMetrics.specificSupportShearKnPerM;
  maxSpecificMomentKnmPerMState.val =
    sectionMetrics.maxSpecificBendingMomentKnmPerM;

  inPlaneProbeMpaState.val =
    sampleClosestInPlaneStressMpa(
      nodes,
      elements,
      selected.inPlaneProfiles,
      [LENGTH / 2, WIDTH / 2],
      layerIndex,
      inPlanePointState.val,
      inPlaneComponentState.val,
    ) ?? 0;

  const inPlaneSamplesMpa = sampleClosestInPlaneThroughThicknessMpa(
    nodes,
    elements,
    selected.inPlaneProfiles,
    [LENGTH / 2, WIDTH / 2],
    inPlaneComponentState.val,
  );
  inPlaneMaxAbsMpaState.val = inPlaneSamplesMpa?.length
    ? getThroughThicknessExtrema(inPlaneSamplesMpa).maxAbs
    : 0;

  transverseProbeMpaState.val =
    sampleClosestTransverseStressMpa(
      nodes,
      elements,
      selected.transverseProfiles,
      [TAU_PROBE_X, WIDTH / 2],
      layerIndex,
      transversePointState.val,
      transverseComponentState.val,
      { weightX: 2, weightY: 1 },
    ) ?? 0;

  const transverseSamplesMpa = sampleClosestTransverseThroughThicknessMpa(
    nodes,
    elements,
    selected.transverseProfiles,
    [TAU_PROBE_X, WIDTH / 2],
    transverseComponentState.val,
    { weightX: 2, weightY: 1 },
  );
  transverseMaxAbsMpaState.val = transverseSamplesMpa?.length
    ? getThroughThicknessExtrema(transverseSamplesMpa).maxAbs
    : 0;
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
}): CaseResult {
  const nodalAreas = getNodalAreas(nodes, elements);

  const loads = new Map(
    nodes.map((_, i) => [
      i,
      [0, 0, -q * nodalAreas[i], 0, 0, 0] as [
        number,
        number,
        number,
        number,
        number,
        number,
      ],
    ]),
  );

  const elementInputs = {
    cltLayups: new Map(
      elements.map((_, i) => [i, scaleLayup(cltLayup, stiffnessReduction)]),
    ),
  };

  const deformOutputs = deform(
    nodes,
    elements,
    { supports, loads },
    elementInputs,
  );
  const analyzeOutputs = analyze(nodes, elements, elementInputs, deformOutputs);
  const inPlaneProfiles = recoverCltInPlaneStressProfiles(
    nodes,
    elements,
    elementInputs,
    deformOutputs,
    { mode: "coupled" },
  );
  const transverseProfiles = recoverCltTransverseShearProfiles(
    nodes,
    elements,
    elementInputs,
    deformOutputs,
    { mode: "coupled" },
  );

  return {
    loads,
    elementInputs,
    deformations: deformOutputs.deformations,
    reactions: deformOutputs.reactions,
    analyze: analyzeOutputs,
    inPlaneProfiles,
    transverseProfiles,
  };
}

function buildSevenLayerCLTLayup(): CLTLayup {
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
      .filter(
        ({ node }) =>
          Math.abs(node[0]) < 1e-6 || Math.abs(node[0] - LENGTH) < 1e-6,
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

function getMaximumDownwardDeflectionMm(
  deformations?: Map<number, [number, number, number, number, number, number]>,
): number {
  if (!deformations?.size) return 0;

  let minWz = 0;
  deformations.forEach((dof) => {
    minWz = Math.min(minWz, dof[2] ?? 0);
  });

  return -minWz * 1000;
}

function getSelectedLayerIndex(): number {
  return clamp(Math.round(layerIndexState.val), 0, cltLayup.layers.length - 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
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
          displayScale: -3,
          customSelects: [
            {
              folder: "Analysis Inputs",
              label: "Load case",
              state: displayCaseState,
              options: {
                ULS: "ULS",
                SLS: "SLS",
              },
            },
            {
              folder: "Analysis Outputs",
              label: "In-plane component",
              state: inPlaneComponentState,
              options: {
                sigmaX: "sigmaX",
                sigmaY: "sigmaY",
                tauXY: "tauXY",
                sigma1: "sigma1",
                sigma2: "sigma2",
                tau12: "tau12",
              },
            },
            {
              folder: "Analysis Outputs",
              label: "In-plane point",
              state: inPlanePointState,
              options: {
                top: "top",
                mid: "mid",
                bottom: "bottom",
              },
            },
            {
              folder: "Analysis Outputs",
              label: "Transverse component",
              state: transverseComponentState,
              options: {
                tauXZ: "tauXZ",
                tauYZ: "tauYZ",
                tau13: "tau13",
                tau23: "tau23",
              },
            },
            {
              folder: "Analysis Outputs",
              label: "Transverse point",
              state: transversePointState,
              options: {
                top: "top",
                mid: "mid",
                bottom: "bottom",
              },
            },
          ],
          customNumbers: [
            {
              folder: "Analysis Model",
              label: "Max mesh size [m]",
              state: maxMeshSizeState,
              min: 0.01,
              max: 1.5,
              step: 0.01,
            },
            {
              folder: "Analysis Inputs",
              label: "q ULS [kN/m2]",
              state: qUlsState,
              min: -50,
              max: 50,
              step: 0.01,
            },
            {
              folder: "Analysis Inputs",
              label: "q SLS [kN/m2]",
              state: qSlsState,
              min: -50,
              max: 50,
              step: 0.01,
            },
            {
              folder: "Analysis Inputs",
              label: "kdef",
              state: kDefSqState,
              min: 0,
              step: 0.01,
            },
            {
              folder: "Analysis Outputs",
              label: "Layer index",
              state: layerIndexState,
              min: 0,
              max: cltLayup.layers.length - 1,
              step: 1,
            },
          ],
        },
      }),
    ),
    div(
      { id: "clt-stats" },
      div({ class: "title" }, "CLT plate"),
      div(() => `Load case: ${displayCaseState.val}`),
      div(() => `Max deflection [mm]: ${maxDeflectionMmState.val.toFixed(3)}`),
      div(
        () =>
          `Specific shear @ support [kN/m]: ${supportShearKnPerMState.val.toFixed(3)}`,
      ),
      div(
        () =>
          `Max specific bending moment [kNm/m]: ${maxSpecificMomentKnmPerMState.val.toFixed(3)}`,
      ),
      div(
        () =>
          `${inPlaneComponentState.val} @ ${inPlanePointState.val}, layer ${getSelectedLayerIndex()} [MPa]: ${inPlaneProbeMpaState.val.toFixed(3)}`,
      ),
      div(
        () =>
          `${inPlaneComponentState.val} through-thickness |max| [MPa]: ${inPlaneMaxAbsMpaState.val.toFixed(3)}`,
      ),
      div(
        () =>
          `${transverseComponentState.val} @ ${transversePointState.val}, layer ${getSelectedLayerIndex()} [MPa]: ${transverseProbeMpaState.val.toFixed(4)}`,
      ),
      div(
        () =>
          `${transverseComponentState.val} through-thickness |max| [MPa]: ${transverseMaxAbsMpaState.val.toFixed(4)}`,
      ),
    ),
  );

  document.body.append(root);
}
