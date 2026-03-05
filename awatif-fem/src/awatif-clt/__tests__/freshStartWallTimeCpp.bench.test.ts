import { CLTLayup, Element, Node, NodeInputs } from "../../data-model";
import { deformCpp } from "../../deformCpp";

const LENGTH = 10;
const WIDTH = 2.45;
const Q_ULS = 4.335;
const TARGET_MESH = { nx: 28, ny: 6 }; // 168 nodes -> 1008 DOF

type FreshStartCppStats = {
  nodes: number;
  elements: number;
  dof: number;
  solveMs: number;
  totalMs: number;
  centerDispMm: number;
};

describe("CLT fresh-start timing via C++/WASM (~1000 DOF)", () => {
  test("reports one-shot deformCpp runtime", () => {
    const stats = measureFreshStartRunCpp();

    expect(stats.dof).toBe(1008);
    expect(stats.solveMs).toBeGreaterThan(0);
    expect(stats.totalMs).toBeGreaterThan(0);

    // eslint-disable-next-line no-console
    console.log(
      [
        `CLT fresh-start C++ benchmark`,
        `nodes=${stats.nodes}`,
        `elements=${stats.elements}`,
        `dof=${stats.dof}`,
        `solve=${stats.solveMs.toFixed(2)} ms`,
        `totalInsideTest=${stats.totalMs.toFixed(2)} ms`,
        `centerDisp=${stats.centerDispMm.toFixed(3)} mm`,
      ].join(" | "),
    );
  }, 120000);
});

function measureFreshStartRunCpp(): FreshStartCppStats {
  const totalStart = performance.now();

  const { nodes, elements } = buildRectMesh(
    LENGTH,
    WIDTH,
    TARGET_MESH.nx,
    TARGET_MESH.ny,
  );
  const supports = getSupports(nodes);
  const nodalAreas = getNodalAreas(nodes, elements);
  const loads = new Map(
    nodes.map((_, i) => [
      i,
      [0, 0, -Q_ULS * nodalAreas[i], 0, 0, 0] as [
        number,
        number,
        number,
        number,
        number,
        number,
      ],
    ]),
  );
  const layup = getSevenLayerCLTLayup();
  const elementInputs = {
    cltLayups: new Map(elements.map((_, i) => [i, layup])),
  };

  const solveStart = performance.now();
  const deformOutputs = deformCpp(
    nodes,
    elements,
    {
      supports,
      loads,
    },
    elementInputs,
    {
      includeReactions: false,
    },
  );
  const solveMs = performance.now() - solveStart;

  const centerNode = getClosestNodeIndex(nodes, [LENGTH * 0.5, WIDTH * 0.5, 0]);
  const centerDispMm = (deformOutputs.deformations?.get(centerNode)?.[2] ?? 0) * 1000;
  const totalMs = performance.now() - totalStart;

  return {
    nodes: nodes.length,
    elements: elements.length,
    dof: nodes.length * 6,
    solveMs,
    totalMs,
    centerDispMm,
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

function getClosestNodeIndex(nodes: Node[], target: Node): number {
  let minDist = Number.POSITIVE_INFINITY;
  let closest = 0;
  for (let i = 0; i < nodes.length; i++) {
    const dx = nodes[i][0] - target[0];
    const dy = nodes[i][1] - target[1];
    const dz = nodes[i][2] - target[2];
    const dist2 = dx * dx + dy * dy + dz * dz;
    if (dist2 < minDist) {
      minDist = dist2;
      closest = i;
    }
  }
  return closest;
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
