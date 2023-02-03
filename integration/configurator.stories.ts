import { Meta, StoryFn } from "@storybook/html";
import { Configurator } from "../src/configurator/configurator";
import { ParameterType, Parameters } from "../src/interfaces";

export default {
  title: "Configurator",
} as Meta;

const template: StoryFn = (args: Parameters): HTMLElement => {
  const configurator = new Configurator();
  return configurator.render(args);
};

export const Slider = template.bind({});
Slider.args = {
  height: {
    type: ParameterType.slider,
    value: 50,
    min: 0,
    max: 100,
    step: 1,
  },
} as Parameters;

export const Sliders = template.bind({});
Sliders.args = {
  height: {
    type: ParameterType.slider,
    value: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  width: {
    type: ParameterType.slider,
    value: 40,
    min: 0,
    max: 50,
    step: 2,
  },
} as Parameters;
