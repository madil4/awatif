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
    elasticity: 200,
    area: 10000,
    momentInertia: 83333333,
    shearModulus: 77,
    torsionalConstant: 141666667,
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
    return {
      elasticity: params.elasticity * 1e9, // GPa to Pa
      area: params.area * 1e-6, // mm² to m²
      momentInertia: params.momentInertia * 1e-12, // mm⁴ to m⁴
      shearModulus: params.shearModulus * 1e9, // GPa to Pa
      torsionalConstant: params.torsionalConstant * 1e-12, // mm⁴ to m⁴
    };
  },
};
