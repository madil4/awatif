import { Lut } from "three/addons/math/Lut.js";
import * as THREE from "three";
import * as math from "mathjs";

import van, { State } from "vanjs-core";
import { parameters, Parameters, viewer, colorMap } from "awatif-ui";

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
    [0, 0],
    [5, 0],
    [params.boundary.value.val, 3],
    [8, 7],
    [15, 5],
    [15, 0],
    [20, 0],
    [20, 10],
    [0, 10],
    [0, 0],
    [5, 5],
  ]);
  const polygon = van.state([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const distancesState = van.state(
    getDistancesFromVertex(
      [params.boundary.value.val, 3],
      points.val as [number, number][]
    )
  );

  const firstAxis = van.state("x");
  const secondAxis = van.state("z");

  objects3D.val = [colorMap(points, polygon, distancesState, van.state(0), firstAxis, secondAxis).val];
});

document.body.append(
  parameters(params),
  viewer({
    objects3D,
  })
);

// Utils ------------------------------------------------------
function getDistancesFromVertex(
  vertex: [number, number],
  points: [number, number][]
): number[] {
  return points.map((point) => {
    return math.norm(math.subtract(point, vertex)) as number;
  });
}
