import { app, Parameters, Model } from "awatif-ui";
import { analyze } from "awatif-fem";
import { Node, Element, AnalysisInput } from "awatif-data-structure";

const parameters: Parameters = {
  meshDensity: { value: 7, min: 1, max: 7, step: 1, label: "mesh density" },
  span: { value: 10, min: 1, max: 20 },
  height: { value: 10, min: 1, max: 10 },
  load: { value: 10, min: 0, max: 20 },
};

function onParameterChange(parameters: Parameters): Model {
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

  const analysisInputs: AnalysisInput[] = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: nodes.length - 1, support: [true, true, true, true, true, true] },
    { node: loadNode, load: [parameters.load.value, 0, 0, 0, 0, 0] },
    ...elements.map((_, i) => ({
      element: i,
      area: 10,
      elasticity: 10,
      momentOfInertiaY: 10,
      momentOfInertiaZ: 10,
      shearModulus: 10,
      torsionalConstant: 10,
    })),
  ];

  const analysisOutputs = analyze(nodes, elements, analysisInputs);

  return { nodes, elements, analysisInputs, analysisOutputs };
}

app({
  parameters,
  onParameterChange,
  settings: { deformedShape: true },
});
