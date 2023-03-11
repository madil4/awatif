import { Meta, StoryFn } from "@storybook/html";
import { ViewerSettingsPanel } from "./viewer-settings-panel";

export default {
  title: "UI/Viewer Settings Panel",
} as Meta;

const template: StoryFn = (): HTMLElement => {
  const viewerSettingsPanel = new ViewerSettingsPanel({ expanded: true });
  return viewerSettingsPanel.render();
};

export const Primary = template.bind({});
