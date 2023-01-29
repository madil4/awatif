import { Meta, StoryFn } from "@storybook/html";
import { Viewer } from "../src/viewer/viewer";

export default {
  title: "Viewer",
} as Meta;

const template: StoryFn = (): HTMLElement => {
  const viewer = new Viewer();
  return viewer.render();
};

export const Grid = template.bind({});
