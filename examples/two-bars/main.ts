import { app, Node, Element, Assignment } from "../../awatif-ui/";
import { analyze } from "awatif-fem";

const nodes: Node[] = [
  [5, 0, 0],
  [12, 0, 0],
  [5, 0, 8],
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
    node: 2,
    support: [true, true, true],
  },
  {
    node: 1,
    load: [0, 0, -10],
  },
  {
    element: 0,
    area: 1.2,
    elasticity: 200,
  },
  {
    element: 1,
    area: 1.2,
    elasticity: 200,
  },
];

const analysisResults = analyze(nodes, elements, assignments);

app({
  model: { nodes, elements, assignments, analysisResults },
  settings: {
    deformedShape: true,
  },
});
