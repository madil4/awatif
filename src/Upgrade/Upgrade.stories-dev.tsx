import { Meta, StoryObj } from "@storybook/html";
import { Upgrade } from "./Upgrade";

export const Default: StoryObj = {};

export default {
  title: "Upgrade",
  // @ts-ignore
  play: () => UpgradeModal.showModal(),
  render: () => <Upgrade />,
} as Meta;
