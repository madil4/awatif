import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

export type ReleaseTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getRelease: ({ params }: { params: Params }) => {
    release: [boolean, boolean, boolean, boolean]; // [My_start, Mz_start, My_end, Mz_end]
  };
  getObject3D?: ({
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
