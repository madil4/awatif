import { State } from "vanjs-core";
import { Pane } from "tweakpane";
import { Structure } from "awatif-data-structure";

import "./styles.css";

export type Settings = {
  gridSize: State<number>;
  displayScale: State<number>;
  nodes: State<boolean>;
  elements: State<boolean>;
  nodesIndexes: State<boolean>;
  elementsIndexes: State<boolean>;
  orientations: State<boolean>;
  supports: State<boolean>;
  loads: State<boolean>;
  deformedShape: State<boolean>;
  elementResults: State<string>;
  nodeResults: State<string>;
  flipAxes: State<boolean>;
};

export function settings(
  structure: Structure,
  settingsState: Settings
): HTMLElement {
  // init
  const container = document.createElement("div");
  const pane = new Pane({
    title: "Settings",
    expanded: false,
    container,
  });

  // update
  container.setAttribute("id", "settings");

  if (structure.nodes) {
    pane.addBinding(settingsState.displayScale, "val", {
      label: "Display scale",
      min: -10,
      max: 10,
      step: 1,
    });
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

  if (structure.analysisInputs) {
    const inputs = pane.addFolder({ title: "Analysis Inputs" });

    inputs.addBinding(settingsState.supports, "val", { label: "Supports" });
    inputs.addBinding(settingsState.loads, "val", { label: "Loads" });
  }

  if (structure.analysisOutputs) {
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

  return container;
}
