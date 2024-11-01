import van, { State } from "vanjs-core";
import {
  AnalysisInputs,
  AnalysisOutputs,
  Element,
  Node,
} from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { parameters, Parameters, viewer } from "awatif-ui";

// Init
const params: Parameters = {
  length: { value: van.state(10), min: 1, max: 20 },
  height: { value: van.state(10), min: 1, max: 10 },
  xLoad: { value: van.state(10), min: 0, max: 10, folder: "Loads" },
  area: { value: van.state(10), min: 1, max: 10, folder: "Sections" },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const analysisInputs: State<AnalysisInputs> = van.state({});
const analysisOutputs: State<AnalysisOutputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  const length = params.length.value.val;
  const height = params.height.value.val;
  const xLoad = params.xLoad.value.val;
  const area = params.area.value.val;

  nodes.val = [
    [0, 0, 0],
    [0, 0, height],
    [length, 0, height],
    [length, 0, 0],
  ];
  elements.val = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];

  analysisInputs.val = {
    materials: new Map(
      elements.rawVal.map((_, i) => [
        i,
        {
          elasticity: 10,
          shearModulus: 10,
        },
      ])
    ),
    sections: new Map(
      elements.rawVal.map((_, i) => [
        i,
        {
          area: area,
          momentOfInertiaY: 10,
          momentOfInertiaZ: 10,
          torsionalConstant: 10,
        },
      ])
    ),
    pointSupports: new Map([
      [0, [true, true, true, true, true, true]],
      [3, [true, true, true, true, true, true]],
    ]),
    pointLoads: new Map([[2, [xLoad, 0, 0, 0, 0, 0]]]),
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
      deformedShape: true,
    },
  })
);
