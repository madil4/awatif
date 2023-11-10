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

  pane.addBinding(props.settings, "gridSize", { label: "grid size", min: 1 });
  pane.addBinding(props.settings, "displayScale", {
    label: "display scale",
    min: -10,
    max: 10,
    step: 1,
  });
  pane.addBinding(props.settings, "nodes");
  pane.addBinding(props.settings, "elements");
  pane.addBinding(props.settings, "nodesIndices", { label: "nodes indices" });
  pane.addBinding(props.settings, "elementsIndices", {
    label: "elements indices",
  });
  pane.addBinding(props.settings, "supports");
  pane.addBinding(props.settings, "loads");
  pane.addBinding(props.settings, "deformedShape", { label: "deformed shape" });
  pane.addBinding(props.settings, "elementResults", {
    options: {
      none: "none",
      normal: "normal",
    },
    label: "element results",
  });
  pane.addBinding(props.settings, "nodeResults", {
    options: {
      none: "none",
      deformation: "deformation",
      reaction: "reaction",
    },
    label: "node results",
  });

  pane.on("change", (e) => {
    if (props.onChange) props.onChange(e);
  });

  createEffect(() => {
    pane.refresh();
  });

  return <div class="absolute top-0 left-5 w-[19rem]">{pane.element}</div>;
}
