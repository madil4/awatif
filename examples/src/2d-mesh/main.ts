import van, { State } from "vanjs-core";
import { parameters, Parameters, viewer } from "awatif-ui";
import { Node, Element } from "awatif-data-structure";
import { mesh } from "awatif-mesh";

// Init
const params: Parameters = {
  boundary: {
    value: van.state(5),
    min: 1,
    max: 10,
    step: 0.1,
    label: "Boundary point",
  },
};

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);

// Events: on parameter change
van.derive(() => {
  const points = van.state([
    [0, 0],
    [5, 0],
    [params.boundary.value.val, 3],
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

  nodesState.val = nodes.val;
  elementsState.val = elements.val;
});

document.body.append(
  parameters(params),
  viewer({
    structure: {
      nodes: nodesState,
      elements: elementsState,
    },
  })
);
