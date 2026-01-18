import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh, ElementForces } from "@awatif/components";
import { getText } from "../text/getText";

export type LineResultsDisplay = "None" | "Normals" | "Bendings" | "Shears";

export function getLineResults({
  mesh,
  display,
  render,
}: {
  mesh: Mesh;
  display: State<LineResultsDisplay>;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

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

    const mode = display.val;

    // Color scheme
    const getColor = (mode: LineResultsDisplay) => {
      switch (mode) {
        case "Normals":
          return { num: 0x00aa00, str: "#00aa00" }; // Green
        case "Shears":
          return { num: 0x0066cc, str: "#0066cc" }; // Blue
        case "Bendings":
          return { num: 0xcc0066, str: "#cc0066" }; // Red/magenta
        default:
          return { num: 0xffffff, str: "#ffffff" };
      }
    };

    const color = getColor(mode);
    const lineMaterial = new THREE.LineBasicMaterial({ color: color.num });
    const scale = 0.05;

    internalForces.forEach((forces: ElementForces, elementIdx: number) => {
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
      if (Math.abs(valStart) > 0.001) {
        group.add(
          getText(
            `${label}: ${valStart.toFixed(2)}`,
            [diagramStart.x, diagramStart.y, diagramStart.z],
            color.str,
            0.1,
          ),
        );
      }
      if (Math.abs(valEnd) > 0.001 && Math.abs(valEnd - valStart) > 0.01) {
        group.add(
          getText(
            `${label}: ${valEnd.toFixed(2)}`,
            [diagramEnd.x, diagramEnd.y, diagramEnd.z],
            color.str,
            0.1,
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
