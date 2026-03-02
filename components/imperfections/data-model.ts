import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type ImperfectionsTemplate<Params extends Record<string, unknown>> = {
  name: string;
  geometryKind: "point" | "line";
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
};
