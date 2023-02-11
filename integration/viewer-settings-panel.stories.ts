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
    results: "none",
  });
  return viewerSettingsPanel.render();
};

export const Primary = template.bind({});
