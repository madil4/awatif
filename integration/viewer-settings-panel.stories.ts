import { Meta, StoryFn } from "@storybook/html";
import { ViewerSettingsPanel } from "../src/viewer/viewer-settings-panel";

export default {
  title: "Viewer Settings",
} as Meta;

const template: StoryFn = (): HTMLElement => {
  const viewerSettingsPanel = new ViewerSettingsPanel({
    supports: false,
    loads: true,
    deformed: false,
    result: "none",
  });
  return viewerSettingsPanel.getHTML();
};

export const Primary = template.bind({});
