import { createEffect } from "solid-js";
import { FolderApi, Pane, TpChangeEvent } from "tweakpane";

type Parameter = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
};
export type ParametersType = Record<string, Parameter>;

type ParametersProps = {
  parameters: ParametersType;
  onChange?: (e: TpChangeEvent<unknown>) => void;
};

export function Parameters(props: ParametersProps) {
  let pane = new Pane({ title: "Parameters" });
  const folders = new Map<string, FolderApi>();

  createEffect(() => {
    const parameters = props.parameters;

    pane.hidden = Object.keys(parameters).length === 0;

    pane.children.forEach((c) => pane.remove(c));
    folders.clear();

    const tweakParams = convertToTweakParams(parameters);
    Object.entries(parameters).forEach(([key, parameter]) => {
      const bindingOptions = {
        min: parameter.min,
        max: parameter.max,
        step: parameter.step,
        label: parameter.label || key,
        tag: key,
      };

      const folderKey = getFolderKey(key);
      if (folderKey) {
        if (!folders.get(folderKey))
          folders.set(folderKey, pane.addFolder({ title: folderKey }));

        folders.get(folderKey)?.addBinding(tweakParams, key, {
          ...bindingOptions,
          label: parameter.label || key.split("/")[1],
        });
      } else {
        pane.addBinding(tweakParams, key, bindingOptions);
      }
    });
  });

  pane.on("change", (e) => {
    if (props.onChange) props.onChange(e);
  });

  return <div class="absolute bottom-0 right-5 w-[19rem]">{pane.element}</div>;
}

const convertToTweakParams = (parameters: ParametersType) =>
  Object.entries(parameters).reduce(
    (tweakParams: Record<string, number>, [key, parameter]) => {
      tweakParams[key] = parameter.value;
      return tweakParams;
    },
    {}
  );

const getFolderKey = (key: string) => {
  const splitList = key.split("/");
  return splitList.length === 1 ? undefined : splitList[0];
};
