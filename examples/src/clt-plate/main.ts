import van from "vanjs-core";
import { analyze, CLTLayup, Element, Mesh, Node } from "awatif-fem";
import { deform } from "awatif-fem/src/deform";
import { getMesh } from "awatif-mesh";
import { getViewer } from "awatif-ui";

import "./styles.css";

const { div } = van.tags;

const LENGTH = 10;
const WIDTH = 2.45;
const KDEF_SQ = 0.8;

const qUls = 4.335; // kN/m2
const qSls = 1.589; // kN/m2

type DisplayCase = "ULS" | "SLS";

type CaseResult = {
  loads: Map<number, [number, number, number, number, number, number]>;
  elementInputs: { cltLayups: Map<number, CLTLayup> };
  deformations?: Map<number, [number, number, number, number, number, number]>;
  reactions?: Map<number, [number, number, number, number, number, number]>;
  analyze: ReturnType<typeof analyze>;
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
let displaySupports: Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]> | undefined;

const cltLayup = buildSevenLayerCLTLayup();

initialize();
van.derive(() => {
  displayCaseState.val;
  applyDisplayCase();
});
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

  displayCases.ULS = runCase({
    nodes,
    elements,
    supports,
    q: qUls,
    stiffnessReduction: 1,
  });

  displayCases.SLS = runCase({
    nodes,
    elements,
    supports,
    q: qSls,
    stiffnessReduction: 1 + KDEF_SQ,
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
    nodes.map((_, i) => [i, [0, 0, -q * nodalAreas[i], 0, 0, 0] as [number, number, number, number, number, number]]),
  );

  const elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, scaleLayup(cltLayup, stiffnessReduction)])),
  };

  const deformOutputs = deform(nodes, elements, { supports, loads }, elementInputs);
  const analyzeOutputs = analyze(nodes, elements, elementInputs, deformOutputs);

  return {
    loads,
    elementInputs,
    deformations: deformOutputs.deformations,
    reactions: deformOutputs.reactions,
    analyze: analyzeOutputs,
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
          showFrameResults: false,
          nodes: false,
          nodesIndexes: false,
          elementsIndexes: false,
          loads: true,
          supports: true,
          displayScale: 8,
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
          ],
        },
      }),
    ),
  );

  document.body.append(root);
}
