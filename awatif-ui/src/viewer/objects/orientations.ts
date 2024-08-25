import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../../types";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { get10thFromFirstPoint } from "./utils/get5thFromFirstPoint";
import { Node } from "awatif-data-structure";

export function orientations(
  model: ModelState,
  settings: SettingsState,
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

    model.val.elements.forEach((element) => {
      const axes = new THREE.LineSegments(geometry, material);
      const node1 = derivedNodes.rawVal[element[0]];
      const node2 = derivedNodes.rawVal[element[1]];

      axes.position.set(...get10thFromFirstPoint(node1, node2));
      axes.rotation.setFromRotationMatrix(
        getTransformationMatrix(node1, node2)
      );

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
