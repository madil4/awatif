import { AnalysisInputs, Element, Node } from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { app, Parameters } from "awatif-ui";

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

  const analysisInputs: AnalysisInputs = {
    materials: new Map(),
    sections: new Map(),
    pointSupports: new Map(),
    pointLoads: new Map(),
  };

  analysisInputs.pointSupports?.set(0, [true, true, true, true, true, true]);
  analysisInputs.pointSupports?.set(3, [true, true, true, true, true, true]);
  analysisInputs.pointLoads?.set(2, [xLoad, 0, 0, 0, 0, 0]);
  elements.forEach((_, i) => {
    analysisInputs.materials?.set(i, {
      elasticity: 10,
      shearModulus: 10,
    });
    analysisInputs.sections?.set(i, {
      area: area,
      momentOfInertiaY: 10,
      momentOfInertiaZ: 10,
      torsionalConstant: 10,
    });
  });

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

app({ parameters, onParameterChange, settings: { deformedShape: true } });
