import { html } from "lit-html";
import { DesignTemplate } from "../data-model";

type BasicParams = {
  elasticity: number; // GPa
  area: number; // cm²
  momentInertia: number; // cm⁴
};

export const basic: DesignTemplate<BasicParams> = {
  name: "Basic",
  defaultParams: {
    elasticity: 200, // GPa
    area: 100, // cm²
    momentInertia: 8333333.3, // cm⁴
  },

  getParamsTemplate: ({ params }) => {
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
        <label>Area (cm²):</label>
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
        <label>Moment of Inertia (cm⁴):</label>
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
    `;
  },

  getElementsProps: ({ params }) => {
    return {
      elasticity: params.elasticity * 1e6, // GPa to KN/m^2
      area: params.area * 1e-4, // cm² to m²
      momentInertia: params.momentInertia * 1e-8, // cm⁴ to m⁴
    };
  },
};
