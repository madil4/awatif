import { Meta, StoryFn } from "@storybook/html";
import { Viewer } from "../ui/viewer";
import { ParameterType } from "../interfaces";
import { modeling } from "./modeling";
import { Configurator } from "../ui/configurator";

export default {
  title: "Algorithms/Modeling",
} as Meta;

const template: StoryFn = (): HTMLElement => {
  const viewer = new Viewer({ supports: true, loads: true });
  const parameters = {
    height: {
      type: ParameterType.slider,
      value: 5,
      min: -10,
      max: 10,
      step: 0.01,
    },
  };
  const configurator = new Configurator(parameters);

  configurator.onChange(() => {
    const model = modeling(parameters);

    viewer.update(model);
  });

  const container = document.createElement("div");
  container.appendChild(viewer.render());
  container.appendChild(configurator.render());
  return container;
};

export const Primary = template.bind({});
