import { app, Node, Element, Assignment, Parameters } from "../../awatif-ui/";
import { analyzeDynamically } from "./analyzeDynamically.ts";

const nodes = [
  [0, 0, 0],
  [2, 0, 0],
  [4, 0, 0],
];

const elements = [
  [0, 1],
  [1, 2],
];

const assignments = [
  {
    node: 0,
    support: [true, true, true],
  },
  {
    node: 1, // and 2 similarly
    force: [0, 0, -20], // gravity force computed for masses of 2 and acceleration of 9.81
  },
  {
    element: 0, // and 1 similarly
    elasticity: 1,
  },
];

const analysisResults = analyzeDynamically(nodes, elements, assignments, {
  time: 5,
  timeStep: 0.001,
});

app({ model: { nodes, elements, assignments, analysisResults } });
