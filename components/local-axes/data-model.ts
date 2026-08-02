import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

// Rotation of the section about the member's own axis, in degrees
export type LocalAxesAngle = 0 | 90;

export type LocalAxesTemplate<Params extends Record<string, unknown>> = {
  name: string;
  geometryKind: "line";
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getAngle: ({ params }: { params: Params }) => LocalAxesAngle;
};
