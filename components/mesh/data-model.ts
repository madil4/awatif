import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Mesh } from "../data-model.js";

export type MeshComponent<Params extends object> = {
  name: string;
  params: State<Params>;
  geometry: number[] 

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: State<Params> }) => {
    nodes: Nodes;
    elements: Elements;
  };
};

export type Nodes = NonNullable<Mesh["nodes"]>["val"];
export type Elements = NonNullable<Mesh["elements"]>["val"];
