import { createEffect } from "solid-js";
import { Pane, TpChangeEvent } from "tweakpane";

export type SettingsType = {
  gridSize: number;
  displayScale: number;
  nodes: boolean;
  elements: boolean;
  nodesIndices: boolean;
  elementsIndices: boolean;
  supports: boolean;
  loads: boolean;
  deformedShape: boolean;
  elementResults: string;
  nodeResults: string;
  hideEditor: boolean;
};

export type SettingsProps = {
  settings: SettingsType;
  onChange?: (ev: TpChangeEvent<unknown>) => void;
};

export function Settings(props: SettingsProps) {
  let pane = new Pane({ title: "Settings", expanded: false });

  pane.addInput(props.settings, "gridSize", { label: "grid size", min: 1 });
  pane.addInput(props.settings, "displayScale", {
    label: "display scale",
    min: -10,
    max: 10,
    step: 1,
  });
  pane.addInput(props.settings, "nodes");
  pane.addInput(props.settings, "elements");
  pane.addInput(props.settings, "nodesIndices", { label: "nodes indices" });
  pane.addInput(props.settings, "elementsIndices", {
    label: "elements indices",
  });
  pane.addInput(props.settings, "supports");
  pane.addInput(props.settings, "loads");
  pane.addInput(props.settings, "deformedShape", { label: "deformed shape" });
  pane.addInput(props.settings, "elementResults", {
    options: {
      none: "none",
      normal: "normal",
    },
    label: "element results",
  });
  pane.addInput(props.settings, "nodeResults", {
    options: {
      none: "none",
      deformation: "deformation",
      reaction: "reaction",
    },
    label: "node results",
  });

  pane.on("change", (ev) => {
    if (props.onChange) props.onChange(ev);
  });

  createEffect(() => {
    pane.refresh();
  });

  return <div class="absolute top-0 left-5 w-[19rem]">{pane.element}</div>;
}
