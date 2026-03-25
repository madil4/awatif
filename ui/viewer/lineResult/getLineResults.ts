import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh } from "@awatif/components";
import { getText } from "../text/getText";

export type LineResultsDisplay = "None" | "Normals" | "Bendings" | "Shears";

type Forces =
  NonNullable<Mesh["internalForces"]["val"]> extends Map<number, infer V>
    ? V
    : never;

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
    const lineToElements = mesh.geometryMapping.val.lineToElements;

    if (!nodes?.length || !elements?.length || !internalForces) return render();
    if (display.val === "None") return render();

    const s = displayScale.val;
    const mode = display.val;
    const color = "#0066cc";
    const lineMaterial = new THREE.LineBasicMaterial({ color });
    lineMaterial.depthTest = false; // Todo: fix it properly

    // Normalize scale
    let maxForceValue = 0;
    internalForces.forEach((forces: Forces) => {
      const [a, b] = getValues(forces, mode);
      maxForceValue = Math.max(maxForceValue, Math.abs(a), Math.abs(b));
    });
    const scale = maxForceValue > 0 ? (s * 0.6) / maxForceValue : 0.05;
    const textSize = 0.3 * s;

    lineToElements.forEach((elementIndices: number[]) => {
      // Collect per-endpoint data for this line
      const endpoints: {
        pos: THREE.Vector3;
        diagramPos: THREE.Vector3;
        value: number;
      }[] = [];

      elementIndices.forEach((elementIdx) => {
        const forces = internalForces.get(elementIdx);
        if (!forces) return;

        const element = elements[elementIdx];
        if (!element || element.length < 2) return;

        const n1 = nodes[element[0]];
        const n2 = nodes[element[1]];
        if (!n1 || !n2) return;

        const start = new THREE.Vector3(n1[0], n1[1], n1[2] ?? 0);
        const end = new THREE.Vector3(n2[0], n2[1], n2[2] ?? 0);
        const perp = getPerpendicular(start, end);
        const [valStart, valEnd] = getValues(forces, mode);

        // Draw element diagram
        if (Math.abs(valStart) > 0.001 || Math.abs(valEnd) > 0.001) {
          const dStart = start
            .clone()
            .add(perp.clone().multiplyScalar(valStart * scale));
          const dEnd = end
            .clone()
            .add(perp.clone().multiplyScalar(valEnd * scale));
          const geo = new THREE.BufferGeometry().setFromPoints([
            start,
            dStart,
            dEnd,
            end,
          ]);
          group.add(new THREE.Line(geo, lineMaterial));
        }

        endpoints.push({
          pos: start,
          diagramPos: start
            .clone()
            .add(perp.clone().multiplyScalar(valStart * scale)),
          value: valStart,
        });
        endpoints.push({
          pos: end,
          diagramPos: end
            .clone()
            .add(perp.clone().multiplyScalar(valEnd * scale)),
          value: valEnd,
        });
      });

      // Show only max and min labels per line
      if (endpoints.length === 0) return;

      const sorted = [...endpoints].sort((a, b) => b.value - a.value);
      const max = sorted[0];
      const min = sorted[sorted.length - 1];
      const label = getLabel(mode);

      if (Math.abs(max.value) > 0.001) {
        group.add(
          getText(
            `${label}: ${max.value.toFixed(2)}`,
            [max.diagramPos.x, max.diagramPos.y, max.diagramPos.z],
            color,
            textSize,
          ),
        );
      }
      if (
        Math.abs(min.value) > 0.001 &&
        Math.abs(min.value - max.value) > 0.01
      ) {
        group.add(
          getText(
            `${label}: ${min.value.toFixed(2)}`,
            [min.diagramPos.x, min.diagramPos.y, min.diagramPos.z],
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

// Helpers
function getValues(forces: Forces, mode: LineResultsDisplay): [number, number] {
  switch (mode) {
    case "Normals":
      return forces.N;
    case "Shears":
      return forces.Vy;
    case "Bendings":
      return forces.Mz;
    default:
      return [0, 0];
  }
}

function getLabel(mode: LineResultsDisplay): string {
  switch (mode) {
    case "Normals":
      return "N";
    case "Shears":
      return "V";
    case "Bendings":
      return "M";
    default:
      return "";
  }
}

function getPerpendicular(
  start: THREE.Vector3,
  end: THREE.Vector3,
): THREE.Vector3 {
  const dir = new THREE.Vector3().subVectors(end, start).normalize();
  return new THREE.Vector3(-dir.y, dir.x, 0).normalize();
}
