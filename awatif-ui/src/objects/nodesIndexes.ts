import * as THREE from "three";
import van, { State } from "vanjs-core";
import { SettingsState } from "../types";
import { Text } from "./Text";
import { Node } from "awatif-data-structure";

export function nodesIndexes(
  settings: SettingsState,
  derivedNodes: State<Node[]>,
  derivedDisplayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.rawVal * 0.6;

  // on settings.nodesIndexes, and derivedNodes clear and create visuals
  van.derive(() => {
    if (!settings.nodesIndexes.val) return;

    group.children.forEach((c) => (c as Text).dispose());
    group.clear();

    derivedNodes.val.forEach((node, index) => {
      const text = new Text(`${index}`);

      text.position.set(...node);
      text.updateScale(size * derivedDisplayScale.rawVal);

      group.add(text);
    });
  });

  // on settings.nodesIndexes and setting.displayScale change
  van.derive(() => {
    derivedDisplayScale.val; // triggers update

    if (!settings.nodesIndexes.rawVal) return;

    group.children.forEach((c) =>
      (c as Text).updateScale(size * derivedDisplayScale.rawVal)
    );
  });

  // on settings.nodesIndexes update visibility
  van.derive(() => {
    group.visible = settings.nodesIndexes.val;
  });

  return group;
}
