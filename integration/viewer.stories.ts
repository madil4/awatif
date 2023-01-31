import { Meta, StoryFn } from "@storybook/html";
import { Model, Viewer } from "../src/viewer/viewer";

export default {
  title: "Viewer",
} as Meta;

const template: StoryFn = (args: any): HTMLElement => {
  const viewer = new Viewer();
  viewer.update(args);
  return viewer.render();
};

export const Grid = template.bind({});
Grid.args = {
  positions: [],
  connectivities: [],
} as Model;

export const Lines = template.bind({});
Lines.args = {
  positions: [
    [-5, 0, 0],
    [0, 5, 0],
    [5, 0, 0],
    [0, 0, 2],
    [2, 5, -3],
  ],
  connectivities: [
    [0, 1],
    [1, 2],
    [3, 4],
  ],
} as Model;
