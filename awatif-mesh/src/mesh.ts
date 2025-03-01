import van, { State } from "vanjs-core";
import { Node, Element } from "awatif-data-structure";
import triangle from "triangle-wasm";
// @ts-ignore
import triangleWasmUrl from "./assets/triangle.wasm?url";

// to make sure init is called once with multiple mesh call
const isWsLoaded = van.state(false);
triangle.init(triangleWasmUrl).then(() => (isWsLoaded.val = true));

/**
 * Return an array of meshed nodes and elements.
 *
 * @remarks
 * The meshed nodes are in [x, y, z] format on the X-Z plane with y = 0.
 *
 * @param points Array of point(s) in the form of [x, y].
 * @param polygon Array of the indices in the points array in the form of [i_p1, i_p2, i_p3, ...].
 */
export function mesh({
  points,
  polygon,
  maxMeshSize = 3,
  maxNumSteinerPoints = 300,
  minMeshAngleDegrees = 30,
}: {
  points: State<number[][]>;
  polygon: State<number[]>;
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

    const triInputs = triangle.makeIO({
      pointlist: points.val.flat(),
      // @ts-ignore
      segmentlist: toSegments(polygon.val),
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

    nodesState.val = nodes.map((p) => [p[0], p[1], 0]);
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
