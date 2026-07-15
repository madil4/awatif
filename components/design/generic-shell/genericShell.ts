import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { DesignTemplate } from "../data-model";

export type GenericShellParams = {
  elasticity: number; // MPa
  poissonRatio: number;
  thickness: number; // mm
};

export const genericShell: DesignTemplate<GenericShellParams, any> = {
  name: "Generic Shell",
  geometryKind: "polygon",
  defaultParams: {
    elasticity: 32836, // MPa ≈ C30 Ecm
    poissonRatio: 0.2, // concrete
    thickness: 50, // mm
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Elastic Modulus (MPa):</label>
        <input
          type="number"
          min="1"
          step="1000"
          .value=${live(params.val.elasticity)}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(value)) return;
            params.val = { ...params.val, elasticity: value };
          }}
        />
      </div>

      <div>
        <label>Poisson's Ratio:</label>
        <input
          type="number"
          min="0"
          max="0.5"
          step="0.05"
          .value=${live(params.val.poissonRatio)}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(value)) return;
            params.val = { ...params.val, poissonRatio: value };
          }}
        />
      </div>

      <div>
        <label>Thickness (mm):</label>
        <input
          type="number"
          min="1"
          step="10"
          .value=${live(params.val.thickness)}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(value)) return;
            params.val = { ...params.val, thickness: value };
          }}
        />
      </div>
    `;
  },

  getElementsProps: ({ params }) => {
    return {
      elasticity: params.elasticity * 1e3, // MPa → kN/m²
      poissonRatio: params.poissonRatio,
      thickness: params.thickness / 1000, // mm → m
      // Frame-only props: shells (3-node) never read these
      area: 0,
      momentInertiaZ: 0,
      momentInertiaY: 0,
      shearModulus: 0,
      torsionalConstant: 0,
    };
  },
};
