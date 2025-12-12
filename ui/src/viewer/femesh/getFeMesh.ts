import * as THREE from "three";
import van, { State } from "vanjs-core";

export type FeMesh = {
  nodes: State<number[][]>;
  elements: State<number[][]>;
  visible: State<boolean>;
};

export function getFeMesh({
  feMesh,
  render,
}: {
  feMesh: FeMesh;
  render: () => void;
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
  points.renderOrder = 3; // Render nodes on top of edges
  group.add(points);

  van.derive(() => {
    if (!feMesh.visible.val) return;

    const nodes = feMesh.nodes.val.flat();
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodes, 3)
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
  lines.renderOrder = 2; // Ensure mesh renders on top of grid and geometry
  group.add(lines);

  van.derive(() => {
    if (!feMesh.visible.val) return;

    const elementIndices = feMesh.elements.val;
    const nodes = feMesh.nodes.val;
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
    lines.visible = feMesh.visible.val;
    points.visible = feMesh.visible.val;

    render();
  });

  return group;
}
