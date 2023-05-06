import { Viewer } from "./Viewer";
import { Meta, StoryObj } from "@storybook/html";

export const Default: StoryObj = {};

export default {
  title: "Viewer/Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer />
    </div>
  ),
} as Meta;
