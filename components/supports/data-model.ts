import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

// template
export type SupportTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getSupport: ({ params }: { params: Params }) => {
    // Support values: [Ux, Uy, Uz, Rx, Ry, Rz]
    // Ux, Uy, Uz: Translation restraints in x, y, z directions (true = restrained)
    // Rx, Ry, Rz: Rotation restraints about x, y, z axes (true = restrained)
    support: [boolean, boolean, boolean, boolean, boolean, boolean];
  };

  getObject3D?: ({
    params,
    position,
  }: {
    params: Params;
    position: [number, number, number];
  }) => THREE.Object3D;
};
