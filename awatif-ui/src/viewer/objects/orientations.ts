import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Node } from "awatif-data-structure";
import { Structure } from "awatif-data-structure";
import { Settings } from "../settings/settings";

import { getTransformationMatrixBeam } from "./utils/getTransformationMatrixBeam";
import { get10thFromFirstPoint } from "./utils/get5thFromFirstPoint";
import { getAverage } from "./utils/getAverage";
import { getTransformationMatrixShell } from "./utils/getTransformationMatrixShell";

export function orientations(
  structure: Structure,
  settings: Settings,
  derivedNodes: State<Node[]>,
  derivedDisplayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  const size = 0.05 * settings.gridSize.rawVal * 0.75;

  // update
  const o = [0, 0, 0];
  const x = [1, 0, 0];
  const y = [0, 1, 0];
  const z = [0, 0, 1];
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([...o, ...x, ...o, ...y, ...o, ...z], 3)
  );

  const xColor = [255, 0, 0];
  const yColor = [0, 255, 0];
  const zColor = [0, 0, 255];
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(
      [...xColor, ...xColor, ...yColor, ...yColor, ...zColor, ...zColor],
      3
    )
  );

  // on settings.orientations * deformedShape, and model clear and create visuals
  van.derive(() => {
    settings.deformedShape.val; // triggers update

    if (!settings.orientations.val) return;

    group.clear();

    structure.elements?.val.forEach((element) => {
      const axes = new THREE.LineSegments(geometry, material);
      const node1 = derivedNodes.rawVal[element[0]];
      const node2 = derivedNodes.rawVal[element[1]];

      if (element.length === 2) {
        // beam element
        axes.position.set(...get10thFromFirstPoint(node1, node2));
        axes.rotation.setFromRotationMatrix(
          getTransformationMatrixBeam(node1, node2)
        );
      }

      if (element.length === 3) {
        // shell element
        const node3 = derivedNodes.rawVal[element[2]];

        axes.position.set(...getAverage([node1, node2, node3]));
        axes.rotation.setFromRotationMatrix(
          getTransformationMatrixShell(node1, node2, node3)
        );
      }

      const scale = size * derivedDisplayScale.rawVal;
      axes.scale.set(scale, scale, scale);

      group.add(axes);
    });
  });

  // on derivedDisplayScale update scale
  van.derive(() => {
    derivedDisplayScale.val;

    if (!settings.orientations.rawVal) return;

    const scale = size * derivedDisplayScale.rawVal;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));
  });

  // on settings.orientations update scale
  van.derive(() => {
    group.visible = settings.orientations.val;
  });

  return group;
}
