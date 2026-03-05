import { deform } from "../../deform";
import { CLTLayup, Element, Node, NodeInputs } from "../../data-model";

const LENGTH = 10;
const WIDTH = 2.45;
const Q_ULS = 4.335;

// 28 x 6 = 168 nodes -> 1008 DOF (6 DOF per node).
const TARGET_MESH = { nx: 28, ny: 6 };

type BenchmarkStats = {
  nodes: number;
  elements: number;
  dof: number;
  iterations: number;
  warmup: number;
  minMs: number;
  maxMs: number;
  meanMs: number;
  medianMs: number;
};

describe("CLT benchmark (~1000 DOF)", () => {
  test("solves one-way CLT plate and reports timings", () => {
    const stats = benchmarkSolve1000Dof({
      iterations: 15,
      warmup: 3,
    });

    // Keep this test stable across machines while still validating output.
    expect(stats.dof).toBe(1008);
    expect(Number.isFinite(stats.medianMs)).toBe(true);
    expect(stats.medianMs).toBeGreaterThan(0);

    // eslint-disable-next-line no-console
    console.log(
      [
        `CLT 1000 DOF benchmark`,
        `nodes=${stats.nodes}`,
        `elements=${stats.elements}`,
        `dof=${stats.dof}`,
        `iterations=${stats.iterations}`,
        `warmup=${stats.warmup}`,
        `median=${stats.medianMs.toFixed(2)} ms`,
        `mean=${stats.meanMs.toFixed(2)} ms`,
        `min=${stats.minMs.toFixed(2)} ms`,
        `max=${stats.maxMs.toFixed(2)} ms`,
      ].join(" | "),
    );
  }, 120000);
});

function benchmarkSolve1000Dof({
  iterations,
  warmup,
}: {
  iterations: number;
  warmup: number;
}): BenchmarkStats {
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

  // Warmup
  for (let i = 0; i < warmup; i++) {
    deform(nodes, elements, { supports, loads }, elementInputs);
  }

  const durationsMs: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    deform(nodes, elements, { supports, loads }, elementInputs);
    durationsMs.push(performance.now() - t0);
  }

  return {
    nodes: nodes.length,
    elements: elements.length,
    dof: nodes.length * 6,
    iterations,
    warmup,
    minMs: Math.min(...durationsMs),
    maxMs: Math.max(...durationsMs),
    meanMs: durationsMs.reduce((a, b) => a + b, 0) / durationsMs.length,
    medianMs: median(durationsMs),
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

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? 0.5 * (sorted[mid - 1] + sorted[mid])
    : sorted[mid];
}
