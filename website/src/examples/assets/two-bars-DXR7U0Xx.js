import { a as app } from "./app-DFn3ZYI3.js";
import { a as analyze } from "./analyze-BdsS8fxq.js";
import "./pureFunctionsAny.generated-DNSg1shC.js";
const parameters = {
  xPosition: { value: 12, min: 1, max: 20 },
  zPosition: { value: 0, min: 1, max: 10 }
};
function onParameterChange(parameters2) {
  const nodes = [
    [5, 0, 0],
    [parameters2.xPosition.value, 0, parameters2.zPosition.value],
    [5, 0, 8]
  ];
  const elements = [
    [0, 1],
    [1, 2]
  ];
  const analysisInputs = [
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: 2,
      support: [true, true, true]
    },
    {
      node: 1,
      load: [0, 0, -10]
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200
    }
  ];
  const analysisOutputs = analyze(nodes, elements, analysisInputs);
  return { nodes, elements, analysisInputs, analysisOutputs };
}
app({ parameters, onParameterChange });
