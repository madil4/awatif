import { Meta, StoryFn } from "@storybook/html";
import { ViewerLabel } from "./viewer-label";
import { Lut } from "three/examples/jsm/math/lut";

export default {
  title: "UI/Viewer Label",
} as Meta;

const template: StoryFn = (): any => {
  const label = new ViewerLabel(new Lut().createCanvas());
  label.update({ max: 10, min: 20 });

  return label.render();
};

export const Primary = template.bind({});
