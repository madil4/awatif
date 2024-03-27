import { app, Node, Element, Assignment } from "../../awatif-ui/";
import { analyzeDynamically } from "./analyzeDynamically.ts";
import { G } from "./constants.ts";

const nodes: Node[] = [
  [0, 0, 0],
  [2, 0, 0],
  [4, 0, 0],
];

const elements: Element[] = [
  [0, 1],
  [1, 2],
];

const assignments: Assignment[] = [
  {
    node: 0,
    support: [true, true, true],
  },
  {
    node: 0,
    load: [0, 0, -2 * G], // gravity force computed for masses of 2 and acceleration of 9.81
  },
  {
    node: 1,
    load: [0, 0, -2 * G], // gravity force computed for masses of 2 and acceleration of 9.81
  },
  {
    node: 2,
    load: [0, 0, -2 * G], // gravity force computed for masses of 2 and acceleration of 9.81
  },
  {
    element: 0, // and 1 similarly
    elasticity: 100000,
  },
  {
    element: 1, // and 1 similarly
    elasticity: 100000,
  },
];

const analysisResults = analyzeDynamically(nodes, elements, assignments, {
  time: 5,
  timeStep: 0.0001,
});

app({ model: { nodes, elements, assignments, analysisResults } });
