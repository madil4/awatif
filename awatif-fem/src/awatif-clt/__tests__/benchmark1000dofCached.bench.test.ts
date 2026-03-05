import {
  flatten,
  index,
  lup,
  lusolve,
  multiply,
  sparse,
  subset,
} from "mathjs";
import { deform } from "../../deform";
import { getGlobalStiffnessMatrix } from "../../utils/getGlobalStiffnessMatrix";
import { CLTLayup, Element, Node, NodeInputs } from "../../data-model";

const LENGTH = 10;
const WIDTH = 2.45;
const Q_ULS = 4.335;
const TARGET_MESH = { nx: 28, ny: 6 }; // 168 nodes => 1008 DOF

type CachedBenchmarkStats = {
  nodes: number;
  elements: number;
  dof: number;
  setupMs: number;
  warmup: number;
  iterations: number;
  solveOnly: {
    minMs: number;
    maxMs: number;
    meanMs: number;
    medianMs: number;
  };
  solveWithReactions: {
    minMs: number;
    maxMs: number;
    meanMs: number;
    medianMs: number;
  };
};

describe("CLT cached benchmark (~1000 DOF)", () => {
  test("reusing one factorization across load cases", () => {
    const stats = benchmarkCachedSolve({
      warmup: 5,
      iterations: 40,
    });

    expect(stats.dof).toBe(1008);
    expect(Number.isFinite(stats.solveOnly.medianMs)).toBe(true);
    expect(stats.solveOnly.medianMs).toBeGreaterThan(0);

    // eslint-disable-next-line no-console
    console.log(
      [
        `CLT cached benchmark`,
        `nodes=${stats.nodes}`,
        `elements=${stats.elements}`,
        `dof=${stats.dof}`,
        `setup=${stats.setupMs.toFixed(2)} ms`,
        `iters=${stats.iterations}`,
        `solveOnly median=${stats.solveOnly.medianMs.toFixed(2)} ms`,
        `solveOnly mean=${stats.solveOnly.meanMs.toFixed(2)} ms`,
        `solve+reactions median=${stats.solveWithReactions.medianMs.toFixed(
          2,
        )} ms`,
        `solve+reactions mean=${stats.solveWithReactions.meanMs.toFixed(
          2,
        )} ms`,
      ].join(" | "),
    );
  }, 120000);
});

function benchmarkCachedSolve({
  warmup,
  iterations,
}: {
  warmup: number;
  iterations: number;
}): CachedBenchmarkStats {
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

  const dof = nodes.length * 6;
  const freeInd = getFreeIndices(supports, dof);

  const setupStart = performance.now();
  const kGlobal = getGlobalStiffnessMatrix(nodes, elements, elementInputs, dof);
  const kFree = subset(kGlobal, index(freeInd, freeInd));
  const kFreeSparse = sparse(kFree);
  const lu = lup(kFreeSparse);
  const baseForces = getAppliedForces(loads, dof);
  const setupMs = performance.now() - setupStart;

  // correctness sanity: cached solve vs full deform for base load
  const baseline = deform(nodes, elements, { supports, loads }, elementInputs);
  const cachedBase = solveOnly(lu, freeInd, baseForces, dof);
  const center = getClosestNodeIndex(nodes, [LENGTH / 2, WIDTH / 2, 0]);
  const baselineW = baseline.deformations?.get(center)?.[2] ?? 0;
  const cachedW = cachedBase[center * 6 + 2];
  expect(Math.abs(cachedW - baselineW)).toBeLessThan(1e-8);

  for (let i = 0; i < warmup; i++) {
    const scaled = baseForces.map((v) => v * (1 + 0.02 * i));
    solveOnly(lu, freeInd, scaled, dof);
    solveWithReactions(lu, freeInd, scaled, dof, kGlobal);
  }

  const solveOnlyDurations: number[] = [];
  const solveWithReactionsDurations: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const scaled = baseForces.map((v) => v * (1 + 0.005 * i));

    let t0 = performance.now();
    solveOnly(lu, freeInd, scaled, dof);
    solveOnlyDurations.push(performance.now() - t0);

    t0 = performance.now();
    solveWithReactions(lu, freeInd, scaled, dof, kGlobal);
    solveWithReactionsDurations.push(performance.now() - t0);
  }

  return {
    nodes: nodes.length,
    elements: elements.length,
    dof,
    setupMs,
    warmup,
    iterations,
    solveOnly: summarize(solveOnlyDurations),
    solveWithReactions: summarize(solveWithReactionsDurations),
  };
}

function solveOnly(
  lu: any,
  freeInd: number[],
  fullForces: number[],
  dof: number,
): number[] {
  const forcesFree = subset(fullForces, index(freeInd));
  const deformationFree = lusolve(lu, forcesFree);
  return subset(
    Array(dof).fill(0),
    index(freeInd),
    flatten(deformationFree),
  ) as number[];
}

function solveWithReactions(
  lu: any,
  freeInd: number[],
  fullForces: number[],
  dof: number,
  kGlobal: number[][],
): { deformations: number[]; reactions: number[] } {
  const deformations = solveOnly(lu, freeInd, fullForces, dof);
  const reactions = multiply(kGlobal, deformations) as number[];
  return { deformations, reactions };
}

function summarize(values: number[]) {
  return {
    minMs: Math.min(...values),
    maxMs: Math.max(...values),
    meanMs: values.reduce((a, b) => a + b, 0) / values.length,
    medianMs: median(values),
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

function getFreeIndices(
  supports: NodeInputs["supports"],
  dof: number,
): number[] {
  const toRemove: number[] = [];
  supports?.forEach((support, nodeIndex) => {
    if (support[0]) toRemove.push(nodeIndex * 6);
    if (support[1]) toRemove.push(nodeIndex * 6 + 1);
    if (support[2]) toRemove.push(nodeIndex * 6 + 2);
    if (support[3]) toRemove.push(nodeIndex * 6 + 3);
    if (support[4]) toRemove.push(nodeIndex * 6 + 4);
    if (support[5]) toRemove.push(nodeIndex * 6 + 5);
  });

  return Array.from({ length: dof }, (_, i) => i).filter(
    (v) => !toRemove.includes(v),
  );
}

function getAppliedForces(loads: NodeInputs["loads"], dof: number): number[] {
  const forces: number[] = Array(dof).fill(0);
  loads?.forEach((force, nodeIndex) => {
    forces[nodeIndex * 6] = force[0];
    forces[nodeIndex * 6 + 1] = force[1];
    forces[nodeIndex * 6 + 2] = force[2];
    forces[nodeIndex * 6 + 3] = force[3];
    forces[nodeIndex * 6 + 4] = force[4];
    forces[nodeIndex * 6 + 5] = force[5];
  });
  return forces;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? 0.5 * (sorted[mid - 1] + sorted[mid])
    : sorted[mid];
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
