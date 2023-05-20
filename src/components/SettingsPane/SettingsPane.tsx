import { Pane, TpChangeEvent } from "tweakpane";

export const settings = {
  nodes: true,
  elements: true,
  supports: true,
  loads: true,
  sections: false,
  materials: false,
};

type SettingsPaneProps = {
  onChange?: (ev: TpChangeEvent<unknown>) => void;
};

export function SettingsPane(props: SettingsPaneProps) {
  let pane = new Pane({ title: "Settings", expanded: false });

  pane.addInput(settings, "nodes");
  pane.addInput(settings, "elements");
  pane.addInput(settings, "supports");
  pane.addInput(settings, "loads");
  pane.addInput(settings, "sections");
  pane.addInput(settings, "materials");

  pane.on("change", (ev) => {
    if (props.onChange) props.onChange(ev);
  });

  return <div class="absolute top-0 left-5 w-64">{pane.element}</div>;
}
