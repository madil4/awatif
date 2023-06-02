import { Meta, StoryObj } from "@storybook/html";
import { SettingsPane } from "./SettingsPane";

export const Default: StoryObj = {};

export default {
  title: "SettingsPane",
  render: () => (
    <SettingsPane
      settings={{
        nodes: true,
        elements: true,
        nodesIndices: false,
        elementsIndices: false,
        supports: true,
        loads: true,
        sections: false,
        materials: false,
        elementResults: "none",
      }}
    />
  ),
} as Meta;
