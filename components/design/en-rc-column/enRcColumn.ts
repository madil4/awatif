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
  getElementsProps: ({ params }) => {
    const width = params.width / 1000;
    const depth = params.depth / 1000;

    const area = width * depth;

    const momentInertia = (width * Math.pow(depth, 3)) / 12;

    const fck = parseInt(params.concreteGrade.substring(1)); // Extract number from "C30"
    const fcm = fck + 8;
    const elasticity = 22000 * Math.pow(fcm / 10, 0.3) * 1e6; // Convert MPa to Pa

    const shearModulus = elasticity / (2 * (1 + 0.2));

    const a = Math.max(width, depth);
    const b = Math.min(width, depth);
    const torsionalConstant =
      a *
      Math.pow(b, 3) *
      (1 / 3 - 0.21 * (b / a) * (1 - Math.pow(b, 4) / (12 * Math.pow(a, 4))));

    return {
      elasticity,
      area,
      momentInertia,
      shearModulus,
      torsionalConstant,
    };
  },
  getReport: ({ params }) => html`
    <div style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);">
      <div><span style="color: var(--text-secondary);">Width:</span> ${params.width} mm</div>
      <div><span style="color: var(--text-secondary);">Depth:</span> ${params.depth} mm</div>
      <div><span style="color: var(--text-secondary);">Concrete Grade:</span> ${params.concreteGrade}</div>
      <div><span style="color: var(--text-secondary);">Steel Grade:</span> ${params.steelGrade}</div>
      <div><span style="color: var(--text-secondary);">Steel Area:</span> ${params.steelArea} mm²</div>
      <div><span style="color: var(--text-secondary);">Cover:</span> ${params.cover} mm</div>
    </div>
  `,
};
