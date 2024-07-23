import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { Node } from "awatif-data-structure";

export function elements(
  model: ModelState,
  settings: SettingsState,
  derivedNodes: State<Node[]>
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial()
  );
  lines.frustumCulled = false;
  lines.material.depthTest = false; // don't know why but is solves the rendering order issue

  // on model.elements & deformedShape, and model update visuals
  van.derive(() => {
    settings.deformedShape.val; // triggers update

    if (!settings.elements.val) return;

    const buffer = model.val.elements
      .map((e) => [...derivedNodes.rawVal[e[0]], ...derivedNodes.rawVal[e[1]]])
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
