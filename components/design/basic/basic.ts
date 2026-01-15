import { html } from "lit-html";
import { DesignTemplate } from "../data-model";

type BasicParams = {
  elasticity: number; // GPa
  area: number; // mm²
  momentInertia: number; // mm⁴
  shearModulus: number; // GPa
  torsionalConstant: number; // mm⁴
};

export const basic: DesignTemplate<BasicParams> = {
  name: "Basic",
  defaultParams: {
    elasticity: 200, // GPa (typical steel)
    area: 10000, // mm² (100 cm²)
    momentInertia: 83333333, // mm⁴ (example: 100x100mm square section)
    shearModulus: 77, // GPa (typical steel)
    torsionalConstant: 141666667, // mm⁴ (example: 100x100mm square section)
  },

  getTemplate: ({ params }) => {
    return html`
      <div>
        <label>Elasticity (GPa):</label>
        <input
          type="number"
          step="1"
          .value=${params.val.elasticity}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              elasticity: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Area (mm²):</label>
        <input
          type="number"
          step="1"
          .value=${params.val.area}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              area: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Moment of Inertia (mm⁴):</label>
        <input
          type="number"
          step="1000"
          .value=${params.val.momentInertia}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              momentInertia: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Shear Modulus (GPa):</label>
        <input
          type="number"
          step="1"
          .value=${params.val.shearModulus}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              shearModulus: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Torsional Constant (mm⁴):</label>
        <input
          type="number"
          step="1000"
          .value=${params.val.torsionalConstant}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              torsionalConstant: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>
    `;
  },

  getElementsProps: ({ params }) => {
    // Convert from user-friendly units to SI units (Pa, m², m⁴)
    return {
      elasticity: params.elasticity * 1e9, // GPa to Pa
      area: params.area * 1e-6, // mm² to m²
      momentInertia: params.momentInertia * 1e-12, // mm⁴ to m⁴
      shearModulus: params.shearModulus * 1e9, // GPa to Pa
      torsionalConstant: params.torsionalConstant * 1e-12, // mm⁴ to m⁴
    };
  },

  getReport: () => {
    // No report section for basic component
    return html``;
  },
};
