import { Node } from "../types";

export function get10thFromFirstPoint(point1: Node, point2: Node): Node {
  return point1?.map((v, i) => (9 * v + point2[i]) / 10) as Node; // from gptChat
}
