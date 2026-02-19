import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { DesignTemplate } from "../data-model";

type RcBeamParams = {
  width: string; // mm
  depth: string; // mm
  concreteGrade: string; // e.g., "C30"
  stiffnessModifier: string; // 0.01–1.0 (1.0 = uncracked)
};

function parseEcm(concreteGrade: string) {
  const fckMatch = concreteGrade.match(/C(\d+)/);
  const fck = fckMatch ? parseInt(fckMatch[1]) : 30;
  const fcm = fck + 8;
  return 22000 * Math.pow(fcm / 10, 0.3); // MPa
}

export const rcBeam: DesignTemplate<RcBeamParams, any> = {
  name: "RC Beam",
  defaultParams: {
    width: "250",
    depth: "500",
    concreteGrade: "C30",
    stiffnessModifier: "1.0",
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Width (mm):</label>
        <input
          type="number"
          min="1"
          .value=${live(params.val.width)}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              width: (e.target as HTMLInputElement).value,
            })}
        />
      </div>

      <div>
        <label>Depth (mm):</label>
        <input
          type="number"
          min="1"
          .value=${live(params.val.depth)}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              depth: (e.target as HTMLInputElement).value,
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
        <label>Stiffness Modifier:</label>
        <input
          type="number"
          min="0.01"
          max="1"
          step="0.05"
          .value=${live(params.val.stiffnessModifier)}
          @input=${(e: Event) =>
            (params.val = {
              ...params.val,
              stiffnessModifier: (e.target as HTMLInputElement).value,
            })}
        />
      </div>
    `;
  },

  getElementsProps: ({ params }) => {
    const width = Number(params.width) / 1000; // mm to m
    const depth = Number(params.depth) / 1000; // mm to m
    const modifier = Number(params.stiffnessModifier);

    const Ecm = parseEcm(params.concreteGrade); // MPa
    const Ecm_kNm2 = Ecm * 1e3; // MPa to kN/m²

    return {
      elasticity: Ecm_kNm2 * modifier,
      area: width * depth,
      momentInertia: (width * Math.pow(depth, 3)) / 12,
    };
  },

  getSection: (params: RcBeamParams): [number, number][] => {
    const w = Number(params.width) / 2000; // half-width in m
    const h = Number(params.depth) / 2000; // half-depth in m
    return [
      [-w, -h],
      [w, -h],
      [w, h],
      [-w, h],
    ];
  },

  getReport: ({ params }: { params: RcBeamParams }) => {
    const width = Number(params.width);
    const depth = Number(params.depth);
    const modifier = Number(params.stiffnessModifier);
    const Ecm = parseEcm(params.concreteGrade);

    return html`
      <div
        style="font-size: 0.85rem; line-height: 1.8; color: var(--text-primary);"
      >
        <div style="margin-bottom: 12px;">
          <div style="font-weight: 500; margin-bottom: 4px;">
            Section Properties
          </div>
          <div>
            <span style="color: var(--text-secondary);">Width:</span>
            ${params.width} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);">Depth:</span>
            ${params.depth} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);">Concrete Grade:</span>
            ${params.concreteGrade}
          </div>
          <div>
            <span style="color: var(--text-secondary);"
              >Stiffness Modifier:</span
            >
            ${params.stiffnessModifier}
          </div>
        </div>

        <div>
          <div style="font-weight: 500; margin-bottom: 4px;">
            Computed Properties
          </div>
          <div>
            <span style="color: var(--text-secondary);">E<sub>cm</sub>:</span>
            ${Ecm.toFixed(0)} MPa
          </div>
          <div>
            <span style="color: var(--text-secondary);"
              >Effective E<sub>cm</sub>:</span
            >
            ${(Ecm * modifier).toFixed(0)} MPa
          </div>
          <div>
            <span style="color: var(--text-secondary);">Area:</span>
            ${(width * depth).toFixed(0)} mm²
          </div>
          <div>
            <span style="color: var(--text-secondary);"
              >Moment of Inertia:</span
            >
            ${((width * Math.pow(depth, 3)) / 12).toFixed(0)} mm⁴
          </div>
        </div>
      </div>
    `;
  },
};
