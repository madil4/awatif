import { State } from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";

export type Model = {
  nodes?: Node[];
  elements?: Element[];
  analysisInputs?: AnalysisInputs;
  analysisOutputs?: AnalysisOutputs;
};

// refactor to Model
export type ModelState = State<{
  nodes: Node[];
  elements: Element[];
  analysisInputs: AnalysisInputs;
  analysisOutputs: AnalysisOutputs;
}>;
