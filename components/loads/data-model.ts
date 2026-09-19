import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

export type LoadTemplate<Params extends Record<string, unknown>> = {
  name: string;
  geometryKind: "point" | "line";
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getLoad: ({ params }: { params: Params }) => {
    load: [number, number, number, number, number, number]; //[Fx, Fy, Fz, Mx, My, Mz]
    coordinateSystem?: "local" | "global";
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

  getLineObject3D?: ({
    params,
    startPosition,
    endPosition,
    displayScale,
  }: {
    params: Params;
    startPosition: [number, number, number];
    endPosition: [number, number, number];
    displayScale: number;
  }) => THREE.Object3D;
};
