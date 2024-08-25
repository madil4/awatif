import { Pane } from "tweakpane";

import { SettingsState } from "./types";

import { ModelState } from "../../types";

import "./styles.css";

export function settings(
  model: ModelState,
  settingsState: SettingsState
): HTMLElement {
  // init
  const element = document.createElement("div");
  const pane = new Pane({
    title: "Settings",
    expanded: false,
    container: element,
  });

  // update
  element.setAttribute("id", "settings");

  pane.addBinding(settingsState.displayScale, "val", {
    label: "Display scale",
    min: -10,
    max: 10,
    step: 1,
  });

  if (model.rawVal.nodes) {
    pane.addBinding(settingsState.nodes, "val", { label: "Nodes" });
    pane.addBinding(settingsState.elements, "val", {
      label: "Elements",
    });
    pane.addBinding(settingsState.nodesIndexes, "val", {
      label: "Nodes indexes",
    });
    pane.addBinding(settingsState.elementsIndexes, "val", {
      label: "Elements indexes",
    });
    pane.addBinding(settingsState.orientations, "val", {
      label: "Orientations",
    });
  }

  if (model.rawVal.analysisInputs) {
    const inputs = pane.addFolder({ title: "Analysis Inputs" });

    inputs.addBinding(settingsState.supports, "val", { label: "Supports" });
    inputs.addBinding(settingsState.loads, "val", { label: "Loads" });
  }

  if (model.rawVal.analysisOutputs) {
    const outputs = pane.addFolder({ title: "Analysis Outputs" });

    outputs.addBinding(settingsState.elementResults, "val", {
      options: {
        none: "none",
        normal: "normal",
        shearY: "shearY",
        shearZ: "shearZ",
        torsion: "torsion",
        bendingY: "bendingY",
        bendingZ: "bendingZ",
      },
      label: "Element results",
    });
    outputs.addBinding(settingsState.nodeResults, "val", {
      options: {
        none: "none",
        deformation: "deformation",
        reaction: "reaction",
      },
      label: "Node results",
    });
    outputs.addBinding(settingsState.deformedShape, "val", {
      label: "Deformed shape",
    });
  }

  return element;
}
