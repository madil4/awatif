import * as THREE from "three";
import { SettingsState, Node } from "../types";
import van, { State } from "vanjs-core";

export function Nodes(
  nodes: State<Node[]>,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> {
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial()
  );
  const size = 0.05 * settings.gridSize.val * 0.5;
  points.frustumCulled = false;

  // on settings.nodes, and model.nodes update: update buffer
  van.derive(() => {
    points.visible = settings.nodes.val;

    if (!settings.nodes.val) return;

    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodes.val.flat(), 3)
    );
  });

  // on settings.nodes and setting.displayScale change: change scale
  van.derive(() => {
    if (!settings.nodes.val) return;

    points.material.size = size * displayScale.val;
  });

  return points;
}
