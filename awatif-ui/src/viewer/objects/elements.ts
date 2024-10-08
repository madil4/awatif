import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Node } from "awatif-data-structure";
import { Structure } from "awatif-data-structure";
import { Settings } from "../settings/settings";

export function elements(
  structure: Structure,
  settings: Settings,
  derivedNodes: State<Node[]>
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial()
  );
  lines.frustumCulled = false;
  lines.material.depthTest = false; // don't know why but is solves the rendering order issue

  // on nodes, elements, and deformedShape update visuals
  van.derive(() => {
    settings.deformedShape.val; // triggers update

    if (!settings.elements.val) return;

    const buffer =
      structure.elements?.val
        .map((e) => [...derivedNodes.val[e[0]], ...derivedNodes.val[e[1]]])
        .flat() ?? [];

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
