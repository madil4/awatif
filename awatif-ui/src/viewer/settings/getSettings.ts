import van, { State } from "vanjs-core";
import { Pane } from "tweakpane";
import { Mesh } from "awatif-fem";

import "./styles.css";

// Todo: Remove this duplicated Settings type (might not be possible to remove it)
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
  nodeResults: State<string>;
  frameResults: State<string>;
  shellResults: State<string>;
  solids: State<boolean>;
  flipAxes: State<boolean>;
};

export type SettingsObj = {
  gridSize?: number;
  displayScale?: number;
  nodes?: boolean;
  elements?: boolean;
  nodesIndexes?: boolean;
  elementsIndexes?: boolean;
  orientations?: boolean;
  supports?: boolean;
  loads?: boolean;
  deformedShape?: boolean;
  nodeResults?: string;
  frameResults?: string;
  shellResults?: string;
  flipAxes?: boolean;
  solids?: boolean;
};

export function getSettings(
  settings: Settings,
  mesh?: Mesh,
  solids?: State<object>
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

  if (mesh?.nodes) {
    pane.addBinding(settings.displayScale, "val", {
      label: "Display scale",
      min: -10,
      max: 10,
      step: 1,
    });
    pane.addBinding(settings.nodes, "val", { label: "Nodes" });
    pane.addBinding(settings.elements, "val", {
      label: "Elements",
    });
    pane.addBinding(settings.nodesIndexes, "val", {
      label: "Nodes indexes",
    });
    pane.addBinding(settings.elementsIndexes, "val", {
      label: "Elements indexes",
    });
    pane.addBinding(settings.orientations, "val", {
      label: "Orientations",
    });
  }

  if (mesh?.nodeInputs || mesh?.elementInputs) {
    const inputs = pane.addFolder({ title: "Analysis Inputs" });

    inputs.addBinding(settings.supports, "val", { label: "Supports" });
    inputs.addBinding(settings.loads, "val", { label: "Loads" });
  }

  if (mesh?.deformOutputs || mesh?.analyzeOutputs) {
    const outputs = pane.addFolder({ title: "Analysis Outputs" });

    outputs.addBinding(settings.nodeResults, "val", {
      options: {
        none: "none",
        deformations: "deformations",
        reactions: "reactions",
      },
      label: "Node results",
    });

    outputs.addBinding(settings.frameResults, "val", {
      options: {
        none: "none",
        normals: "normals",
        shearsY: "shearsY",
        shearsZ: "shearsZ",
        torsions: "torsions",
        bendingsY: "bendingsY",
        bendingsZ: "bendingsZ",
      },
      label: "Frame results",
    });

    outputs.addBinding(settings.shellResults, "val", {
      options: {
        none: "none",
        bendingXX: "bendingXX",
        bendingYY: "bendingYY",
        bendingXY: "bendingXY",
        displacementZ: "displacementZ",
      },
      label: "Shell results",
    });

    outputs.addBinding(settings.deformedShape, "val", {
      label: "Deformed shape",
    });
  }

  if (solids) pane.addBinding(settings.solids, "val", { label: "Solids" });

  return container;
}

// Utils
export function getDefaultSettings(settingsObj: SettingsObj): Settings {
  return {
    gridSize: van.state(settingsObj?.gridSize ?? 20),
    displayScale: van.state(settingsObj?.displayScale ?? 1),
    nodes: van.state(settingsObj?.nodes ?? true),
    elements: van.state(settingsObj?.elements ?? true),
    nodesIndexes: van.state(settingsObj?.nodesIndexes ?? false),
    elementsIndexes: van.state(settingsObj?.elementsIndexes ?? false),
    orientations: van.state(settingsObj?.orientations ?? false),
    supports: van.state(settingsObj?.supports ?? true),
    loads: van.state(settingsObj?.loads ?? true),
    deformedShape: van.state(settingsObj?.deformedShape ?? false),
    nodeResults: van.state(settingsObj?.nodeResults ?? "none"),
    frameResults: van.state(settingsObj?.frameResults ?? "none"),
    shellResults: van.state(settingsObj?.shellResults ?? "none"),
    flipAxes: van.state(settingsObj?.flipAxes ?? false),
    solids: van.state(settingsObj?.solids ?? true),
  };
}
