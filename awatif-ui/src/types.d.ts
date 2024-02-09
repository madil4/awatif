import { State } from "vanjs-core";

export function app({}: App): void;

// app
export type App = {
  model?: Model;
  parameters?: Parameters;
  onParameterChange?: (p: Parameters) => Model;
  settings?: Settings;
};

export type Parameters = Record<
  string,
  {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
  }
>;

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
  normal: Map<number, ElementResult["normal"]>;
  shearY: Map<number, ElementResult["shearY"]>;
  shearZ: Map<number, ElementResult["shearZ"]>;
  torsion: Map<number, ElementResult["torsion"]>;
  bendingY: Map<number, ElementResult["bendingY"]>;
  bendingZ: Map<number, ElementResult["bendingZ"]>;
  deformation: Map<number, DeformationResult["deformation"]>;
  reaction: Map<number, ReactionResult["reaction"]>;
};

// model
export type Model = {
  nodes?: Node[];
  elements?: Element[];
  assignments?: Assignment[];
  analysisResults?: AnalysisResults;
};

export type ModelState = State<{
  nodes: Node[];
  elements: Element[];
  assignments: ProcessedAssignments;
  analysisResults: ProcessedAnalysisResults;
}>;

export type Node = [number, number, number];
export type Element = [number, number];

// assignments
export type Assignment =
  | SupportAssignment
  | LoadAssignment
  | PropertyAssignment
  | DistributedLoadAssignment;

export type SupportAssignment = {
  node: number;
  support:
    | [boolean, boolean, boolean]
    | [boolean, boolean, boolean, boolean, boolean, boolean];
};
export type LoadAssignment = {
  node: number;
  load:
    | [number, number, number]
    | [number, number, number, number, number, number];
};
export type PropertyAssignment = {
  element: number;
  elasticity: number;
  shearModulus?: number;
  area?: number;
  momentOfInertiaZ?: number;
  momentOfInertiaY?: number;
  torsionalConstant?: number;
};
export type DistributedLoadAssignment = {
  element: number;
  distributedLoad: [number, number];
};

// results
export type AnalysisResults = Record<
  string,
  (DeformationResult | ReactionResult | ElementResult)[]
>;
export type DeformationResult = {
  node: number;
  deformation:
    | [number, number, number]
    | [number, number, number, number, number, number];
};
export type ReactionResult = {
  node: number;
  reaction:
    | [number, number, number]
    | [number, number, number, number, number, number];
};
export type ElementResult = {
  element: number;
  normal?: [number, number];
  shearY?: [number, number];
  shearZ?: [number, number];
  torsion?: [number, number];
  bendingY?: [number, number];
  bendingZ?: [number, number];
};
