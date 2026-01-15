import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { ElementForces } from "../data-model";

// Forces for a line (all elements that belong to this geometry line)
export type LineElementForces = {
  elementIndices: number[]; // Element indices that belong to this line
  elementForces: ElementForces[]; // Forces for each element (same order as elementIndices)
};

export type DesignTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;

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
  }: {
    params: Params;
    lineId: number;
    lineElementForces?: LineElementForces;
  }) => TemplateResult;
};
