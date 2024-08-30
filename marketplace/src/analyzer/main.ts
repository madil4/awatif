import van from "vanjs-core";
import { Structure } from "awatif-data-structure";
import { viewer } from "awatif-ui";

const structure: Structure = {
  nodes: van.state([]),
  elements: van.state([]),
};

structure.nodes.val = [
  [0, 0, 0],
  [0, 0, 10],
  [10, 0, 0],
];
structure.elements.val = [
  [0, 2],
  [1, 2],
];

document.body.appendChild(viewer(structure));
