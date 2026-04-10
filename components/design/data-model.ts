import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { ImperfectionsParams } from "../imperfections/imperfections";
import type { Mesh } from "../data-model";

export type ActiveAnalysis = "linear" | "nonlinear";

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
    activeAnalysis: ActiveAnalysis;
  }) => TemplateResult;

  getElementsProps: ({
    params,
    activeAnalysis,
  }: {
    params: Params;
    activeAnalysis: ActiveAnalysis;
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
    design: Design;
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
    activeAnalysis: ActiveAnalysis;
    imperfections?: ImperfectionsParams;
  }) => Design;

  getSection?: (params: Params) => [number, number][];
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
