import { html } from "lit-html";
import { MeshTemplate } from "../data-model";

type LineMeshParams = {
  divisions: number;
};

export const lineMesh: MeshTemplate<LineMeshParams> = {
  name: "Line Mesh",
  defaultParams: {
    divisions: 1,
  },

  getParamsTemplate: ({ params }) => {
    return html`<div>
      <label>Divisions:</label>
      <input
        type="number"
        min="1"
        max="10"
        step="1"
        .value=${params.val.divisions}
        @input=${(e: Event) => {
          const value = Math.round(
            Number((e.target as HTMLInputElement).value),
          );
          const clamped = Math.max(1, Math.min(10, value));
          params.val = {
            ...params.val,
            divisions: clamped,
          };
        }}
      />
    </div>`;
  },

  getMesh: ({ params }) => {
    const { divisions } = params;
    const nodes: number[][] = [];
    const elements: number[][] = [];

    for (let i = 0; i <= divisions; i++) {
      nodes.push([i / divisions]);
    }

    for (let i = 0; i < divisions; i++) {
      elements.push([i, i + 1]);
    }

    return { nodes, elements };
  },
};
