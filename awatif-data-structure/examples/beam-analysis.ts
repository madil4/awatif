// An example of two beams loaded with uniformly distributed loads.

import { Node, Element, Assignment, AnalysisResults } from "../src";

const nodes: Node[] = [
  [0, 0, 0],
  [9, 9, 0],
  [21, 9, 0],
];
const elements: Element[] = [
  [0, 1],
  [1, 2],
];
const assignments: Assignment[] = [
  {
    node: 0,
    support: [true, true, false, false, false, true],
  },
  {
    node: 2,
    support: [true, true, false, false, false, true],
  },
  {
    element: 0,
    momentOfInertiaZ: 3.6e-4,
    elasticity: 200e9,
    area: 0.06,
  },
  {
    element: 1,
    momentOfInertiaZ: 3.6e-4,
    elasticity: 200e9,
    area: 0.06,
  },
  {
    element: 1,
    distributedLoad: [-13e3, 0],
  },
];

// An example of how to run an analysis. Check https://awatif.co/awatif-fem for more details
// const results = analyze(nodes, elements, assignments);

const results: AnalysisResults = {
  default: [
    { node: 0, deformation: [0, 0, 0, 0, 0, 0] },
    {
      node: 0,
      reaction: [
        80326.50901658912, 67851.52308239831, 0, 0, 0, -37225.195702533565,
      ],
    },
    {
      node: 1,
      deformation: [
        0.00008032650901658911, -0.00023749304599669695, 0, 0, 0,
        -0.0033432434648677733,
      ],
    },
    { node: 2, deformation: [0, 0, 0, 0, 0, 0] },
    {
      node: 2,
      reaction: [
        -80326.5090165891, 88148.47691760167, 0, 0, 0, -196831.40071640338,
      ],
    },
    {
      element: 0,
      normal: [104777.69132007193, -104777.69132007193],
      shearY: [-8821.147149273089, 8821.147149273089],
      shearZ: [0, 0],
      torsion: [0, 0],
      bendingY: [0, 0],
      bendingZ: [-37225.195702533565, -75049.67770518335],
    },
    {
      element: 1,
      normal: [80326.5090165891, -80326.5090165891],
      shearY: [67851.52308239833, 88148.47691760167],
      shearZ: [0, 0],
      torsion: [0, 0],
      bendingY: [0, 0],
      bendingZ: [75049.67770518336, -196831.40071640338],
    },
  ],
};
