import { Element, Node } from "../../interfaces";

export const getElements = (
  nodes: Node[],
  elements: Element[]
): [Node, Node][] =>
  elements.map((element) => [nodes[element[0]], nodes[element[1]]]);
