import { Meta, StoryFn } from "@storybook/html";
import { Configurator } from "./configurator";
import { ParameterType, Parameters } from "../interfaces";

export default {
  title: "UI/Configurator",
} as Meta;

const template: StoryFn = (args): HTMLElement => {
  const configurator = new Configurator(args);
  return configurator.render();
};

export const Slider = template.bind({});
Slider.args = {
  height: {
    type: ParameterType.slider,
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    label: "height (m)",
  },
} as Parameters;

export const Toggle = template.bind({});
Toggle.args = {
  bracing: {
    type: ParameterType.toggle,
    value: true,
  },
} as Parameters;

export const Multiple = template.bind({});
Multiple.args = {
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
  bracing: {
    type: ParameterType.toggle,
    value: true,
  },
} as Parameters;
