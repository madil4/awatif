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

export const Elements: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[1,0,0],[0,1,0]];
export const elements=[[0,1],[1,2]]`,
  },
};

export const InvalidElements: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[1,0,0],[0,1,0]];
export const elements=[[0,1],[1]]`,
  },
};

export const EmptyNodes: StoryObj = {
  args: {
    text: `export const nodes=[];
export const elements=[[0,1],[0,2]]`,
  },
};

export default {
  title: "App/ParseEffect/Elements",
  render: (props) => <App text={props.text} />,
} as Meta;
