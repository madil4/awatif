import { app } from "../../src/App";
import { Model } from "../../src/types";
import { analyze, PropertyAssignment } from "awatif-fem";

let model: Model = {};
const beamProperty: PropertyAssignment = {
  element: 0,
  area: 10,
  elasticity: 10,
  momentOfInertiaY: 10,
  momentOfInertiaZ: 10,
  shearModulus: 10,
  torsionalConstant: 10,
};

model.nodes = [
  [0, 0, 0],
  [0, 0, 500],
  [500, 0, 500],
  [500, 0, 0],
];
model.elements = [
  [0, 1],
  [1, 2],
  [2, 3],
];
model.assignments = [
  { node: 0, support: [true, true, true, true, true, true] },
  { node: 3, support: [true, true, true, true, true, true] },
  { node: 2, load: [3e-3, 0, 0, 0, 0, 0] },
  { ...beamProperty, element: 0 },
  { ...beamProperty, element: 1 },
  { ...beamProperty, element: 2 },
];

model.analysisResults = analyze(model.nodes, model.elements, model.assignments);

app({ model, settings: { gridSize: 1000 } });
