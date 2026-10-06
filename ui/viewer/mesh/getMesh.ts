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
  display?: {
    mesh: State<boolean>;
    deformedShape?: State<boolean>;
    deformationScale?: State<number>;
  };
}): THREE.Group {
  const group = new THREE.Group();

  // Render nodes
  const MESH_COLOR = new THREE.Color("#ababab"); // bright gray
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: MESH_COLOR,
      size: 4,
      sizeAttenuation: false,
      depthTest: false,
    }),
  );
  points.renderOrder = 2; // Render mesh nodes above mesh lines
  group.add(points);

  van.derive(() => {
    if (!display?.mesh || !display.mesh.val || !mesh.nodes.val) return;

    const positions = getDisplayPositions(mesh, display);

    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    points.geometry.computeBoundingSphere();

    render();
  });

  // Render elements
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({
      color: MESH_COLOR,
      depthTest: false,
    }),
  );
  lines.renderOrder = 1; // Render mesh lines above grid
  group.add(lines);

  van.derive(() => {
    if (!display?.mesh || !display.mesh.val || !mesh.elements || !mesh.nodes)
      return;

    const elementIndices = mesh.elements.val;
    const nodes = toNodes(getDisplayPositions(mesh, display));

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
      new THREE.Float32BufferAttribute(positions, 3),
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

function getDisplayPositions(
  mesh: Mesh,
  display?: {
    deformedShape?: State<boolean>;
    deformationScale?: State<number>;
  },
): number[] {
  const originalPositions = mesh.nodes.val.flat();
  const deformedPositions = mesh.positions.val;
  const useDeformed =
    display?.deformedShape?.val &&
    deformedPositions.length === originalPositions.length;

  if (!useDeformed) return originalPositions;

  const deformationScale = display.deformationScale?.val ?? 1;

  return originalPositions.map(
    (position, index) =>
      position + (deformedPositions[index] - position) * deformationScale,
  );
}

function toNodes(positions: number[]): number[][] {
  const nodes: number[][] = [];

  for (let i = 0; i < positions.length; i += 3) {
    nodes.push([positions[i], positions[i + 1], positions[i + 2]]);
  }

  return nodes;
}
