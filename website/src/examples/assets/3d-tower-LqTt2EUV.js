import { a as app } from "./app-DFn3ZYI3.js";
import { a as analyze } from "./analyze-BdsS8fxq.js";
import "./pureFunctionsAny.generated-DNSg1shC.js";
const parameters = {
  dx: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "dx (m)"
  },
  dy: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "dy (m)"
  },
  dz: {
    value: 2,
    min: 1,
    max: 5,
    step: 0.1,
    label: "dz (m)"
  },
  divisions: {
    value: 4,
    min: 1,
    max: 10,
    step: 1
  },
  load: {
    value: 30,
    min: 1,
    max: 50,
    step: 0.5,
    label: "load (kN)"
  }
};
function onParameterChange(parameters2) {
  const dx = parameters2.dx.value;
  const dy = parameters2.dy.value;
  const dz = parameters2.dz.value;
  const divisions = parameters2.divisions.value;
  let nodes = [];
  let elements = [];
  for (let i = 0; i <= divisions; i++) {
    nodes.push(
      [0, 0, dz * i],
      [dx, 0, dz * i],
      [dx, dy, dz * i],
      [0, dy, dz * i]
    );
  }
  nodes = nodes.map((v) => [6 + v[0], 6 + v[1], v[2]]);
  for (let i = 0; i < divisions * 4; ) {
    i += 4;
    elements.push([i, i + 1], [i + 1, i + 2], [i + 2, i + 3], [i + 3, i]);
    elements.push([i, i + 2]);
  }
  for (let i = 0; i < divisions * 4; i++) {
    elements.push([i, i + 4]);
  }
  for (let i = 0; i < divisions * 4; i += 4) {
    elements.push([i, i + 5], [i + 3, i + 6]);
    elements.push([i, i + 7], [i + 1, i + 6]);
  }
  const analysisInputs = [
    ...elements.map((_, i) => ({
      element: i,
      area: 10,
      elasticity: 100
    })),
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: 1,
      support: [true, true, true]
    },
    {
      node: 2,
      support: [true, true, true]
    },
    {
      node: 3,
      support: [true, true, true]
    },
    {
      node: nodes.length - 2,
      load: [parameters2.load.value, 0, 0]
    }
  ];
  const analysisOutputs = analyze(nodes, elements, analysisInputs);
  return { nodes, elements, analysisInputs, analysisOutputs };
}
app({
  parameters,
  onParameterChange,
  settings: {
    deformedShape: true,
    gridSize: 15
  }
});
