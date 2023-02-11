import { Meta, StoryFn } from "@storybook/html";
import {
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
  Model,
} from "../src/interfaces";
import { Viewer } from "../src/viewer/viewer";
import { ViewerSettingsState } from "../src/viewer/viewer-settings-panel";

export default {
  title: "Viewer",
} as Meta;

const settingsState: ViewerSettingsState = {
  supports: false,
  loads: false,
  deformed: false,
  results: "none",
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
  [0]: { type: AnalysisResultType.bar, stress: 0, force: 0 },
  [1]: { type: AnalysisResultType.bar, stress: 0.5, force: 90 },
  [2]: { type: AnalysisResultType.bar, stress: 1, force: 100 },
};

const template: StoryFn = (args): HTMLElement => {
  const viewer = new Viewer(args.state);
  viewer.update(args.model, args.analysisResults);
  return viewer.render();
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
  state: settingsState,
  model,
  analysisResults,
};

export const ColoredLines1 = template.bind({});
ColoredLines1.args = {
  state: { ...settingsState, results: "stress" },
  model,
  analysisResults,
};

export const ColoredLines2 = template.bind({});
ColoredLines2.args = {
  state: { ...settingsState, results: "force" },
  model,
  analysisResults,
};

export const Supports = template.bind({});
Supports.args = {
  state: { ...settingsState, supports: true },
  model,
  analysisResults,
};

export const UniformLoad = template.bind({});
UniformLoad.args = {
  state: { ...settingsState, loads: true },
  model,
  analysisResults,
};
