import { Meta, StoryFn } from "@storybook/html";
import {
  AnalysisResult,
  AnalysisResultType,
  AssignmentType,
  DesignResult,
  DesignResultType,
  Model,
} from "../interfaces";
import { Settings, Viewer } from "./viewer";

export default {
  title: "UI/Viewer",
} as Meta;

const model: Model = {
  nodes: [
    [-10, 0, 0],
    [0, 10, 0],
    [10, 0, 0],
    [0, 0, 2],
    [4, 10, -6],
  ],
  deformedNodes: [
    [-10, 0, 0],
    [0, 2, 0],
    [10, 0, 0],
    [0, 0, 4],
    [4, 4, -6],
  ],
  elements: [
    [0, 1],
    [1, 2],
    [3, 4],
  ],
  assignments: [
    {
      element: 0,
      type: AssignmentType.barSupports,
      firstNode: [true, true, true],
    },
    {
      element: 1,
      type: AssignmentType.barSupports,
      secondNode: [true, false, false],
    },
    {
      element: 0,
      type: AssignmentType.barUniformLoad,
      xLoad: -100,
    },
    {
      element: 1,
      type: AssignmentType.barUniformLoad,
      yLoad: -100,
    },
    {
      element: 2,
      type: AssignmentType.barUniformLoad,
      yLoad: -100,
    },
    {
      element: 0,
      type: AssignmentType.barProperties,
      area: 10,
      elasticity: 20,
      profile: "500x500",
    },
    {
      element: 1,
      type: AssignmentType.barProperties,
      area: 10,
      elasticity: 20,
      profile: "500x500",
    },
  ],
};
const analysisResults: AnalysisResult[] = [
  {
    element: 0,
    type: AnalysisResultType.bar,
    stress: 0,
    force: 0,
    deformation: [
      [0, 0, 0],
      [5, -2, 0],
    ],
  },
  {
    element: 1,
    type: AnalysisResultType.bar,
    stress: 0.5,
    force: 90,
    deformation: [
      [5, -2, 0],
      [0, 0, 0],
    ],
  },
  {
    element: 2,
    type: AnalysisResultType.bar,
    stress: 1,
    force: 100,
    deformation: [
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
];
const designResults: DesignResult[] = [
  { element: 0, type: DesignResultType.steel, ratio: 0.5 },
  { element: 1, type: DesignResultType.steel, ratio: 1 },
  { element: 2, type: DesignResultType.steel, ratio: 2 },
];

const template: StoryFn = (args): HTMLElement => {
  const viewer = new Viewer(args.settings);
  viewer.update(args.model, args.analysisResults, args.designResults);
  return viewer.render();
};

export const Empty = template.bind({});
Empty.args = {
  settings: { expanded: true } as Settings,
  model: {
    nodes: [],
    elements: [],
  } as Model,
};

export const Primary = template.bind({});
Primary.args = {
  settings: { expanded: true } as Settings,
  model,
};

export const Nodes = template.bind({});
Nodes.args = {
  settings: { nodes: true, expanded: true } as Settings,
  model,
};

export const Supports = template.bind({});
Supports.args = {
  settings: { supports: true, expanded: true } as Settings,
  model,
};

export const Loads = template.bind({});
Loads.args = {
  settings: { loads: true, expanded: true } as Settings,
  model,
};

export const Deformed = template.bind({});
Deformed.args = {
  settings: { deformed: true, expanded: true } as Settings,
  model,
};

export const Profiles = template.bind({});
Profiles.args = {
  settings: { profiles: true, expanded: true } as Settings,
  model,
};

export const AnalysisResults = template.bind({});
AnalysisResults.args = {
  settings: { results: "force", expanded: true } as Settings,
  model,
  analysisResults,
};

export const DesignResults = template.bind({});
DesignResults.args = {
  settings: { results: "steel", expanded: true } as Settings,
  model,
  analysisResults,
  designResults,
};
