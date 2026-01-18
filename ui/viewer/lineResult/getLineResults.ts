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

    // Color scheme: green for compression, red for tension (normals)
    // blue for shear, purple for bending
    const getColor = (mode: LineResultsDisplay) => {
      switch (mode) {
        case "Normals":
          return { num: 0x00ff00, str: "#00ff00" };
        case "Shears":
          return { num: 0x0088ff, str: "#0088ff" };
        case "Bendings":
          return { num: 0xff00ff, str: "#ff00ff" };
        default:
          return { num: 0xffffff, str: "#ffffff" };
      }
    };

    const color = getColor(mode);
    const lineMaterial = new THREE.LineBasicMaterial({ color: color.num });

    internalForces.forEach((forces: ElementForces, elementIdx: number) => {
      const element = elements[elementIdx];
      if (!element || element.length < 2) return;

      const [n1Idx, n2Idx] = element;
      const n1 = nodes[n1Idx];
      const n2 = nodes[n2Idx];
      if (!n1 || !n2) return;

      const start = new THREE.Vector3(n1[0], n1[1], n1[2] ?? 0);
      const end = new THREE.Vector3(n2[0], n2[1], n2[2] ?? 0);
      const midpoint = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const elementDir = new THREE.Vector3().subVectors(end, start).normalize();

      // Get perpendicular direction for diagram offsets (in XY plane)
      const perpDir = new THREE.Vector3(
        -elementDir.y,
        elementDir.x,
        0,
      ).normalize();

      let values: [number, number] = [0, 0];
      let label = "";

      switch (mode) {
        case "Normals":
          values = forces.N;
          label = "N";
          break;
        case "Shears":
          // Use Vy for 2D visualization
          values = forces.Vy;
          label = "V";
          break;
        case "Bendings":
          // Use Mz for 2D visualization
          values = forces.Mz;
          label = "M";
          break;
      }

      const [valStart, valEnd] = values;
      const scale = 0.1; // Scale factor for visualization

      // Draw diagram as a filled shape from element to offset points
      const offsetStart = perpDir.clone().multiplyScalar(valStart * scale);
      const offsetEnd = perpDir.clone().multiplyScalar(valEnd * scale);

      const diagramStart = start.clone().add(offsetStart);
      const diagramEnd = end.clone().add(offsetEnd);

      // Draw diagram outline
      const diagramPoints = [start, diagramStart, diagramEnd, end];
      const diagramGeometry = new THREE.BufferGeometry().setFromPoints(
        diagramPoints,
      );
      group.add(new THREE.Line(diagramGeometry, lineMaterial));

      // Add closing line from diagramStart to diagramEnd
      const topLineGeometry = new THREE.BufferGeometry().setFromPoints([
        diagramStart,
        diagramEnd,
      ]);
      group.add(new THREE.Line(topLineGeometry, lineMaterial));

      // Add text labels at start and end
      if (Math.abs(valStart) > 0.001) {
        group.add(
          getText(
            `${label}: ${valStart.toFixed(2)}`,
            [diagramStart.x, diagramStart.y, diagramStart.z],
            color.str,
            0.12,
          ),
        );
      }

      if (Math.abs(valEnd) > 0.001) {
        group.add(
          getText(
            `${label}: ${valEnd.toFixed(2)}`,
            [diagramEnd.x, diagramEnd.y, diagramEnd.z],
            color.str,
            0.12,
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
