import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Mesh } from "../data-model.js";

export type MeshComponents = State<MeshComponent[]>;

export type MeshComponent = {
  name: string;
  templateIndex: number;
  geometry: number[];
  params: Record<string, unknown>;
};

export type MeshTemplate<Params extends object> = {
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
