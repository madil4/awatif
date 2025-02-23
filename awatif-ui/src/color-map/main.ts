import { Lut } from "three/addons/math/Lut.js";
import * as THREE from "three";
import * as math from "mathjs";

import van, { State } from "vanjs-core";
import { parameters, Parameters, viewer } from "awatif-ui";
import { contours } from "../viewer/objects/contours";
import { Node, Element } from "awatif-data-structure";
import { mesh } from "awatif-mesh";

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

const objects3D = van.state([
  contours(van.state([]), van.state([]), van.state([]), van.state("demo")),
]);

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
  ]);
  const polygon = van.state([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const { nodes, elements } = mesh({ points, polygon });
  const distancesState = van.state(
    getDistancesFromVertex(
      [params.boundary.value.val, 0, 3],
      getMesh(nodes.val, elements.val)
    )
  );
  objects3D.val = [
    contours(nodes, elements, distancesState, van.state("demo")),
  ];
});

document.body.append(
  parameters(params),
  viewer({
    objects3D,
  })
);

// Utils ------------------------------------------------------
function getDistancesFromVertex(vertex: Node, mesh: THREE.Mesh): number[] {
  const positions = mesh.geometry.attributes.position.array;

  const distances: number[] = [];
  for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
    const node = [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
    const distance = math.norm(math.subtract(node, vertex)) as number;
    distances.push(distance);
  }
  return distances;
}

function getMesh(nodes: Node[], elements: Element[]): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
    })
  );
  mesh.geometry.computeVertexNormals();
  // itemSize = 3 because there are 3 values (components) per vertex
  mesh.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodes.flat(), 3)
  );

  mesh.geometry.setIndex(new THREE.Uint16BufferAttribute(elements.flat(), 1));

  const colors = nodes.map((node) => [1, 0, 1]).flat();
  mesh.geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  return mesh;
}
