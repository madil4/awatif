import { Meta, StoryObj } from "@storybook/html";
import { App } from "../App";

export const Default: StoryObj = {};

export const EmptyText: StoryObj = {
  args: {
    text: " ",
  },
};

export const InvalidText: StoryObj = {
  args: {
    text: "invalid text",
  },
};

export default {
  title: "App",
  render: (props) => <App text={props.text} />,
} as Meta;
