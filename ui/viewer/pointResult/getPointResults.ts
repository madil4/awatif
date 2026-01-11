import * as THREE from "three";
import van, { State } from "vanjs-core";
import { getText } from "../text/getText";

// Configuration constants
const CONFIG = {
  CONE_RADIUS: 0.04,
  CONE_HEIGHT: 0.08,
  ARROW_SCALE: 0.5,
  LABEL_OFFSET: 0.1,
  LABEL_SIZE: 0.2,
  DISPLACEMENT_COLOR: 0x00ff00,
  REACTION_COLOR: 0xff0000,
  INITIAL_CAPACITY: 1000,
  GROWTH_FACTOR: 1.5,
  MAX_LABELS: 50, // Top N labels by magnitude
  RZ_ARC_SEGMENTS: 24, // Segments for rotation arc
};

// Union type for display modes (P2: TYPE_DISPLAY_UNION)
export type PointResultsDisplay = "None" | "Displacements" | "Reactions";

interface PointResultProps {
  displacements?: State<
    Map<number, [number, number, number, number, number, number]>
  >;
  reactions?: State<
    Map<number, [number, number, number, number, number, number]>
  >;
  display: State<PointResultsDisplay>;
  nodes: State<number[][]>;
  render: () => void;
  resultsVersion?: State<number>; // P1: VANJS_MAP_REACTIVITY
}

