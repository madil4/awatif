import { FolderApi, Pane, TpChangeEvent } from "tweakpane";

import "./styles.css";

export type Parameters = {
  [key: string]: {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    folder?: string;
  };
};

export function parameters(
  parameters: Parameters,
  onChange: (e: TpChangeEvent<unknown>) => void
): HTMLDivElement {
  // init
  const container = document.createElement("div");
  const pane = new Pane({ title: "Parameters", container });
  const params = convertToTweakParams(parameters);
  const folders = new Map<string, FolderApi>();

  // update
  container.setAttribute("id", "parameters");

  folders.set("root", pane);

  Object.entries(parameters).forEach(([key, parameter]) => {
    parameter.folder &&
      !folders.get(parameter.folder) &&
      folders.set(
        parameter.folder,
        pane.addFolder({ title: parameter.folder })
      );

    folders.get(parameter.folder ?? "root")?.addBinding(params, key, {
      min: parameter.min || 0,
      max: parameter.max || 50,
      step: parameter.step || 0.5,
      label: parameter.label || key,
    });
  });

  // on parameters change
  pane.on("change", (e) => {
    if (!e.last) onChange(e);
  });

  return container;
}

// Utils
const convertToTweakParams = (
  parameters: Parameters
): Record<string, unknown> =>
  Object.entries(parameters).reduce(
    (tweakParams: Record<string, number>, [key, parameter]) => {
      tweakParams[key] = parameter.value;
      return tweakParams;
    },
    {}
  );
