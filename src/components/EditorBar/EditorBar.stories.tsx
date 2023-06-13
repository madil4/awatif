import { Meta, StoryObj } from "@storybook/html";
import { EditorBar } from "./EditorBar";

export const Default: StoryObj = {};

export default {
  title: "EditorBar",
  render: () => (
    <div class="h-screen w-screen">
      <EditorBar />
    </div>
  ),
} as Meta;
