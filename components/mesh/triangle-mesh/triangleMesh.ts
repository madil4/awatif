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
import { PolygonMeshTemplate } from "../data-model";
// WASM wrapper for the in-house quality mesher (cpp/mesher.cpp).
import createModule from "./cpp/built/mesher.js";

type TriangleMeshParams = {
  maxTriangleArea: number;
};

// Quality refinement bound and the hard Steiner-point cap that guarantees
// the mesher always terminates (see cpp/mesher.cpp).
const MIN_ANGLE_DEG = 28;
const MAX_STEINER_POINTS = 10000;

// The mesher WASM module must be loaded before any polygon can be meshed.
// Initialization is explicit (not at module load) so importing templates
// under node/vitest never fetches the wasm file.
let mod: any = null;
let initPromise: Promise<void> | null = null;

export function initTriangleMesh(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      mod = await createModule();
    })();
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
    if (!mod)
      throw new Error(
        "Mesher WASM module not loaded yet. Call initTriangleMesh() first.",
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

    // The mesher preserves the input corners as output nodes 0..n-1 in
    // order — the polygon corner → node mapping in getMesh relies on this.
    const n = points2D.length;
    const inPtr = mod._malloc(2 * n * 8);
    mod.HEAPF64.set(points2D.flat(), inPtr / 8);
    const code = mod._mesh_polygon(
      inPtr,
      n,
      params.maxTriangleArea,
      MIN_ANGLE_DEG,
      MAX_STEINER_POINTS,
    );
    mod._free(inPtr);
    if (code !== 0) return { nodes: [], elements: [] };

    const nPts = mod._mesh_num_points();
    const nTris = mod._mesh_num_triangles();
    const ptsPtr = mod._mesh_points() / 8;
    const trisPtr = mod._mesh_triangles() / 4;
    const flatPoints = mod.HEAPF64.subarray(ptsPtr, ptsPtr + 2 * nPts);
    const flatTris = mod.HEAP32.subarray(trisPtr, trisPtr + 3 * nTris);

    const nodes = toNodes(flatPoints).map(
      (p) =>
        multiply(transformationMatrix, [p[0], p[1], localZOffset]) as [
          number,
          number,
          number,
        ],
    );
    const elements = toElements(flatTris);

    return { nodes, elements };
  },
};

// Helpers
function toNodes(pointlist: ArrayLike<number>): number[][] {
  const nodes: number[][] = [];

  for (let i = 0; i < pointlist.length; i += 2) {
    nodes.push([pointlist[i], pointlist[i + 1]]);
  }

  return nodes;
}

function toElements(trianglelist: ArrayLike<number>): number[][] {
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
