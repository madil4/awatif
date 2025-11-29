import { Mesh } from "./data-model";
import { diag, add, lusolve, subtract, norm, flatten } from "mathjs";

export function getPositions(
  nodes: Mesh["nodes"],
  elements: Mesh["elements"],
  loads: Mesh["loads"],
  supports: Mesh["supports"],
  elementsProps: Mesh["elementsProps"]
): number[] {
  return [];
}
