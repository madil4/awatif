import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { Mesh } from "../data-model";

export type MeshTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params, lineLength }: { params: Params; lineLength: number }) => {
    nodes: Mesh["nodes"]["val"];
    elements: Mesh["elements"]["val"];
  };
};
