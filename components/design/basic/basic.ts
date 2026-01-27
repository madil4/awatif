import { html } from "lit-html";
import { DesignTemplate, LineElementForces } from "../data-model";
import { getLineEndForces } from "../utils";

type BasicParams = {
  elasticity: number; // GPa
  area: number; // cm²
  momentInertia: number; // cm⁴
};

export const basic: DesignTemplate<BasicParams, any> = {
  name: "Basic",
  defaultParams: {
    elasticity: 33, // GPa (C30/37 concrete)
    area: 900, // cm² (300×300 mm section)
    momentInertia: 67500, // cm⁴ (300×300 mm section)
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Elasticity (GPa):</label>
        <input
          type="number"
          step="1"
          min="1"
          .value=${params.val.elasticity}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              elasticity: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Area (cm²):</label>
        <input
          type="number"
          step="1"
          min="1"
          .value=${params.val.area}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              area: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Moment of Inertia (cm⁴):</label>
        <input
          type="number"
          step="1000"
          min="1"
          .value=${params.val.momentInertia}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              momentInertia: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>
    `;
  },

  getElementsProps: ({ params }) => {
    return {
      elasticity: params.elasticity * 1e6, // GPa to KN/m^2
      area: params.area * 1e-4, // cm² to m²
      momentInertia: params.momentInertia * 1e-8, // cm⁴ to m⁴
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
            ${params.momentInertia.toFixed(1)} cm⁴
          </div>
        </div>
      </div>
    `;

    // Utils
    function formatForce(value: number, unit: string) {
      return `${value >= 0 ? "+" : ""}${value.toFixed(1)} ${unit}`;
    }
  },
};
