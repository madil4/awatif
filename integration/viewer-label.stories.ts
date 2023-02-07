import { Meta, StoryFn } from "@storybook/html";
import { ViewerLabel } from "../src/viewer/viewer-label";

export default {
  title: "Viewer Label",
} as Meta;

const template: StoryFn = (): any => {
  const viewerLabel = new ViewerLabel();
  return viewerLabel.getHTML();
};

export const Primary = template.bind({});
