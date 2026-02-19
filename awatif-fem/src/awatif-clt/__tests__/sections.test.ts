import { Element, Node } from "../../data-model";
import {
  maxAbsSectionLineValue,
  meanNodalScalarsByElement,
  sampleScalarFieldAlongX,
  sampleScalarFieldAtX,
} from "../stress/sections";

describe("section sampling utilities", () => {
  test("collapses nodal element values to scalar means", () => {
    const nodal = new Map<number, [number, number, number]>([
      [0, [3, 6, 9]],
      [1, [1, 1, 4]],
    ]);

    const collapsed = meanNodalScalarsByElement(nodal);

    expect(collapsed.get(0)).toBeCloseTo(6);
    expect(collapsed.get(1)).toBeCloseTo(2);
  });

  test("samples scalar strip along x using centroid filtering", () => {
    const { nodes, elements } = buildRectMesh(2, 1, 3, 2);
    const field = new Map<number, number>([
      [0, 10],
      [1, 10],
      [2, 20],
      [3, 20],
    ]);

    const left = sampleScalarFieldAtX(nodes, elements, field, 0.5, { halfBand: 0.35 });
    const right = sampleScalarFieldAtX(nodes, elements, field, 1.5, { halfBand: 0.35 });

    expect(left).toBeCloseTo(10);
    expect(right).toBeCloseTo(20);
  });

  test("builds a section line and extracts max absolute value", () => {
    const { nodes, elements } = buildRectMesh(2, 1, 3, 2);
    const field = new Map<number, number>([
      [0, -5],
      [1, -5],
      [2, 12],
      [3, 12],
    ]);

    const samples = sampleScalarFieldAlongX(nodes, elements, field, 3, { xMin: 0, xMax: 2 });

    expect(samples).toHaveLength(3);
    expect(samples[0].value).toBeCloseTo(-5);
    expect(samples[2].value).toBeCloseTo(12);
    expect(maxAbsSectionLineValue(samples)).toBeCloseTo(12);
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
