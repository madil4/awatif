import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type Mesh = Map<number, MeshComponent<object>>;

export type MeshComponent<Params extends object> = {
  name: string;
  params: State<Params>;

  getTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: State<Params> }) => MeshOutput;
};

type MeshOutput = {
  nodes: number[][];
  elements: number[][];
};
