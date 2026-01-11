import * as THREE from "three";
import van, { State } from "vanjs-core";
import { getText } from "../text/getText";

// Configuration constants
const CONFIG = {
  SPHERE_RADIUS: 0.015,
  CONE_RADIUS: 0.04,
  CONE_HEIGHT: 0.08,
  ARROW_SCALE: 0.5,
  LABEL_OFFSET: 0.1,
  LABEL_SIZE: 0.2,
  DISPLACEMENT_COLOR: 0x00ff00,
  REACTION_COLOR: 0xff0000,
  MAX_TEXT_LABELS: 50, // Top N labels by magnitude
  INITIAL_CAPACITY: 1000, // Initial buffer capacity
  GROWTH_FACTOR: 1.5, // Buffer growth factor when resizing
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

// Label candidate for priority-based labeling
interface LabelCandidate {
  magnitude: number;
  position: [number, number, number];
  text: string;
  color: string;
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
  // DYNAMIC BUFFER STATE - grows as needed for enterprise scale
  // ============================================================
  let currentCapacity = CONFIG.INITIAL_CAPACITY;

  // Shared geometries (created once)
  const sphereGeometry = new THREE.SphereGeometry(CONFIG.SPHERE_RADIUS, 8, 8);
  const coneGeometry = new THREE.ConeGeometry(
    CONFIG.CONE_RADIUS,
    CONFIG.CONE_HEIGHT,
    8
  );

  // Materials (shared)
  const displacementMaterial = new THREE.MeshBasicMaterial({
    color: CONFIG.DISPLACEMENT_COLOR,
  });
  const reactionMaterial = new THREE.MeshBasicMaterial({
    color: CONFIG.REACTION_COLOR,
  });
  const displacementLineMaterial = new THREE.LineBasicMaterial({
    color: CONFIG.DISPLACEMENT_COLOR,
  });
  const reactionLineMaterial = new THREE.LineBasicMaterial({
    color: CONFIG.REACTION_COLOR,
  });

  // ============================================================
  // DISPLACEMENT: InstancedMesh for nodes + LineSegments for lines
  // ============================================================
  let dispInstancedMesh = new THREE.InstancedMesh(
    sphereGeometry,
    displacementMaterial,
    currentCapacity
  );
  dispInstancedMesh.count = 0;
  dispInstancedMesh.visible = false;
  group.add(dispInstancedMesh);

  let dispLinePositions = new Float32Array(currentCapacity * 6);
  let dispLineGeometry = new THREE.BufferGeometry();
  dispLineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(dispLinePositions, 3)
  );
  dispLineGeometry.setDrawRange(0, 0);
  let dispLineSegments = new THREE.LineSegments(
    dispLineGeometry,
    displacementLineMaterial
  );
  dispLineSegments.visible = false;
  group.add(dispLineSegments);

  // ============================================================
  // REACTION: InstancedMesh for cones + LineSegments for shafts
  // ============================================================
  let reactInstancedMesh = new THREE.InstancedMesh(
    coneGeometry,
    reactionMaterial,
    currentCapacity
  );
  reactInstancedMesh.count = 0;
  reactInstancedMesh.visible = false;
  group.add(reactInstancedMesh);

  let reactLinePositions = new Float32Array(currentCapacity * 6);
  let reactLineGeometry = new THREE.BufferGeometry();
  reactLineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(reactLinePositions, 3)
  );
  reactLineGeometry.setDrawRange(0, 0);
  let reactLineSegments = new THREE.LineSegments(
    reactLineGeometry,
    reactionLineMaterial
  );
  reactLineSegments.visible = false;
  group.add(reactLineSegments);

  // Dummy object for matrix calculations (reused)
  const dummy = new THREE.Object3D();
  const upVector = new THREE.Vector3(0, 1, 0);

  // Container for text sprites (dynamic)
  const textGroup = new THREE.Group();
  group.add(textGroup);

  // ============================================================
  // RESIZE BUFFERS - dynamic growth for enterprise scale
  // ============================================================
  function resizeBuffers(requiredCapacity: number): void {
    const newCapacity = Math.ceil(requiredCapacity * CONFIG.GROWTH_FACTOR);
    console.log(
      `Resizing buffers: ${currentCapacity} → ${newCapacity} (required: ${requiredCapacity})`
    );

    // Dispose old displacement resources
    group.remove(dispInstancedMesh);
    dispInstancedMesh.dispose();
    group.remove(dispLineSegments);
    dispLineGeometry.dispose();

    // Dispose old reaction resources
    group.remove(reactInstancedMesh);
    reactInstancedMesh.dispose();
    group.remove(reactLineSegments);
    reactLineGeometry.dispose();

    // Update capacity
    currentCapacity = newCapacity;

    // Recreate displacement mesh and lines
    dispInstancedMesh = new THREE.InstancedMesh(
      sphereGeometry,
      displacementMaterial,
      currentCapacity
    );
    dispInstancedMesh.count = 0;
    dispInstancedMesh.visible = false;
    group.add(dispInstancedMesh);

    dispLinePositions = new Float32Array(currentCapacity * 6);
    dispLineGeometry = new THREE.BufferGeometry();
    dispLineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dispLinePositions, 3)
    );
    dispLineGeometry.setDrawRange(0, 0);
    dispLineSegments = new THREE.LineSegments(
      dispLineGeometry,
      displacementLineMaterial
    );
    dispLineSegments.visible = false;
    group.add(dispLineSegments);

    // Recreate reaction mesh and lines
    reactInstancedMesh = new THREE.InstancedMesh(
      coneGeometry,
      reactionMaterial,
      currentCapacity
    );
    reactInstancedMesh.count = 0;
    reactInstancedMesh.visible = false;
    group.add(reactInstancedMesh);

    reactLinePositions = new Float32Array(currentCapacity * 6);
    reactLineGeometry = new THREE.BufferGeometry();
    reactLineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(reactLinePositions, 3)
    );
    reactLineGeometry.setDrawRange(0, 0);
    reactLineSegments = new THREE.LineSegments(
      reactLineGeometry,
      reactionLineMaterial
    );
    reactLineSegments.visible = false;
    group.add(reactLineSegments);
  }

  van.derive(() => {
    // Clear text sprites with proper disposal
    while (textGroup.children.length > 0) {
      const child = textGroup.children[0] as THREE.Sprite;
      child.material.map?.dispose();
      child.material.dispose();
      textGroup.remove(child);
    }

    const currentNodes = nodes.val;
    if (!currentNodes || currentNodes.length === 0) {
      dispInstancedMesh.visible = false;
      dispLineSegments.visible = false;
      reactInstancedMesh.visible = false;
      reactLineSegments.visible = false;
      render();
      return;
    }

    // Check if buffer resize is needed
    const maxRequired = Math.max(
      displacements?.val?.size || 0,
      reactions?.val?.size || 0
    );
    if (maxRequired > currentCapacity) {
      resizeBuffers(maxRequired);
    }

    // ============================================================
    // DISPLACEMENTS MODE
    // ============================================================
    if (display.val === "Displacements" && displacements?.val) {
      dispInstancedMesh.visible = true;
      dispLineSegments.visible = true;
      reactInstancedMesh.visible = false;
      reactLineSegments.visible = false;

      let instanceCount = 0;
      let lineIndex = 0;
      const positionAttr = dispLineGeometry.attributes
        .position as THREE.BufferAttribute;
      const labelCandidates: LabelCandidate[] = [];

      displacements.val.forEach((disp, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
          const ux = disp[0] || 0;
          const uy = disp[1] || 0;
          const uz = disp[2] || 0;
          const rz = disp[5] || 0;
          const magnitude = Math.sqrt(ux * ux + uy * uy + uz * uz);

          // Update instanced mesh matrix
          dummy.position.set(node[0] + ux, node[1] + uy, node[2] + uz);
          dummy.scale.set(1, 1, 1);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          dispInstancedMesh.setMatrixAt(instanceCount, dummy.matrix);

          // Update line segment positions
          positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
          positionAttr.setXYZ(
            lineIndex++,
            node[0] + ux,
            node[1] + uy,
            node[2] + uz
          );

          // Collect label candidate for priority sorting
          labelCandidates.push({
            magnitude,
            position: [
              node[0] + ux + CONFIG.LABEL_OFFSET,
              node[1] + uy + CONFIG.LABEL_OFFSET,
              node[2] + uz,
            ],
            text: `U: ${ux.toFixed(2)}, ${uy.toFixed(2)}, Rz: ${rz.toFixed(3)}`,
            color: "#00ff00",
          });

          instanceCount++;
        }
      });

      // Update instanced mesh
      dispInstancedMesh.count = instanceCount;
      dispInstancedMesh.instanceMatrix.needsUpdate = true;

      // Update line segments
      dispLineGeometry.setDrawRange(0, lineIndex);
      positionAttr.needsUpdate = true;

      // Smart labeling: render top N by magnitude
      labelCandidates
        .sort((a, b) => b.magnitude - a.magnitude)
        .slice(0, CONFIG.MAX_TEXT_LABELS)
        .forEach((item) => {
          const sprite = getText(
            item.text,
            item.position,
            item.color,
            CONFIG.LABEL_SIZE
          );
          textGroup.add(sprite);
        });
    }

    // ============================================================
    // REACTIONS MODE (InstancedMesh cones + LineSegments)
    // ============================================================
    if (display.val === "Reactions" && reactions?.val) {
      dispInstancedMesh.visible = false;
      dispLineSegments.visible = false;
      reactInstancedMesh.visible = true;
      reactLineSegments.visible = true;

      let instanceCount = 0;
      let lineIndex = 0;
      const positionAttr = reactLineGeometry.attributes
        .position as THREE.BufferAttribute;
      const labelCandidates: LabelCandidate[] = [];

      reactions.val.forEach((react, nodeIndex) => {
        const node = currentNodes[nodeIndex];
        if (node) {
          const fx = react[0] || 0;
          const fy = react[1] || 0;
          const fz = react[2] || 0;
          const magnitude = Math.sqrt(fx * fx + fy * fy + fz * fz);

          if (magnitude > 0) {
            const forceDir = new THREE.Vector3(fx, fy, fz).normalize();
            const scaledLength = magnitude * CONFIG.ARROW_SCALE;

            // Tip position (where cone goes)
            const tipX = node[0] + fx * CONFIG.ARROW_SCALE;
            const tipY = node[1] + fy * CONFIG.ARROW_SCALE;
            const tipZ = node[2] + fz * CONFIG.ARROW_SCALE;

            // Position cone at tip, oriented along force direction
            dummy.position.set(
              tipX - forceDir.x * CONFIG.CONE_HEIGHT * 0.5,
              tipY - forceDir.y * CONFIG.CONE_HEIGHT * 0.5,
              tipZ - forceDir.z * CONFIG.CONE_HEIGHT * 0.5
            );
            dummy.quaternion.setFromUnitVectors(upVector, forceDir);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            reactInstancedMesh.setMatrixAt(instanceCount, dummy.matrix);

            // Line from node origin to cone base
            positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
            positionAttr.setXYZ(
              lineIndex++,
              tipX - forceDir.x * CONFIG.CONE_HEIGHT,
              tipY - forceDir.y * CONFIG.CONE_HEIGHT,
              tipZ - forceDir.z * CONFIG.CONE_HEIGHT
            );

            // Collect label candidate
            labelCandidates.push({
              magnitude,
              position: [
                node[0] + CONFIG.LABEL_OFFSET * 3,
                node[1] + CONFIG.LABEL_OFFSET * 3,
                node[2],
              ],
              text: `R: ${fx.toFixed(2)}, ${fy.toFixed(2)}`,
              color: "#ff0000",
            });

            instanceCount++;
          }
        }
      });

      // Update instanced mesh
      reactInstancedMesh.count = instanceCount;
      reactInstancedMesh.instanceMatrix.needsUpdate = true;

      // Update line segments
      reactLineGeometry.setDrawRange(0, lineIndex);
      positionAttr.needsUpdate = true;

      // Smart labeling: render top N by magnitude
      labelCandidates
        .sort((a, b) => b.magnitude - a.magnitude)
        .slice(0, CONFIG.MAX_TEXT_LABELS)
        .forEach((item) => {
          const sprite = getText(
            item.text,
            item.position,
            item.color,
            CONFIG.LABEL_SIZE
          );
          textGroup.add(sprite);
        });
    }

    // Hide all if "None" selected
    if (display.val === "None") {
      dispInstancedMesh.visible = false;
      dispLineSegments.visible = false;
      reactInstancedMesh.visible = false;
      reactLineSegments.visible = false;
    }

    render();
  });

  return group;
}
