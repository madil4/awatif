export type Model = {
  nodes: Node[];
  elements: Element[];
  assignments: Assignment[];
  analysisResults: AnalysisResults;
  designResults: DesignResults;
};

// nodes and elements
export type Node = [number, number, number];
export type Element = [number, number];

// assignments
export type Assignment =
  | supportAssignment
  | loadAssignment
  | propertyAssignment;
type supportAssignment = { node: number; support: [boolean, boolean, boolean] };
type loadAssignment = { node: number; load: [number, number, number] };
type propertyAssignment = { element: number; elasticity: number; area: number };

// analysis results
export type AnalysisResults = Record<
  string,
  (deformationResult | reactionResult | normalResult)[]
>;

type deformationResult = {
  node: number;
  deformation: [number, number, number];
};
type reactionResult = {
  node: number;
  reaction: [number, number, number];
};
type normalResult = {
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
