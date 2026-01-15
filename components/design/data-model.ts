import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { ElementForces } from "../data-model";

// Design module types
export type Design = {
  designResults: State<Map<number, DesignResult>>;
};

export type DesignResult = {
  utilization: number; // 0.0 to 1.0+ (>1.0 means failure)
  status: "pass" | "fail";
};

// Forces for a line (all elements that belong to this geometry line)
export type LineElementForces = {
  elementIndices: number[]; // Element indices that belong to this line
  elementForces: ElementForces[]; // Forces for each element (same order as elementIndices)
};

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
    designResult,
  }: {
    params: Params;
    lineId: number;
    lineElementForces?: LineElementForces;
    designResult?: DesignResult;
  }) => TemplateResult;

  getDesign?: ({
    params,
    lineElementForces,
  }: {
    params: Params;
    lineElementForces: LineElementForces;
  }) => DesignResult;
};
