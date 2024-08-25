import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../../types";
import { Text } from "./Text";
import { getCenter } from "./utils/getCenter";
import { Node } from "awatif-data-structure";

export function elementsIndexes(
  model: ModelState,
  settings: SettingsState,
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

    model.val.elements.forEach((element, index) => {
      const text = new Text(`${index}`, undefined, "#001219");

      text.position.set(
        ...getCenter(
          derivedNodes.rawVal[element[0]],
          derivedNodes.rawVal[element[1]]
        )
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
