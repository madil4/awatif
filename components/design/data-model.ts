import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { ElementForces } from "../data-model";
import type { ActiveAnalysis } from "@awatif/ui";

export type Design = {
  utilization: number;
} & Record<string, any>;

export type DesignTemplate<
  Params extends Record<string, unknown>,
  TDesign extends Design = Design,
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

  getElementsProps: ({ params }: { params: Params }) => {
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
    design?: TDesign;
  }) => TemplateResult;

  getDesign?: ({
    params,
    lineElementForces,
    length,
    activeAnalysis,
  }: {
    params: Params;
    lineElementForces: LineElementForces;
    length: number;
    activeAnalysis?: ActiveAnalysis["val"];
  }) => TDesign;
};

// Forces for a line (all elements that belong to this geometry line)
export type LineElementForces = {
  elementIndices: number[]; // Element indices that belong to this line
  elementForces: ElementForces[]; // Forces for each element (same order as elementIndices)
};
