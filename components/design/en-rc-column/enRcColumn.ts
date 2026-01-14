import { html } from "lit-html";
import { DesignTemplate } from "../data-model";

type EnRcColumnParams = {
  width: number;
  depth: number;
  concreteGrade: string;
  steelGrade: string;
  steelArea: number;
  cover: number;
};

export const enRcColumn: DesignTemplate<EnRcColumnParams> = {
  name: "EN RC Column",
  defaultParams: {
    width: 300,
    depth: 300,
    concreteGrade: "C30",
    steelGrade: "S400",
    steelArea: 400,
    cover: 40,
  },

  getTemplate: ({ params }) => {
    return html`
      <div>
        <label>Width (mm):</label>
        <input
          type="number"
          .value=${params.val.width}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              width: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Depth (mm):</label>
        <input
          type="number"
          .value=${params.val.depth}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              depth: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Concrete Grade:</label>
        <input
          type="text"
          .value=${params.val.concreteGrade}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              concreteGrade: (e.target as HTMLInputElement).value,
            })}
        />
      </div>

      <div>
        <label>Steel Grade:</label>
        <input
          type="text"
          .value=${params.val.steelGrade}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              steelGrade: (e.target as HTMLInputElement).value,
            })}
        />
      </div>

      <div>
        <label>Steel Area (mm²):</label>
        <input
          type="number"
          .value=${params.val.steelArea}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              steelArea: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>

      <div>
        <label>Cover (mm):</label>
        <input
          type="number"
          .value=${params.val.cover}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              cover: Number((e.target as HTMLInputElement).value),
            })}
        />
      </div>
    `;
  },
  getDesign: ({ params }) => {},
  getReport: ({ params }) => html``,
};
