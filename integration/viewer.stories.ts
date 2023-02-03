import { Meta, StoryFn } from "@storybook/html";
import {
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
  Model,
} from "../src/interfaces";
import { Viewer } from "../src/viewer/viewer";

export default {
  title: "Viewer",
} as Meta;

const template: StoryFn = (args): HTMLElement => {
  const viewer = new Viewer();
  viewer.update(args.model, args.analysisResults);
  return viewer.render();
};

export const Grid = template.bind({});
Grid.args = {
  model: {
    positions: [],
    connectivities: [],
  } as Model,
};

export const Lines = template.bind({});
Lines.args = {
  model: {
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
  } as Model,
};

export const ColoredLines = template.bind({});
ColoredLines.args = {
  model: {
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
  } as Model,
  analysisResults: {
    [0]: { type: AnalysisResultType.bar, stress: 0 },
    [1]: { type: AnalysisResultType.bar, stress: 0.5 },
    [2]: { type: AnalysisResultType.bar, stress: 1 },
  } as AnalysisResults,
};

export const Supports = template.bind({});
Supports.args = {
  model: {
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
    ],
  } as Model,
};
