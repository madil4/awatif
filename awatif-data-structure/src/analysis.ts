// To conduct Finite Element Method (FEM) analysis on a structure, we assign the necessary additional information to the geometry (nodes or elements) as inputs

// Inputs
export type AnalysisInput =
  | FrameAnalysisInput
  | LoadAnalysisInput
  | DistributedLoadAnalysisInput
  | SupportAnalysisInput
  | MassAnalysisInput;

export type FrameAnalysisInput = {
  element: number;
  elasticity: number;
  shearModulus?: number;
  area?: number;
  momentOfInertiaZ?: number;
  momentOfInertiaY?: number;
  torsionalConstant?: number;
};

export type LoadAnalysisInput = {
  node: number;
  load:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

export type DistributedLoadAnalysisInput = {
  element: number;
  distributedLoad: [number, number];
};

export type SupportAnalysisInput = {
  node: number;
  support:
    | [boolean, boolean, boolean]
    | [boolean, boolean, boolean, boolean, boolean, boolean];
};

export type MassAnalysisInput = {
  node: number;
  mass:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

// outputs
export type AnalysisOutputs = Record<
  string, // load case
  AnalysisOutput[]
>;

export type AnalysisOutput =
  | FrameAnalysisOutput
  | DeformationAnalysisOutput
  | ReactionAnalysisOutput
  | PositionAnalysisOutput;

export type FrameAnalysisOutput = {
  element: number;
  normal?: [number, number];
  shearY?: [number, number];
  shearZ?: [number, number];
  torsion?: [number, number];
  bendingY?: [number, number];
  bendingZ?: [number, number];
};

export type DeformationAnalysisOutput = {
  node: number;
  deformation:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

export type ReactionAnalysisOutput = {
  node: number;
  reaction:
    | [number, number, number]
    | [number, number, number, number, number, number];
};

export type PositionAnalysisOutput = {
  node: number;
  position: [number, number, number];
};
