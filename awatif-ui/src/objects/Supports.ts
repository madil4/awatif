import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";

export function Supports(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x9b2226 });
  const size = 0.05 * settings.gridSize.val * 0.6;

  let displayScaleCache = displayScale.val;
  let nodesCache = nodes.val;

  van.derive(() => (nodesCache = nodes.val));

  // on settings.support, model.assignment, and model.nodes update
  van.derive(() => {
    settings.deformedShape.val; // trigger update when changed
    group.visible = settings.supports.val;

    if (!settings.supports.val) return;

    group.clear();
    model.val.assignments.supports.forEach((_, index) => {
      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.set(...nodesCache[index]);
      const scale = size * displayScaleCache;
      sphere.scale.set(scale, scale, scale);

      group.add(sphere);
    });
  });

  // on settings.support and setting.displayScale change
  van.derive(() => {
    if (!settings.supports.val) return;

    const scale = size * displayScale.val;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));

    displayScaleCache = displayScale.val;
  });

  return group;
}
