import { Pane, TpChangeEvent } from "tweakpane";

export type Settings = {
  nodes: boolean;
  elements: boolean;
  supports: boolean;
  loads: boolean;
  sections: boolean;
  materials: boolean;
  elementResults: string;
};

export type SettingsPaneProps = {
  settings: Settings;
  onChange?: (ev: TpChangeEvent<unknown>) => void;
};

export function SettingsPane(props: SettingsPaneProps) {
  let pane = new Pane({ title: "Settings", expanded: false });

  pane.addInput(props.settings, "nodes");
  pane.addInput(props.settings, "elements");
  pane.addInput(props.settings, "supports");
  pane.addInput(props.settings, "loads");
  pane.addInput(props.settings, "sections");
  pane.addInput(props.settings, "materials");
  pane.addInput(props.settings, "elementResults", {
    options: {
      none: "none",
      strain: "strain",
      stress: "stress",
      force: "force",
    },
    label: "element results",
  });

  pane.on("change", (ev) => {
    if (props.onChange) props.onChange(ev);
  });

  return <div class="absolute top-0 left-5 w-72">{pane.element}</div>;
}
