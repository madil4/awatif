import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";
import { Mesh } from "../data-model";

export type MeshTemplate<Params extends Record<string, unknown>> = {
  name: string;
  geometryKind: "line";
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getMesh: ({ params }: { params: Params }) => {
    nodes: Mesh["nodes"]["val"];
    elements: Mesh["elements"]["val"];
  };
};

// Unlike MeshTemplate, which returns parametric nodes along a line, a polygon
// mesh template receives the polygon corners in 3D and returns real 3D nodes.
// Its components reference polygon IDs in their geometry array.
export type PolygonMeshTemplate<Params extends Record<string, unknown>> = {
  name: string;
  geometryKind: "polygon";
  defaultParams: Params;

  getParamsTemplate: ({ params }: { params: State<Params> }) => TemplateResult;
  getPolygonMesh: ({
    points,
    params,
  }: {
    points: [number, number, number][]; // ordered polygon corners
    params: Params;
  }) => {
    nodes: Mesh["nodes"]["val"];
    elements: Mesh["elements"]["val"];
  };
};
