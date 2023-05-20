import { Meta, StoryObj } from "@storybook/html";
import { App } from "./App";
import { ComponentProps } from "solid-js";

type Args = ComponentProps<typeof App>;

export const Default: StoryObj<Args> = {};

export const InvalidText: StoryObj<Args> = {
  args: {
    text: "invalid text",
  },
};

export const Nodes: StoryObj<Args> = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];`,
    settings: { nodes: true },
  },
};

export const Elements: StoryObj<Args> = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]`,
    settings: { elements: true },
  },
};

export const Supports: StoryObj<Args> = {
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
    settings: { supports: true },
  },
};

export const PointLoads: StoryObj<Args> = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    node: 1,
    load : [0,0,-100]
  },
  {
    node: 3,
    load : [0,0,-100]
  },
]`,
    settings: { loads: true },
  },
};

export const Sections: StoryObj<Args> = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    element: 0,
    section : "r500x500"
  },
  {
    element: 2,
    section : "r500x500"
  },
]`,
    settings: { sections: true },
  },
};

export const Materials: StoryObj<Args> = {
  args: {
    text: `export const nodes=[[0,0,0],[5,0,0],[0,0,5]];
export const elements=[[0,1],[1,2]]
      
export const assignments = [
  {
    element: 0,
    material : 7500
  },
  {
    element: 2,
    material : 7500
  },
]`,
    settings: { materials: true },
  },
};

export default {
  title: "App",
  render: (props) => <App {...props} />,
} as Meta<Args>;
