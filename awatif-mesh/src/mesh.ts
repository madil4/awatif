import van, { State } from "vanjs-core";
import { Node, Element } from "awatif-data-structure";
import triangle from "triangle-wasm";
// @ts-ignore
import triangleWasmUrl from "./assets/triangle.wasm?url";
import { subdivide } from "./subdivide";

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
  nodes: State<Node[]>; // the output are reactive just to react after wasm is loaded
  elements: State<Element[]>;
} {
  // init
  const nodes: State<Node[]> = van.state([]);
  const elements: State<Element[]> = van.state([]);

  // events: mesh when points and faces change
  van.derive(() => {
    if (!isWsLoaded.val) return;

    const input = triangle.makeIO({
      pointlist: points.val.flat(),
      // @ts-ignore
      segmentlist: polygonToSegments(polygon.val),
    });
    const output = triangle.makeIO();

    triangle.triangulate(
      `pzQOS${maxNumSteinerPoints}q${minMeshAngleDegrees}${
        maxMeshSize != null ? "a" : null
      }${maxMeshSize ?? ""}`,
      input,
      output
    );

    const { points: subPoints, faces: subFaces } = subdivide({
      points: triOutputToPoints(output),
      faces: triOutputToTriangles(output),
      subdivisions: 0,
    });

    nodes.val = subPoints.map((p) => [p[0], 0, p[1]]);
    elements.val = subFaces;

    triangle.freeIO(input, true);
    triangle.freeIO(output);
  });

  return { nodes, elements };
}

// Utils
function polygonToSegments(polygon: number[]): number[] {
  const segments: number[] = [];

  for (let i = 0; i < polygon.length; i += 1) {
    segments.push(polygon[i], polygon[(i + 1) % polygon.length]);
  }

  return segments;
}

function triOutputToPoints(output: any): number[][] {
  const points = [];
  const outPoints = output.pointlist;

  for (let i = 0; i < outPoints.length; i += 2) {
    points.push([outPoints[i], outPoints[i + 1]]);
  }

  return points;
}

function triOutputToTriangles(output: any): number[][] {
  const triangles = [];
  const outTriangles = output.trianglelist;

  for (let i = 0; i < outTriangles.length; i += 3) {
    triangles.push([outTriangles[i], outTriangles[i + 1], outTriangles[i + 2]]);
  }

  return triangles;
}
