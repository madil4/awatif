import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

export type LoadTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getLoad: ({ params }: { params: Params }) => {
    load: [number, number, number, number, number, number]; //[Fx, Fy, Fz, Mx, My, Mz]
  };

  getObject3D?: ({
    params,
    position,
  }: {
    params: Params;
    position: [number, number, number];
  }) => THREE.Object3D;
};
