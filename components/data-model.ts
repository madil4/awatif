export type Mesh = {
  // Geometry
  nodes?: number[][]; // [[x, y, z], [x, y, z], ...]
  elements?: number[][]; // [[node1, node2], ...]

  // Boundary conditions
  supports?: Map<
    number,
    [boolean, boolean, boolean, boolean, boolean, boolean]
  >;
  loads?: Map<number, [number, number, number, number, number, number]>;

  // Element properties
  elementsProps?: Map<
    number,
    {
      elasticity: number;
      area: number;
      momentInertia?: number;
      shearModulus?: number;
      torsionalConstant?: number;
    }
  >;

  // Outputs
  positions?: number[]; // [x1, y1, z1, x2, y2, z2, ...]
};
