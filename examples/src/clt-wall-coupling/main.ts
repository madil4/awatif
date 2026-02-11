import van from "vanjs-core";
import {
  CLTLayup,
  Element,
  Mesh,
  Node,
  NodeInputs,
  coupleTwoCLTWalls,
  deform,
} from "awatif-fem";
import { getViewer } from "awatif-ui";

import "./styles.css";

const { div, h3, p } = van.tags;

type CouplingMode = "coupled" | "uncoupled";
type DofVector6 = [number, number, number, number, number, number];

type WallPatch = {
  nodes: Node[];
  elements: Element[];
};

type WallAssembly = {
  nodes: Node[];
  elements: Element[];
  wallANodeIndices: number[];
  wallBNodeIndices: number[];
  wallAElementIndices: number[];
};

const WALL_A_LENGTH = 4;
const WALL_B_LENGTH = 3;
const WALL_HEIGHT = 3.2;
const BASE_Z = 0;
const MIN_MESH_SIZE = 0.1;
const COUPLING_TOLERANCE = 1e-4;
const MM_PER_M = 1e3;
const UY_DOF_INDEX = 1;
const DEGENERATE_EPS = 1e-12;

const meshSizeState = van.state(0.35);
const pressureState = van.state(4);
const couplingModeState = van.state<CouplingMode>("coupled");

const nodeCountState = van.state(0);
const elementCountState = van.state(0);
const wallAMaxUyState = van.state(0);
const wallBMaxUyState = van.state(0);
const transferRatioState = van.state(0);

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const layup = buildSevenLayerCLTLayup();

van.derive(() => {
  meshSizeState.val;
  pressureState.val;
  couplingModeState.val;
  recomputeModel();
});

render();

function recomputeModel() {
  const couplingMode = normalizeCouplingMode(couplingModeState.val);
  const meshSize = Math.max(MIN_MESH_SIZE, meshSizeState.val);

  const wallA = buildRectangularWall(
    [0, 0, BASE_Z],
    [WALL_A_LENGTH, 0, 0],
    [0, 0, WALL_HEIGHT],
    meshSize,
  );
  const wallB = buildRectangularWall(
    [WALL_A_LENGTH, 0, BASE_Z],
    [0, WALL_B_LENGTH, 0],
    [0, 0, WALL_HEIGHT],
    meshSize,
  );

  const assembly = assembleWalls(wallA, wallB, couplingMode);
  const supports = getBaseSupports(assembly.nodes);
  const loads = getWallPressureLoads(
    assembly.nodes,
    assembly.elements,
    assembly.wallAElementIndices,
    -pressureState.val,
  );
  const elementInputs = createElementInputs(assembly.elements);

  const deformOutputs = deform(
    assembly.nodes,
    assembly.elements,
    { supports, loads },
    elementInputs,
    { includeReactions: false },
  );

  mesh.nodes!.val = assembly.nodes;
  mesh.elements!.val = assembly.elements;
  mesh.nodeInputs!.val = { supports, loads };
  mesh.elementInputs!.val = elementInputs;
  mesh.deformOutputs!.val = deformOutputs;

  nodeCountState.val = assembly.nodes.length;
  elementCountState.val = assembly.elements.length;

  const wallAMaxUy = getMaxAbsDisplacement(
    deformOutputs.deformations,
    assembly.wallANodeIndices,
    UY_DOF_INDEX,
  );
  const wallBMaxUy = getMaxAbsDisplacement(
    deformOutputs.deformations,
    assembly.wallBNodeIndices,
    UY_DOF_INDEX,
  );

  wallAMaxUyState.val = wallAMaxUy * MM_PER_M;
  wallBMaxUyState.val = wallBMaxUy * MM_PER_M;
  transferRatioState.val =
    wallAMaxUy > DEGENERATE_EPS ? (wallBMaxUy / wallAMaxUy) * 100 : 0;
}

function buildRectangularWall(
  origin: Node,
  axisU: Node,
  axisV: Node,
  targetMeshSize: number,
): WallPatch {
  const nu = getSubdivisions(vectorLength(axisU), targetMeshSize);
  const nv = getSubdivisions(vectorLength(axisV), targetMeshSize);

  const nodes: Node[] = [];
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const u = i / (nu - 1);
      const v = j / (nv - 1);
      nodes.push([
        origin[0] + axisU[0] * u + axisV[0] * v,
        origin[1] + axisU[1] * u + axisV[1] * v,
        origin[2] + axisU[2] * u + axisV[2] * v,
      ]);
    }
  }

  const elements: Element[] = [];
  for (let j = 0; j < nv - 1; j++) {
    for (let i = 0; i < nu - 1; i++) {
      const bl = j * nu + i;
      const br = bl + 1;
      const tl = (j + 1) * nu + i;
      const tr = tl + 1;
      elements.push([bl, br, tl]);
      elements.push([br, tr, tl]);
    }
  }

  return { nodes, elements };
}

