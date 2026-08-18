import { beforeAll, describe, expect, it } from "vitest";
import { initTriangleMesh, triangleMesh } from "./triangleMesh";

type P3 = [number, number, number];

// Baseline counts captured from triangle-wasm (Shewchuk Triangle, pzQOq30a)
// before it was replaced by the in-house mesher; the new mesher should stay
// in the same ballpark.
const triangleWasmBaseline: Record<string, { nNodes: number; nTris: number }> =
  {
    "unit-square-a0.1": { nNodes: 13, nTris: 16 },
    "unit-square-a1": { nNodes: 4, nTris: 2 },
    "rect-10x1-a0.5": { nNodes: 32, nTris: 35 },
    "l-shape-a0.2": { nNodes: 19, nTris: 21 },
    "plate-5x5-a0.5": { nNodes: 51, nTris: 77 },
  };

const fixtures: {
  name: string;
  points: P3[];
  maxArea: number;
  polygonArea: number;
  assertMinAngle?: number;
}[] = [
  {
    name: "unit-square-a0.1",
    points: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    maxArea: 0.1,
    polygonArea: 1,
    assertMinAngle: 28,
  },
  {
    name: "unit-square-a1",
    points: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    maxArea: 1,
    polygonArea: 1,
    assertMinAngle: 28,
  },
  {
    name: "rect-10x1-a0.5",
    points: [
      [0, 0, 0],
      [10, 0, 0],
      [10, 1, 0],
      [0, 1, 0],
    ],
    maxArea: 0.5,
    polygonArea: 10,
    assertMinAngle: 28,
  },
  {
    name: "l-shape-a0.2",
    points: [
      [0, 0, 0],
      [2, 0, 0],
      [2, 1, 0],
      [1, 1, 0],
      [1, 2, 0],
      [0, 2, 0],
    ],
    maxArea: 0.2,
    polygonArea: 3,
    assertMinAngle: 28,
  },
  {
    name: "plate-5x5-a0.5",
    points: [
      [0, 0, 0],
      [5, 0, 0],
      [5, 5, 0],
      [0, 5, 0],
    ],
    maxArea: 0.5,
    polygonArea: 25,
    assertMinAngle: 28,
  },
  {
    name: "tilted-plate",
    // unit square on the plane z = x (45° tilt around the y-axis)
    points: [
      [0, 0, 0],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 0],
    ],
    maxArea: 0.2,
    polygonArea: Math.SQRT2,
    assertMinAngle: 28,
  },
];

function sub(a: P3, b: P3): P3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function crossLen(u: P3, v: P3): number {
  return Math.hypot(
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
  );
}

function meshStats(nodes: P3[], elements: number[][]) {
  let minAngle = Infinity;
  let maxArea = 0;
  let sumArea = 0;
  for (const el of elements) {
    const p = el.map((i) => nodes[i]);
    const area = 0.5 * crossLen(sub(p[1], p[0]), sub(p[2], p[0]));
    sumArea += area;
    maxArea = Math.max(maxArea, area);
    for (let i = 0; i < 3; i++) {
      const u = sub(p[(i + 1) % 3], p[i]);
      const v = sub(p[(i + 2) % 3], p[i]);
      const dotUV = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
      const cosA =
        dotUV / (Math.hypot(...u) * Math.hypot(...v));
      minAngle = Math.min(
        minAngle,
        (Math.acos(Math.max(-1, Math.min(1, cosA))) * 180) / Math.PI,
      );
    }
  }
  return { minAngle, maxArea, sumArea };
}

beforeAll(async () => {
  await initTriangleMesh();
});

describe("triangleMesh (in-house wasm mesher)", () => {
  for (const f of fixtures) {
    it(`meshes ${f.name}`, () => {
      const { nodes, elements } = triangleMesh.getPolygonMesh({
        points: f.points,
        params: { maxTriangleArea: f.maxArea },
      });

      expect(elements.length).toBeGreaterThan(0);

      // the polygon corners must come out as nodes 0..n-1 in order —
      // getMesh maps polygon corner i to node i
      for (let i = 0; i < f.points.length; i++) {
        expect(nodes[i][0]).toBeCloseTo(f.points[i][0], 9);
        expect(nodes[i][1]).toBeCloseTo(f.points[i][1], 9);
        expect(nodes[i][2]).toBeCloseTo(f.points[i][2], 9);
      }

      // valid indices
      for (const el of elements) {
        expect(el).toHaveLength(3);
        for (const i of el) {
          expect(i).toBeGreaterThanOrEqual(0);
          expect(i).toBeLessThan(nodes.length);
        }
      }

      const stats = meshStats(nodes, elements);
      expect(stats.sumArea).toBeCloseTo(f.polygonArea, 6);
      expect(stats.maxArea).toBeLessThanOrEqual(f.maxArea * (1 + 1e-9));
      if (f.assertMinAngle)
        expect(stats.minAngle).toBeGreaterThanOrEqual(f.assertMinAngle - 0.5);

      const baseline = triangleWasmBaseline[f.name];
      if (baseline) {
        expect(nodes.length).toBeGreaterThanOrEqual(baseline.nNodes / 2);
        expect(nodes.length).toBeLessThanOrEqual(baseline.nNodes * 2 + 4);
      }
    });
  }

  it("returns an empty mesh for degenerate input", () => {
    const empty = { nodes: [], elements: [] };
    expect(
      triangleMesh.getPolygonMesh({
        points: [
          [0, 0, 0],
          [1, 0, 0],
        ],
        params: { maxTriangleArea: 1 },
      }),
    ).toEqual(empty);
    expect(
      triangleMesh.getPolygonMesh({
        points: [
          [0, 0, 0],
          [1, 0, 0],
          [2, 0, 0],
        ],
        params: { maxTriangleArea: 1 },
      }),
    ).toEqual(empty);
    expect(
      triangleMesh.getPolygonMesh({
        points: [
          [0, 0, 0],
          [1, 0, 0],
          [1, 0, 0],
          [0, 1, 0],
        ],
        params: { maxTriangleArea: 1 },
      }),
    ).toEqual(empty);
  });
});
