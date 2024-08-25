import { Node, Element, AnalysisInputs } from "awatif-data-structure";
import { analyze } from "awatif-fem";
import { template, Parameters, Structure } from "awatif-ui";

const parameters: Parameters = {
  meshDensity: { value: 7, min: 1, max: 7, step: 1, label: "mesh density" },
  span: { value: 10, min: 1, max: 20 },
  height: { value: 10, min: 1, max: 10 },
  load: { value: 10, min: 0, max: 20 },
};

function onParameterChange(parameters: Parameters): Structure {
  const nodes: Node[] = [];
  const elements: Element[] = [];
  const count = parameters.meshDensity.value;

  // beam 1
  nodes.push(
    ...[...Array(count + 1).keys()].map(
      (i) => [0, 0, (parameters.height.value / count) * i] as Node
    )
  );
  elements.push(...[...Array(count).keys()].map((i) => [i, i + 1] as Element));

  // beam 2
  let s = nodes.length;
  nodes.push(
    ...[...Array(count).keys()].map(
      (i) =>
        [
          (parameters.span.value / count) * (i + 1),
          0,
          parameters.height.value,
        ] as Node
    )
  );
  elements.push(
    ...[...Array(count - 1).keys()].map((i) => [s + i, s + i + 1] as Element)
  );
  elements.push([s - 1, s]); // connecting beam

  // beam 3
  s = nodes.length;
  const loadNode = s - 1;
  nodes.push(
    ...[...Array(count).keys()].map(
      (i) =>
        [
          parameters.span.value,
          0,
          parameters.height.value - (parameters.height.value / count) * (i + 1),
        ] as Node
    )
  );
  elements.push(
    ...[...Array(count - 1).keys()].map((i) => [s + i, s + i + 1] as Element)
  );
  elements.push([s - 1, s]); // connecting beam

  const analysisInputs: AnalysisInputs = {
    sections: new Map(),
    materials: new Map(),
    pointSupports: new Map(),
    pointLoads: new Map(),
  };

  elements.forEach((_, i) => {
    analysisInputs.materials?.set(i, {
      elasticity: 10,
      shearModulus: 10,
    });
    analysisInputs.sections?.set(i, {
      area: 10,
      torsionalConstant: 10,
      momentOfInertiaY: 10,
      momentOfInertiaZ: 10,
    });
  });

  analysisInputs.pointSupports?.set(0, [true, true, true, true, true, true]);
  analysisInputs.pointSupports?.set(nodes.length - 1, [
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  analysisInputs.pointLoads?.set(loadNode, [
    parameters.load.value,
    0,
    0,
    0,
    0,
    0,
  ]);

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

template({
  parameters,
  onParameterChange,
  settings: { deformedShape: true },
});
