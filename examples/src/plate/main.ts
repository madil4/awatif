import van, { State } from "vanjs-core";
import {
  Node,
  Element,
  NodeInputs,
  ElementInputs,
} from "awatif-data-structure";
import { viewer } from "awatif-ui";
import { deform } from "awatif-fem";

const nodes: State<Node[]> = van.state([
  [0, 0, 0],
  [0, 5, 0],
  [5, 2.5, 0],
]);
const elements: State<Element[]> = van.state([[0, 1, 2]]);

const nodeInputs: State<NodeInputs> = van.state({
  supports: new Map([
    [0, [true, true, true, true, true, true]],
    [1, [true, true, true, true, true, true]],
  ]),
  loads: new Map([[2, [0, 0, -100, 0, 0, 0]]]),
});
const elementInputs: State<ElementInputs> = van.state({
  elasticities: new Map([[0, 200]]),
  thicknesses: new Map([[0, 1]]),
  poissonsRatios: new Map([[0, 0.3]]),
});

const deformOutputs = van.state(
  deform(nodes.val, elements.val, nodeInputs.val, elementInputs.val)
);

document.body.append(
  viewer({
    structure: {
      nodes,
      elements,
      nodeInputs,
      elementInputs,
      // deformOutputs,
    },
  })
);
