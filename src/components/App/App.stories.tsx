import { Meta, StoryObj } from "@storybook/html";
import { App } from "./App";
import { ComponentProps } from "solid-js";

type Args = ComponentProps<typeof App>;

export const Default: StoryObj<Args> = {};

export const InvalidAlgorithm: StoryObj<Args> = {
  args: {
    algorithm: "invalid text",
  },
};

export const Nodes: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];`,
    settings: { nodes: true },
  },
};

export const Elements: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]`,
    settings: { elements: true },
  },
};

export const NodesIndices: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];`,
    settings: { nodesIndices: true },
  },
};

export const ElementsIndices: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]`,
    settings: { elementsIndices: true },
  },
};

export const Supports: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]

export const assignments = [
  {
    node: 0,
    support: [true, true, true]
  },
  {
    node: 2,
    support: [true, true, false]
  },
  {
    node: 3,
    support: [true, true, false]
  },
]`,
    settings: { supports: true },
  },
};

export const PointLoads: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]

export const assignments = [
  {
    node: 1,
    load: [0, 0, -100]
  },
  {
    node: 3,
    load: [0, 0, -100]
  },
]`,
    settings: { loads: true },
  },
};

export const ElementResults: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]

export const results = [
  {
    element: 0,
    strain: -5,
    stress: -10,
    force: 100
  },
  {
    element: 1,
    strain: 7,
    stress: -10,
    force: 100
  },
  {
    element: 2,
    strain: 6
  },
]`,
    settings: { elementResults: "strain" },
  },
};

export const NodeResults: StoryObj<Args> = {
  args: {
    algorithm: `export const nodes = [[0, 0, 0], [4, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]

export const results = [
  {
    node: 0,
    reaction: [50, 10, 0]
  },
  {
    node: 1,
    displacement: [-1, 3, 1],
  },
  {
    node: 3,
    displacement: [10, 10, 20],
    reaction: [50, 10, 0]
  },
]`,
    settings: { nodeResults: "displacement" },
  },
};

export const Analyzing: StoryObj<Args> = {
  args: {
    algorithm: `import { analyzing } from 'https://unpkg.com/awatif';

export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]

export const assignments = [
  {
    node: 0,
    support: [true, true, true]
  },
  {
    node: 2,
    support: [true, true, true]
  },
  {
    node: 1,
    load: [0, 0, -10]
  },
  {
    element: 0,
    area: 1.2,
    elasticity: 200
  },
  {
    element: 1,
    area: 1.2,
    elasticity: 200
  }
]

export const results = analyzing(nodes, elements, assignments);`,
    settings: { elementResults: "force" },
  },
};

export const Parameters: StoryObj<Args> = {
  args: {
    algorithm: `import { analyzing } from 'https://unpkg.com/awatif';

export const parameters = {
  xPosition: {
    value: 5,
    min: 1,
    max: 50,
    step: 1
  },
  zPosition: {
    value: 5,
    min: 0,
    max: 50,
    step: 1
  }
}

export const onParameterChange = (parameters) => {
  const nodes = [
    [0, 0, 0],
    [parameters.xPosition.value, 0, parameters.zPosition.value],
    [0, 0, 5]];
  const elements = [[0, 1], [1, 2]]

  const assignments = [
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: 2,
      support: [true, true, true]
    },
    {
      node: 1,
      load: [0, 0, -10]
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200
    }
  ]

  const results = analyzing(nodes, elements, assignments);

  return { nodes, elements, assignments, results }
}
`,
  },
};

export default {
  title: "App",
  render: (props) => <App {...props} />,
} as Meta<Args>;
