import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type DesignTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;

  getDesign: ({ params }: { params: Params }) => unknown;

  getReport: ({ params }: { params: Params }) => TemplateResult;
};
