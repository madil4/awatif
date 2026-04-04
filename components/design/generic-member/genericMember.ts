import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { DesignTemplate } from "../data-model";

type GenericMemberParams = {
  elasticity: number; // MPa
  area: number; // cm²
  momentInertia: number; // cm⁴
};

export const genericMember: DesignTemplate<GenericMemberParams, any> = {
  name: "Generic Member",
  defaultParams: {
    elasticity: 32836, // MPa ≈ C30 Ecm
    area: 625, // cm² = 250×250 mm
    momentInertia: 32552, // cm⁴ = (250×250³)/12 mm⁴ → cm⁴
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
        <label>Cross-section Area (cm²):</label>
        <input
          type="number"
          min="0.0001"
          step="1"
          .value=${live(params.val.area)}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(value)) return;
            params.val = { ...params.val, area: value };
          }}
        />
      </div>

      <div>
        <label>Moment of Inertia (cm⁴):</label>
        <input
          type="number"
          min="0.0001"
          step="100"
          .value=${live(params.val.momentInertia)}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).valueAsNumber;
            if (isNaN(value)) return;
            params.val = { ...params.val, momentInertia: value };
          }}
        />
      </div>
    `;
  },

  getElementsProps: ({ params }) => {
    return {
      elasticity: params.elasticity * 1e3, // MPa → kN/m²
      area: params.area / 1e4, // cm² → m²
      momentInertia: params.momentInertia / 1e8, // cm⁴ → m⁴
    };
  },

  getSection: () => {
    const halfSize = 0.05; // 300 mm / 2

    return [
      [-halfSize, -halfSize],
      [halfSize, -halfSize],
      [halfSize, halfSize],
      [-halfSize, halfSize],
    ];
  },

  getReport: ({ params }: { params: GenericMemberParams }) => {
    return html`
      <div
        style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);"
      >
        <div style="font-weight: 500; margin-bottom: 4px;">
          Section Properties
        </div>
        <div>
          <span style="color: var(--text-secondary);">Elastic Modulus E:</span>
          ${params.elasticity.toFixed(0)} MPa
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >Cross-section Area A:</span
          >
          ${params.area.toFixed(2)} cm²
        </div>
        <div>
          <span style="color: var(--text-secondary);"
            >Moment of Inertia I<sub>z</sub>:</span
          >
          ${params.momentInertia.toFixed(0)} cm⁴
        </div>
      </div>
    `;
  },
};
