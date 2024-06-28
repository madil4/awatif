import { State } from "vanjs-core";
import {
  Node,
  Element,
  AnalysisInput,
  FrameAnalysisInput,
  LoadAnalysisInput,
  DistributedLoadAnalysisInput,
  FrameAnalysisOutput,
  SupportAnalysisInput,
  AnalysisOutputs,
  DeformationAnalysisOutput,
  ReactionAnalysisOutput,
  PositionAnalysisOutput,
} from "awatif-data-structure";
import { TemplateResult } from "lit-html";

export type App = {
  parameters?: Parameters;
  onParameterChange?: (() => Model) | ((parameters: Parameters) => Model);
  settings?: Settings;
  reports?: ((i: any, b: any) => TemplateResult)[];
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
  analysisInputs?: AnalysisInput[];
  analysisOutputs?: AnalysisOutputs;
  designInputs?: any[];
  designOutputs?: any[];
};

export type ModelState = State<{
  nodes: Node[];
  elements: Element[];
  analysisInputs: ProcessedAnalysisInputs;
  analysisOutputs: ProcessedAnalysisOutputs;
  designInputs: Map<string, any>;
  designOutputs: Map<string, any>;
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
  dynamic?: boolean;
  dynamicSettings?: Record<"time" | "timeStep", number>;
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
  dynamic: State<boolean>;
  dynamicSettings: State<Record<"time" | "timeStep", number>>;
};

// refactor this in awatif-functions lib
export type ProcessedAnalysisInputs = {
  elasticities: Map<number, FrameAnalysisInput["elasticity"]>;
  areas: Map<number, FrameAnalysisInput["area"]>;
  loads: Map<number, LoadAnalysisInput["load"]>;
  supports: Map<number, SupportAnalysisInput["support"]>;
  momentOfInertiaZs: Map<number, FrameAnalysisInput["momentOfInertiaZ"]>;
  momentOfInertiaYs: Map<number, FrameAnalysisInput["momentOfInertiaY"]>;
  shearModuluses: Map<number, FrameAnalysisInput["shearModulus"]>;
  torsionalConstants: Map<number, FrameAnalysisInput["torsionalConstant"]>;
  distributedLoads: Map<
    number,
    DistributedLoadAnalysisInput["distributedLoad"]
  >;
};

export type ProcessedAnalysisOutputs = {
  normal: Map<number, FrameAnalysisOutput["normal"]>;
  shearY: Map<number, FrameAnalysisOutput["shearY"]>;
  shearZ: Map<number, FrameAnalysisOutput["shearZ"]>;
  torsion: Map<number, FrameAnalysisOutput["torsion"]>;
  bendingY: Map<number, FrameAnalysisOutput["bendingY"]>;
  bendingZ: Map<number, FrameAnalysisOutput["bendingZ"]>;
  deformation: Map<number, DeformationAnalysisOutput["deformation"]>;
  position: Map<number, PositionAnalysisOutput["position"][]>;
  reaction: Map<number, ReactionAnalysisOutput["reaction"]>;
};
