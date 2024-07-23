import { State } from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";

export type App = {
  parameters?: Parameters;
  onParameterChange?: (() => Model) | ((parameters: Parameters) => Model);
  settings?: Settings;
};

export type Parameters = {
  [key: string]: {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    folder?: string;
  };
};

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

export type Settings = {
  gridSize?: number;
  displayScale?: number;
  nodes?: boolean;
  elements?: boolean;
  nodesIndexes?: boolean;
  elementsIndexes?: boolean;
  orientations?: boolean;
  supports?: boolean;
  loads?: boolean;
  deformedShape?: boolean;
  elementResults?: string;
  nodeResults?: string;
};

export type SettingsState = {
  gridSize: State<number>;
  displayScale: State<number>;
  nodes: State<boolean>;
  elements: State<boolean>;
  nodesIndexes: State<boolean>;
  elementsIndexes: State<boolean>;
  orientations: State<boolean>;
  supports: State<boolean>;
  loads: State<boolean>;
  deformedShape: State<boolean>;
  elementResults: State<string>;
  nodeResults: State<string>;
};
