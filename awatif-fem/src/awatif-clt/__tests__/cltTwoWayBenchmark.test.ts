import { analyze } from "../../analyze";
import { deform } from "../../deform";
import { CLTLayup, Element, Node, NodeInputs } from "../../data-model";
import {
  recoverCltInPlaneStressProfiles,
  recoverCltTransverseShearProfiles,
} from "../stress/recover";
import {
  sampleClosestInPlaneStressMpa,
  sampleClosestTransverseStressMpa,
} from "../stress/probes";

const LENGTH = 7;
const WIDTH = 5;
const Q_ULS = 4.335;

const benchmark = {
  wMax: 5.785,
  sigmaXBottom: 1.302,
  sigmaYBottom: 0.09774,
  tauXZMid: 0.05865,
  tauYZMid: 0.07181,
};

describe("CLT two-way slab benchmark (chapter 6.3)", () => {
  test("reproduces reference stress/deflection response at benchmark probes", () => {
    const { nodes, elements } = buildRectMesh(LENGTH, WIDTH, 14, 10);
    const supports = getAllEdgeSupports(nodes);

    const result = runCase(nodes, elements, supports, Q_ULS);
    const center: [number, number] = [LENGTH / 2, WIDTH / 2];

    const sigmaXBottom =
      sampleClosestInPlaneStressMpa(
        nodes,
        elements,
        result.inPlaneProfiles,
        center,
        6,
        "bottom",
        "sigmaX",
      ) ?? 0;

    const sigmaYBottom =
      sampleClosestInPlaneStressMpa(
        nodes,
        elements,
        result.inPlaneProfiles,
        center,
        6,
        "bottom",
        "sigmaY",
      ) ?? 0;

    const tauXZMid =
      sampleClosestTransverseStressMpa(
        nodes,
        elements,
        result.transverseProfiles,
        center,
        3,
        "mid",
        "tauXZ",
      ) ?? 0;

    const tauYZMid =
      sampleClosestTransverseStressMpa(
        nodes,
        elements,
        result.transverseProfiles,
        center,
        3,
        "mid",
        "tauYZ",
      ) ?? 0;

    expect(relErr(result.maxDeflectionMm, benchmark.wMax)).toBeLessThan(0.06);
    expect(relErr(Math.abs(sigmaXBottom), benchmark.sigmaXBottom)).toBeLessThan(0.08);
    expect(relErr(Math.abs(sigmaYBottom), benchmark.sigmaYBottom)).toBeLessThan(0.1);
    expect(relErr(Math.abs(tauXZMid), benchmark.tauXZMid)).toBeLessThan(0.15);
    expect(relErr(Math.abs(tauYZMid), benchmark.tauYZMid)).toBeLessThan(0.12);
  });
});

function runCase(
  nodes: Node[],
  elements: Element[],
  supports: NodeInputs["supports"],
  q: number,
) {
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
    cltLayups: new Map(elements.map((_, i) => [i, getSevenLayerCLTLayup()])),
  };

  const deformOutputs = deform(nodes, elements, { supports, loads }, elementInputs);
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
    analyzeOutputs,
    inPlaneProfiles,
    transverseProfiles,
    maxDeflectionMm: getMaximumDownwardDeflectionMm(deformOutputs.deformations),
  };
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

function getAllEdgeSupports(nodes: Node[]) {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(
        ({ node }) =>
          Math.abs(node[0]) < 1e-8 ||
          Math.abs(node[0] - LENGTH) < 1e-8 ||
          Math.abs(node[1]) < 1e-8 ||
          Math.abs(node[1] - WIDTH) < 1e-8,
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

function relErr(actual: number, expected: number): number {
  return Math.abs(actual - expected) / Math.max(1e-12, Math.abs(expected));
}
