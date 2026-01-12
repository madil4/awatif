import * as THREE from "three";
import van, { State } from "vanjs-core";
import type { Mesh } from "@awatif/components";

export function getMesh({
  mesh,
  render,
  display,
}: {
  mesh: Mesh;
  render: () => void;
  display?: { mesh: State<boolean>; deformedShape?: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  // Render nodes
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: new THREE.Color("white"),
      size: 5,
      sizeAttenuation: false,
      depthTest: false,
    })
  );
  points.renderOrder = 2; // Render mesh nodes above mesh lines
  group.add(points);

  van.derive(() => {
    if (!display?.mesh || !display.mesh.val || !mesh.nodes.val) return;

    // Use deformed positions if deformedShape toggle is on and positions exist
    const useDeformed =
      display?.deformedShape?.val &&
      mesh.positions &&
      mesh.positions.length > 0;
    const positions = useDeformed ? mesh.positions! : mesh.nodes.val.flat();

    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    points.geometry.computeBoundingSphere();

    render();
  });

  // Render elements
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({
      color: new THREE.Color("white"),
      depthTest: false,
    })
  );
  lines.renderOrder = 1; // Render mesh lines above grid
  group.add(lines);

  van.derive(() => {
    if (!display?.mesh || !display.mesh.val || !mesh.elements || !mesh.nodes)
      return;

    const elementIndices = mesh.elements.val;

    // Use deformed positions if deformedShape toggle is on and positions exist
    const useDeformed =
      display?.deformedShape?.val &&
      mesh.positions &&
      mesh.positions.length > 0;
    let nodes: number[][];

    if (useDeformed) {
      // Convert flat positions array to nodes array
      nodes = [];
      for (let i = 0; i < mesh.positions!.length; i += 3) {
        nodes.push([
          mesh.positions![i],
          mesh.positions![i + 1],
          mesh.positions![i + 2],
        ]);
      }
    } else {
      nodes = mesh.nodes.val;
    }

    const positions: number[] = [];

    // For each element, create edges between consecutive nodes
    elementIndices.forEach((element) => {
      for (let i = 0; i < element.length; i++) {
        const startIndex = element[i];
        const endIndex = element[(i + 1) % element.length]; // Wrap around to close the element
        const start = nodes[startIndex];
        const end = nodes[endIndex];

        if (start && end) {
          positions.push(...start, ...end);
        }
      }
    });

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    lines.geometry.computeBoundingSphere();

    render();
  });

  // Handle visibility changes
  van.derive(() => {
    if (!display?.mesh) return;

    lines.visible = display.mesh.val;
    points.visible = display.mesh.val;

    render();
  });

  return group;
}
