import {
  app,
  Node,
  Element,
  AnalysisInput,
  Parameters,
  Model,
} from "../../awatif-ui/src";
import { analyze } from "../../awatif-fem/";
import { design } from "../../awatif-design";
import {
  frameTimberDesign,
  frameTimberDesignReport,
  FrameTimberDesignInput,
} from "../../awatif-design/src/ec/timber/";

const parameters: Parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 },
};

function onParameterChange(parameters: Parameters): Model {
  const nodes: Node[] = [
    [5, 0, 0],
    [parameters.xPosition.value, 0, parameters.zPosition.value],
    [5, 0, 8],
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
      node: 2,
      support: [true, true, true],
    },
    {
      node: 1,
      load: [0, 0, -10],
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200,
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200,
    },
  ];

  const frameTimberDesignInput: FrameTimberDesignInput["frameTimberDesign"] = {
    tensileStrengthParallel: 20,
    serviceClass: "1",
    loadDuration: "permanent",
    material: "Solid timber",
    gammaG: 1,
    gammaM: 1.3,
  };
  const designInputs: FrameTimberDesignInput[] = [
    {
      element: 0,
      frameTimberDesign: frameTimberDesignInput,
    },
    {
      element: 1,
      frameTimberDesign: frameTimberDesignInput,
    },
  ];

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  const designOutputs = design(
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    [frameTimberDesign]
  );

  return {
    nodes,
    elements,
    analysisInputs,
    analysisOutputs,
    designInputs,
    designOutputs,
  };
}

app({ parameters, onParameterChange, reports: [frameTimberDesignReport] });
