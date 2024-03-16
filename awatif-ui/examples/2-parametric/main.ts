import {
  app,
  Assignment,
  Element,
  Node,
  Parameters,
  PropertyAssignment,
} from "../../src";
import { analyze } from "../../../awatif-fem";

const parameters: Parameters = {
  length: { value: 10, min: 1, max: 20 },
  height: { value: 10, min: 1, max: 10 },
};

function onParameterChange(parameters: Parameters) {
  const nodes: Node[] = [
    [0, 0, 0],
    [0, 0, parameters.height.value],
    [parameters.length.value, 0, parameters.height.value],
    [parameters.length.value, 0, 0],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];

  const beamProperty: PropertyAssignment = {
    element: 0,
    area: 10,
    elasticity: 10,
    momentOfInertiaY: 10,
    momentOfInertiaZ: 10,
    shearModulus: 10,
    torsionalConstant: 10,
  };
  const assignments: Assignment[] = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: 3, support: [true, true, true, true, true, true] },
    { node: 2, load: [10, 0, 0, 0, 0, 0] },
    { ...beamProperty, element: 0 },
    { ...beamProperty, element: 1 },
    { ...beamProperty, element: 2 },
  ];

  const analysisResults = analyze(nodes, elements, assignments);

  return { nodes, elements, assignments, analysisResults };
}

app({ parameters, onParameterChange });
