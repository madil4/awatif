import { Meta, StoryFn } from "@storybook/html";
import {
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
  DesignResults,
  DesignResultType,
  Model,
} from "../interfaces";
import { Viewer } from "./viewer";

export default {
  title: "UI/Viewer",
} as Meta;

const model: Model = {
  positions: [
    [-5, 0, 0],
    [0, 5, 0],
    [5, 0, 0],
    [0, 0, 2],
    [2, 5, -3],
  ],
  connectivities: [
    [0, 1],
    [1, 2],
    [3, 4],
  ],
  assignments: [
    {
      element: 0,
      type: AssignmentType.barSupports,
      firstNode: [true, true],
    },
    {
      element: 1,
      type: AssignmentType.barSupports,
      secondNode: [true, false],
    },
    {
      element: 0,
      type: AssignmentType.barUniformLoad,
      load: -100,
    },
    {
      element: 1,
      type: AssignmentType.barUniformLoad,
      load: -100,
    },
  ],
};
const analysisResults: AnalysisResults = {
  [0]: { type: AnalysisResultType.bar, stress: 0, force: 0 },
  [1]: { type: AnalysisResultType.bar, stress: 0.5, force: 90 },
  [2]: { type: AnalysisResultType.bar, stress: 1, force: 100 },
};
const designResults: DesignResults = {
  [0]: { type: DesignResultType.steel, ratio: 0.5 },
  [1]: { type: DesignResultType.steel, ratio: 1 },
  [2]: { type: DesignResultType.steel, ratio: 2 },
};

const template: StoryFn = (args): HTMLElement => {
  const viewer = new Viewer(args.settings);
  viewer.update(args.model, args.analysisResults, args.designResults);
  return viewer.render();
};

export const Empty = template.bind({});
Empty.args = {
  settings: { expanded: true },
  model: {
    positions: [],
    connectivities: [],
  },
};

export const WithoutResults = template.bind({});
WithoutResults.args = {
  settings: { expanded: true },
  model,
};

export const AnalysisResults1 = template.bind({});
AnalysisResults1.args = {
  settings: { results: "stress", expanded: true },
  model,
  analysisResults,
};

export const AnalysisResults2 = template.bind({});
AnalysisResults2.args = {
  settings: { results: "force", expanded: true },
  model,
  analysisResults,
};

export const DesignResult = template.bind({});
DesignResult.args = {
  settings: { results: "steel", expanded: true },
  model,
  analysisResults,
  designResults,
};

export const Supports = template.bind({});
Supports.args = {
  settings: { supports: true, expanded: true },
  model,
  analysisResults,
};

export const UniformLoad = template.bind({});
UniformLoad.args = {
  settings: { loads: true, expanded: true },
  model,
  analysisResults,
};
