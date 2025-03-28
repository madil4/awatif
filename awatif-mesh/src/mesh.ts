import van, { State } from "vanjs-core";
import {
  cross,
  divide,
  MathCollection,
  multiply,
  norm,
  subtract,
  transpose,
} from "mathjs";
import { Node, Element } from "awatif-data-model";
import triangle from "triangle-wasm";

// @ts-ignore
import triangleWasmUrl from "./assets/triangle.wasm?url";

// to make sure init is called once with multiple mesh call
const isWsLoaded = van.state(false);
triangle.init(triangleWasmUrl).then(() => (isWsLoaded.val = true));

export function mesh({
  points, // Array of point(s) in the form of [x, y].
  polygon, // Array of the indices in the points array in the form of [i_p1, i_p2, i_p3, ...].
  maxMeshSize = 3,
  maxNumSteinerPoints = 300,
  minMeshAngleDegrees = 30,
}: {
  points: Node[];
  polygon: number[];
  maxMeshSize?: number;
  maxNumSteinerPoints?: number;
  minMeshAngleDegrees?: number;
}): {
  // the output are reactive just to react after wasm is loaded
  nodes: State<Node[]>;
  elements: State<Element[]>;
  boundaryIndices: State<number[]>;
} {
  // init
  const nodesState: State<Node[]> = van.state([]);
  const elementsState: State<Element[]> = van.state([]);
  const boundaryIndicesState: State<number[]> = van.state([]);

  // events: when points or polygon changes -> mesh
  van.derive(() => {
    if (!isWsLoaded.val) return;

    // convert from the 3DD to 2D plane for triangulation
    const transformationMatrix = getTransformationMatrix(
      points[0],
      points[1],
      points[2]
    );
    const points2D = points
      .map((p) => multiply(transpose(transformationMatrix), p))
      .map((p) => [p[0], p[1]]);

    const triInputs = triangle.makeIO({
      pointlist: points2D.flat(),
      // @ts-ignore
      segmentlist: toSegments(polygon),
    });
    const triOutputs = triangle.makeIO();

    // Todo: refactor into reactive settings object
    triangle.triangulate(
      `pzQOS${maxNumSteinerPoints}q${minMeshAngleDegrees}${
        maxMeshSize != null ? "a" : null
      }${maxMeshSize ?? ""}`,
      triInputs,
      triOutputs
    );

    const { nodes, boundaryIndices } = toNodesAndBoundaryIndices(
      triOutputs.pointlist,
      triOutputs.pointmarkerlist
    );

    nodesState.val = nodes.map(
      (n) => multiply(transformationMatrix, [n[0], n[1], 0]) as Node
    );
    elementsState.val = toElements(triOutputs.trianglelist);
    boundaryIndicesState.val = boundaryIndices;

    triangle.freeIO(triInputs, true);
    triangle.freeIO(triOutputs);
  });

  return {
    nodes: nodesState,
    elements: elementsState,
    boundaryIndices: boundaryIndicesState,
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

function toElements(trianglelist: number[]): number[][] {
  const elements = [];

  for (let i = 0; i < trianglelist.length; i += 3) {
    elements.push([trianglelist[i], trianglelist[i + 1], trianglelist[i + 2]]);
  }

  return elements;
}

// from global 3D to local 2D
function getTransformationMatrix(n1: Node, n2: Node, n3: Node): number[][] {
  // Based on thesis: Development of Membrane, Plate and Flat Shell Elements in Java Chapter 5.4
  // https://vtechworks.lib.vt.edu/server/api/core/bitstreams/edb7e2db-eebf-43e9-aa1f-cfca4b8a46e9/content

  const j = getAverage([n2, n3]);
  const k = getAverage([n1, n3]);
  const i = getAverage([n1, n2]);
  const x = divide(subtract(j, k), norm(subtract(j, k))) as MathCollection;
  const r = divide(subtract(n3, i), norm(subtract(j, k))) as MathCollection;
  const z = divide(cross(x, r), norm(cross(x, r))) as MathCollection;
  const y = divide(cross(z, x), norm(cross(z, x)));

  return [
    [x[0], y[0], z[0]],
    [x[1], y[1], z[1]],
    [x[2], y[2], z[2]],
  ];

  // utils
  function getAverage(Nodes: Node[]): Node {
    const sum = Nodes.reduce(
      (acc, n) => [acc[0] + n[0], acc[1] + n[1], acc[2] + n[2]],
      [0, 0, 0]
    );

    const count = Nodes.length;
    return [sum[0] / count, sum[1] / count, sum[2] / count];
  }
}
