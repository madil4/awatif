import van from "vanjs-core";
import { html } from "lit-html";
import { MeshComponent } from "./data-model";

type LineMeshParams = {
  length: number;
};

export const LineMesh: MeshComponent<LineMeshParams> = {
  name: "Line Mesh",

  params: van.state({
    length: 10,
  }),

  getTemplate: ({ params }) => {
    return html`<div>
      <label>Length:</label>
      <input
        type="number"
        .value=${params.val.length}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            length: Number((e.target as HTMLInputElement).value),
          })}
      />
    </div>`;
  },

  getMesh: ({ params }) => {
    const length = params.val.length;

    const nodes = [
      [0, 0, 0],
      [length, 0, 0],
    ];
    const elements = [[1, 2]];

    return { nodes, elements };
  },
};
