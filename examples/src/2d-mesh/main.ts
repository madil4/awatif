import van, { State } from "vanjs-core";
import { getToolbar, parameters, Parameters, viewer } from "awatif-ui";
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
    [0, 0, 0],
    [5, 0, 0],
    [params.boundary.value.val, 0, 3],
    [8, 0, 7],
    [15, 0, 5],
    [15, 0, 0],
    [20, 0, 0],
    [20, 0, 10],
    [0, 0, 10],
    [0, 0, 0],
  ] as Node[]);
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
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/2d-mesh/main.ts",
    author: "https://www.linkedin.com/in/madil4/",
  })
);
