import * as THREE from "three";
import van, { State } from "vanjs-core";
import { getText } from "../text/getText";

// Configuration constants
const CONFIG = {
  SPHERE_RADIUS: 0.015,
  ARROW_SCALE: 0.5,
  ARROW_HEAD_LENGTH: 0.08,
  ARROW_HEAD_WIDTH: 0.04,
  LABEL_OFFSET: 0.1,
  LABEL_SIZE: 0.2,
  DISPLACEMENT_COLOR: 0x00ff00,
  REACTION_COLOR: 0xff0000,
};

export interface PointResultProps {
  displacements?: State<
    Map<number, [number, number, number, number, number, number]>
  >;
  reactions?: State<
    Map<number, [number, number, number, number, number, number]>
  >;
  display: State<string>;
  nodes: State<number[][]>;
  render: () => void;
}

export function getPointResults({
  displacements,
  reactions,
  display,
  nodes,
  render,
}: PointResultProps): THREE.Group {
  const group = new THREE.Group();

  // Cached geometries and materials for performance
  const sphereGeometry = new THREE.SphereGeometry(CONFIG.SPHERE_RADIUS, 16, 16);
  const displacementMaterial = new THREE.MeshBasicMaterial({
    color: CONFIG.DISPLACEMENT_COLOR,
  });
  const lineMaterial = new THREE.LineBasicMaterial({
    color: CONFIG.DISPLACEMENT_COLOR,
  });

  van.derive(() => {
    // Clear previous objects with proper disposal
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
      }
      if (child instanceof THREE.Sprite) {
        child.material.map?.dispose();
        child.material.dispose();
      }
      group.remove(child);
    }

    const currentNodes = nodes.val;
    if (!currentNodes || currentNodes.length === 0) return;

    if (display.val === "Displacements" && displacements?.val) {
      displacements.val.forEach((disp, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
          // disp is [ux, uy, uz, rx, ry, rz]
          const ux = disp[0] || 0;
          const uy = disp[1] || 0;
          const uz = disp[2] || 0;
          const rz = disp[5] || 0; // Rotation about Z axis

          // Draw deformed position as a sphere (use cached geometry/material)
          const sphere = new THREE.Mesh(sphereGeometry, displacementMaterial);
          sphere.position.set(node[0] + ux, node[1] + uy, node[2] + uz);
          group.add(sphere);

          // Draw a line from original to deformed position (use cached material)
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(node[0], node[1], node[2]),
            new THREE.Vector3(node[0] + ux, node[1] + uy, node[2] + uz),
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          group.add(line);

          // Add text label with displacement values (x, y, Rz)
          const textLabel = `U: ${ux.toFixed(2)}, ${uy.toFixed(
            2
          )}, Rz: ${rz.toFixed(3)}`;
          const textSprite = getText(
            textLabel,
            [
              node[0] + ux + CONFIG.LABEL_OFFSET,
              node[1] + uy + CONFIG.LABEL_OFFSET,
              node[2] + uz,
            ],
            "#00ff00",
            CONFIG.LABEL_SIZE
          );
          group.add(textSprite);
        }
      });
    }

    if (display.val === "Reactions" && reactions?.val) {
      reactions.val.forEach((react, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
          // react is [fx, fy, fz, mx, my, mz]
          const fx = react[0] || 0;
          const fy = react[1] || 0;
          const fz = react[2] || 0;

          const origin = new THREE.Vector3(node[0], node[1], node[2]);
          const forceDir = new THREE.Vector3(fx, fy, fz);
          const length = forceDir.length();

          if (length > 0) {
            // Draw arrow for force
            const arrowHelper = new THREE.ArrowHelper(
              forceDir.clone().normalize(),
              origin,
              length * CONFIG.ARROW_SCALE,
              CONFIG.REACTION_COLOR,
              CONFIG.ARROW_HEAD_LENGTH,
              CONFIG.ARROW_HEAD_WIDTH
            );
            group.add(arrowHelper);

            // Add text label with reaction values
            const textLabel = `R: ${fx.toFixed(2)}, ${fy.toFixed(2)}`;
            const textSprite = getText(
              textLabel,
              [
                node[0] + CONFIG.LABEL_OFFSET * 3,
                node[1] + CONFIG.LABEL_OFFSET * 3,
                node[2],
              ],
              "#ff0000",
              CONFIG.LABEL_SIZE
            );
            group.add(textSprite);
          }
        }
      });
    }

    render();
  });

  return group;
}
