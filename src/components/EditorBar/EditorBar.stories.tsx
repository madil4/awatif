import { Meta, StoryObj } from "@storybook/html";
import { EditorBar } from "./EditorBar";
import { ComponentProps } from "solid-js";

type Args = ComponentProps<typeof EditorBar>;

export const Default: StoryObj<Args> = {};

export default {
  title: "EditorBar",
  render: () => (
    <div class="h-screen w-screen">
      <EditorBar error={"there is an error"} />
    </div>
  ),
} as Meta<Args>;
