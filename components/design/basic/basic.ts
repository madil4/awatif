import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { DesignTemplate } from "../data-model";

type BasicParams = {
  elasticity: string; // GPa
  area: string; // cm²
  momentInertia: string; // cm⁴
};

export const basic: DesignTemplate<BasicParams, any> = {
  name: "Basic",
  defaultParams: {
    elasticity: "33", // GPa (C30/37 concrete)
    area: "900", // cm² (300×300 mm section)
    momentInertia: "67500", // cm⁴ (300×300 mm section)
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Elasticity (GPa):</label>
        <input
          type="number"
          min="1"
          .value=${live(params.val.elasticity)}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              elasticity: (e.target as HTMLInputElement).value,
            })}
        />
      </div>

      <div>
        <label>Area (cm²):</label>
        <input
          type="number"
          min="1"
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
          min="1"
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
      elasticity: Number(params.elasticity) * 1e6, // GPa to KN/m^2
      area: Number(params.area) * 1e-4, // cm² to m²
      momentInertia: Number(params.momentInertia) * 1e-8, // cm⁴ to m⁴
    };
  },

  getReport: ({ params }: { params: BasicParams }) => {
    return html`
      <div
        style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);"
      >
        <!-- Section Properties -->
        <div style="margin-bottom: 12px;">
          <div style="font-weight: 500; margin-bottom: 4px;">
            Section Properties
          </div>
          <div>
            <span style="color: var(--text-secondary);">Elasticity:</span>
            ${params.elasticity} GPa
          </div>
          <div>
            <span style="color: var(--text-secondary);">Area:</span>
            ${params.area} cm²
          </div>
          <div>
            <span style="color: var(--text-secondary);"
              >Moment of Inertia:</span
            >
            ${Number(params.momentInertia).toFixed(1)} cm⁴
          </div>
        </div>
      </div>
    `;
  },
};
