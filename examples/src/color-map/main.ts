import { Lut } from "three/addons/math/Lut.js";
import * as THREE from "three";
import * as math from "mathjs";

import van, { State } from "vanjs-core";
import { parameters, Parameters, viewer } from "awatif-ui";
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

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);
const objects3D = van.state([getMesh([], [])]);

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

  const baseMesh = getMesh(nodes.val, elements.val);
  const distances = getDistancesFromVertex(
    [params.boundary.value.val, 0, 3],
    baseMesh
  );
  const pressuredMesh = addPressureToMesh(distances, baseMesh);
  const coloredMesh = addColorToMesh(pressuredMesh);

  const lines = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
    })
  );

  lines.geometry.computeVertexNormals();
  // itemSize = 3 because there are 3 values (components) per vertex
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodes.val.flat(), 3)
  );

  lines.geometry.setIndex(
    new THREE.Uint16BufferAttribute(elements.val.flat(), 1)
  );

  coloredMesh.add(lines);

  nodesState.val = nodes.val;
  elementsState.val = elements.val;
  objects3D.val = [coloredMesh];
});

document.body.append(
  parameters(params),
  viewer({
    objects3D,
  })
);

// Utils ------------------------------------------------------
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

// one pressure value per vertex (every 3 values)
function addPressureToMesh(pressures: number[], mesh: THREE.Mesh): THREE.Mesh {
  mesh.geometry.setAttribute(
    "pressure",
    new THREE.Float32BufferAttribute(pressures, 1)
  );
  return mesh;
}

function addColorToMesh(mesh: THREE.Mesh): THREE.Mesh {
  const geometry = mesh.geometry;
  const pressures = geometry.attributes.pressure;
  const colors = geometry.attributes.color;
  const color = new THREE.Color();

  let lut = new Lut();
  lut.setColorMap("rainbow");

  lut.setMax(Math.max(...pressures.array));
  lut.setMin(Math.min(...pressures.array));

  for (let i = 0; i < pressures.array.length; i++) {
    const colorValue = pressures.array[i];

    color.copy(lut.getColor(colorValue)).convertSRGBToLinear();
    colors.setXYZ(i, color.r, color.g, color.b);
  }

  colors.needsUpdate = true;

  return mesh;
}
