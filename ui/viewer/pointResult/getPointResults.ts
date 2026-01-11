import * as THREE from "three";
import van, { State } from "vanjs-core";

export interface PointResultProps {
  displacements?: State<Map<number, number[]>>;
  reactions?: State<Map<number, number[]>>;
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

  const displacementMaterial = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.1,
  });

  const reactionMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });

  van.derive(() => {
    group.clear();

    const currentNodes = nodes.val;
    if (!currentNodes || currentNodes.length === 0) return;

    if (display.val === "Displacements" && displacements?.val) {
      const positions: number[] = [];
      displacements.val.forEach((disp, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
          // disp is [ux, uy, uz, rx, ry, rz]
          // only plot x, y, Rz. For visualization, we use ux, uy.
          // Rz could be shown as rotation but let's start with translation.
          const scale = 1; // Default scale
          positions.push(
            node[0] + (disp[0] || 0) * scale,
            node[1] + (disp[1] || 0) * scale,
            node[2] + (disp[2] || 0) * scale
          );
        }
      });

      if (positions.length > 0) {
        const geometry = new THREE.BufferGeometry().setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        const points = new THREE.Points(geometry, displacementMaterial);
        group.add(points);
      }
    }

    if (display.val === "Reactions" && reactions?.val) {
      reactions.val.forEach((react, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
          // react is [fx, fy, fz, mx, my, mz]
          // only plot x, y, Rz (Mz).
          const origin = new THREE.Vector3(...node);

          // Force vector (fx, fy, fz)
          const forceDir = new THREE.Vector3(react[0], react[1], react[2]);
          const length = forceDir.length();
          if (length > 0) {
            const arrowHelper = new THREE.ArrowHelper(
              forceDir.normalize(),
              origin,
              length,
              0xff0000
            );
            group.add(arrowHelper);
          }
        }
      });
    }

    render();
  });

  return group;
}
