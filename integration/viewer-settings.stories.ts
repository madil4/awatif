import { Meta, StoryFn } from "@storybook/html";
import { ViewerSettings } from "../src/viewer/viewer-settings";

export default {
  title: "Viewer Settings",
} as Meta;

const template: StoryFn = (): HTMLElement => {
  const viewerSettings = new ViewerSettings();
  return viewerSettings.render();
};

export const Primary = template.bind({});
