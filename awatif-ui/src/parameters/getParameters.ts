import { FolderApi, Pane } from "tweakpane";
import { State } from "vanjs-core";

import "./styles.css";

export type Parameters = {
  [key: string]: {
    value: State<number>;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    folder?: string;
  };
};

export function getParameters(parameters: Parameters): HTMLDivElement {
  // Init
  const parametersElm = document.createElement("div");
  const pane = new Pane({ title: "Parameters", container: parametersElm });
  const tweakParameters = convertToTweakparameters(parameters);
  const folders = new Map<string, FolderApi>();

  // Update
  parametersElm.setAttribute("id", "parameters");

  folders.set("root", pane);

  Object.entries(parameters).forEach(([key, parameter]) => {
    const min = parameter.min ?? 0;
    const max = parameter.max ?? 50;
    const step = parameter.step ?? 0.5;

    parameter.folder &&
      !folders.get(parameter.folder) &&
      folders.set(
        parameter.folder,
        pane.addFolder({ title: parameter.folder })
      );

    folders.get(parameter.folder ?? "root")?.addBinding(tweakParameters, key, {
      min,
      max,
      step,
      label: parameter.label || key,
    });
  });

  // Events: on parameters change update the state
  pane.on("change", (e) => {
    // @ts-ignore
    const key = e.target.key as string | undefined;
    if (!key || !parameters[key]) return;

    const parameter = parameters[key];
    const min = parameter.min;
    const max = parameter.max;

    const numericValue = Number(e.value);
    if (!Number.isFinite(numericValue)) return;

    let nextValue = numericValue;
    if (typeof min === "number") nextValue = Math.max(min, nextValue);
    if (typeof max === "number") nextValue = Math.min(max, nextValue);

    parameter.value.val = nextValue;
  });

  return parametersElm;
}

// Utils
const convertToTweakparameters = (
  parameters: Parameters
): Record<string, unknown> =>
  Object.entries(parameters).reduce(
    (tweakparameters: Record<string, number>, [key, parameter]) => {
      tweakparameters[key] = parameter.value.val;
      return tweakparameters;
    },
    {}
  );
