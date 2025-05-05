import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-fem";
import { getViewer, Parameters, getParameters, getToolbar } from "awatif-ui";
import { deform } from "awatif-fem";
import { getMesh } from "awatif-mesh";

// Plate dimensions and material properties
const a = 10; // m
const h = 0.01; // m
const E_x = 1.0e10; // Pa
const E_y = 0.5e10; // Pa
const G_xy = 1.0e9; // Pa
const nu_xy = 0.25;

// Init
const parameters: Parameters = {
  xPosition: { value: van.state(10), min: 5, max: 20 },
  load: { value: van.state(-50), min: -100, max: 100, step: 1 },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});

// Events: on parameter change mesh & deform
van.derive(() => {
  const {
    nodes: meshNodes,
    elements: meshElements,
    boundaryIndices,
  } = getMesh({
    points: [
      [0, 0, 0], // Bottom-left corner
      [parameters.xPosition.value.val, 0, 0], // Bottom-right corner
      [a, a, 0], // Top-right corner
      [0, a, 0], // Top-left corner
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: 0.5,
  });
  nodes.val = meshNodes;
  elements.val = meshElements;

  nodeInputs.val = {
    supports: new Map(
      boundaryIndices.map((i) => [i, [true, true, true, true, true, true]])
    ),
    loads: new Map(
      nodes.val.map((_, i) => [i, [0, 0, parameters.load.value.val, 0, 0, 0]])
    ),
  };

  const elementsVal = elements.val;

  elementInputs.val = {
    elasticities: new Map(elementsVal.map((_, i) => [i, E_x])),
    elasticitiesOrthogonal: new Map(elementsVal.map((_, i) => [i, E_y])),
    shearModuli: new Map(elementsVal.map((_, i) => [i, G_xy])),
    poissonsRatios: new Map(elementsVal.map((_, i) => [i, nu_xy])),
    thicknesses: new Map(elementsVal.map((_, i) => [i, h])),
  };

  deformOutputs.val = deform(
    meshNodes,
    meshElements,
    nodeInputs.val,
    elementInputs.val
  );
});

document.body.append(
  getParameters(parameters),
  getViewer({
    mesh: {
      nodes,
      elements,
      nodeInputs: nodeInputs,
      elementInputs: elementInputs,
      deformOutputs: deformOutputs,
    },
    settingsObj: {
      deformedShape: true,
      loads: false,
    },
  }),
  getToolbar({
    sourceCode:
      "https://github.com/madil4/awatif/blob/main/examples/src/plate/main.ts",
    author: "https://www.linkedin.com/in/mahjoubmusaab/",
  })
);
