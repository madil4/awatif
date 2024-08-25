import { State } from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";

export type Structure = {
  nodes?: State<Node[]>;
  elements?: State<Element[]>;
  analysisInputs?: State<AnalysisInputs>;
  analysisOutputs?: State<AnalysisOutputs>;
};
