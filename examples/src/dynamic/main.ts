import { app, Model } from "awatif-ui";
import { Node, Element, AnalysisInputs } from "awatif-data-structure";
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

const analysisInputs: AnalysisInputs = {
  materials: new Map(),
  sections: new Map(),
  pointSupports: new Map(),
  pointLoads: new Map(),
};

analysisInputs.pointSupports?.set(0, [true, true, true, true, true, true]);
analysisInputs.pointLoads?.set(1, [0, 0, -2 * 9.81, 0, 0, 0]);
analysisInputs.pointLoads?.set(2, [0, 0, -2 * 9.81, 0, 0, 0]);
analysisInputs.materials?.set(0, { elasticity: 100000, mass: 2 });
analysisInputs.materials?.set(1, { elasticity: 100000, mass: 4 });

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
