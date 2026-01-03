import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import type { Nodes, Elements } from "../data-model.js";

export type MeshComponents = State<MeshComponent[]>;

type MeshComponent = {
  name: string;
  templateIndex: number;
  geometry: number[];
};

export type MeshTemplate<Params extends object> = {
  name: string;
  params: State<Params>;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: State<Params> }) => {
    nodes: Nodes;
    elements: Elements;
  };
};
