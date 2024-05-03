import { Pane } from "tweakpane";
import { ModelState, SettingsState } from "./types";
import { divideNodesElements } from "./objects/utils/divideNodesElements";
import { getKeys } from "./objects/utils/getKeys";

export function settings(modelState: ModelState, settingsState: SettingsState) {
  // init
  const pane = new Pane({ title: "Settings", expanded: false });
  const container = pane.element.parentElement;
  const { nodeKeys, elementKeys } = getKeysBoth(modelState.val.designOutputs);

  // update
  if (container) {
    container.style.top = "0px";
    container.style.bottom = "inherit";
    container.style.left = "8px";
    container.style.width = "300px";
    container.style.zIndex = "3";
  }

  pane.addBinding(settingsState.displayScale, "val", {
    label: "Display scale",
    min: -10,
    max: 10,
    step: 1,
  });
  pane.addBinding(settingsState.nodes, "val", { label: "Nodes" });
  pane.addBinding(settingsState.elements, "val", { label: "Elements" });
  pane.addBinding(settingsState.nodesIndexes, "val", {
    label: "Nodes indexes",
  });
  pane.addBinding(settingsState.elementsIndexes, "val", {
    label: "Elements indexes",
  });
  pane.addBinding(settingsState.orientations, "val", { label: "Orientations" });
  pane.addBinding(settingsState.supports, "val", { label: "Supports" });
  pane.addBinding(settingsState.loads, "val", { label: "Loads" });
  pane.addBinding(settingsState.deformedShape, "val", {
    label: "Deformed shape",
  });
  pane.addBinding(settingsState.elementResults, "val", {
    options: {
      none: "none",
      normal: "normal",
      shearY: "shearY",
      shearZ: "shearZ",
      torsion: "torsion",
      bendingY: "bendingY",
      bendingZ: "bendingZ",
      ...elementKeys,
    },
    label: "Element results",
  });
  pane.addBinding(settingsState.nodeResults, "val", {
    options: {
      none: "none",
      deformation: "deformation",
      reaction: "reaction",
      ...nodeKeys,
    },
    label: "Node results",
  });
}
function getKeysBoth(designOutputs: Map<string, any>): {
  nodeKeys: object;
  elementKeys: object;
} {
  const { nodeOutputs, elementOutputs } = divideNodesElements(designOutputs);

  const nodesKeysList = getKeys(nodeOutputs);
  const elementKeysList = getKeys(elementOutputs);

  const nodeKeys: any = {};
  nodesKeysList.forEach((key) => (nodeKeys[key] = key));

  const elementKeys: any = {};
  elementKeysList.forEach((key) => (elementKeys[key] = key));

  return { nodeKeys, elementKeys };
}
