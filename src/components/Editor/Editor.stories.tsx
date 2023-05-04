import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";
import { Editor } from "./Editor";

type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    text: "Here is my code",
  },
};

export default {
  title: "Editor",
  render: (props) => (
    <div class="h-screen w-screen">
      <Editor {...props} />,
    </div>
  ),
} as Meta<ComponentProps<typeof Editor>>;
