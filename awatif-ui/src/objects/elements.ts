import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { Node } from "awatif-data-structure";
import { updateColorsDueToElementResult } from "./utils/updateColorsDueToElementResult";

export function elements(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ vertexColors: true })
  );

  let nodesCache = nodes.val;

  lines.frustumCulled = false;
  lines.material.depthTest = false; // don't know why but is solves the rendering order issue

  // update
  lines.geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(
      model.val.elements
        .map(() => [...Array(6)])
        .flat()
        .fill(1),
      3
    )
  );

  updateColorsDueToElementResult(model, settings, lines);

  van.derive(() => (nodesCache = nodes.val));

  // on settings.elements, model.elements, and model.nodes update
  van.derive(() => {
    settings.deformedShape.val; // trigger update when changed
    lines.visible = settings.elements.val;

    if (!settings.elements.val) return;

    const buffer = model.val.elements
      .map((e) => [...nodesCache[e[0]], ...nodesCache[e[1]]])
      .flat();

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buffer, 3)
    );
  });

  return lines;
}
