import { createCachedDeformSolver } from "./deformCached";
import { deform } from "./deform";
import { CLTLayup, Element, Node, NodeInputs } from "./data-model";

describe("createCachedDeformSolver", () => {
  test("matches deform() for CLT shell case", () => {
    const { nodes, elements } = buildRectMesh(10, 2.45, 12, 4);
    const supports = getSupports(nodes, 10);
    const nodalAreas = getNodalAreas(nodes, elements);
    const loads = new Map(
      nodes.map((_, i) => [
        i,
        [0, 0, -4.335 * nodalAreas[i], 0, 0, 0] as [
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

    const baseline = deform(nodes, elements, { supports, loads }, elementInputs);
    const cached = createCachedDeformSolver(nodes, elements, supports, elementInputs);
    const cachedResult = cached.solve(loads, { includeReactions: true });

    expect(cached.dof).toBe(nodes.length * 6);
    expect(cached.freeDof).toBeGreaterThan(0);
    expect(cached.setupTimeMs).toBeGreaterThan(0);

    nodes.forEach((_, i) => {
      const baselineNode = baseline.deformations?.get(i);
      const cachedNode = cachedResult.deformations?.get(i);
      expect(cachedNode).toBeDefined();
      expect(baselineNode).toBeDefined();
      cachedNode?.forEach((v, dof) =>
        expect(v).toBeCloseTo(baselineNode?.[dof] ?? 0, 8),
      );
    });

    supports?.forEach((_, i) => {
      const baselineNode = baseline.reactions?.get(i);
      const cachedNode = cachedResult.reactions?.get(i);
      expect(cachedNode).toBeDefined();
      expect(baselineNode).toBeDefined();
      cachedNode?.forEach((v, dof) =>
        expect(v).toBeCloseTo(baselineNode?.[dof] ?? 0, 6),
      );
    });
  });
});

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

function getSupports(nodes: Node[], span: number): NodeInputs["supports"] {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(
        ({ node }) => Math.abs(node[0]) < 1e-8 || Math.abs(node[0] - span) < 1e-8,
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

