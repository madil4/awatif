import { Viewer } from "./Viewer";
import type { Meta, StoryObj } from "@storybook/html";

export const Default: StoryObj = {};

export default {
  title: "Viewer",
  render: () => (
    <div class="w-screen h-screen">
      <Viewer />
    </div>
  ),
} as Meta;
