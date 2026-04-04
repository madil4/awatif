import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import * as THREE from "three";

// Load Cases
export type LoadCase = "dead" | "live" | "wind";
export type LoadCombination = "uls-live" | "uls-wind";
export type LoadSelection = LoadCase | LoadCombination;

export const ULS_COMBINATIONS: Record<
  LoadCombination,
  Record<LoadCase, number>
> = {
  "uls-live": { dead: 1.35, live: 1.5, wind: 0.9 },
  "uls-wind": { dead: 1.35, live: 1.05, wind: 1.5 },
};

export const LOAD_SELECTION_LABELS: Record<LoadSelection, string> = {
  dead: "Dead",
  live: "Live",
  wind: "Wind",
  "uls-live": "ULS-1",
  "uls-wind": "ULS-2",
};

export type LoadTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;
  geometryKind?: "point" | "line";

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getLoad: ({ params }: { params: Params }) => {
    load: [number, number, number, number, number, number]; //[Fx, Fy, Fz, Mx, My, Mz]
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
