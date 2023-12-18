export type Model = {
  nodes: Node[];
  elements: Element[];
  assignments: Assignment[];
  analysisResults: AnalysisResults;
  designResults: DesignResults;
};

export type Node = [number, number, number];
export type Element = [number, number];

// assignments
export type Assignment =
  | SupportAssignment
  | LoadAssignment
  | PropertyAssignment;
export type SupportAssignment = {
  node: number;
  support: [boolean, boolean, boolean];
};
export type LoadAssignment = { node: number; load: [number, number, number] };
export type PropertyAssignment = {
  element: number;
  elasticity: number;
  area: number;
};

// analysis results
export type AnalysisResults = Record<
  string,
  (DeformationResult | ReactionResult | NormalResult)[]
>;

export type DeformationResult = {
  node: number;
  deformation: [number, number, number];
};
export type ReactionResult = {
  node: number;
  reaction: [number, number, number];
};
export type NormalResult = {
  element: number;
  normal: [number, number];
};

// design results
export type DesignResults = timberResult[];

type timberResult = {
  element: number;
  utilizationFactor: number;
  effectiveLength: number;
};
