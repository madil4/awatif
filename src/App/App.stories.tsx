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
    script: `import { analyze } from 'https://unpkg.com/awatif';

export const nodes = [[8, 12.5, 0], [15, 12.5, 0], [8, 12.5, 8]];;
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

export const analysisResults = analyze(nodes, elements, assignments);`,
  },
};

export const UndeformedAndGridSize: StoryObj<Args> = {
  args: {
    script: `import { analyze } from 'https://unpkg.com/awatif';

export const nodes = [[8, 12.5, 0], [15, 12.5, 0], [8, 12.5, 8]];;;
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

export const analysisResults = analyze(nodes, elements, assignments);

export const settings = {
    deformedShape: false,
    gridSize: 40
}`,
  },
};

export const ParametersAndResults: StoryObj<Args> = {
  args: {
    script: `import { analyze } from 'https://unpkg.com/awatif';

export const parameters = {
  xPosition: {
    value: 15,
    min: 1,
    max: 20,
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
    [8, 12.5, 0],
    [parameters.xPosition.value, 12.5, parameters.zPosition.value],
    [8, 12.5, 8]];
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

  const analysisResults = analyze(nodes, elements, assignments);

  return { nodes, elements, assignments, analysisResults }
}

export const settings = {
  elementResults: "normal",
  nodeResults: "reaction",
}
`,
  },
};

export const IndicesAndDisplayScale: StoryObj<Args> = {
  args: {
    script: `export const nodes = [[8, 12.5, 0], [15, 12.5, 0], [8, 12.5, 8]];;
export const elements = [[0, 1], [1, 2]];

export const settings = {
    displayScale: 2,
    nodesIndices: true,
    elementsIndices: true
};`,
  },
};

export default {
  title: "App",
  render: (props) => <App {...props} />,
} as Meta<Args>;
