import type { State } from "vanjs-core";
import { LoadCase } from "./loads/data-model";

// Geometry
export type Geometry = {
  points: State<Map<number, [number, number, number]>>;
  lines: State<Map<number, [number, number]>>;
  polygons: State<Map<number, number[]>>; // ordered point IDs (min 3)

  selection: State<{
    points: number[];
    lines: number[];
    polygons: number[];
  } | null>;

  designs: State<Map<number, any>>;
};

// Mesh
export type Mesh = {
  nodes: State<number[][]>; // [[x, y, z], [x, y, z], ...]
  elements: State<number[][]>; // [[node1, node2], ...]
  geometryMapping: State<{
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
    polygonToElements: Map<number, number[]>;
  }>;

  supports: State<
    Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>
  >;
  loads: State<Map<number, [number, number, number, number, number, number]>>; // [Fx, Fy, Fz, Mx, My, Mz]
  releases: State<
    Map<number, [boolean, boolean, boolean, boolean]> // [My_start, Mz_start, My_end, Mz_end]
  >;
  elementsProps: State<Map<number, ElementProps>>;

  positions: State<number[]>; // [x1, y1, z1, x2, y2, z2, ...]
  displacements: State<number[]>; // [u1x, u1y, u1z, r1x, r1y, r1z, u2x, ...]
  reactions: State<[number, number, number, number, number, number][]>;
  internalForces: State<
    Map<
      number,
      {
        N: [number, number]; // Axial force at start and end
        Vy: [number, number]; // Local-y shear; paired with sagging-negative bending
        Vz: [number, number]; // Local-z shear; paired with sagging-negative bending
        Mx: [number, number]; // Torsional moment at start and end
        My: [number, number]; // Local-y bending moment; sagging is negative
        Mz: [number, number]; // Local-z bending moment; sagging is negative
      }
    >
  >;
};

export type ElementProps = {
  elasticity: number;
  area: number;
  momentInertiaZ: number;
  momentInertiaY: number;
  shearModulus: number;
  torsionalConstant: number;
  thickness?: number; // shell (3-node) elements only
  poissonRatio?: number; // shell (3-node) elements only
};

export type Nodes = NonNullable<Mesh["nodes"]>["val"];
export type Elements = NonNullable<Mesh["elements"]>["val"];

// Components
export enum ComponentsType {
  MESH,
  LOADS,
  SUPPORTS,
  RELEASES,
  ANALYSIS,
  DESIGN,
  IMPERFECTIONS,
  SPECIAL,
}

export type ActiveComponent = {
  type: ComponentsType;
  index: number;
} | null;

export type ComponentEntry = {
  id?: string;
  name: string;
  templateId: string;
  geometry: number[];
  params?: Record<string, unknown>;
  loadCase?: LoadCase;
};

export type Components = State<Map<ComponentsType, ComponentEntry[]>>;
