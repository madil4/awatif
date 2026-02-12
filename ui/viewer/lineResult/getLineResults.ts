import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh } from "@awatif/components";
import { getText } from "../text/getText";

export type LineResultsDisplay = "None" | "Normals" | "Bendings" | "Shears";

export function getLineResults({
  mesh,
  display,
  displayScale,
  render,
}: {
  mesh: Mesh;
  display: State<LineResultsDisplay>;
  displayScale: State<number>;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();
  group.renderOrder = 100; // Todo: align with the rest of objects renderOrder

  const clearGroup = () => {
    while (group.children.length) {
      const c = group.children[0];
      if (c instanceof THREE.Sprite)
        (c.material.map?.dispose(), c.material.dispose());
      if (c instanceof THREE.Line) c.geometry.dispose();
      group.remove(c);
    }
  };

  van.derive(() => {
    clearGroup();
    const nodes = mesh.nodes.val;
    const elements = mesh.elements.val;
    const internalForces = mesh.internalForces?.val;

    if (!nodes?.length || !elements?.length || !internalForces) return render();
    if (display.val === "None") return render();

    const s = displayScale.val;
    const mode = display.val;
    const color = "#0066cc";
    const lineMaterial = new THREE.LineBasicMaterial({ color });
    lineMaterial.depthTest = false; // Todo: fix it properly

    // Find maximum force value for normalization
    let maxForceValue = 0;
    internalForces.forEach((forces: NonNullable<Mesh["internalForces"]["val"]> extends Map<number, infer V> ? V : never) => {
      let values: [number, number] = [0, 0];
      switch (mode) {
        case "Normals":
          values = forces.N;
          break;
        case "Shears":
          values = forces.Vy;
          break;
        case "Bendings":
          values = forces.Mz;
          break;
      }
      const [valStart, valEnd] = values;
      maxForceValue = Math.max(
        maxForceValue,
        Math.abs(valStart),
        Math.abs(valEnd),
      );
    });

    // Normalize scale: target max diagram width
    const targetMaxWidth = 1 * s;
    const scale = maxForceValue > 0 ? targetMaxWidth / maxForceValue : 0.05;

    internalForces.forEach((forces: NonNullable<Mesh["internalForces"]["val"]> extends Map<number, infer V> ? V : never, elementIdx: number) => {
      const element = elements[elementIdx];
      if (!element || element.length < 2) return;

      const [n1Idx, n2Idx] = element;
      const n1 = nodes[n1Idx];
      const n2 = nodes[n2Idx];
      if (!n1 || !n2) return;

      const start = new THREE.Vector3(n1[0], n1[1], n1[2] ?? 0);
      const end = new THREE.Vector3(n2[0], n2[1], n2[2] ?? 0);
      const elementDir = new THREE.Vector3().subVectors(end, start).normalize();

      // Perpendicular direction for diagram offsets
      const perpDir = new THREE.Vector3(
        -elementDir.y,
        elementDir.x,
        0,
      ).normalize();

      // Select data based on mode
      let values: [number, number] = [0, 0];
      let label = "";

      switch (mode) {
        case "Normals":
          values = forces.N;
          label = "N";
          break;
        case "Shears":
          values = forces.Vy;
          label = "V";
          break;
        case "Bendings":
          values = forces.Mz;
          label = "M";
          break;
      }

      const [valStart, valEnd] = values;

      // Skip if both values are essentially zero
      if (Math.abs(valStart) < 0.001 && Math.abs(valEnd) < 0.001) return;

      // Calculate diagram points
      const diagramStart = start
        .clone()
        .add(perpDir.clone().multiplyScalar(valStart * scale));
      const diagramEnd = end
        .clone()
        .add(perpDir.clone().multiplyScalar(valEnd * scale));

      // Draw closed diagram: baseline + diagram line + vertical closers
      const outlinePoints = [start, diagramStart, diagramEnd, end];
      const outlineGeometry = new THREE.BufferGeometry().setFromPoints(
        outlinePoints,
      );
      group.add(new THREE.Line(outlineGeometry, lineMaterial));

      // Add text labels
      const textSize = 0.5 * s;
      if (Math.abs(valStart) > 0.001) {
        group.add(
          getText(
            `${label}: ${valStart.toFixed(2)}`,
            [diagramStart.x, diagramStart.y, diagramStart.z],
            color,
            textSize,
          ),
        );
      }
      if (Math.abs(valEnd) > 0.001 && Math.abs(valEnd - valStart) > 0.01) {
        group.add(
          getText(
            `${label}: ${valEnd.toFixed(2)}`,
            [diagramEnd.x, diagramEnd.y, diagramEnd.z],
            color,
            textSize,
          ),
        );
      }
    });

    render();
  });

  group.userData.dispose = () => {
    clearGroup();
  };

  return group;
}
