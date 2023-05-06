import { App } from "./App";
import { Editor } from "./Editor/Editor";
import { Layouter } from "./Layouter/Layouter";
import { Meta, StoryObj } from "@storybook/html";

export const Default: StoryObj = {};

export default {
  title: "App",
  render: () => <App />,
} as Meta;
