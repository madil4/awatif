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

export interface Model {
  positions: [number, number, number][];
  connectivities: [number, number][];
}

export enum AnalysisResultType {
  bar = "bar",
}
interface BarAnalysisResult {
  type: AnalysisResultType.bar;
  stress: number;
}
type AnalysisResult = BarAnalysisResult;
export type AnalysisResults = { [element: number]: AnalysisResult };
