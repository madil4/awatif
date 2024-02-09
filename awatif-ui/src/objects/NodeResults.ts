import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";
import { IResultObject } from "./resultObjects/IResultObject";
import { NodeResult } from "./resultObjects/NodeResult";

export enum ResultType {
  deformation = "deformation",
  reaction = "reaction",
}

export function NodeResults(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val;

  let displayScaleCache = displayScale.val;
  let nodesCache = nodes.val;

  van.derive(() => (nodesCache = nodes.val));

  // on settings.nodeResults, model.elements, and model.nodes update
  van.derive(() => {
    settings.deformedShape.val; // trigger update when changed
    group.visible = settings.nodeResults.val != "none";

    if (settings.nodeResults.val == "none") return;

    group.children.forEach((c) => (c as IResultObject).dispose());
    group.clear();

    const resultType =
      ResultType[settings.nodeResults.val as keyof typeof ResultType];

    model.val.analysisResults[resultType].forEach((result, index) => {
      const nodeResult = new NodeResult(nodesCache[index], resultType, result);

      nodeResult.updateScale(size * displayScaleCache);

      group.add(nodeResult);
    });
  });

  // on settings.nodeResults and setting.displayScale change
  van.derive(() => {
    if (settings.nodeResults.val == "none") return;

    group.children.forEach((c) =>
      (c as IResultObject).updateScale(size * displayScale.val)
    );

    displayScaleCache = displayScale.val;
  });

  return group;
}
