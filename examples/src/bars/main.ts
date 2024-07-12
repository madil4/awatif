import { Node, Element, AnalysisInputs } from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { app, Parameters, Model } from "awatif-ui";

const parameters: Parameters = {
  xPosition: { value: 600, min: 0, max: 1000 },
  zPosition: { value: 0, min: 0, max: 500 },
};

function onParameterChange(parameters: Parameters): Model {
  const nodes: Node[] = [
    [250, 0, 0],
    [parameters.xPosition.value, 0, parameters.zPosition.value],
    [250, 0, 400],
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

  analysisInputs.materials?.set(0, { elasticity: 200 });
  analysisInputs.materials?.set(1, { elasticity: 200 });
  analysisInputs.sections?.set(0, { area: 100 });
  analysisInputs.sections?.set(1, { area: 100 });
  analysisInputs.pointSupports?.set(0, [true, true, true, true, true, true]);
  analysisInputs.pointSupports?.set(2, [true, true, true, true, true, true]);
  analysisInputs.pointLoads?.set(1, [0, 0, -1e3, 0, 0, 0]);

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

app({ parameters, onParameterChange, settings: { gridSize: 1000 } });
