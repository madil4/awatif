import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";
import { Layouter } from "./Layouter";

type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    children: ["Editor2", "ModelConfigurator", "Viewer"],
  },
};

export default {
  title: "Layouter",
  render: (props) => <Layouter {...props} />,
} as Meta<ComponentProps<typeof Layouter>>;
