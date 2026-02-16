import { html } from "lit-html";
import { MeshTemplate } from "../data-model";

type LineMeshParams = {
  spacing: number;
};

export const lineMesh: MeshTemplate<LineMeshParams> = {
  name: "Line Mesh",
  defaultParams: {
    spacing: 0.6,
  },

  getParamsTemplate: ({ params }) => {
    return html`<div>
      <label>Spacing (m):</label>
      <input
        type="number"
        min="0.1"
        max="5"
        step="0.1"
        .value=${params.val.spacing}
        @input=${(e: Event) => {
          const value = Number((e.target as HTMLInputElement).value);
          const clampedValue = Math.max(0.1, Math.min(5, value));
          params.val = {
            ...params.val,
            spacing: clampedValue,
          };
        }}
      />
    </div>`;
  },

  getMesh: ({ params, lineLength }) => {
    const { spacing } = params;
    const divisions = Math.max(1, Math.round(lineLength / spacing));
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
