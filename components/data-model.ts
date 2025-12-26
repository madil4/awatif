import type { State } from "vanjs-core";

export type Point = {
  id: number;
  position: [number, number, number];
};

export type Line = {
  id: number;
  points: [number, number]; // [startPointId, endPointId]
};

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
