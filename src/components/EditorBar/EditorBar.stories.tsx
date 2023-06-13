import { Meta, StoryObj } from "@storybook/html";
import { ComponentProps } from "solid-js";
import { EditorBar } from "./EditorBar";

type Args = ComponentProps<typeof EditorBar>;

export const Default: StoryObj<Args> = {
  args: {
    text: "Here is my code",
  },
};

export default {
  title: "EditorBar",
  render: (props) => (
    <div class="h-screen w-screen">
      <EditorBar {...props} />
    </div>
  ),
} as Meta<Args>;
