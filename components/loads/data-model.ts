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

  // The numerical label the viewer draws next to the load. Optional: without
  // it the viewer labels every non-zero component of `getLoad` with its
  // magnitude and axis, which is what the built-in templates rely on.
  // Implement it to word the value differently (a derived pressure, a code
  // reference, or several lines), and return null for no label.
  getLabel?: ({ params }: { params: Params }) => string | null;

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
