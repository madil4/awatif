import { a as app } from "./app-DFn3ZYI3.js";
import { a as analyze } from "./analyze-BdsS8fxq.js";
import "./pureFunctionsAny.generated-DNSg1shC.js";
const parameters = {
  meshDensity: { value: 7, min: 1, max: 7, step: 1, label: "mesh density" },
  span: { value: 10, min: 1, max: 20 },
  height: { value: 10, min: 1, max: 10 },
  load: { value: 10, min: 0, max: 20 }
};
function onParameterChange(parameters2) {
  const nodes = [];
  const elements = [];
  const count = parameters2.meshDensity.value;
  nodes.push(
    ...[...Array(count + 1).keys()].map(
      (i) => [0, 0, parameters2.height.value / count * i]
    )
  );
  elements.push(...[...Array(count).keys()].map((i) => [i, i + 1]));
  let s = nodes.length;
  nodes.push(
    ...[...Array(count).keys()].map(
      (i) => [
        parameters2.span.value / count * (i + 1),
        0,
        parameters2.height.value
      ]
    )
  );
  elements.push(
    ...[...Array(count - 1).keys()].map((i) => [s + i, s + i + 1])
  );
  elements.push([s - 1, s]);
  s = nodes.length;
  const loadNode = s - 1;
  nodes.push(
    ...[...Array(count).keys()].map(
      (i) => [
        parameters2.span.value,
        0,
        parameters2.height.value - parameters2.height.value / count * (i + 1)
      ]
    )
  );
  elements.push(
    ...[...Array(count - 1).keys()].map((i) => [s + i, s + i + 1])
  );
  elements.push([s - 1, s]);
  const analysisInputs = [
    { node: 0, support: [true, true, true, true, true, true] },
    { node: nodes.length - 1, support: [true, true, true, true, true, true] },
    { node: loadNode, load: [parameters2.load.value, 0, 0, 0, 0, 0] },
    ...elements.map((_, i) => ({
      element: i,
      area: 10,
      elasticity: 10,
      momentOfInertiaY: 10,
      momentOfInertiaZ: 10,
      shearModulus: 10,
      torsionalConstant: 10
    }))
  ];
  const analysisOutputs = analyze(nodes, elements, analysisInputs);
  return { nodes, elements, analysisInputs, analysisOutputs };
}
app({
  parameters,
  onParameterChange,
  settings: { deformedShape: true }
});
