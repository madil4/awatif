import { Meta, StoryObj } from "@storybook/html";
import { App } from "./App";

export const Default: StoryObj = {};

export const InvalidText: StoryObj = {
  args: {
    text: "invalid text",
  },
};

export const Nodes: StoryObj = {
  args: {
    text: "export const nodes=[[0,0,0],[5,0,0]];",
  },
};

export const Elements: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]`,
  },
};

export const Supports: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    node: 0,
    supports : [true,true,true]
  },
  {
    node: 2,
    supports : [true,true,false]
  },
  {
    node: 1,
    loads: [100,100,100]
  }
]`,
  },
};

export const SupportsCombined: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    node: [0,2],
    supports : [true,true,true]
  },
  {
    node: 1,
    loads: [100,100,100]
  }
]`,
  },
};

export default {
  title: "App",
  render: (props) => <App text={props.text} />,
} as Meta;
