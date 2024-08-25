import { Node } from "awatif-data-structure";

export function getCenter(point1: Node, point2: Node): Node {
  return point1?.map((v, i) => (v + point2[i]) * 0.5) as Node;
}
