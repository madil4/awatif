import * as THREE from "three";
import van, { State } from "vanjs-core";
import { getText } from "../text/getText";

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

  van.derive(() => {
    // Clear previous objects
    while (group.children.length > 0) {
      group.remove(group.children[0]);
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

          // Draw deformed position as a sphere
          const sphereGeometry = new THREE.SphereGeometry(0.015, 16, 16);
          const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          sphere.position.set(node[0] + ux, node[1] + uy, node[2] + uz);
          group.add(sphere);

          // Draw a line from original to deformed position
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(node[0], node[1], node[2]),
            new THREE.Vector3(node[0] + ux, node[1] + uy, node[2] + uz),
          ]);
          const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          group.add(line);

          // Add text label with displacement values (x, y, Rz)
          const textLabel = `U: ${ux.toFixed(2)}, ${uy.toFixed(
            2
          )}, Rz: ${rz.toFixed(3)}`;
          const textSprite = getText(
            textLabel,
            [node[0] + ux + 0.1, node[1] + uy + 0.1, node[2] + uz],
            "#00ff00",
            0.2
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
            // Draw arrow for force (reduced size)
            const arrowHelper = new THREE.ArrowHelper(
              forceDir.clone().normalize(),
              origin,
              length * 0.5, // Reduced scale
              0xff0000,
              0.08,
              0.04
            );
            group.add(arrowHelper);

            // Add text label with reaction values (consistent position: top-right)
            const textLabel = `R: ${fx.toFixed(2)}, ${fy.toFixed(2)}`;
            const textSprite = getText(
              textLabel,
              [node[0] + 0.3, node[1] + 0.3, node[2]],
              "#ff0000",
              0.2
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
