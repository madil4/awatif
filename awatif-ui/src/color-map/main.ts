import * as THREE from "three";
import * as math from "mathjs";
import van from "vanjs-core";

import { Node } from "awatif-data-structure";
import { getParameters, Parameters, getViewer, getColorMap } from "awatif-ui";

// Init
const params: Parameters = {
  boundary: {
    value: van.state(5),
    min: 1,
    max: 10,
    step: 0.1,
    label: "Boundary point",
  },
};

const objects3D = van.state([new THREE.Mesh()]);

// Events: on parameter change
van.derive(() => {
  const points = van.state([
    [0, 0, 0],
    [5, 0, 0],
    [params.boundary.value.val, 0, 3],
    [8, 0, 7],
    [15, 0, 5],
    [15, 0, 0],
    [20, 0, 0],
    [20, 0, 10],
    [0, 0, 10],
    [0, 0, 0],
    [5, 0, 5],
  ] as Node[]);
  const polygon = van.state([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const distancesState = van.state(
    getDistancesFromVertex([params.boundary.value.val, 0, 3], points.val)
  );

  objects3D.val = [getColorMap(points, polygon, distancesState).val];
});

document.body.append(
  getParameters(params),
  getViewer({
    objects3D,
  })
);

// Utils
function getDistancesFromVertex(
  vertex: [number, number, number],
  points: Node[]
): number[] {
  return points.map((point) => {
    return math.norm(
      math.subtract(point, vertex) as math.MathCollection
    ) as number;
  });
}
