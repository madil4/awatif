import { Meta, StoryObj } from "@storybook/html";
import { Layouter } from "./Layouter";
import { ComponentProps } from "solid-js";

export const Default: StoryObj = {};

export default {
  title: "Layouter",
  render: () => (
    <Layouter>
      <div>Editor</div>
      <div>Viewer</div>
    </Layouter>
  ),
} as Meta;
