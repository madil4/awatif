import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { Viewer } from "./Viewer/Viewer";
import { Meta, StoryObj } from "@storybook/html";

export const Default: StoryObj = {};

export default {
  title: "App",
  render: () => (
    <Layouter>
      <Editor text="Here is text as an example" />
      <Viewer />
    </Layouter>
  ),
} as Meta;
