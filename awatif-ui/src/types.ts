import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";
import { State } from "vanjs-core";

export type Structure = {
  nodes?: State<Node[]>;
  elements?: State<Element[]>;
  analysisInputs?: State<AnalysisInputs>;
  analysisOutputs?: State<AnalysisOutputs>;
};
