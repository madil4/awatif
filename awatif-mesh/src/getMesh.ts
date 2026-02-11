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

// Load `triangle` wasm once at module load.
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

  const firstThreePoints = getFirstThreeNonCollinearPoints(points, polygon);
  const origin = points[polygon[0]];

  let transformationMatrix = getTransformationMatrix(firstThreePoints);
  let points2D = projectPointsTo2D(points, origin, transformationMatrix);
  if (getSignedArea(polygon, points2D) > 0) {
    firstThreePoints.reverse(); // Ensure clockwise order for triangle input
    transformationMatrix = getTransformationMatrix(firstThreePoints);
    points2D = projectPointsTo2D(points, origin, transformationMatrix);
  }

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

  const nodes = meshNodes.map((n) => {
    const p = multiply(transformationMatrix, [n[0], n[1], 0]) as MathCollection;
    return [origin[0] + p[0], origin[1] + p[1], origin[2] + p[2]] as Node;
  });
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
function getFirstThreeNonCollinearPoints(
  points: Node[],
  polygon: number[]
): Node[] {
  const ids = polygon.length ? polygon : points.map((_, i) => i);
  for (let i = 0; i < ids.length - 2; i++) {
    for (let j = i + 1; j < ids.length - 1; j++) {
      for (let k = j + 1; k < ids.length; k++) {
        const p1 = points[ids[i]];
        const p2 = points[ids[j]];
        const p3 = points[ids[k]];
        const v1 = subtract(p2, p1);
        const v2 = subtract(p3, p1);
        const n = cross(v1, v2);
        if ((norm(n) as number) > 1e-12) return [p1, p2, p3];
      }
    }
  }
  return points.slice(0, 3);
}

function projectPointsTo2D(
  points: Node[],
  origin: Node,
  transformationMatrix: number[][]
): number[][] {
  return points.map((p) => {
    const q = multiply(
      transpose(transformationMatrix),
      subtract(p, origin)
    ) as MathCollection;
    return [q[0], q[1]];
  });
}

function toSegments(polygon: number[]): number[] {
  const segments: number[] = [];

  for (let i = 0; i < polygon.length; i += 1) {
    segments.push(polygon[i], polygon[(i + 1) % polygon.length]);
  }

  return segments;
}

function toElements(trianglelist: number[]): number[][] {
  const elements: number[][] = [];

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
  const nodes: number[][] = [];
  const boundaryIndices: number[] = [];

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
  const normal = cross(v1, v2);
  let z = divide(normal, norm(normal)) as MathCollection;

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
