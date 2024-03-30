/*
To conduct Finite Element Method (FEM) analysis on a structure, we assign the necessary additional information to the geometry.
This process is referred to as 'assignments.' Below is a data structure for beam analysis.
*/

// assignments (or inputs)
export type Assignment =
  | PropertyAssignment
  | SupportAssignment
  | LoadAssignment
  | MassAssignment
  | DistributedLoadAssignment;

export type PropertyAssignment = {
  element: number;
  elasticity: number;
  shearModulus?: number;
  area?: number;
  momentOfInertiaZ?: number;
  momentOfInertiaY?: number;
  torsionalConstant?: number;
};

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

export type MassAssignment = {
  node: number;
  mass:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

export type DistributedLoadAssignment = {
  element: number;
  distributedLoad: [number, number];
};

// results (or outputs)
export type AnalysisResults = Record<
  string,
  (DeformationResult | PositionResult | ReactionResult | BeamResult)[]
>;

export type DeformationResult = {
  node: number;
  deformation:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

export type PositionResult = {
  node: number;
  position:
    | [number, number, number];
};

export type ReactionResult = {
  node: number;
  reaction:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

export type BeamResult = {
  element: number;
  normal?: [number, number];
  shearY?: [number, number];
  shearZ?: [number, number];
  torsion?: [number, number];
  bendingY?: [number, number];
  bendingZ?: [number, number];
};
