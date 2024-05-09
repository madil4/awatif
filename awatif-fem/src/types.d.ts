export * from "../../awatif-data-structure";

import {
  Node,
  Element,
  AnalysisInput,
  AnalysisOutputs,
} from "../../awatif-data-structure";

export function analyze(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInput[]
): AnalysisOutputs;
