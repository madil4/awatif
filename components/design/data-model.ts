import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { ElementForces } from "../data-model";

export type DesignTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;

  getElementsProps: ({ params }: { params: Params }) => {
    elasticity: number;
    area: number;
    momentInertia?: number;
    shearModulus?: number;
    torsionalConstant?: number;
  };

  getReport?: ({
    params,
    lineId,
    lineElementForces,
    design,
  }: {
    params: Params;
    lineId: number;
    lineElementForces?: LineElementForces;
    design?: Design;
  }) => TemplateResult;

  getDesign?: ({
    params,
    lineElementForces,
    length,
  }: {
    params: Params;
    lineElementForces: LineElementForces;
    length: number;
  }) => Design;
};

export type Design<Details = unknown> = {
  utilization: number;
  details?: Details;
};

// Forces for a line (all elements that belong to this geometry line)
export type LineElementForces = {
  elementIndices: number[]; // Element indices that belong to this line
  elementForces: ElementForces[]; // Forces for each element (same order as elementIndices)
};
