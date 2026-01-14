import type { State } from "vanjs-core";

// Geometry
export type Geometry = {
  points: State<Map<number, [number, number, number]>>;
  lines: State<Map<number, [number, number]>>;

  selection: State<{
    points: number[];
    lines: number[];
  } | null>;
};

// Mesh
export type Mesh = {
  nodes: State<number[][]>; // [[x, y, z], [x, y, z], ...]
  elements: State<number[][]>; // [[node1, node2], ...]

  geometryMapping: State<{
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  }>;

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

// Components
export enum ComponentsType {
  MESH,
  LOADS,
  SUPPORTS,
}

type Component = {
  name: string;
  templateIndex: number;
  geometry: number[];
  params: Record<string, unknown>;
};

export type Components = State<Map<ComponentsType, Component[]>>;
