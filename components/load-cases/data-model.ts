import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

// A load case is a named bucket that loads are assigned to. It has no geometry
// and no parameters: its identity is the component's id and its user-given name.
export type LoadCaseTemplate<
  Params extends Record<string, unknown> = Record<string, never>,
> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
};
