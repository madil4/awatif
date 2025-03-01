import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
  DeformOutputs,
} from "awatif-data-structure";
import { viewer } from "awatif-ui";
import { deform } from "awatif-fem";
import { mesh } from "awatif-mesh";

const nodesState: State<Node[]> = van.state([]);
const elementsState: State<Element[]> = van.state([]);
const nodeInputsState: State<NodeInputs> = van.state({});
const elementInputsState: State<ElementInputs> = van.state({});
const deformOutputsState: State<DeformOutputs> = van.state({});

van.derive(() => {
  const { nodes, elements } = mesh({
    points: van.state([
      [0, 0],
      [10, 0],
      [15, 5],
      [0, 20],
      [5, 2.5],
    ]),
    polygon: van.state([0, 1, 2, 3]),
  });

  const nodeInputs: NodeInputs = {
    supports: new Map(
      [0, 1, 2, 3].map((node) => [node, [true, true, true, true, true, true]])
    ),
    loads: new Map([[4, [0, 0, -300, 0, 0, 0]]]),
  };
  const elementInputs: ElementInputs = {
    elasticities: new Map(elements.val.map((_, i) => [i, 100])),
    thicknesses: new Map(elements.val.map((_, i) => [i, 1])),
    poissonsRatios: new Map(elements.val.map((_, i) => [i, 0.3])),
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
  viewer({
    structure: {
      nodes: nodesState,
      elements: elementsState,
      nodeInputs: nodeInputsState,
      elementInputs: elementInputsState,
      deformOutputs: deformOutputsState,
    },
    settingsObj: {
      deformedShape: true,
    },
  })
);
