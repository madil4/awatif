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

export type ShellResultType =
  | "bendingXX"
  | "bendingYY"
  | "bendingXY"
  | "displacementX"
  | "displacementY"
  | "displacementZ";

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
  showFrameResults?: boolean;
  shellResultScales?: Partial<Record<ShellResultType, number>>;
  shellResultUnits?: Partial<Record<ShellResultType, string>>;
  customNumbers?: {
    folder?: string;
    label: string;
    state: State<number>;
    min?: number;
    max?: number;
    step?: number;
  }[];
  customSelects?: {
    folder?: string;
    label: string;
    state: State<any>;
    options: Record<string, string>;
  }[];
};

export function getSettings(
  settings: Settings,
  mesh?: Mesh,
  solids?: State<object>,
  settingsObj?: SettingsObj
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

  let inputsFolder: any;
  let outputsFolder: any;

  if (mesh?.nodeInputs || mesh?.elementInputs) {
    const inputs = pane.addFolder({ title: "Analysis Inputs" });
    inputsFolder = inputs;

    inputs.addBinding(settings.supports, "val", { label: "Supports" });
    inputs.addBinding(settings.loads, "val", { label: "Loads" });
  }

  if (mesh?.deformOutputs || mesh?.analyzeOutputs) {
    const outputs = pane.addFolder({ title: "Analysis Outputs" });
    outputsFolder = outputs;

    outputs.addBinding(settings.nodeResults, "val", {
      options: {
        none: "none",
        deformations: "deformations",
        reactions: "reactions",
      },
      label: "Node results",
    });

    if (settingsObj?.showFrameResults !== false) {
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
    }

    outputs.addBinding(settings.shellResults, "val", {
      options: {
        none: "none",
        bendingXX: "bendingXX",
        bendingYY: "bendingYY",
        bendingXY: "bendingXY",
        displacementX: "displacementX",
        displacementY: "displacementY",
        displacementZ: "displacementZ",
      },
      label: "Shell results",
    });

    outputs.addBinding(settings.deformedShape, "val", {
      label: "Deformed shape",
    });
  }

  const folders = new Map<string, any>();
  const getOrCreateFolder = (folderTitle: string) => {
    let folder = folders.get(folderTitle);
    if (folder) return folder;

    if (folderTitle === "Analysis Inputs" && inputsFolder) folder = inputsFolder;
    else if (folderTitle === "Analysis Outputs" && outputsFolder) folder = outputsFolder;
    else folder = pane.addFolder({ title: folderTitle });

    folders.set(folderTitle, folder);
    return folder;
  };

  if (settingsObj?.customSelects?.length) {
    settingsObj.customSelects.forEach((control) => {
      const folder = getOrCreateFolder(control.folder ?? "Display");
      folder.addBinding(control.state, "val", {
        label: control.label,
        options: control.options,
      });
    });
  }

  if (settingsObj?.customNumbers?.length) {
    settingsObj.customNumbers.forEach((control) => {
      const folder = getOrCreateFolder(control.folder ?? "Display");
      folder.addBinding(control.state, "val", {
        label: control.label,
        min: control.min,
        max: control.max,
        step: control.step,
      });
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
