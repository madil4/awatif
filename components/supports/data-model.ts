import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

export type SupportTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getSupport: ({ params }: { params: Params }) => {
    support: [boolean, boolean, boolean, boolean, boolean, boolean]; //[Ux, Uy, Uz, Rx, Ry, Rz]
  };

  getObject3D?: ({
    params,
    position,
    displayScale,
  }: {
    params: Params;
    position: [number, number, number];
    displayScale: number;
  }) => THREE.Object3D;
};
