import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Node } from "awatif-data-model";
import { Structure } from "awatif-data-model";
import { Settings } from "../settings/settings";

import { Text } from "./Text";

export function elementsIndexes(
  structure: Structure,
  settings: Settings,
  derivedNodes: State<Node[]>,
  derivedDisplayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.rawVal * 0.6;

  // on settings.elementsIndexes & deformedShape, and model clear and create visuals
  van.derive(() => {
    settings.deformedShape.val; // triggers update

    if (!settings.elementsIndexes.val) return;

    group.children.forEach((c) => (c as Text).dispose());
    group.clear();

    structure.elements?.val.forEach((element, index) => {
      const text = new Text(`${index}`, undefined, "#001219");

      text.position.set(
        ...getCenter(element.map((i) => derivedNodes.rawVal[i]))
      );
      text.updateScale(size * derivedDisplayScale.rawVal);

      group.add(text);
    });
  });

  // on derivedDisplayScale update scale
  van.derive(() => {
    derivedDisplayScale.val; // trigger updates

    if (!settings.elementsIndexes.rawVal) return;

    group.children.forEach((c) =>
      (c as Text).updateScale(size * derivedDisplayScale.rawVal)
    );
  });

  // on settings.elementsIndexes update visibility
  van.derive(() => {
    group.visible = settings.elementsIndexes.val;
  });

  return group;
}

function getCenter(points: Node[]): Node {
  const sum = points.reduce(
    (sum, p) => [sum[0] + p[0], sum[1] + p[1], sum[2] + p[2]],
    [0, 0, 0]
  );
  const length = points.length;

  return [sum[0] / length, sum[1] / length, sum[2] / length];
}
