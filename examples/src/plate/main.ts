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
import { mesh } from "awatif-mesh";

// Init
const parameters: Parameters = {
  xPosition: { value: van.state(15), min: 5, max: 20 },
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
  } = mesh({
    points: [
      [0, 0, 0],
      [15, 0, 0],
      [parameters.xPosition.value.val, 10, 0],
      [0, 5, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: 2,
  });
  nodes.val = meshNodes.val;
  elements.val = meshElements.val;

  nodeInputs.val = {
    supports: new Map(
      boundaryIndices.val.map((i) => [i, [true, true, true, true, true, true]])
    ),
    loads: new Map(
      nodes.val.map((_, i) => [i, [0, 0, parameters.load.value.val, 0, 0, 0]])
    ),
  };

  const elementsVal = elements.val;
  elementInputs.val = {
    elasticities: new Map(elementsVal.map((_, i) => [i, 100])),
    thicknesses: new Map(elementsVal.map((_, i) => [i, 1])),
    poissonsRatios: new Map(elementsVal.map((_, i) => [i, 0.3])),
  };

  deformOutputs.val = deform(
    meshNodes.val,
    meshElements.val,
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
