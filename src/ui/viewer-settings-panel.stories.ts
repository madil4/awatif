import { Meta, StoryFn } from "@storybook/html";
import { Settings } from "./viewer";
import { ViewerSettingsPanel } from "./viewer-settings-panel";

export default {
  title: "UI/Viewer Settings Panel",
} as Meta;

const template: StoryFn = (args): HTMLElement => {
  const viewerSettingsPanel = new ViewerSettingsPanel(args as Settings);
  return viewerSettingsPanel.render();
};

export const Primary = template.bind({});
Primary.args = {
  supports: false,
  loads: true,
  deformed: false,
  results: "stress",
  expanded: true,
} as Settings;
