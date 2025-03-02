import { Lut } from "three/addons/math/Lut.js";
import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Node, Structure, Element } from "awatif-data-structure";
import { Settings } from "../settings/settings";

export function contours(
  nodes: State<Node[]>,
  elements: State<Element[]>,
  contourValues: State<number[]>,
  contourOptions: State<string>,
): State<THREE.Mesh> {
  let contourMesh = getContourBaseMesh(
    nodes.val,
    elements.val
  );
  van.derive(() => {
    if (!contourOptions.val) return;

    contourMesh = getContourBaseMesh(
      nodes.val,
      elements.val
    );

    contourMesh = addColorToMesh(contourMesh, contourValues.val);
  });

  return van.state(contourMesh);
}

// Utils ------------------------------------------------------
function getContourBaseMesh(nodes: Node[], elements: Element[]): THREE.Mesh {
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

function addColorToMesh(mesh: THREE.Mesh, contourValues: number[]): THREE.Mesh {
  const geometry = mesh.geometry;
  const colors = geometry.attributes.color;
  const color = new THREE.Color();

  let lut = new Lut();
  lut.setColorMap("rainbow");

  lut.setMax(Math.max(...contourValues));
  lut.setMin(Math.min(...contourValues));

  for (let i = 0; i < contourValues.length; i++) {
    const colorValue = contourValues[i];

    color.copy(lut.getColor(colorValue)).convertSRGBToLinear();
    colors.setXYZ(i, color.r, color.g, color.b);
  }

  colors.needsUpdate = true;

  return mesh;
}
