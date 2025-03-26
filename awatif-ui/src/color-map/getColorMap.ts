import * as THREE from "three";
import { Node, Element } from "awatif-data-structure";

import { Lut } from "three/addons/math/Lut.js";

export function getColorMap(
  nodes: Node[],
  elements: Element[],
  values: number[]
): THREE.Mesh {
  // Init
  const lut = new Lut();
  const color = new THREE.Color();

  const colorMap = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
    })
  );

  // Update
  lut.setColorMap("rainbow");
  colorMap.renderOrder = -1; // to ensure that it always set behind the mesh

  // Update geometry
  colorMap.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodes.flat(), 3)
  );
  colorMap.geometry.setIndex(
    new THREE.Uint16BufferAttribute(elements.flat(), 1)
  );

  colorMap.geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(nodes.map(() => [0, 0, 0]).flat(), 3)
  );

  // Update colors
  lut.setMax(Math.max(...values));
  lut.setMin(Math.min(...values));

  for (let i = 0; i < values.length; i++) {
    color.copy(lut.getColor(values[i])).convertSRGBToLinear();

    color.multiplyScalar(0.6); // dim the color for better integration with mesh

    colorMap.geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
  }

  return colorMap;
}
