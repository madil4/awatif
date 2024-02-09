import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";
import { getTransformationMatrix } from "../utils/getTransformationMatrix";
import { get10thFromFirstPoint } from "../utils/get5thFromFirstPoint";

export function Orientations(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  const size = 0.05 * settings.gridSize.val * 0.75;

  let displayScaleCache = displayScale.val;
  let nodesCache = nodes.val;

  van.derive(() => (nodesCache = nodes.val));

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

  // on settings.orientations, model.elements, and model.nodes update
  van.derive(() => {
    settings.deformedShape.val; // trigger update when changed
    group.visible = settings.orientations.val;

    if (!settings.orientations.val) return;

    group.clear();
    model.val.elements.forEach((element) => {
      const axes = new THREE.LineSegments(geometry, material);
      const node1 = nodesCache[element[0]];
      const node2 = nodesCache[element[1]];

      axes.position.set(...get10thFromFirstPoint(node1, node2));
      axes.rotation.setFromRotationMatrix(
        getTransformationMatrix(node1, node2)
      );

      const scale = size * displayScaleCache;
      axes.scale.set(scale, scale, scale);

      group.add(axes);
    });
  });

  // on settings.orientations and setting.displayScale change
  van.derive(() => {
    if (!settings.orientations.val) return;

    const scale = size * displayScale.val;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));

    displayScaleCache = displayScale.val;
  });

  return group;
}
