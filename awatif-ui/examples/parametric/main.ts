import { analyze, PropertyAssignment } from "awatif-fem";
import { app } from "../../src/App";
import { Model, Parameters } from "../../src/types";

const parameters: Parameters = {
  length: { value: 10, min: 1, max: 20 },
  height: { value: 10, min: 1, max: 10 },
};

function onParameterChange(parameters: Parameters) {
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
    [0, 0, parameters.height.value],
    [parameters.length.value, 0, parameters.height.value],
    [parameters.length.value, 0, 0],
  ];
  model.elements = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];
  model.assignments = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: 3, support: [true, true, true, true, true, true] },
    { node: 2, load: [10, 0, 0, 0, 0, 0] },
    { ...beamProperty, element: 0 },
    { ...beamProperty, element: 1 },
    { ...beamProperty, element: 2 },
  ];

  model.analysisResults = analyze(
    model.nodes,
    model.elements,
    model.assignments
  );

  return model;
}

app({ parameters, onParameterChange });
