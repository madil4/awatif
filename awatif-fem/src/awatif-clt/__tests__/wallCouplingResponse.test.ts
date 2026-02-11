import { CLTLayup, Element, Node, deform } from "../../index";
import { coupleTwoCLTWalls } from "../coupling";

function buildRectangularWall(
  origin: Node,
  axisU: Node,
  axisV: Node,
  nu = 8,
  nv = 7,
): { nodes: Node[]; elements: Element[] } {
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

function getBaseSupports(nodes: Node[]) {
  return new Map(
    nodes
      .map((node, i) => ({ node, i }))
      .filter(({ node }) => Math.abs(node[2]) < 1e-8)
      .map(({ i }) => [
        i,
        [true, true, true, true, true, true] as [
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

function getWallPressureLoads(
  nodes: Node[],
  elements: Element[],
  targetElementIndices: number[],
  pressureKnPerM2: number,
) {
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

  return new Map(
    areasByNode
      .map((area, i) => [i, area] as const)
      .filter(([, area]) => area > 0)
      .map(([i, area]) => [
        i,
        [0, -pressureKnPerM2 * area, 0, 0, 0, 0] as [
          number,
          number,
          number,
          number,
          number,
          number,
        ],
      ]),
  );
}

function maxAbsUy(
  deformations: Map<number, [number, number, number, number, number, number]>
    | undefined,
  nodeIndices: number[],
): number {
  if (!deformations) return 0;
  let max = 0;
  nodeIndices.forEach((i) => {
    max = Math.max(max, Math.abs(deformations.get(i)?.[1] ?? 0));
  });
  return max;
}

describe("CLT wall coupling response", () => {
  test("displacement scales with applied lateral load", () => {
    const wallA = buildRectangularWall([0, 0, 0], [4, 0, 0], [0, 0, 3.2]);
    const wallB = buildRectangularWall([4, 0, 0], [0, 3, 0], [0, 0, 3.2]);
    const coupled = coupleTwoCLTWalls(wallA, wallB, 1e-4);

    const elementInputs = {
      cltLayups: new Map(
        coupled.elements.map((_, i) => [i, buildSevenLayerCLTLayup()]),
      ),
    };
    const supports = getBaseSupports(coupled.nodes);

    const loadsLow = getWallPressureLoads(
      coupled.nodes,
      coupled.elements,
      coupled.wallAElementMap,
      5,
    );
    const loadsHigh = getWallPressureLoads(
      coupled.nodes,
      coupled.elements,
      coupled.wallAElementMap,
      25,
    );

    const low = deform(coupled.nodes, coupled.elements, { supports, loads: loadsLow }, elementInputs);
    const high = deform(coupled.nodes, coupled.elements, { supports, loads: loadsHigh }, elementInputs);

    const uyLow = maxAbsUy(low.deformations, coupled.wallANodeMap);
    const uyHigh = maxAbsUy(high.deformations, coupled.wallANodeMap);

    expect(uyLow).toBeGreaterThan(0);
    expect(uyHigh).toBeGreaterThan(uyLow * 4.5);
  });
});
