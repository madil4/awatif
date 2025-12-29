import van from "vanjs-core";
import { html } from "lit-html";
import { MeshTemplate } from "../data-model";

type LineMeshParams = {
  divisions: number;
};

export const lineMesh: MeshTemplate<LineMeshParams> = {
  name: "Line Mesh",
  params: van.state({
    divisions: 3,
  }),

  getTemplate: ({ params }) => {
    return html`<div>
      <label>Divisions:</label>
      <input
        type="number"
        .value=${params.val.divisions}
        @input=${(e: Event) =>
          (params.val = {
            ...params.val,
            divisions: Number((e.target as HTMLInputElement).value),
          })}
      />
    </div>`;
  },

  getMesh: ({ params }) => {
    const { divisions } = params.val;
    const nodes: number[][] = [];
    const elements: number[][] = [];

    // Create parametric nodes (t values from 0 to 1)
    const numNodes = divisions + 1;
    for (let i = 0; i < numNodes; i++) {
      const t = i / divisions;
      nodes.push([t]); // Store parametric value
    }

    // Create line elements
    for (let i = 0; i < divisions; i++) {
      elements.push([i, i + 1]);
    }

    return { nodes, elements };
  },
};
