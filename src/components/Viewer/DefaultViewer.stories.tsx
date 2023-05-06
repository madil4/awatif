import { Meta, StoryObj } from "@storybook/html";
import { DefaultViewer } from "./DefaultViewer";

export const Default: StoryObj = {};

export default {
  title: "Default Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <DefaultViewer />
    </div>
  ),
} as Meta;
