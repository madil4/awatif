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
import { getOneWaySectionMetrics } from "../benchmark/oneWay";

const LENGTH = 10;
const WIDTH = 2.45;
const Q_ULS = 4.335;
const Q_SLS = 1.589;
const KDEF_SQ = 0.8;
const TAU_SECTION_X = 1.0;

const benchmark = {
  vMax: 21.67,
  mMax: 54.25,
  sigmaMax: 8.75,
  tauMax: 0.1224,
  wFin: 47.0,
};

describe("CLT one-way plate benchmark (chapter 6.2)", () => {
  test("reproduces benchmark-level response", () => {
    const { nodes, elements } = buildRectMesh(LENGTH, WIDTH, 32, 8);
    const supports = getSupports(nodes);

    const uls = runCase(nodes, elements, supports, Q_ULS, 1);
    const sls = runCase(nodes, elements, supports, Q_SLS, 1 + KDEF_SQ);

    const sigmaMax = sampleMidSpanExtremeFiberSigmaMpa(
      sampleClosestInPlaneStressMpa(
        nodes,
        elements,
        uls.inPlaneProfiles,
        [LENGTH / 2, WIDTH / 2],
        0,
        "top",
        "sigmaX",
      ),
      sampleClosestInPlaneStressMpa(
        nodes,
        elements,
        uls.inPlaneProfiles,
        [LENGTH / 2, WIDTH / 2],
        6,
        "bottom",
        "sigmaX",
      ),
    );
    const tauMax = Math.abs(
      sampleClosestTransverseStressMpa(
      nodes,
      elements,
      uls.transverseProfiles,
      // Probe one meter from support to avoid boundary singularity at x = 0.
      [TAU_SECTION_X, WIDTH / 2],
      3,
      "mid",
      "tauYZ",
      { weightX: 2, weightY: 1 },
    ) ?? 0,
    );

    expect(relErr(uls.vMax, benchmark.vMax)).toBeLessThan(0.01);
    expect(relErr(uls.mMax, benchmark.mMax)).toBeLessThan(0.02);
    expect(relErr(sigmaMax, benchmark.sigmaMax)).toBeLessThan(0.02);
    expect(relErr(tauMax, benchmark.tauMax)).toBeLessThan(0.02);
    expect(relErr(sls.centerDeflectionMm, benchmark.wFin)).toBeLessThan(0.02);
  });
});

function runCase(
  nodes: Node[],
  elements: Element[],
  supports: NodeInputs["supports"],
  q: number,
  stiffnessReduction: number,
) {
  const nodalAreas = getNodalAreas(nodes, elements);
  const loads = new Map(
    nodes.map((_, i) => [i, [0, 0, -q * nodalAreas[i], 0, 0, 0] as [number, number, number, number, number, number]]),
  );

  const layup = scaleLayup(getSevenLayerCLTLayup(), stiffnessReduction);
  const elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, layup])),
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

  const sectionMetrics = getOneWaySectionMetrics(
    nodes,
    elements,
    analyzeOutputs,
    deformOutputs.deformations,
    deformOutputs.reactions,
    { xMin: 0, xMax: LENGTH, slabWidth: WIDTH },
  );

  return {
    vMax: sectionMetrics.specificSupportShearKnPerM,
    mMax: sectionMetrics.maxSpecificBendingMomentKnmPerM,
    centerDeflectionMm: sectionMetrics.maxDownwardDeflectionMm,
    inPlaneProfiles,
    transverseProfiles,
  };
}

function buildRectMesh(L: number, W: number, nx: number, ny: number): { nodes: Node[]; elements: Element[] } {
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

function getSupports(nodes: Node[]) {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(({ node }) => Math.abs(node[0]) < 1e-8 || Math.abs(node[0] - LENGTH) < 1e-8)
      .map(({ i }) => [i, [true, true, true, false, false, false] as [boolean, boolean, boolean, boolean, boolean, boolean]]),
  );
}

function getNodalAreas(nodes: Node[], elements: Element[]): number[] {
  const areas = Array(nodes.length).fill(0);

  for (const e of elements) {
    const [n1, n2, n3] = e.map((i) => nodes[i]);
    const area = Math.abs((n2[0] - n1[0]) * (n3[1] - n1[1]) - (n3[0] - n1[0]) * (n2[1] - n1[1])) * 0.5;
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

function relErr(actual: number, expected: number): number {
  return Math.abs(actual - expected) / Math.max(1e-12, Math.abs(expected));
}

function sampleMidSpanExtremeFiberSigmaMpa(
  sigmaTopMpa?: number,
  sigmaBottomMpa?: number,
): number {
  return Math.max(Math.abs(sigmaTopMpa ?? 0), Math.abs(sigmaBottomMpa ?? 0));
}
