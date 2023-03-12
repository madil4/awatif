import { Element, Node } from "../../interfaces";

export const getFullNodes = (nodes: Node[], elements: Element[]): Node[] => {
  const fullNodes: Node[] = [];

  elements.forEach((element) => {
    fullNodes.push(nodes[element[0]]);
    fullNodes.push(nodes[element[1]]);
  });

  return fullNodes;
};
