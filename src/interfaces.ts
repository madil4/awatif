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
  bar = "bar",
  barSupports = "barSupports",
  barUniformLoad = "barUniformLoad",
  steelDesign = "steelDesign",
}
interface BaseAssignment {
  element?: number;
}
interface BarAssignment extends BaseAssignment {
  type: AssignmentType.bar;
  area: number;
  elasticity: number;
}
interface BarSupportsAssignment extends BaseAssignment {
  type: AssignmentType.barSupports;
  firstNode?: [boolean, boolean];
  secondNode?: [boolean, boolean];
}
interface BarUniformLoadAssignment extends BaseAssignment {
  type: AssignmentType.barUniformLoad;
  xLoad?: number;
  yLoad?: number;
}
interface SteelDesignAssignment extends BaseAssignment {
  type: AssignmentType.steelDesign;
  strength: number;
}
export type Assignment =
  | BarAssignment
  | BarSupportsAssignment
  | BarUniformLoadAssignment
  | SteelDesignAssignment;

export interface Model {
  positions: [number, number, number][];
  connectivities: [number, number][];
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
}
type AnalysisResult = BarResult;
export type AnalysisResults = AnalysisResult[];

// design result
export enum DesignResultType {
  steel = "steel",
}
interface SteelDesignResult extends BaseResult {
  type: DesignResultType.steel;
  ratio: number;
}
type DesignResult = SteelDesignResult;
export type DesignResults = DesignResult[];
