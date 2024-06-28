import {
  AnalysisInput,
  Element,
  Node,
  FrameAnalysisInput,
} from "awatif-data-structure";
import { app, Model, Parameters } from "../../src/";
import { analyze } from "../../../awatif-fem";

const parameters: Parameters = {
  length: { value: 10, min: 1, max: 20 },
  height: { value: 10, min: 1, max: 10 },
  xLoad: { value: 10, min: 0, max: 10, folder: "Loads" },
  area: { value: 10, min: 1, max: 10, folder: "Sections" },
};

function onParameterChange(parameters: Parameters) {
  const length = parameters.length.value;
  const height = parameters.height.value;
  const xLoad = parameters.xLoad.value;
  const area = parameters.area.value;

  const nodes: Node[] = [
    [0, 0, 0],
    [0, 0, height],
    [length, 0, height],
    [length, 0, 0],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];

  const frameInput: FrameAnalysisInput = {
    element: 0,
    area: area,
    elasticity: 10,
    momentOfInertiaY: 10,
    momentOfInertiaZ: 10,
    shearModulus: 10,
    torsionalConstant: 10,
  };
  const analysisInputs: AnalysisInput[] = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: 3, support: [true, true, true, true, true, true] },
    { node: 2, load: [xLoad, 0, 0, 0, 0, 0] },
    { ...frameInput, element: 0 },
    { ...frameInput, element: 1 },
    { ...frameInput, element: 2 },
  ];

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

app({ parameters, onParameterChange, settings: { deformedShape: true } });
