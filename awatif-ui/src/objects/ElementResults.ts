import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";
import { getTransformationMatrix } from "../utils/getTransformationMatrix";
import { ConstantResult } from "./resultObjects/ConstantResult";
import { LinearResult } from "./resultObjects/LinearResult";
import { IResultObject } from "./resultObjects/IResultObject";

enum ResultType {
  normal = "normal",
  shearY = "shearY",
  shearZ = "shearZ",
  torsion = "torsion",
  bendingY = "bendingY",
  bendingZ = "bendingZ",
}

export function ElementResults(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val;
  const resultObjects = {
    [ResultType.normal]: ConstantResult,
    [ResultType.shearY]: ConstantResult,
    [ResultType.shearZ]: ConstantResult,
    [ResultType.torsion]: ConstantResult,
    [ResultType.bendingY]: LinearResult,
    [ResultType.bendingZ]: LinearResult,
  };

  let displayScaleCache = displayScale.val;
  let nodesCache = nodes.val;

  van.derive(() => (nodesCache = nodes.val));

  // on settings.elementResults, model.elements, and model.nodes update
  van.derive(() => {
    settings.deformedShape.val; // trigger update when changed
    group.visible = settings.elementResults.val != "none";

    if (settings.elementResults.val == "none") return;

    const resultType =
      ResultType[settings.elementResults.val as keyof typeof ResultType];

    group.children.forEach((c) => (c as IResultObject).dispose());
    group.clear();

    model.val.analysisResults[resultType].forEach((result, index) => {
      const element = model.val.elements[index];
      const node1 = nodesCache[element[0]];
      const node2 = nodesCache[element[1]];
      const length = new THREE.Vector3(...node2).distanceTo(
        new THREE.Vector3(...node1)
      );
      const maxResult = Math.max(
        ...[...model.val.analysisResults[resultType].values()]
          .flat()
          .map((n) => Math.abs(n ?? 0))
      );
      const normalizedResult = result?.map(
        (n) => n / (maxResult === 0 ? 1 : maxResult)
      );
      const rotation = getTransformationMatrix(node1, node2);
      const resultObject = new resultObjects[resultType](
        node1,
        node2,
        length,
        rotation,
        result ?? [0, 0],
        normalizedResult ?? [0, 0],
        [
          ResultType.normal,
          ResultType.shearZ,
          ResultType.torsion,
          ResultType.bendingY,
        ].includes(resultType)
          ? true
          : false
      );

      resultObject.updateScale(size * displayScaleCache);

      group.add(resultObject);
    });
  });

  // on settings.support and setting.displayScale change
  van.derive(() => {
    if (settings.elementResults.val == "none") return;

    group.children.forEach((c) =>
      (c as IResultObject).updateScale(size * displayScale.val)
    );

    displayScaleCache = displayScale.val;
  });

  return group;
}
