import { State } from "vanjs-core";

// Analytical Model
export type Mesh = {
  nodes?: State<Node[]>;
  elements?: State<Element[]>;
  nodeInputs?: State<NodeInputs>;
  elementInputs?: State<ElementInputs>;
  deformOutputs?: State<DeformOutputs>;
  analyzeOutputs?: State<AnalyzeOutputs>;
};

// Backward-compatible alias used across UI/report modules.
export type Structure = Mesh;

// The geometry of any structure can be represented by these two entities:
export type Node = [number, number, number]; // position coordinates [x,y,z]
export type Element = number[]; // indices of the nodes list

export type NodeInputs = {
  supports?: Map<
    number,
    [boolean, boolean, boolean, boolean, boolean, boolean]
  >;
  loads?: Map<number, [number, number, number, number, number, number]>;
};

export type ElementInputs = {
  elasticities?: Map<number, number>;
  elasticitiesOrthogonal?: Map<number, number>;
  shearModuli?: Map<number, number>;
  areas?: Map<number, number>;
  momentsOfInertiaZ?: Map<number, number>;
  momentsOfInertiaY?: Map<number, number>;
  torsionalConstants?: Map<number, number>;
  thicknesses?: Map<number, number>;
  poissonsRatios?: Map<number, number>;
  cltLayups?: Map<number, CLTLayup>;
};

export type CLTLayer = {
  thickness: number;
  thetaDeg: number;
  Ex: number;
  Ey: number;
  nuXY: number;
  Gxy: number;
  Gxz: number;
  Gyz: number;
};

export type CLTOptions = {
  shearCoupling: boolean;
  noGlueAtNarrowSide: boolean;
  strictSymmetryForElement?: boolean;
  symmetryTolerance?: number;
  r33?: number;
  r66?: number;
  r77?: number;
  r88?: number;
};

export type CLTLayup = {
  layers: CLTLayer[];
  options: CLTOptions;
};

export type DeformOutputs = {
  deformations?: Map<number, [number, number, number, number, number, number]>;
  reactions?: Map<number, [number, number, number, number, number, number]>;
};

export type AnalyzeOutputs = {
  normals?: Map<number, [number, number]>;
  shearsY?: Map<number, [number, number]>;
  shearsZ?: Map<number, [number, number]>;
  torsions?: Map<number, [number, number]>;
  bendingsY?: Map<number, [number, number]>;
  bendingsZ?: Map<number, [number, number]>;
  bendingXX?: Map<number, [number, number, number]>;
  bendingYY?: Map<number, [number, number, number]>;
  bendingXY?: Map<number, [number, number, number]>;
  membraneXX?: Map<number, [number, number, number]>;
  membraneYY?: Map<number, [number, number, number]>;
  membraneXY?: Map<number, [number, number, number]>;
  tranverseShearX?: Map<number, [number, number, number]>;
  tranverseShearY?: Map<number, [number, number, number]>;
};
