import type { State } from "vanjs-core";

export type Geometry = {
  points: State<Map<number, [number, number, number]>>;
  lines: State<Map<number, [number, number]>>;

  visible?: State<boolean>;
  selection: State<{
    points: number[];
    lines: number[];
  } | null>;
};

export type Mesh = {
  nodes: State<number[][]>; // [[x, y, z], [x, y, z], ...]
  elements: State<number[][]>; // [[node1, node2], ...]

  geometryMapping?: {
    pointToNodes: Map<number, number[]>; // geometry point ID → mesh node indices
    lineToElements: Map<number, number[]>; // geometry line ID → mesh element indices
  };

  visible?: State<boolean>;

  supports?: Map<
    number,
    [boolean, boolean, boolean, boolean, boolean, boolean]
  >;
  loads?: Map<number, [number, number, number, number, number, number]>;

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

  positions?: number[]; // [x1, y1, z1, x2, y2, z2, ...]

  // Post-processing results
  displacements?: State<
    Map<number, [number, number, number, number, number, number]>
  >;
  reactions?: State<
    Map<number, [number, number, number, number, number, number]>
  >;
  normals?: State<Map<number, [number, number]>>;
  shears?: State<Map<number, [number, number]>>;
  bendings?: State<Map<number, [number, number]>>;
};
