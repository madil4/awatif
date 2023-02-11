import { Meta, StoryFn } from "@storybook/html";
import { Lut } from "../src/viewer/utils/lut";
import { ViewerLabel } from "../src/viewer/viewer-label";

export default {
  title: "Viewer Label",
} as Meta;

const template: StoryFn = (): any => {
  const label = new ViewerLabel(new Lut().createCanvas());
  label.update({ max: 10, min: 20 });

  return label.render();
};

export const Primary = template.bind({});
