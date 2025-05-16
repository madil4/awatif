import * as THREE from "three";
import { Node, Element } from "awatif-fem";

import { Lut } from "three/addons/math/Lut.js";
import van, { State } from "vanjs-core";

export function getColorMap(
  nodes: State<Node[]>,
  elements: State<Element[]>,
  values: State<number[]>
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

  // Events
  // When nodes, elements or values change, update the color map
  van.derive(() => {
    // Update geometry
    colorMap.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodes.val.flat(), 3)
    );
    colorMap.geometry.setIndex(
      new THREE.Uint16BufferAttribute(elements.val.flat(), 1)
    );

    colorMap.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(nodes.val.map(() => [0, 0, 0]).flat(), 3)
    );

    // Update colors
    lut.setMax(Math.max(...values.val));
    lut.setMin(Math.min(...values.val));

    for (let i = 0; i < values.val.length; i++) {
      color.copy(lut.getColor(values.val[i])).convertSRGBToLinear();

      color.multiplyScalar(0.6); // dim the color for better integration with mesh

      colorMap.geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
    }
  });

  return colorMap;
}
