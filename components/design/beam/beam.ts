import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { DesignTemplate } from "../data-model";

type BeamParams = {
  elasticity: string; // MPa
  area: string; // cm²
  momentInertia: string; // cm⁴
};

export const beam: DesignTemplate<BeamParams, any> = {
  name: "Beam",
  defaultParams: {
    elasticity: "32836", // MPa ≈ C30 Ecm
    area: "625", // cm² = 250×250 mm
    momentInertia: "32552", // cm⁴ = (250×250³)/12 mm⁴ → cm⁴
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
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              elasticity: (e.target as HTMLInputElement).value,
            })}
        />
      </div>

      <div>
        <label>Cross-section Area (cm²):</label>
        <input
          type="number"
          min="0.0001"
          step="1"
          .value=${live(params.val.area)}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              area: (e.target as HTMLInputElement).value,
            })}
        />
      </div>

      <div>
        <label>Moment of Inertia (cm⁴):</label>
        <input
          type="number"
          min="0.0001"
          step="100"
          .value=${live(params.val.momentInertia)}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              momentInertia: (e.target as HTMLInputElement).value,
            })}
        />
      </div>
    `;
  },

  getElementsProps: ({ params }) => {
    return {
      elasticity: Number(params.elasticity) * 1e3, // MPa → kN/m²
      area: Number(params.area) / 1e4, // cm² → m²
      momentInertia: Number(params.momentInertia) / 1e8, // cm⁴ → m⁴
    };
  },

  getReport: ({ params }: { params: BeamParams }) => {
    return html`
      <div
        style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);"
      >
        <div style="font-weight: 500; margin-bottom: 4px;">
          Section Properties
        </div>
        <div>
          <span style="color: var(--text-secondary);">Elastic Modulus E:</span>
          ${Number(params.elasticity).toFixed(0)} MPa
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >Cross-section Area A:</span
          >
          ${Number(params.area).toFixed(2)} cm²
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >Moment of Inertia I<sub>z</sub>:</span
          >
          ${Number(params.momentInertia).toFixed(0)} cm⁴
        </div>
      </div>
    `;
  },
};
