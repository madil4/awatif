import { Element, Node } from "../../interfaces";

export const getNodes = (elements: Element[], nodes: Node[]): number[] => {
  const newNodes: Node[] = [];
  elements.forEach((element) => {
    newNodes.push(nodes[element[0]]);
    newNodes.push(nodes[element[1]]);
  });

  return newNodes.flat();
};
