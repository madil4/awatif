import { Element } from "awatif-data-structure";
import { AnalysisType } from "./processAnalysisInputs";

function bar(element: Element) {
  const node0Range = [element[0] * 3, element[0] * 3 + 1, element[0] * 3 + 2];
  const node1Range = [element[1] * 3, element[1] * 3 + 1, element[1] * 3 + 2];
  return [...node0Range, ...node1Range];
}

function beam(element: Element) {
  const node1Range = [
    element[0] * 6,
    element[0] * 6 + 1,
    element[0] * 6 + 2,
    element[0] * 6 + 3,
    element[0] * 6 + 4,
    element[0] * 6 + 5,
  ];
  const node2Range = [
    element[1] * 6,
    element[1] * 6 + 1,
    element[1] * 6 + 2,
    element[1] * 6 + 3,
    element[1] * 6 + 4,
    element[1] * 6 + 5,
  ];
  return [...node1Range, ...node2Range];
}

export const getElementNodesIndices = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
