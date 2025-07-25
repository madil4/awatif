import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh, Element, Node } from "awatif-fem";
import { Settings } from "../settings/getSettings";

export function elements(
  mesh: Mesh,
  settings: Settings,
  derivedNodes: State<Node[]>
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial()
  );
  lines.frustumCulled = false;

  // on nodes, elements, and deformedShape update visuals
  van.derive(() => {
    settings.deformedShape.val; // triggers update

    if (!settings.elements.val) return;

    const buffer = mesh.elements?.val
      .map((e) =>
        elementToEdges(e)
          .map((edge) => [
            ...derivedNodes.val[edge[0]],
            ...derivedNodes.val[edge[1]],
          ])
          .flat()
      )
      .flat();

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buffer, 3)
    );
  });

  // on settings.elements update visibility
  van.derive(() => {
    lines.visible = settings.elements.val;
  });

  return lines;
}

// Utils
function elementToEdges(element: Element): Element[] {
  if (element.length === 2) return [element];

  const edges: [number, number][] = [];

  for (let i = 0; i < element.length; i++) {
    edges.push([element[i], element[(i + 1) % element.length]]);
  }

  return edges;
}
