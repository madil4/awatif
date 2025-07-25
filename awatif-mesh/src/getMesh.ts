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
import { Node, Element } from "awatif-fem";
import triangle from "triangle-wasm";

// Loading the wasm file (UI blocking)
// @ts-ignore
import triangleWasmUrl from "./assets/triangle.wasm?url";
// @ts-ignore
await triangle.init(triangleWasmUrl);

export function getMesh({
  points, // Array of point(s) in the form of [x, y].
  polygon, // Array of the indices in the points array in the form of [i_p1, i_p2, i_p3, ...].
  maxMeshSize = 3,
}: {
  points: Node[];
  polygon: number[];
  maxMeshSize?: number;
}): {
  nodes: Node[];
  elements: Element[];
  boundaryIndices: number[];
} {
  if (points.length < 3 || polygon.length < 3)
    return { nodes: [], elements: [], boundaryIndices: [] };

  const firstThreePoints = points.slice(0, 3);
  if (getSignedArea(polygon, points) > 0) firstThreePoints.reverse(); // Ensure counter-clockwise order

  const transformationMatrix = getTransformationMatrix(firstThreePoints);

  const points2D = points
    .map((p) => multiply(transpose(transformationMatrix), p))
    .map((p) => [p[0], p[1]]);

  // Triangulate using triangle.js
  const triInputs = triangle.makeIO({
    pointlist: points2D.flat(),
    // @ts-ignore
    segmentlist: toSegments(polygon),
  });
  const triOutputs = triangle.makeIO();

  triangle.triangulate(`pzQOq30a${maxMeshSize}`, triInputs, triOutputs);

  // Convert the outputs to nodes and elements
  const { nodes: meshNodes, boundaryIndices } = toNodesAndBoundaryIndices(
    triOutputs.pointlist,
    triOutputs.pointmarkerlist
  );

  const nodes = meshNodes.map(
    (n) => multiply(transformationMatrix, [n[0], n[1], 0]) as Node
  );
  const elements = toElements(triOutputs.trianglelist);

  // Free the memory
  triangle.freeIO(triInputs, true);
  triangle.freeIO(triOutputs);

  return {
    nodes,
    elements,
    boundaryIndices,
  };
}

// Utils
function toSegments(polygon: number[]): number[] {
  const segments: number[] = [];

  for (let i = 0; i < polygon.length; i += 1) {
    segments.push(polygon[i], polygon[(i + 1) % polygon.length]);
  }

  return segments;
}

function toElements(trianglelist: number[]): number[][] {
  const elements = [];

  for (let i = 0; i < trianglelist.length; i += 3) {
    elements.push([trianglelist[i], trianglelist[i + 1], trianglelist[i + 2]]);
  }

  return elements;
}

function toNodesAndBoundaryIndices( // combine Node and boundaryIndices to loop once only on pointlist
  pointlist: number[],
  pointmarkerlist: number[]
): {
  nodes: number[][];
  boundaryIndices: number[];
} {
  const nodes = [];
  const boundaryIndices = [];

  for (let i = 0; i < pointlist.length; i += 2) {
    nodes.push([pointlist[i], pointlist[i + 1]]);

    if (pointmarkerlist[i / 2]) boundaryIndices.push(i / 2);
  }

  return { nodes, boundaryIndices };
}

function getTransformationMatrix([n1, n2, n3]: Node[]): number[][] {
  const v1 = subtract(n2, n1);
  const v2 = subtract(n3, n1);

  const x = divide(v1, norm(v1)) as MathCollection;
  let z = divide(cross(v1, v2), norm(cross(v1, v2))) as MathCollection;

  // Fix z-direction to align with reference (e.g., global Z+)
  const referenceZ: Node = [0, 0, 1];
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

function getSignedArea(polyline: number[], points: number[][]): number {
  let area = 0;
  const n = polyline.length;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[polyline[i]];
    const [x2, y2] = points[polyline[(i + 1) % n]];
    area += x1 * y2 - x2 * y1;
  }
  return area / 2;
}
