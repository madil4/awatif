import { Meta, StoryObj } from "@storybook/html";
import { App } from "./App";

export const Default: StoryObj = {};

export const InvalidText: StoryObj = {
  args: {
    text: "invalid text 2",
  },
};

export const Nodes: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];`,
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
    support : [true,true,true]
  },
  {
    node: 2,
    support : [true,true,false]
  },
  {
    node: 3,
    support : [true,true,false]
  },
]`,
  },
};

export const PointLoads: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    node: 1,
    load : [0,0,-100]
  },
  {
    node: 1,
    support : [true,true,true]
  },
  {
    node: 3,
    load : [0,0,-100]
  },
]`,
  },
};

export const Sections: StoryObj = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    element: 0,
    section : "r500x500"
  },
  {
    element: 1,
    material : 250
  },
  {
    element: 2,
    section : "r500x500"
  },
]`,
  },
};

export default {
  title: "App",
  render: (props) => <App text={props.text} />,
} as Meta;
