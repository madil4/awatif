import { html } from "lit-html";
import { MeshTemplate } from "../data-model";

type LineMeshParams = {
  divisions: number;
};

export const lineMesh: MeshTemplate<LineMeshParams> = {
  name: "Line Mesh",
  defaultParams: {
    divisions: 8,
  },

  getParamsTemplate: ({ params }) => {
    return html`<div>
      <label>Divisions (max 30):</label>
      <input
        type="number"
        min="1"
        max="30"
        .value=${params.val.divisions}
        @input=${(e: Event) => {
          const value = Number((e.target as HTMLInputElement).value);
          const clampedValue = Math.max(1, Math.min(30, value));
          params.val = {
            ...params.val,
            divisions: clampedValue,
          };
        }}
      />
    </div>`;
  },

  getMesh: ({ params }) => {
    const { divisions } = params;
    const nodes: number[][] = [];
    const elements: number[][] = [];

    const numNodes = divisions + 1;
    for (let i = 0; i < numNodes; i++) {
      const t = i / divisions;
      nodes.push([t]);
    }

    for (let i = 0; i < divisions; i++) {
      elements.push([i, i + 1]);
    }

    return { nodes, elements };
  },
};
