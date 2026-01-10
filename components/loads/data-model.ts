import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

// template
export type LoadTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getLoad: ({ params }: { params: Params }) => {
    // Load values: [Fx, Fy, Fz, Mx, My, Mz]
    // Fx, Fy, Fz: Force components in x, y, z directions
    // Mx, My, Mz: Moment components about x, y, z axes
    load: [number, number, number, number, number, number];
  };
};

// components
export type Component = {
  name: string;
  templateIndex: number;
  geometry: number[];
  params: Record<string, unknown>;
};

export type Components = State<Map<string, Component[]>>;
