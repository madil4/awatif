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
  getReport: ({ params, lineId, lineElementForces }) => {
    // Extract forces at line ends (first element start, last element end)
    let startN = 0,
      endN = 0,
      startMz = 0,
      endMz = 0,
      startVy = 0,
      endVy = 0;
    let hasForces = false;

    if (lineElementForces && lineElementForces.elementForces.length > 0) {
      const firstForces = lineElementForces.elementForces[0];
      const lastForces =
        lineElementForces.elementForces[
          lineElementForces.elementForces.length - 1
        ];

      startN = firstForces.N[0];
      endN = lastForces.N[1];
      startMz = firstForces.Mz[0];
      endMz = lastForces.Mz[1];
      startVy = firstForces.Vy[0];
      endVy = lastForces.Vy[1];
      hasForces = true;
    }

    // Format force value with sign and unit
    const formatForce = (value: number, unit: string) => {
      const kilo = value / 1000;
      return `${kilo >= 0 ? "+" : ""}${kilo.toFixed(1)} ${unit}`;
    };

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
            <span style="color: var(--text-secondary);">Size:</span>
            ${params.width} × ${params.depth} mm
          </div>
          <div>
            <span style="color: var(--text-secondary);">Concrete:</span>
            ${params.concreteGrade}
          </div>
          <div>
            <span style="color: var(--text-secondary);">Steel:</span>
            ${params.steelGrade}, As = ${params.steelArea} mm²
          </div>
          <div>
            <span style="color: var(--text-secondary);">Cover:</span>
            ${params.cover} mm
          </div>
        </div>

        <!-- Internal Forces -->
        ${hasForces
          ? html`
              <div
                style="border-top: 1px solid var(--border); padding-top: 12px;"
              >
                <div style="font-weight: 500; margin-bottom: 8px;">
                  Internal Forces (Linear Analysis)
                </div>
                <div
                  style="display: grid; grid-template-columns: auto 1fr 1fr; gap: 4px 12px;"
                >
                  <div style="color: var(--text-secondary);"></div>
                  <div
                    style="color: var(--text-secondary); font-size: 0.75rem;"
                  >
                    Start
                  </div>
                  <div
                    style="color: var(--text-secondary); font-size: 0.75rem;"
                  >
                    End
                  </div>

                  <div style="color: var(--text-secondary);">N</div>
                  <div>${formatForce(startN, "kN")}</div>
                  <div>${formatForce(endN, "kN")}</div>

                  <div style="color: var(--text-secondary);">Vy</div>
                  <div>${formatForce(startVy, "kN")}</div>
                  <div>${formatForce(endVy, "kN")}</div>

                  <div style="color: var(--text-secondary);">Mz</div>
                  <div>${formatForce(startMz, "kNm")}</div>
                  <div>${formatForce(endMz, "kNm")}</div>
                </div>
              </div>
            `
          : html`
              <div
                style="color: var(--text-secondary); font-style: italic; border-top: 1px solid var(--border); padding-top: 12px;"
              >
                No internal forces available
              </div>
            `}
      </div>
    `;
  },
};
