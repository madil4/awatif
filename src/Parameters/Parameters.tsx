import { createEffect } from "solid-js";
import { Pane, TpChangeEvent } from "tweakpane";

type Parameter = {
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
};
export type ParametersType = Record<string, Parameter>;

export type SettingsProps = {
  parameters: ParametersType;
  onChange?: (ev: TpChangeEvent<unknown>) => void;
};

export function Parameters(props: SettingsProps) {
  let pane = new Pane({ title: "Parameters" });
  let inputs: any[] = [];

  createEffect(() => {
    pane.hidden = Object.keys(props.parameters).length == 0 ? true : false;

    inputs.forEach((i) => pane.remove(i));

    Object.keys(props.parameters).forEach((key) => {
      const parameter = props.parameters[key];
      inputs.push(
        pane.addInput(parameter, "value", {
          min: parameter.min,
          max: parameter.max,
          step: parameter.step,
          label: parameter.label || key,
          presetKey: key,
        })
      );
    });
  });

  pane.on("change", (ev) => {
    if (props.onChange) props.onChange(ev);
  });

  return <div class="absolute bottom-0 right-5 w-[19rem]">{pane.element}</div>;
}
