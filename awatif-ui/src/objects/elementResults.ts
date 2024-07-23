import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { AnalysisOutputs, Node } from "awatif-data-structure";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
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

export function elementResults(
  model: ModelState,
  settings: SettingsState,
  derivedNodes: State<Node[]>,
  deridedDisplayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.rawVal;
  const resultObjects = {
    [ResultType.normal]: ConstantResult,
    [ResultType.shearY]: ConstantResult,
    [ResultType.shearZ]: ConstantResult,
    [ResultType.torsion]: ConstantResult,
    [ResultType.bendingY]: LinearResult,
    [ResultType.bendingZ]: LinearResult,
  };

  // on settings.elementResults & deformedShape, model clear and create visuals
  van.derive(() => {
    settings.deformedShape.val; // triggers update

    if (settings.elementResults.val == "none") return;

    group.children.forEach((c) => (c as IResultObject).dispose());
    group.clear();

    const resultType =
      ResultType[settings.elementResults.rawVal as keyof typeof ResultType];

    model.val.analysisOutputs.elements?.forEach((result, index) => {
      const element = model.rawVal.elements[index];
      const node1 = derivedNodes.rawVal[element[0]];
      const node2 = derivedNodes.rawVal[element[1]];
      const length = new THREE.Vector3(...node2).distanceTo(
        new THREE.Vector3(...node1)
      );
      const maxResult = findMax(
        model.rawVal.analysisOutputs.elements,
        resultType
      );
      const normalizedResult = result[resultType]?.map(
        (n) => n / (maxResult === 0 ? 1 : maxResult)
      );
      const rotation = getTransformationMatrix(node1, node2);
      const resultObject = new resultObjects[resultType](
        node1,
        node2,
        length,
        rotation,
        result[resultType] ?? [0, 0],
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

      resultObject.updateScale(size * deridedDisplayScale.rawVal);

      group.add(resultObject);
    });
  });

  // on deridedDisplayScale update scale
  van.derive(() => {
    deridedDisplayScale.val; // trigger updates

    if (settings.elementResults.rawVal == "none") return;

    group.children.forEach((c) =>
      (c as IResultObject).updateScale(size * deridedDisplayScale.rawVal)
    );
  });

  // on settings.elementResults update viability
  van.derive(() => {
    group.visible = settings.elementResults.val != "none";
  });

  return group;
}

function findMax(
  nodeOutputs: AnalysisOutputs["elements"],
  resultType: ResultType
): number {
  let maxDeformation: number = 0;

  nodeOutputs?.forEach((node) => {
    const maxInNode = Math.max(...(node[resultType] ?? [0, 0]));
    if (maxInNode > maxDeformation) maxDeformation = maxInNode;
  });

  return maxDeformation;
}
