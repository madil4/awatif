import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { DefaultViewer } from "./Viewer/DefaultViewer";
import { Meta, StoryObj } from "@storybook/html";

export const Default: StoryObj = {};

export default {
  title: "App",
  render: () => (
    <Layouter>
      <Editor text="Here is text as an example" />
      <DefaultViewer />
    </Layouter>
  ),
} as Meta;
