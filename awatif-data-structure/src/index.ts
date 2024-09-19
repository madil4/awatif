// The geometry of any structure can be represented by these two entities:
export type Node = [number, number, number]; // position coordinates [x,y,z]
export type Element = [number, number]; // indices of the first and second node in the list of nodes
export type QuadrilateralElement = [number, number, number, number]; // Element connects nodes 0, 1, 2, and 3

/**
 * Represents a Gauss point in 2D natural coordinate space.
 * Used for numerical integration in finite element analysis.
 * @type [xi, eta]
 */
export type GaussPoint2D = [number, number];

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

export type PlateMaterialInput = {
  elasticity: number;    // Young's modulus E
  poisson: number;       // Poisson's ratio ν
  shearModulus: number;  // Shear modulus G
  thickness: number;     // Plate thickness t
  density?: number;      // Material density (optional)
};
