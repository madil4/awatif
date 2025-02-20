import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Node } from "awatif-data-structure";
import { Settings } from "../settings/settings";

export function columns(
  settings: Settings,
  derivedNodes: State<Node[]>,
  derivedDisplayScale: State<number>,
  length: number
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0x000000 }) // Default black color for lines
  );

  lines.frustumCulled = false;

  // Update geometry when settings.nodes or derivedNodes changes
  van.derive(() => {
    if (!settings.nodes.val) return;

    const positions: number[] = [];

    // Create lines representing columns based on derivedNodes
    derivedNodes.val.forEach((node) => {
      const [x, y, z] = node.position;
      positions.push(x, y, z, x, y, z + length); // Create a vertical line for the column
    });

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
  });

  // Update line width based on derivedDisplayScale
  van.derive(() => {
    derivedDisplayScale.val; // Trigger reactivity

    if (!settings.nodes.rawVal) return;

    // Adjust line thickness based on display scale
    lines.material.linewidth = 1 * derivedDisplayScale.rawVal; // linewidth works only with special renderers like `THREE.WebGLRenderer` with Line2
  });

  // Update visibility based on settings.nodes
  van.derive(() => {
    lines.visible = settings.nodes.val;
  });

  return lines;
}
