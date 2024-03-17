import { State } from "vanjs-core";
import {
  Node,
  Element,
  PropertyAssignment,
  LoadAssignment,
  DistributedLoadAssignment,
  BeamResult,
  DeformationResult,
  ReactionResult,
  Assignment,
  AnalysisResults,
  SupportAssignment,
} from "awatif-data-structure";
import { DesignResults } from "../../awatif-design/src/design";

export type App = {
  parameters?: Parameters;
  onParameterChange?: (() => Model) | ((parameters: Parameters) => Model);
  settings?: Settings;
  report: any;
};

export type Model = {
  nodes?: Node[];
  elements?: Element[];
  assignments?: Assignment[];
  analysisResults?: AnalysisResults;
  designResults?: DesignResults;
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

export type ProcessedAssignments = {
  elasticities: Map<number, PropertyAssignment["elasticity"]>;
  areas: Map<number, PropertyAssignment["area"]>;
  loads: Map<number, LoadAssignment["load"]>;
  supports: Map<number, SupportAssignment["support"]>;
  momentOfInertiaZs: Map<number, PropertyAssignment["momentOfInertiaZ"]>;
  momentOfInertiaYs: Map<number, PropertyAssignment["momentOfInertiaY"]>;
  shearModuluses: Map<number, PropertyAssignment["shearModulus"]>;
  torsionalConstants: Map<number, PropertyAssignment["torsionalConstant"]>;
  distributedLoads: Map<number, DistributedLoadAssignment["distributedLoad"]>;
};

export type ProcessedAnalysisResults = {
  normal: Map<number, BeamResult["normal"]>;
  shearY: Map<number, BeamResult["shearY"]>;
  shearZ: Map<number, BeamResult["shearZ"]>;
  torsion: Map<number, BeamResult["torsion"]>;
  bendingY: Map<number, BeamResult["bendingY"]>;
  bendingZ: Map<number, BeamResult["bendingZ"]>;
  deformation: Map<number, DeformationResult["deformation"]>;
  reaction: Map<number, ReactionResult["reaction"]>;
};

export type ModelState = State<{
  nodes: Node[];
  elements: Element[];
  assignments: ProcessedAssignments;
  analysisResults: ProcessedAnalysisResults;
}>;
