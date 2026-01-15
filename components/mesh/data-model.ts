import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Mesh } from "../data-model.js";

export type MeshTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: Params }) => {
    nodes: Nodes;
    elements: Elements;
  };
};

export type Nodes = NonNullable<Mesh["nodes"]>["val"];
export type Elements = NonNullable<Mesh["elements"]>["val"];
