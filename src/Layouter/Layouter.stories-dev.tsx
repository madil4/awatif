import { Meta, StoryObj } from "@storybook/html";
import { Layouter } from "./Layouter";

export const Default: StoryObj = {};

export default {
  title: "Layouter",
  render: () => (
    <Layouter>
      <div>EditorBar</div>
      <div>Editor</div>
      <div>Login</div>
      <div>Viewer</div>
      <div>Setting</div>
      <div>Parameters</div>
    </Layouter>
  ),
} as Meta;
