import { Meta, StoryObj } from "@storybook/html";
import { Layouter } from "./Layouter";

export const Default: StoryObj = {};

export default {
  title: "Layouter",
  render: () => (
    <Layouter>
      <div>Editor</div>
      <div>Viewer</div>
      <div>SettingsPane</div>
    </Layouter>
  ),
} as Meta;
