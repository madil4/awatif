import van, { State } from "vanjs-core";
import { getToolbar, getParameters, Parameters, getViewer } from "awatif-ui";
import { Node, Element } from "awatif-fem";
import { mesh } from "awatif-mesh";

// Init
const parameters: Parameters = {
  boundary: {
    value: van.state(5),
    min: 1,
    max: 10,
    step: 0.1,
    label: "Boundary point",
  },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);

// Events: on parameter change mesh
van.derive(() => {
  const { nodes: meshNodes, elements: meshElements } = mesh({
    points: [
      [0, 0, 0],
      [5, 0, 0],
      [parameters.boundary.value.val, 0, 3],
      [8, 0, 7],
      [15, 0, 5],
      [15, 0, 0],
      [20, 0, 0],
      [20, 0, 10],
      [0, 0, 10],
      [0, 0, 0],
    ],
    polygon: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  });

  nodes.val = meshNodes.val;
  elements.val = meshElements.val;
});

document.body.append(
  getParameters(parameters),
  getViewer({
    mesh: {
      nodes: nodes,
      elements: elements,
    },
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/2d-mesh/main.ts",
    author: "https://www.linkedin.com/in/madil4/",
  })
);
