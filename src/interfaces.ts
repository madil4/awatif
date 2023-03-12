export interface State {
  parameters?: Parameters;
  model?: Model;
  analysisResults?: AnalysisResult[];
  designResults?: DesignResult[];
}

// parameters
export enum ParameterType {
  slider = "slider",
  toggle = "toggle",
}
interface SliderParameter {
  type: ParameterType.slider;
  value: number;
  min: number;
  max: number;
  step: number;
  label?: string;
}
interface ToggleParameter {
  type: ParameterType.toggle;
  value: boolean;
  label?: string;
}
type Parameter = SliderParameter | ToggleParameter;
export type Parameters = { [name: string]: Parameter };

// model
export enum AssignmentType {
  barProperties = "barProperties",
  barSupports = "barSupports",
  barUniformLoad = "barUniformLoad",
  steelDesign = "steelDesign",
}
interface BaseAssignment {
  element?: number;
}
export interface BarPropertiesAssignment extends BaseAssignment {
  type: AssignmentType.barProperties;
  area: number;
  elasticity: number;
  section?: string;
}
interface BarSupportsAssignment extends BaseAssignment {
  type: AssignmentType.barSupports;
  firstNode?: [boolean, boolean, boolean];
  secondNode?: [boolean, boolean, boolean];
}
interface BarUniformLoadAssignment extends BaseAssignment {
  type: AssignmentType.barUniformLoad;
  xLoad?: number;
  yLoad?: number;
  zLoad?: number;
}
interface SteelDesignAssignment extends BaseAssignment {
  type: AssignmentType.steelDesign;
  strength: number;
}
export type Assignment =
  | BarPropertiesAssignment
  | BarSupportsAssignment
  | BarUniformLoadAssignment
  | SteelDesignAssignment;

export interface Model {
  nodes: Node[];
  deformedNodes?: Node[];
  elements: Element[];
  assignments?: Assignment[];
}

// results
interface BaseResult {
  element: number;
}

// analysis result
export enum AnalysisResultType {
  bar = "bar",
}
interface BarResult extends BaseResult {
  type: AnalysisResultType.bar;
  stress: number;
  force: number;
  deformation: number[][];
}
export type AnalysisResult = BarResult;

// design result
export enum DesignResultType {
  steel = "steel",
}
interface SteelDesignResult extends BaseResult {
  type: DesignResultType.steel;
  ratio: number;
}
export type DesignResult = SteelDesignResult;

// helper type
export type Node = [number, number, number];
export type Element = [number, number];

// export public classes and functions
export { Viewer } from "./ui/viewer";
export { Configurator } from "./ui/configurator";
export { modeling } from "./algorithms/modeling";
export { deforming } from "./algorithms/deforming";
export { analyzing } from "./algorithms/analyzing";
export { designing } from "./algorithms/designing";
