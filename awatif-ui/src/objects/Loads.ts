import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";

export function Loads(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val;

  let displayScaleCache = displayScale.val;
  let nodesCache = nodes.val;

  van.derive(() => (nodesCache = nodes.val));

  // on settings.loads, model.assignment, and model.nodes update: replace arrows
  van.derive(() => {
    settings.deformedShape.val; // trigger update when changed
    group.visible = settings.loads.val;

    if (!settings.loads.val) return;

    group.children.forEach((o) => (o as THREE.ArrowHelper).dispose());
    group.clear();
    model.val.assignments.loads.forEach((load, index) => {
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(...load).normalize(),
        new THREE.Vector3(...nodesCache[index]),
        1,
        0xee9b00,
        0.3,
        0.3
      );

      const scale = size * displayScaleCache;
      arrow.scale.set(scale, scale, scale);

      group.add(arrow);
    });
  });

  // on settings.loads and setting.displayScale change: change scale
  van.derive(() => {
    if (!settings.loads.val) return;

    const scale = size * displayScale.val;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));

    displayScaleCache = displayScale.val;
  });

  return group;
}
