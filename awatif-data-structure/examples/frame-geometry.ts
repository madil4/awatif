// An example of a simple frame consisting of three elements, you can represent any geometry with this data structure

import { Element, Node } from "../src";

const nodes: Node[] = [
  [0, 0, 0],
  [0, 5, 0],
  [5, 5, 0],
  [5, 0, 0],
];
const elements: Element[] = [
  [0, 1],
  [1, 2],
  [2, 3],
];
