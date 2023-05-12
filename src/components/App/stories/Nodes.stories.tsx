import { Meta, StoryObj } from "@storybook/html";
import { App } from "../App";

export const Nodes: StoryObj = {
  args: {
    text: "export const nodes=[[0,0,0],[5,0,0]];",
  },
};

export const InvalidNodesLength: StoryObj = {
  args: {
    text: "export const nodes=[[0,0],[0,5,0],[0,1,2,3]];",
  },
};

export const InvalidNodesType: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[1,0,"k"]];`,
  },
};

export default {
  title: "App/Nodes",
  render: (props) => <App text={props.text} />,
} as Meta;
