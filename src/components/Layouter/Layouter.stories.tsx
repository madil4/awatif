import type { Meta, StoryObj } from "@storybook/html";
import { Layouter } from "./Layouter";
import { ComponentProps } from "solid-js";

type Args = ComponentProps<typeof Layouter>;

export const Default: StoryObj<Args> = {
  args: {
    children: ["Editor", "Viewer"],
  },
};

export default {
  title: "Layouter",
  render: (props) => <Layouter {...props} />,
} as Meta<Args>;
