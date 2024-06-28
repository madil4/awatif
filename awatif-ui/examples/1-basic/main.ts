import {
  AnalysisInput,
  Element,
  Node,
  FrameAnalysisInput,
} from "awatif-data-structure";
import { app, Model } from "../../src/";
import { analyze } from "../../../awatif-fem/";

function onParameterChange(): Model {
  const nodes: Node[] = [
    [0, 0, 0],
    [0, 0, 500],
    [500, 0, 500],
    [500, 0, 0],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];

  const frameInput: FrameAnalysisInput = {
    element: 0,
    area: 10,
    elasticity: 10,
    momentOfInertiaY: 10,
    momentOfInertiaZ: 10,
    shearModulus: 10,
    torsionalConstant: 10,
  };
  const analysisInputs: AnalysisInput[] = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: 3, support: [true, true, true, true, true, true] },
    { node: 2, load: [3e-3, 0, 0, 0, 0, 0] },
    { ...frameInput, element: 0 },
    { ...frameInput, element: 1 },
    { ...frameInput, element: 2 },
  ];

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

app({
  onParameterChange,
  settings: { gridSize: 1000 },
});
