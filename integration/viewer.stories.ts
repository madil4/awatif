import { Meta, StoryFn } from "@storybook/html";
import {
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
  Model,
} from "../src/interfaces";
import { Viewer, ViewerSettingsState } from "../src/viewer/viewer";

export default {
  title: "Viewer",
} as Meta;

const viewerSettingState: ViewerSettingsState = {
  supports: false,
  loads: false,
  deformed: false,
  result: "none",
};
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
    [
      0,
      {
        type: AssignmentType.barSupports,
        firstNode: [true, true],
      },
    ],
    [
      1,
      {
        type: AssignmentType.barSupports,
        secondNode: [true, false],
      },
    ],
    [
      0,
      {
        type: AssignmentType.barUniformLoad,
        load: -100,
      },
    ],
    [
      1,
      {
        type: AssignmentType.barUniformLoad,
        load: -100,
      },
    ],
  ],
};
const analysisResults: AnalysisResults = {
  [0]: { type: AnalysisResultType.bar, stress: 0 },
  [1]: { type: AnalysisResultType.bar, stress: 0.5 },
  [2]: { type: AnalysisResultType.bar, stress: 1 },
};

const template: StoryFn = (args): HTMLElement => {
  const viewer = new Viewer(args.viewerSettingState);
  viewer.update(args.model, args.analysisResults);
  return viewer.getHTML();
};

export const Grid = template.bind({});
Grid.args = {
  model: {
    positions: [],
    connectivities: [],
  },
};

export const Lines = template.bind({});
Lines.args = {
  viewerSettingState,
  model,
};

export const ColoredLines = template.bind({});
ColoredLines.args = {
  viewerSettingState,
  model,
  analysisResults,
};

export const Supports = template.bind({});
Supports.args = {
  viewerSettingState: { ...viewerSettingState, supports: true },
  model,
};

export const UniformLoad = template.bind({});
UniformLoad.args = {
  viewerSettingState: { ...viewerSettingState, loads: true },
  model,
};
