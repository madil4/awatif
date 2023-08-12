import { Meta, StoryObj } from "@storybook/html";
import { Settings } from "./Settings";

export const Default: StoryObj = {};

export default {
  title: "SettingsPane",
  render: () => (
    <Settings
      settings={{
        gridSize: 40,
        nodes: true,
        elements: true,
        nodesIndices: false,
        elementsIndices: false,
        supports: true,
        loads: true,
        deformedShape: true,
        elementResults: "none",
        nodeResults: "none",
      }}
    />
  ),
} as Meta;
