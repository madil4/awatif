import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { Parameters, parameters, viewer } from "awatif-ui";

// Init
const params: Parameters = {
  xPosition: { value: van.state(600), min: 0, max: 1000 },
  zPosition: { value: van.state(0), min: 0, max: 500 },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const analysisInputs: State<AnalysisInputs> = van.state({});
const analysisOutputs: State<AnalysisOutputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  nodes.val = [
    [250, 0, 0],
    [params.xPosition.value.val, 0, params.zPosition.value.val],
    [250, 0, 400],
  ];
  elements.val = [
    [0, 1],
    [1, 2],
  ];
  analysisInputs.val = {
    materials: new Map([
      [0, { elasticity: 200 }],
      [1, { elasticity: 200 }],
    ]),
    sections: new Map([
      [0, { area: 100 }],
      [1, { area: 100 }],
    ]),
    pointSupports: new Map([
      [0, [true, true, true, true, true, true]],
      [2, [true, true, true, true, true, true]],
    ]),
    pointLoads: new Map([[1, [0, 0, -1e3, 0, 0, 0]]]),
  };

  analysisOutputs.val = analyze(nodes.val, elements.val, analysisInputs.val);
});

document.body.append(
  parameters(params),
  viewer({
    structure: {
      nodes,
      elements,
      analysisInputs,
      analysisOutputs,
    },
    settingsObj: {
      gridSize: 1000,
    },
  })
);
