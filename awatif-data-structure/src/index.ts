// The geometry of any structure can be represented by these two entities:
export type Node = [number, number, number]; // position coordinates [x,y,z]
export type Element = [number, number]; // indices of the first and second node in the list of nodes

// Analysis Inputs
export type AnalysisInputs = {
  materials?: Map<number, MaterialInput>;
  sections?: Map<number, SectionInput>;
  pointSupports?: Map<
    number,
    [boolean, boolean, boolean, boolean, boolean, boolean]
  >;
  pointLoads?: Map<number, [number, number, number, number, number, number]>;
};

type MaterialInput = {
  elasticity: number;
  shearModulus?: number;
  mass?: number;
};

type SectionInput = {
  area?: number;
  momentOfInertiaZ?: number;
  momentOfInertiaY?: number;
  torsionalConstant?: number;
};

// Analysis Outputs
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
