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
    parameter.folder &&
      !folders.get(parameter.folder) &&
      folders.set(
        parameter.folder,
        pane.addFolder({ title: parameter.folder })
      );

    folders.get(parameter.folder ?? "root")?.addBinding(tweakParameters, key, {
      min: parameter.min || 0,
      max: parameter.max || 50,
      step: parameter.step || 0.5,
      label: parameter.label || key,
    });
  });

  // Events: on parameters change update the state
  pane.on("change", (e) => {
    // @ts-ignore
    parameters[e.target.key].value.val = e.value;
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
