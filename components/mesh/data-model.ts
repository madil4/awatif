import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Mesh } from "../data-model.js";

export type MeshTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: Params }) => {
    nodes: Mesh["nodes"]["val"];
    elements: Mesh["elements"]["val"];
  };
};
