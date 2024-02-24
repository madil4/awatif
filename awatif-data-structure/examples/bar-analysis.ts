// An example of three bars loaded with a point load.

import { Node, Element, Assignment, AnalysisResults } from "../src";

const nodes: Node[] = [
  [0, 0, 0],
  [0, 3, 0],
  [3, 3, 0],
  [3, 0, 0],
];
const elements: Element[] = [
  [0, 1],
  [0, 2],
  [0, 3],
];
const assignments: Assignment[] = [
  {
    node: 1,
    support: [true, true, false],
  },
  {
    node: 2,
    support: [true, true, false],
  },
  {
    node: 3,
    support: [true, true, false],
  },
  {
    node: 0,
    load: [0, -50, 0],
  },
  ...elements.map((_, i) => ({
    element: i,
    area: 6e-4,
    elasticity: 200e6,
  })),
];

// An example of how to run an analysis. Check https://awatif.co/awatif-fem for more details
// const results = analyze(nodes, elements, assignments);

const results: AnalysisResults = {
  default: [
    {
      node: 0,
      deformation: [0.00025888347648318446, -0.0009911165235168156, 0],
    },
    { node: 1, deformation: [0, 0, 0] },
    { node: 1, reaction: [0, 39.644660940672615, 0] },
    { node: 2, deformation: [0, 0, 0] },
    { node: 2, reaction: [10.355339059327376, 10.355339059327376, 0] },
    { node: 3, deformation: [0, 0, 0] },
    { node: 3, reaction: [-10.355339059327376, 0, 0] },
    { element: 0, normal: [39.644660940672615, 39.644660940672615] },
    { element: 1, normal: [14.644660940672624, 14.644660940672624] },
    { element: 2, normal: [-10.355339059327376, -10.355339059327376] },
  ],
};
