import { Meta, StoryObj } from "@storybook/html";
import { App } from "../App";

export const Elements: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,5,0]];
export const elements=[[0,1],[1,2]]`,
  },
};

export const InvalidElementsLength: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,5,0]];
export const elements=[[0,1],[0]]`,
  },
};

export const InvalidElementsType: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,5,0]];
export const elements=[[0,2],[0,"K"]]`,
  },
};

export const WithoutNodes: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0]];
export const elements=[[0,1]]`,
  },
};

export const InvalidNodesLength: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[1,0]];
export const elements=[[0,1]]`,
  },
};

export const InvalidNodesType: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[1,0,"k"]];
export const elements=[[0,1]]`,
  },
};

export default {
  title: "App/Elements",
  render: (props) => <App text={props.text} />,
} as Meta;
