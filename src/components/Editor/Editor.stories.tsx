import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";
import { Editor } from "./Editor";

type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    text: "Here is my code text",
  },
};

export default {
  title: "Editor",
  render: (props) => <Editor {...props} />,
} as Meta<ComponentProps<typeof Editor>>;
