import { Pane, TpChangeEvent } from "tweakpane";
import { Parameters } from "./types";

export function Parameters(
  parameters: Parameters,
  onChange: (e: TpChangeEvent<unknown>) => void
) {
  // init
  const pane = new Pane({ title: "Parameters" });
  const params = convertToTweakParams(parameters);
  const container = pane.element.parentElement;

  // update
  if (container) {
    container.style.top = "inherit";
    container.style.bottom = "0px";
    container.style.width = "300px";
  }

  Object.entries(parameters).forEach(([key, parameter]) =>
    pane.addBinding(params, key, {
      min: parameter.min || 0,
      max: parameter.max || 50,
      step: parameter.step || 0.5,
      label: parameter.label || key,
    })
  );

  // on parameters change
  pane.on("change", (e) => onChange?.(e));
}

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
