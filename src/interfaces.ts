// parameters
export enum ParameterType {
  slider = "slider",
}
interface SliderParameter {
  type: ParameterType.slider;
  value: number;
  min: number;
  max: number;
  step: number;
}
type Parameter = SliderParameter;
export type Parameters = { [name: string]: Parameter };

// model
export enum AssignmentType {
  barSupports = "barSupports",
  barUniformLoad = "barUniformLoad",
}
interface BarSupportsAssignment {
  type: AssignmentType.barSupports;
  firstNode?: [boolean, boolean];
  secondNode?: [boolean, boolean];
}
interface BarUniformLoadAssignment {
  type: AssignmentType.barUniformLoad;
  load: number;
}
export type Assignment = BarSupportsAssignment | BarUniformLoadAssignment;
export interface Model {
  positions: [number, number, number][];
  connectivities: [number, number][];
  assignments?: [number, Assignment][];
}

// analysis result
export enum AnalysisResultType {
  bar = "bar",
}
interface BarAnalysisResult {
  type: AnalysisResultType.bar;
  stress: number;
  force: number;
}
type AnalysisResult = BarAnalysisResult;
export type AnalysisResults = { [element: number]: AnalysisResult };

// design result
export enum DesignResultType {
  steel = "steel",
}
interface SteelDesignResult {
  type: DesignResultType.steel;
  ratio: number;
}
type DesignResult = SteelDesignResult;
export type DesignResults = { [element: number]: DesignResult };
