import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { ActiveAnalysis } from "@awatif/ui";
import type { Mesh } from "../data-model";

export type DesignTemplate<
  Params extends Record<string, unknown>,
  Design extends Record<string, any>,
> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({
    params,
    activeAnalysis,
  }: {
    params: State<Params>;
    activeAnalysis?: ActiveAnalysis;
  }) => TemplateResult;

  getElementsProps: ({
    params,
    activeAnalysis,
    lineElementForces,
  }: {
    params: Params;
    activeAnalysis?: ActiveAnalysis["val"];
    lineElementForces?: LineElementForces;
  }) => {
    elasticity: number;
    area: number;
    momentInertia?: number;
    shearModulus?: number;
    torsionalConstant?: number;
  };

  getReport?: ({
    params,
    design,
  }: {
    params: Params;
    design?: Design;
  }) => TemplateResult;

  getDesign?: ({
    params,
    lineElementForces,
    length,
    activeAnalysis,
    imperfections,
  }: {
    params: Params;
    lineElementForces: LineElementForces;
    length: number;
    activeAnalysis?: ActiveAnalysis["val"];
    imperfections?: Record<string, unknown>;
  }) => Design;
};

// Forces for a line (all elements that belong to this geometry line)
export type LineElementForces = {
  elementIndices: number[]; // Element indices that belong to this line
  elementForces: NonNullable<Mesh["internalForces"]["val"]> extends Map<
    number,
    infer V
  >
    ? V[]
    : never;
};
