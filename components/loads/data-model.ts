import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

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

  getObject3D?: ({
    params,
    position,
  }: {
    params: Params;
    position: [number, number, number];
  }) => THREE.Object3D;
};
