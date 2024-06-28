import { a as app } from "./app-DFn3ZYI3.js";
import { a as analyze } from "./analyze-BdsS8fxq.js";
import "./pureFunctionsAny.generated-DNSg1shC.js";
const parameters = {
  span: {
    value: 15,
    min: 5,
    max: 20,
    step: 1,
    label: "span (m)"
  },
  divisions: {
    value: 5,
    min: 2,
    max: 5,
    step: 1
  },
  height: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "height (m)"
  },
  elasticity: {
    value: 10,
    min: 1,
    max: 250,
    step: 1,
    label: "Elasticity (gpa)"
  },
  area: {
    value: 10,
    min: 1,
    max: 300,
    step: 1,
    label: "area (cm2)"
  },
  load: {
    value: 250,
    min: 1,
    max: 500,
    step: 1,
    label: "load (kN)"
  }
};
function onParameterChange(parameters2) {
  const span = parameters2.span.value;
  const divisions = parameters2.divisions.value;
  const height = parameters2.height.value;
  const elasticity = parameters2.elasticity.value * 1e6;
  const area = parameters2.area.value * 1e-4;
  const load = parameters2.load.value;
  const nodes = [];
  const elements = [];
  const dx = span / divisions;
  const bottomChordNodes = [];
  for (let i = 0; i <= divisions; i++) {
    const node = [dx * i, 0, 0];
    nodes.push(node);
    bottomChordNodes.push(node);
  }
  for (let i = 0; i <= divisions; i++) {
    nodes.push([dx * i, 0, height]);
  }
  for (let i = 0; i < divisions; i++) {
    elements.push([i, i + 1]);
  }
  for (let i = 0; i < divisions; i++) {
    elements.push([divisions + 1 + i, divisions + 1 + i + 1]);
  }
  for (let i = 0; i <= divisions; i++) {
    elements.push([i, divisions + 1 + i]);
  }
  for (let i = 0; i < divisions; i++) {
    if (i < divisions / 2) {
      elements.push([i, divisions + 1 + i + 1]);
    } else {
      elements.push([divisions + 1 + i, i + 1]);
    }
  }
  const analysisInputs = [
    ...elements.map((_, i) => ({
      element: i,
      area,
      elasticity
    })),
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: divisions,
      support: [true, true, true]
    },
    ...bottomChordNodes.map(
      (_, i) => ({
        node: i,
        load: [0, 0, -load]
      })
    )
  ];
  const analysisOutputs = analyze(nodes, elements, analysisInputs);
  return { nodes, elements, analysisInputs, analysisOutputs };
}
app({
  parameters,
  onParameterChange,
  settings: {
    deformedShape: true
  }
});
