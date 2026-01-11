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
  MAX_INSTANCES: 10000, // Max nodes for InstancedMesh
  MAX_TEXT_LABELS: 200, // Throttle text labels for performance
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

  // ============================================================
  // INSTANCED MESH for displacement nodes (single draw call)
  // ============================================================
  const sphereGeometry = new THREE.SphereGeometry(CONFIG.SPHERE_RADIUS, 8, 8);
  const displacementMaterial = new THREE.MeshBasicMaterial({
    color: CONFIG.DISPLACEMENT_COLOR,
  });
  const instancedMesh = new THREE.InstancedMesh(
    sphereGeometry,
    displacementMaterial,
    CONFIG.MAX_INSTANCES
  );
  instancedMesh.count = 0; // Start with zero visible instances
  instancedMesh.visible = false;
  group.add(instancedMesh);

  // Dummy object for matrix calculations (reused)
  const dummy = new THREE.Object3D();

  // ============================================================
  // LINE SEGMENTS for displacement lines (single draw call)
  // ============================================================
  const linePositions = new Float32Array(CONFIG.MAX_INSTANCES * 2 * 3);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(linePositions, 3)
  );
  lineGeometry.setDrawRange(0, 0);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: CONFIG.DISPLACEMENT_COLOR,
  });
  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  lineSegments.visible = false;
  group.add(lineSegments);

  // ============================================================
  // Container for text sprites and reaction arrows (dynamic)
  // ============================================================
  const dynamicGroup = new THREE.Group();
  group.add(dynamicGroup);

  van.derive(() => {
    // Clear dynamic objects with proper disposal
    while (dynamicGroup.children.length > 0) {
      const child = dynamicGroup.children[0];
      if (child instanceof THREE.Sprite) {
        child.material.map?.dispose();
        child.material.dispose();
      }
      if (child instanceof THREE.ArrowHelper) {
        // Dispose ArrowHelper internals
        child.line.geometry.dispose();
        child.cone.geometry.dispose();
      }
      dynamicGroup.remove(child);
    }

    const currentNodes = nodes.val;
    if (!currentNodes || currentNodes.length === 0) {
      instancedMesh.visible = false;
      lineSegments.visible = false;
      render();
      return;
    }

    // ============================================================
    // DISPLACEMENTS MODE
    // ============================================================
    if (display.val === "Displacements" && displacements?.val) {
      instancedMesh.visible = true;
      lineSegments.visible = true;

      let instanceCount = 0;
      let lineIndex = 0;
      const positionAttr = lineGeometry.attributes
        .position as THREE.BufferAttribute;

      displacements.val.forEach((disp, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node && instanceCount < CONFIG.MAX_INSTANCES) {
          const ux = disp[0] || 0;
          const uy = disp[1] || 0;
          const uz = disp[2] || 0;
          const rz = disp[5] || 0;

          // Update instanced mesh matrix
          dummy.position.set(node[0] + ux, node[1] + uy, node[2] + uz);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(instanceCount, dummy.matrix);

          // Update line segment positions (original → deformed)
          positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
          positionAttr.setXYZ(
            lineIndex++,
            node[0] + ux,
            node[1] + uy,
            node[2] + uz
          );

          // Add text label (throttled for performance)
          if (instanceCount < CONFIG.MAX_TEXT_LABELS) {
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
            dynamicGroup.add(textSprite);
          }

          instanceCount++;
        }
      });

      // Warn if labels were suppressed
      if (displacements.val.size > CONFIG.MAX_TEXT_LABELS) {
        console.warn(
          `Text labels suppressed: ${displacements.val.size} nodes exceeds ${CONFIG.MAX_TEXT_LABELS}`
        );
      }

      // Update instanced mesh
      instancedMesh.count = instanceCount;
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Update line segments draw range
      lineGeometry.setDrawRange(0, lineIndex);
      positionAttr.needsUpdate = true;
    } else {
      instancedMesh.visible = false;
      lineSegments.visible = false;
    }

    // ============================================================
    // REACTIONS MODE
    // ============================================================
    if (display.val === "Reactions" && reactions?.val) {
      let reactionCount = 0;

      reactions.val.forEach((react, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
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
            dynamicGroup.add(arrowHelper);

            // Add text label (throttled)
            if (reactionCount < CONFIG.MAX_TEXT_LABELS) {
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
              dynamicGroup.add(textSprite);
            }

            reactionCount++;
          }
        }
      });

      // Warn if labels were suppressed
      if (reactions.val.size > CONFIG.MAX_TEXT_LABELS) {
        console.warn(
          `Reaction labels suppressed: ${reactions.val.size} nodes exceeds ${CONFIG.MAX_TEXT_LABELS}`
        );
      }
    }

    render();
  });

  return group;
}
