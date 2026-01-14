import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

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

  getReport: ({ params }: { params: Params }) => TemplateResult;
};
