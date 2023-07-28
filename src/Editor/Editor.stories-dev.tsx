import { StoryObj, Meta } from "@storybook/html";
import { Editor } from "./Editor";

export const Default: StoryObj = {};

export default {
  title: "Editor",
  render: () => (
    <div class="h-screen w-screen">
      <Editor text="Here is my code" />,
    </div>
  ),
} as Meta;
