import type { State } from "vanjs-core";

// Geometry
export type Geometry = {
  points: State<Map<number, [number, number, number]>>;
  lines: State<Map<number, [number, number]>>;

  selection: State<{
    points: number[];
    lines: number[];
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
  }>;

  supports: State<
    Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>
  >;
  loads: State<Map<number, [number, number, number, number, number, number]>>;
  elementsProps: State<
    Map<
      number,
      {
        elasticity: number;
        area: number;
        momentInertia?: number;
        shearModulus?: number;
        torsionalConstant?: number;
      }
    >
  >;

  positions: State<number[]>; // [x1, y1, z1, x2, y2, z2, ...]
  displacements: State<number[]>; // [u1x, u1y, u1z, r1x, r1y, r1z, u2x, ...]
  internalForces: State<Map<number, ElementForces>>;
};

export type ElementForces = {
  N: [number, number]; // Axial force at start and end
  Vy: [number, number]; // Shear force (y-direction) at start and end
  Vz: [number, number]; // Shear force (z-direction) at start and end
  Mx: [number, number]; // Torsional moment at start and end
  My: [number, number]; // Bending moment (about y-axis) at start and end
  Mz: [number, number]; // Bending moment (about z-axis) at start and end
};

// Components
export enum ComponentsType {
  MESH,
  LOADS,
  SUPPORTS,
  ANALYSIS,
  DESIGN,
}

export type Components = State<Map<ComponentsType, Component[]>>;

type Component = {
  name: string;
  templateId: string;
  geometry: number[];
  params?: Record<string, unknown>;
};
