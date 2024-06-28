import { app, Model } from "awatif-ui";
import { Node, Element, AnalysisInput } from "awatif-data-structure";
import { analyzeDynamically } from "./analyzeDynamically.ts";

const nodes: Node[] = [
  [0, 0, 0],
  [2, 0, 0],
  [4, 0, 0],
];

const elements: Element[] = [
  [0, 1],
  [1, 2],
];

const analysisInputs: AnalysisInput[] = [
  {
    node: 0,
    support: [true, true, true],
  },
  {
    node: 1,
    load: [0, 0, -2 * 9.81], // gravity force computed for masses of 2 and acceleration of 9.81 m/s^2
  },
  {
    node: 2,
    load: [0, 0, -4 * 9.81], // gravity force computed for masses of 2 and acceleration of 9.81 m/s^2
  },
  {
    node: 1,
    mass: [2, 2, 2],
  },
  {
    node: 2,
    mass: [4, 4, 4],
  },
  {
    element: 0,
    elasticity: 100000,
  },
  {
    element: 1,
    elasticity: 100000,
  },
];

const dynamicSettings = {
  time: 10,
  timeStep: 0.001,
};

const analysisOutputs = analyzeDynamically(
  nodes,
  elements,
  analysisInputs,
  dynamicSettings
);

app({
  onParameterChange: (): Model => ({
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
  }),
  settings: {
    gridSize: 10,
    dynamic: true,
    loads: false,
    dynamicSettings: dynamicSettings,
  },
});
