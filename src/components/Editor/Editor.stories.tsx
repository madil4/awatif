import { Meta, StoryObj } from "@storybook/html";
import { ComponentProps } from "solid-js";
import { Editor } from "./Editor";

type Args = ComponentProps<typeof Editor>;

export const Default: StoryObj<Args> = {
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
} as Meta<Args>;
