import type { State } from "vanjs-core";

// Point is just the position coordinates [x, y, z]
// The ID is the Map key
export type Point = [number, number, number];

// Line is just the point IDs [startPointId, endPointId]
// The ID is the Map key
export type Line = [number, number];

export type Geometry = {
  points: State<Map<number, Point>>;
  lines: State<Map<number, Line>>;
  visible: State<boolean>;
};

export type Mesh = {
  nodes: State<number[][]>; // [[x, y, z], [x, y, z], ...]
  elements: State<number[][]>; // [[node1, node2], ...]
  visible: State<boolean>;

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
};
