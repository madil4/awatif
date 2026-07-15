import { html } from "lit-html";
import {
  cross,
  divide,
  dot,
  MathCollection,
  multiply,
  norm,
  subtract,
  transpose,
} from "mathjs";
import * as triangle from "triangle-wasm";
import { PolygonMeshTemplate } from "../data-model";
import triangleWasmUrl from "./assets/triangle.wasm?url";

type TriangleMeshParams = {
  maxTriangleArea: number;
};

// The Triangle WASM module must be loaded before any polygon can be meshed.
// Initialization is explicit (not at module load) so importing templates
// under node/vitest never fetches the wasm file.
let initialized = false;
let initPromise: Promise<void> | null = null;

export function initTriangleMesh(): Promise<void> {
  if (!initPromise) {
    initPromise = triangle.init(triangleWasmUrl).then(() => {
      initialized = true;
    });
  }
  return initPromise;
}

export const triangleMesh: PolygonMeshTemplate<TriangleMeshParams> = {
  name: "Triangle Mesh",
  geometryKind: "polygon",
  defaultParams: {
    maxTriangleArea: 1,
  },

  getParamsTemplate: ({ params }) => {
    return html`<div>
      <label>Max triangle area (m²):</label>
      <input
        type="number"
        min="0.1"
        max="10"
        step="0.1"
        .value=${params.val.maxTriangleArea}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          const clamped = Math.max(0.1, Math.min(10, value));
          params.val = { ...params.val, maxTriangleArea: clamped };
        }}
      />
    </div>`;
  },

  getPolygonMesh: ({ points, params }) => {
    if (!initialized)
      throw new Error(
        "Triangle WASM module not loaded yet. Call initTriangleMesh() first.",
      );

    if (points.length < 3) return { nodes: [], elements: [] };

    const basePoints = getNonCollinearTriple(points);
    if (!basePoints) return { nodes: [], elements: [] };
    if (getSignedArea(points) > 0) basePoints.reverse(); // Ensure counter-clockwise order

    const transformationMatrix = getTransformationMatrix(basePoints);

    // Project the polygon corners onto its plane; keep the plane's offset
    // along local z to place the mesh back at the original position
    const localPoints = points.map(
      (p) => multiply(transpose(transformationMatrix), p) as number[],
    );
    const points2D = localPoints.map((p) => [p[0], p[1]]);
    const localZOffset = localPoints[0][2];

    // Triangulate using Triangle: p = planar straight-line graph, z = zero
    // based indexing, q30 = min angle 30°, a = max triangle area. Without the
    // "j" flag Triangle preserves the input corners as output nodes 0..n-1 in
    // order — the polygon corner → node mapping in getMesh relies on this.
    const triInputs = triangle.makeIO({
      pointlist: points2D.flat(),
      // @ts-ignore - segmentlist is accepted but missing from the typings
      segmentlist: toSegments(points.length),
    });
    const triOutputs = triangle.makeIO();

    triangle.triangulate(
      `pzQOq30a${params.maxTriangleArea}`,
      triInputs,
      triOutputs,
    );

    const nodes = toNodes(triOutputs.pointlist).map(
      (n) =>
        multiply(transformationMatrix, [n[0], n[1], localZOffset]) as [
          number,
          number,
          number,
        ],
    );
    const elements = toElements(triOutputs.trianglelist);

    triangle.freeIO(triInputs, true);
    triangle.freeIO(triOutputs);

    return { nodes, elements };
  },
};

// Helpers
function toSegments(cornersCount: number): number[] {
  const segments: number[] = [];

  for (let i = 0; i < cornersCount; i += 1) {
    segments.push(i, (i + 1) % cornersCount);
  }

  return segments;
}

function toNodes(pointlist: number[]): number[][] {
  const nodes: number[][] = [];

  for (let i = 0; i < pointlist.length; i += 2) {
    nodes.push([pointlist[i], pointlist[i + 1]]);
  }

  return nodes;
}

function toElements(trianglelist: number[]): number[][] {
  const elements: number[][] = [];

  for (let i = 0; i < trianglelist.length; i += 3) {
    elements.push([trianglelist[i], trianglelist[i + 1], trianglelist[i + 2]]);
  }

  return elements;
}

function getNonCollinearTriple(
  points: [number, number, number][],
): [number, number, number][] | null {
  const [p1, p2] = points;
  const v1 = subtract(p2, p1);

  for (let i = 2; i < points.length; i++) {
    const v2 = subtract(points[i], p1);
    if ((norm(cross(v1, v2)) as number) > 1e-10) return [p1, p2, points[i]];
  }

  return null;
}

function getTransformationMatrix([n1, n2, n3]: [
  number,
  number,
  number,
][]): number[][] {
  const v1 = subtract(n2, n1);
  const v2 = subtract(n3, n1);

  const x = divide(v1, norm(v1)) as MathCollection;
  let z = divide(cross(v1, v2), norm(cross(v1, v2))) as MathCollection;

  // Fix z-direction to align with reference (e.g., global Z+)
  const referenceZ = [0, 0, 1];
  if (dot(z, referenceZ) < 0) {
    z = multiply(z, -1) as MathCollection;
  }

  const y = cross(z, x) as MathCollection;

  return [
    [x[0], y[0], z[0]],
    [x[1], y[1], z[1]],
    [x[2], y[2], z[2]],
  ];
}

function getSignedArea(points: [number, number, number][]): number {
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % n];
    area += x1 * y2 - x2 * y1;
  }
  return area / 2;
}
