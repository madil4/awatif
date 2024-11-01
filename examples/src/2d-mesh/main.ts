import { template, Parameters, Structure } from "awatif-ui";
import { mesh } from "awatif-mesh";
import van from "vanjs-core";

const parameters: Parameters = {
  boundary: {
    value: 5,
    min: 1,
    max: 10,
    step: 0.1,
    label: "Boundary point",
  },
};

function onParameterChange(parameters: Parameters): Structure {
  const points = van.state([
    [0, 0],
    [5, 0],
    [parameters.boundary.value, 3],
    [8, 7],
    [15, 5],
    [15, 0],
    [20, 0],
    [20, 10],
    [0, 10],
    [0, 0],
  ]);
  const polygon = van.state([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const { nodes, elements } = mesh({ points, polygon });

  console.log(nodes.val);

  return {
    nodes: nodes.val,
    elements: elements.val,
  };
}

template({
  parameters,
  onParameterChange,
});
