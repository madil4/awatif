import type { State } from "vanjs-core";

export type Mesh = {
  nodes?: State<number[][]>; // [[x, y, z], [x, y, z], ...]
  elements?: State<number[][]>; // [[node1, node2], ...]

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

  visible: State<boolean>;
};

export type Nodes = NonNullable<Mesh["nodes"]>["val"];
export type Elements = NonNullable<Mesh["elements"]>["val"];
