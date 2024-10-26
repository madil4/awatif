import { State } from "vanjs-core";

// The geometry of any structure can be represented by these two entities:
export type Node = [number, number, number]; // position coordinates [x,y,z]
export type Element = number[]; // indices of the first and second node in the list of nodes

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

export type MaterialInput = {
  elasticity: number;
  shearModulus?: number;
  mass?: number;
};

export type SectionInput = {
  area?: number;
  momentOfInertiaZ?: number;
  momentOfInertiaY?: number;
  torsionalConstant?: number;
};

// Analysis Outputs
export type AnalysisOutputs = {
  nodes?: Map<number, NodeAnalysisOutputs>;
  elements?: Map<number, ElementAnalysisOutputs>;
};

type NodeAnalysisOutputs = {
  deformation?: [number, number, number, number, number, number];
  reaction?: [number, number, number, number, number, number];
};

type ElementAnalysisOutputs = {
  normal?: [number, number];
  shearY?: [number, number];
  shearZ?: [number, number];
  torsion?: [number, number];
  bendingY?: [number, number];
  bendingZ?: [number, number];
};

export type Structure = {
  nodes?: State<Node[]>;
  elements?: State<Element[]>;
  analysisInputs?: State<AnalysisInputs>;
  analysisOutputs?: State<AnalysisOutputs>;
};
