import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type MeshComponents = Map<number, MeshComponent<any>>;

export type MeshComponent<Params extends object> = {
  name: string;
  params: State<Params>;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: State<Params> }) => MeshOutput;
};

export type MeshOutput = {
  nodes: number[][];
  elements: number[][];
};
