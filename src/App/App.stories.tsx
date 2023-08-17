import { Meta, StoryObj } from "@storybook/html";
import { App } from "./App";
import { ComponentProps } from "solid-js";

type Args = ComponentProps<typeof App>;

export const Invalid: StoryObj<Args> = {
  args: {
    script: "Invalid text",
  },
};

export const Default: StoryObj<Args> = {
  args: {
    script: `import { analyzing } from 'https://unpkg.com/awatif';

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

export const analysisResults = analyzing(nodes, elements, assignments);`,
  },
};

export const UndeformedAndSize: StoryObj<Args> = {
  args: {
    script: `import { analyzing } from 'https://unpkg.com/awatif';

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

export const analysisResults = analyzing(nodes, elements, assignments);`,
    settings: { gridSize: 10, deformedShape: false },
  },
};

export const ParametersAndResults: StoryObj<Args> = {
  args: {
    script: `import { analyzing } from 'https://unpkg.com/awatif';

export const parameters = {
  xPosition: {
    value: 5,
    min: 1,
    max: 10,
    step: 1
  },
  zPosition: {
    value: 0,
    min: 0,
    max: 10,
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

  const analysisResults = analyzing(nodes, elements, assignments);

  return { nodes, elements, assignments, analysisResults }
}
`,
    settings: {
      displayScale: 2,
      elementResults: "normal",
      nodeResults: "reaction",
    },
  },
};

export const Indices: StoryObj<Args> = {
  args: {
    script: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]]`,
    settings: { nodesIndices: true, elementsIndices: true },
  },
};

export const OverrideSettings: StoryObj<Args> = {
  args: {
    script: `export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
export const elements = [[0, 1], [1, 2]];

export const settings = {
    nodesIndices: true,
    elementsIndices: true
};`,
  },
};

export default {
  title: "App",
  render: (props) => <App {...props} />,
} as Meta<Args>;