function assembleWalls(
  wallA: WallPatch,
  wallB: WallPatch,
  couplingMode: CouplingMode,
): WallAssembly {
  if (couplingMode === "coupled") {
    const coupled = coupleTwoCLTWalls(wallA, wallB, COUPLING_TOLERANCE);
    return {
      nodes: coupled.nodes,
      elements: coupled.elements,
      wallANodeIndices: coupled.wallANodeMap,
      wallBNodeIndices: coupled.wallBNodeMap,
      wallAElementIndices: coupled.wallAElementMap,
    };
  }

  const wallBNodeOffset = wallA.nodes.length;
  return {
    nodes: [...wallA.nodes, ...wallB.nodes],
    elements: [
      ...wallA.elements,
      ...wallB.elements.map((e) => [
        e[0] + wallBNodeOffset,
        e[1] + wallBNodeOffset,
        e[2] + wallBNodeOffset,
      ]),
    ],
    wallANodeIndices: wallA.nodes.map((_, i) => i),
    wallBNodeIndices: wallB.nodes.map((_, i) => i + wallBNodeOffset),
    wallAElementIndices: wallA.elements.map((_, i) => i),
  };
}

function createElementInputs(elements: Element[]) {
  return {
    cltLayups: new Map(elements.map((_, i) => [i, layup])),
  };
}

function getSubdivisions(length: number, targetMeshSize: number): number {
  return Math.max(2, Math.ceil(length / Math.max(targetMeshSize, 0.05)) + 1);
}

function vectorLength(v: Node): number {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function getBaseSupports(
  nodes: Node[],
): Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]> {
  return new Map(
    nodes
      .map((node, index) => ({ node, index }))
      .filter(({ node }) => Math.abs(node[2] - BASE_Z) < 1e-8)
      .map(({ index }) => [index, [true, true, true, true, true, true]]),
  );
}

function getWallPressureLoads(
  nodes: Node[],
  elements: Element[],
  targetElementIndices: number[],
  pressureKnPerM2: number,
): NodeInputs["loads"] {
  const areasByNode = Array(nodes.length).fill(0);

  targetElementIndices.forEach((elementIndex) => {
    const element = elements[elementIndex];
    if (!element || element.length !== 3) return;

    const area = triangleArea3d(
      nodes[element[0]],
      nodes[element[1]],
      nodes[element[2]],
    );
    const lumped = area / 3;
    areasByNode[element[0]] += lumped;
    areasByNode[element[1]] += lumped;
    areasByNode[element[2]] += lumped;
  });

  const loads: NodeInputs["loads"] = new Map();
  for (let i = 0; i < areasByNode.length; i++) {
    if (areasByNode[i] <= 0) continue;
    loads.set(i, [
      0,
      pressureKnPerM2 * areasByNode[i],
      0,
      0,
      0,
      0,
    ] as DofVector6);
  }

  return loads;
}

function triangleArea3d(n1: Node, n2: Node, n3: Node): number {
  const ax = n2[0] - n1[0];
  const ay = n2[1] - n1[1];
  const az = n2[2] - n1[2];
  const bx = n3[0] - n1[0];
  const by = n3[1] - n1[1];
  const bz = n3[2] - n1[2];

  const cx = ay * bz - az * by;
  const cy = az * bx - ax * bz;
  const cz = ax * by - ay * bx;
  return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz);
}

function getMaxAbsDisplacement(
  deformations: Map<number, DofVector6> | undefined,
  nodeIndices: number[],
  dof: number,
): number {
  if (!deformations) return 0;

  let maxAbs = 0;
  nodeIndices.forEach((nodeIndex) => {
    const value = deformations.get(nodeIndex)?.[dof] ?? 0;
    maxAbs = Math.max(maxAbs, Math.abs(value));
  });
  return maxAbs;
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
      Ey: 370 * nmm2TokNm2,
      nuXY: 0.2,
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

function render() {
  const root = div({ id: "page" });
  const stats = div(
    { id: "stats" },
    h3("CLT Wall Coupling"),
    p(
      () =>
        `Mode: ${getCouplingModeLabel(normalizeCouplingMode(couplingModeState.val))}`,
    ),
    p(() => `Nodes: ${nodeCountState.val}`),
    p(() => `Elements: ${elementCountState.val}`),
    p(() => `max |Uy| wall A: ${wallAMaxUyState.val.toFixed(2)} mm`),
    p(() => `max |Uy| wall B: ${wallBMaxUyState.val.toFixed(2)} mm`),
    p(() => `transfer (B/A): ${transferRatioState.val.toFixed(1)} %`),
  );

  root.append(
    div(
      { id: "viewer-wrap" },
      getViewer({
        mesh,
        settingsObj: {
          deformedShape: true,
          shellResults: "displacementY",
          shellResultScales: {
            displacementY: 1000,
          },
          shellResultUnits: {
            displacementY: "mm",
          },
          showFrameResults: false,
          nodes: false,
          nodesIndexes: false,
          elementsIndexes: false,
          loads: true,
          supports: true,
          displayScale: -2.2,
          customSelects: [
            {
              folder: "Analysis Inputs",
              label: "Wall coupling",
              state: couplingModeState,
              options: {
                Coupled: "coupled",
                Uncoupled: "uncoupled",
              },
            },
          ],
          customNumbers: [
            {
              folder: "Analysis Model",
              label: "Max mesh size [m]",
              state: meshSizeState,
              min: 0.1,
              max: 1.2,
              step: 0.05,
            },
            {
              folder: "Analysis Inputs",
              label: "Wall pressure [kN/m2]",
              state: pressureState,
              min: -50,
              max: 50,
              step: 0.1,
            },
          ],
        },
      }),
    ),
    stats,
  );

  document.body.append(root);
}

function normalizeCouplingMode(value: string): CouplingMode {
  if (value === "coupled" || value === "Coupled") return "coupled";
  return "uncoupled";
}

function getCouplingModeLabel(mode: CouplingMode): string {
  return mode === "coupled" ? "Coupled" : "Uncoupled";
}
