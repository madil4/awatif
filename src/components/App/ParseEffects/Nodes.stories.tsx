import { Meta, StoryObj } from "@storybook/html";
import { App } from "../App";

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

export const Nodes: StoryObj = {
  args: {
    text: "export const nodes=[[0,0,0],[1,0,0]];",
  },
};

export const InvalidNodes: StoryObj = {
  args: {
    text: "export const nodes=[[0,0],[1,1,0],[0,1,2,3]];",
  },
};

export default {
  title: "App/ParseEffect/Nodes",
  render: (props) => <App text={props.text} />,
} as Meta;