// Label candidate for priority-based labeling (P1: LABELS_LIMIT_OR_POOL)
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
  resultsVersion,
}: PointResultProps): THREE.Group {
  const group = new THREE.Group();

  // ============================================================
  // DYNAMIC BUFFER STATE - grows as needed for enterprise scale
  // ============================================================
  let currentCapacity = CONFIG.INITIAL_CAPACITY;

  // Shared geometry (created once)
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

  // P0: REUSE_SCRATCH_VECTORS - reusable vectors for hot loops
  const dir = new THREE.Vector3();
  const tangentDir = new THREE.Vector3();

  // ============================================================
  // DISPLACEMENT: InstancedMesh for cones + LineSegments for lines
  // ============================================================
  let dispInstancedMesh = new THREE.InstancedMesh(
    coneGeometry,
    displacementMaterial,
    currentCapacity
  );
  dispInstancedMesh.count = 0;
  dispInstancedMesh.visible = false;
  dispInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // P1
  group.add(dispInstancedMesh);

  let dispLinePositions = new Float32Array(currentCapacity * 6);
  let dispLineGeometry = new THREE.BufferGeometry();
  const dispPosAttr = new THREE.BufferAttribute(dispLinePositions, 3);
  dispPosAttr.setUsage(THREE.DynamicDrawUsage); // P1
  dispLineGeometry.setAttribute("position", dispPosAttr);
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
  reactInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // P1
  group.add(reactInstancedMesh);

  let reactLinePositions = new Float32Array(currentCapacity * 6);
  let reactLineGeometry = new THREE.BufferGeometry();
  const reactPosAttr = new THREE.BufferAttribute(reactLinePositions, 3);
  reactPosAttr.setUsage(THREE.DynamicDrawUsage); // P1
  reactLineGeometry.setAttribute("position", reactPosAttr);
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
  // P0: CAPACITY_CALC_REAL - compute required capacity from actual primitives
  // ============================================================
  function ensureCapacity(
    requiredInstances: number,
    requiredLineVertices: number
  ): void {
    // Line buffer: Float32Array(capacity*6) = capacity*2 vertices
    const requiredLineCapacity = Math.ceil(requiredLineVertices / 2);
    const requiredCapacity = Math.max(requiredInstances, requiredLineCapacity);

    if (requiredCapacity > currentCapacity) {
      resizeBuffers(requiredCapacity);
    }
  }

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
      coneGeometry,
      displacementMaterial,
      currentCapacity
    );
    dispInstancedMesh.count = 0;
    dispInstancedMesh.visible = false;
    dispInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // P1
    group.add(dispInstancedMesh);

    dispLinePositions = new Float32Array(currentCapacity * 6);
    dispLineGeometry = new THREE.BufferGeometry();
    const newDispPosAttr = new THREE.BufferAttribute(dispLinePositions, 3);
    newDispPosAttr.setUsage(THREE.DynamicDrawUsage); // P1
    dispLineGeometry.setAttribute("position", newDispPosAttr);
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
    reactInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // P1
    group.add(reactInstancedMesh);

    reactLinePositions = new Float32Array(currentCapacity * 6);
    reactLineGeometry = new THREE.BufferGeometry();
    const newReactPosAttr = new THREE.BufferAttribute(reactLinePositions, 3);
    newReactPosAttr.setUsage(THREE.DynamicDrawUsage); // P1
    reactLineGeometry.setAttribute("position", newReactPosAttr);
    reactLineGeometry.setDrawRange(0, 0);
    reactLineSegments = new THREE.LineSegments(
      reactLineGeometry,
      reactionLineMaterial
    );
    reactLineSegments.visible = false;
    group.add(reactLineSegments);
  }

  // ============================================================
  // P1: LABELS_LIMIT_OR_POOL - dispose labels only when needed
  // ============================================================
  function clearLabels(): void {
    while (textGroup.children.length > 0) {
      const child = textGroup.children[0] as THREE.Sprite;
      child.material.map?.dispose();
      child.material.dispose();
      textGroup.remove(child);
    }
  }

  function renderTopLabels(candidates: LabelCandidate[]): void {
    // Sort by magnitude descending and take top N
    candidates
      .sort((a, b) => b.magnitude - a.magnitude)
      .slice(0, CONFIG.MAX_LABELS)
      .forEach((c) => {
        const sprite = getText(
          c.text,
          c.position,
          c.color,
          CONFIG.LABEL_SIZE * 0.8
        );
        textGroup.add(sprite);
      });
  }

  van.derive(() => {
    // P1: VANJS_MAP_REACTIVITY - read version to create dependency
    resultsVersion?.val;

    // Clear old labels
    clearLabels();

    const currentNodes = nodes.val;
    if (!currentNodes || currentNodes.length === 0) {
      dispInstancedMesh.visible = false;
      dispLineSegments.visible = false;
      reactInstancedMesh.visible = false;
      reactLineSegments.visible = false;
      render();
      return;
    }

    // ============================================================
    // DISPLACEMENTS MODE (Separate X, Y arrows + rotation arc)
    // ============================================================
    if (display.val === "Displacements" && displacements?.val) {
      // P0: Pre-compute required capacity
      let estInstances = 0;
      let estLineVertices = 0;
      displacements.val.forEach((disp) => {
        const ux = disp[0] || 0;
        const uy = disp[1] || 0;
        const rz = disp[5] || 0;
        if (Math.abs(ux) > 0.001) {
          estInstances++;
          estLineVertices += 2;
        }
        if (Math.abs(uy) > 0.001) {
          estInstances++;
          estLineVertices += 2;
        }
        if (Math.abs(rz) > 0.0001) {
          estInstances++; // arrowhead cone
          estLineVertices += CONFIG.RZ_ARC_SEGMENTS * 2; // arc segments
        }
      });
      ensureCapacity(estInstances, estLineVertices);

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
          const rz = disp[5] || 0;

          // Draw X displacement arrow if ux != 0
          if (Math.abs(ux) > 0.001) {
            dir.set(ux > 0 ? 1 : -1, 0, 0); // P0: reuse vector
            const tipX = node[0] + ux;

            // Cone at tip
            dummy.position.set(
              tipX - dir.x * CONFIG.CONE_HEIGHT * 0.5,
              node[1],
              node[2]
            );
            dummy.quaternion.setFromUnitVectors(upVector, dir);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            dispInstancedMesh.setMatrixAt(instanceCount++, dummy.matrix);

            // Line from origin to cone base
            positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
            positionAttr.setXYZ(
              lineIndex++,
              tipX - dir.x * CONFIG.CONE_HEIGHT,
              node[1],
              node[2]
            );

            // Collect label candidate
            const labelOffsetX = (ux > 0 ? 1 : -1) * CONFIG.LABEL_OFFSET * 1.5;
            labelCandidates.push({
              magnitude: Math.abs(ux),
              position: [tipX + labelOffsetX, node[1], node[2]],
              text: `Ux: ${ux.toFixed(2)}`,
              color: "#00ff00",
            });
          }

          // Draw Y displacement arrow if uy != 0
          if (Math.abs(uy) > 0.001) {
            dir.set(0, uy > 0 ? 1 : -1, 0); // P0: reuse vector
            const tipY = node[1] + uy;

            // Cone at tip
            dummy.position.set(
              node[0],
              tipY - dir.y * CONFIG.CONE_HEIGHT * 0.5,
              node[2]
            );
            dummy.quaternion.setFromUnitVectors(upVector, dir);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            dispInstancedMesh.setMatrixAt(instanceCount++, dummy.matrix);

            // Line from origin to cone base
            positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
            positionAttr.setXYZ(
              lineIndex++,
              node[0],
              tipY - dir.y * CONFIG.CONE_HEIGHT,
              node[2]
            );

            // Collect label candidate
            const labelOffsetY = (uy > 0 ? 1 : -1) * CONFIG.LABEL_OFFSET * 1.5;
            labelCandidates.push({
              magnitude: Math.abs(uy),
              position: [node[0], tipY + labelOffsetY, node[2]],
              text: `Uy: ${uy.toFixed(2)}`,
              color: "#00ff00",
            });
          }

          // Draw rotation arc with arrowhead for Rz if rz != 0
          if (Math.abs(rz) > 0.0001) {
            const arcRadius = 0.08;
            const arcAngle = Math.PI * 1.5; // 270 degrees
            const segments = CONFIG.RZ_ARC_SEGMENTS;
            const direction = rz > 0 ? 1 : -1;
            const startAngle = Math.PI / 4;
            const centerX = node[0];
            const centerY = node[1];

            // Generate arc points
            for (let i = 0; i < segments; i++) {
              const angle1 = startAngle + direction * (i / segments) * arcAngle;
              const angle2 =
                startAngle + direction * ((i + 1) / segments) * arcAngle;
              positionAttr.setXYZ(
                lineIndex++,
                centerX + arcRadius * Math.cos(angle1),
                centerY + arcRadius * Math.sin(angle1),
                node[2]
              );
              positionAttr.setXYZ(
                lineIndex++,
                centerX + arcRadius * Math.cos(angle2),
                centerY + arcRadius * Math.sin(angle2),
                node[2]
              );
            }

            // Arrowhead at the end of the arc
            const endAngle = startAngle + direction * arcAngle;
            const tipX = centerX + arcRadius * Math.cos(endAngle);
            const tipY = centerY + arcRadius * Math.sin(endAngle);

            // P0: Tangent direction (reuse vector)
            tangentDir
              .set(
                -direction * Math.sin(endAngle),
                direction * Math.cos(endAngle),
                0
              )
              .normalize();

            // Position cone at arc end, pointing along tangent
            dummy.position.set(tipX, tipY, node[2]);
            dummy.quaternion.setFromUnitVectors(upVector, tangentDir);
            dummy.scale.set(0.3, 0.3, 0.3);
            dummy.updateMatrix();
            dispInstancedMesh.setMatrixAt(instanceCount++, dummy.matrix);

            // Collect label candidate
            labelCandidates.push({
              magnitude: Math.abs(rz),
              position: [
                centerX - arcRadius - CONFIG.LABEL_OFFSET,
                centerY,
                node[2],
              ],
              text: `Rz: ${rz.toFixed(3)}`,
              color: "#00ff00",
            });
          }
        }
      });

      // Update instanced mesh
      dispInstancedMesh.count = instanceCount;
      dispInstancedMesh.instanceMatrix.needsUpdate = true;

      // Update line segments
      dispLineGeometry.setDrawRange(0, lineIndex);
      positionAttr.needsUpdate = true;

      // Render top-N labels
      renderTopLabels(labelCandidates);
    }

    // ============================================================
    // REACTIONS MODE (InstancedMesh cones + LineSegments)
    // ============================================================
    if (display.val === "Reactions" && reactions?.val) {
      // P0: Pre-compute required capacity
      let estInstances = 0;
      let estLineVertices = 0;
      reactions.val.forEach((react) => {
        const fx = react[0] || 0;
        const fy = react[1] || 0;
        const mz = react[5] || 0;
        if (Math.abs(fx) > 0.001) {
          estInstances++;
          estLineVertices += 2;
        }
        if (Math.abs(fy) > 0.001) {
          estInstances++;
          estLineVertices += 2;
        }
        if (Math.abs(mz) > 0.0001) {
          estInstances++; // arrowhead cone
          estLineVertices += CONFIG.RZ_ARC_SEGMENTS * 2; // arc segments
        }
      });
      ensureCapacity(estInstances, estLineVertices);

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
          const mz = react[5] || 0;

          // Draw separate X arrow if fx != 0
          if (Math.abs(fx) > 0.001) {
            dir.set(fx > 0 ? 1 : -1, 0, 0); // P0: reuse vector
            const tipX = node[0] + fx * CONFIG.ARROW_SCALE;

            // Position cone at tip
            dummy.position.set(
              tipX - dir.x * CONFIG.CONE_HEIGHT * 0.5,
              node[1],
              node[2]
            );
            dummy.quaternion.setFromUnitVectors(upVector, dir);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            reactInstancedMesh.setMatrixAt(instanceCount++, dummy.matrix);

            // Line from origin to cone base
            positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
            positionAttr.setXYZ(
              lineIndex++,
              tipX - dir.x * CONFIG.CONE_HEIGHT,
              node[1],
              node[2]
            );

            // Collect label candidate
            const labelOffsetX = (fx > 0 ? 1 : -1) * CONFIG.LABEL_OFFSET * 1.5;
            labelCandidates.push({
              magnitude: Math.abs(fx),
              position: [tipX + labelOffsetX, node[1], node[2]],
              text: `Rx: ${fx.toFixed(2)}`,
              color: "#ff0000",
            });
          }

          // Draw separate Y arrow if fy != 0
          if (Math.abs(fy) > 0.001) {
            dir.set(0, fy > 0 ? 1 : -1, 0); // P0: reuse vector
            const tipY = node[1] + fy * CONFIG.ARROW_SCALE;

            // Position cone at tip
            dummy.position.set(
              node[0],
              tipY - dir.y * CONFIG.CONE_HEIGHT * 0.5,
              node[2]
            );
            dummy.quaternion.setFromUnitVectors(upVector, dir);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            reactInstancedMesh.setMatrixAt(instanceCount++, dummy.matrix);

            // Line from origin to cone base
            positionAttr.setXYZ(lineIndex++, node[0], node[1], node[2]);
            positionAttr.setXYZ(
              lineIndex++,
              node[0],
              tipY - dir.y * CONFIG.CONE_HEIGHT,
              node[2]
            );

            // Collect label candidate
            labelCandidates.push({
              magnitude: Math.abs(fy),
              position: [node[0], tipY + CONFIG.LABEL_OFFSET * 0.5, node[2]],
              text: `Ry: ${fy.toFixed(2)}`,
              color: "#ff0000",
            });
          }

          // Draw rotation arc with arrowhead for Mz if mz != 0
          if (Math.abs(mz) > 0.0001) {
            const arcRadius = 0.08;
            const arcAngle = Math.PI * 1.5; // 270 degrees
            const segments = CONFIG.RZ_ARC_SEGMENTS;
            const direction = mz > 0 ? 1 : -1;
            const startAngle = Math.PI / 4;
            const centerX = node[0];
            const centerY = node[1];

            // Generate arc points
            for (let i = 0; i < segments; i++) {
              const angle1 = startAngle + direction * (i / segments) * arcAngle;
              const angle2 =
                startAngle + direction * ((i + 1) / segments) * arcAngle;
              positionAttr.setXYZ(
                lineIndex++,
                centerX + arcRadius * Math.cos(angle1),
                centerY + arcRadius * Math.sin(angle1),
                node[2]
              );
              positionAttr.setXYZ(
                lineIndex++,
                centerX + arcRadius * Math.cos(angle2),
                centerY + arcRadius * Math.sin(angle2),
                node[2]
              );
            }

            // Arrowhead at the end of the arc
            const endAngle = startAngle + direction * arcAngle;
            const tipX = centerX + arcRadius * Math.cos(endAngle);
            const tipY = centerY + arcRadius * Math.sin(endAngle);

            // P0: Tangent direction (reuse vector)
            tangentDir
              .set(
                -direction * Math.sin(endAngle),
                direction * Math.cos(endAngle),
                0
              )
              .normalize();

            // Position cone at arc end, pointing along tangent
            dummy.position.set(tipX, tipY, node[2]);
            dummy.quaternion.setFromUnitVectors(upVector, tangentDir);
            dummy.scale.set(0.3, 0.3, 0.3);
            dummy.updateMatrix();
            reactInstancedMesh.setMatrixAt(instanceCount++, dummy.matrix);

            // Collect label candidate
            labelCandidates.push({
              magnitude: Math.abs(mz),
              position: [
                centerX - arcRadius - CONFIG.LABEL_OFFSET,
                centerY,
                node[2],
              ],
              text: `Mz: ${mz.toFixed(3)}`,
              color: "#ff0000",
            });
          }
        }
      });

      // Update instanced mesh
      reactInstancedMesh.count = instanceCount;
      reactInstancedMesh.instanceMatrix.needsUpdate = true;

      // Update line segments
      reactLineGeometry.setDrawRange(0, lineIndex);
      positionAttr.needsUpdate = true;

      // Render top-N labels
      renderTopLabels(labelCandidates);
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

  // ============================================================
  // P2: DISPOSE_HOOK - cleanup for GPU resources
  // ============================================================
  group.userData.dispose = () => {
    // Dispose instanced meshes
    dispInstancedMesh.dispose();
    reactInstancedMesh.dispose();

    // Dispose geometries
    coneGeometry.dispose();
    dispLineGeometry.dispose();
    reactLineGeometry.dispose();

    // Dispose materials
    displacementMaterial.dispose();
    reactionMaterial.dispose();
    displacementLineMaterial.dispose();
    reactionLineMaterial.dispose();

    // Dispose labels
    clearLabels();
  };

  return group;
}
