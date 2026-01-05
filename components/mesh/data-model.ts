import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Mesh } from "../data-model.js";

// template
export type MeshTemplate<Params extends Record<string, unknown>> = {
  name: string;
  defaultParams: Params;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: Params }) => {
    nodes: Nodes;
    elements: Elements;
  };
};

export type Nodes = NonNullable<Mesh["nodes"]>["val"];
export type Elements = NonNullable<Mesh["elements"]>["val"];

// components
export type MeshComponents = State<MeshComponent[]>;

type MeshComponent = {
  name: string;
  templateIndex: number;
  geometry: number[];
  params: Record<string, unknown>;
};
