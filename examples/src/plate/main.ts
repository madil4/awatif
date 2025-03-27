import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-data-model";
import { getViewer, Parameters, getParameters, getToolbar } from "awatif-ui";
import { deform } from "awatif-fem";
import { mesh } from "awatif-mesh";

// Init
const parameters: Parameters = {
  xPosition: { value: van.state(15), min: 5, max: 20 },
  load: { value: van.state(-50), min: -100, max: 100, step: 1 },
};

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);
const nodeInputsState: State<NodeInputs> = van.state({});
const elementInputsState: State<ElementInputs> = van.state({});
const deformOutputsState: State<DeformOutputs> = van.state({});

// Events: on parameter change
van.derive(() => {
  const { nodes, elements, boundaryIndices } = mesh({
    points: van.state([
      [0, 0, 0],
      [15, 0, 0],
      [parameters.xPosition.value.val, 10, 0],
      [0, 5, 0],
    ]),
    polygon: van.state([0, 1, 2, 3]),
    maxMeshSize: 2,
  });

  const nodeInputs: NodeInputs = {
    supports: new Map(
      boundaryIndices.val.map((i) => [i, [true, true, true, true, true, true]])
    ),
    loads: new Map(
      nodes.val.map((_, i) => [i, [0, 0, parameters.load.value.val, 0, 0, 0]])
    ),
  };
  const elementsVal = elements.val;
  const elementInputs: ElementInputs = {
    elasticities: new Map(elementsVal.map((_, i) => [i, 100])),
    thicknesses: new Map(elementsVal.map((_, i) => [i, 1])),
    poissonsRatios: new Map(elementsVal.map((_, i) => [i, 0.3])),
  };

  const deformOutputs = deform(
    nodes.val,
    elements.val,
    nodeInputs,
    elementInputs
  );

  // update state
  nodesState.val = nodes.val;
  elementsState.val = elements.val;
  nodeInputsState.val = nodeInputs;
  elementInputsState.val = elementInputs;
  deformOutputsState.val = deformOutputs;
});

document.body.append(
  getParameters(parameters),
  getViewer({
    structure: {
      nodes: nodesState,
      elements: elementsState,
      nodeInputs: nodeInputsState,
      elementInputs: elementInputsState,
      deformOutputs: deformOutputsState,
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
