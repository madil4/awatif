import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { Elements, Nodes } from "../data-model";

export type MeshComponent<Params extends object> = {
  name: string;
  params: State<Params>;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: State<Params> }) => {
    nodes: Nodes;
    elements: Elements;
  };
};

export type MeshComponents = Map<number, MeshComponent<any>>;
