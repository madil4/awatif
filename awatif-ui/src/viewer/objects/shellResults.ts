import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh, Node } from "awatif-fem";
import { Settings } from "../settings/getSettings";
import { getColorMap } from "../../color-map/getColorMap";

export function shellResults(
  mesh: Mesh,
  settings: Settings,
  derivedNodes: State<Node[]>,
  colorMapValues: State<number[]>
): THREE.Object3D {
  // Init
  const colorMap = getColorMap(derivedNodes, mesh.elements, colorMapValues);

  // Events
  // on settings.shellResults update: update viability
  van.derive(() => {
    colorMap.visible = settings.shellResults.val != "none";
  });

  return colorMap;
}
