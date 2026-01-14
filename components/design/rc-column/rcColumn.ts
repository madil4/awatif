import { html } from "lit-html";
import { DesignTemplate } from "../data-model";

type RcColumnParams = {
  // Geometry
  width: number; // mm
  depth: number; // mm
  height: number; // mm

  // Material properties
  concreteGrade: string; // e.g., "C30", "C40"
  steelGrade: string; // e.g., "S400", "S500"

  // Reinforcement (placeholder)
  longitudinalBars: number;
  barDiameter: number; // mm
  stirrupDiameter: number; // mm
  stirrupSpacing: number; // mm

  // Cover
  cover: number; // mm
};

export const rcColumn: DesignTemplate<RcColumnParams> = {
  name: "RC Column",
  defaultParams: {
    width: 300,
    depth: 300,
    height: 3000,
    concreteGrade: "C30",
    steelGrade: "S400",
    longitudinalBars: 4,
    barDiameter: 16,
    stirrupDiameter: 8,
    stirrupSpacing: 200,
    cover: 40,
  },

  getTemplate: ({ params }) => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h3
          style="margin: 0; border-bottom: 1px solid #ccc; padding-bottom: 8px;"
        >
          RC Column Design
        </h3>

        <!-- Geometry Section -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin: 0; font-size: 14px; color: #555;">Geometry</h4>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Width (mm):</label>
            <input
              type="number"
              .value=${params.val.width}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  width: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Depth (mm):</label>
            <input
              type="number"
              .value=${params.val.depth}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  depth: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Height (mm):</label>
            <input
              type="number"
              .value=${params.val.height}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  height: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>
        </div>

        <!-- Material Section -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin: 0; font-size: 14px; color: #555;">Material</h4>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Concrete Grade:</label>
            <input
              type="text"
              .value=${params.val.concreteGrade}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  concreteGrade: (e.target as HTMLInputElement).value,
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Steel Grade:</label>
            <input
              type="text"
              .value=${params.val.steelGrade}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  steelGrade: (e.target as HTMLInputElement).value,
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>
        </div>

        <!-- Reinforcement Section -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin: 0; font-size: 14px; color: #555;">
            Reinforcement
          </h4>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Longitudinal Bars:</label>
            <input
              type="number"
              .value=${params.val.longitudinalBars}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  longitudinalBars: Number(
                    (e.target as HTMLInputElement).value
                  ),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Bar Diameter (mm):</label>
            <input
              type="number"
              .value=${params.val.barDiameter}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  barDiameter: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Stirrup Dia. (mm):</label>
            <input
              type="number"
              .value=${params.val.stirrupDiameter}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  stirrupDiameter: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Stirrup Spacing (mm):</label>
            <input
              type="number"
              .value=${params.val.stirrupSpacing}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  stirrupSpacing: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 120px;">Cover (mm):</label>
            <input
              type="number"
              .value=${params.val.cover}
              @input=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  cover: Number((e.target as HTMLInputElement).value),
                })}
              style="flex: 1; padding: 4px;"
            />
          </div>
        </div>
      </div>
    `;
  },

  getDesign: ({ params }) => ({
    design: {
      type: "rc-column",
      geometry: {
        width: params.width,
        depth: params.depth,
        height: params.height,
      },
      material: {
        concreteGrade: params.concreteGrade,
        steelGrade: params.steelGrade,
      },
      reinforcement: {
        longitudinalBars: params.longitudinalBars,
        barDiameter: params.barDiameter,
        stirrupDiameter: params.stirrupDiameter,
        stirrupSpacing: params.stirrupSpacing,
        cover: params.cover,
      },
    },
  }),

  getReport: ({ params }) => {
    const container = document.createElement("div");
    container.style.cssText = `
      padding: 20px;
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
    `;

    container.innerHTML = `
      <h2 style="border-bottom: 2px solid #333; padding-bottom: 10px;">
        RC Column Design Report
      </h2>
      
      <section style="margin: 20px 0;">
        <h3 style="color: #555;">Geometry</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Width:</strong></td>
            <td style="padding: 8px;">${params.width} mm</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Depth:</strong></td>
            <td style="padding: 8px;">${params.depth} mm</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Height:</strong></td>
            <td style="padding: 8px;">${params.height} mm</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Cross-sectional Area:</strong></td>
            <td style="padding: 8px;">${params.width * params.depth} mm²</td>
          </tr>
        </table>
      </section>

      <section style="margin: 20px 0;">
        <h3 style="color: #555;">Material Properties</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Concrete Grade:</strong></td>
            <td style="padding: 8px;">${params.concreteGrade}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Steel Grade:</strong></td>
            <td style="padding: 8px;">${params.steelGrade}</td>
          </tr>
        </table>
      </section>

      <section style="margin: 20px 0;">
        <h3 style="color: #555;">Reinforcement Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Longitudinal Bars:</strong></td>
            <td style="padding: 8px;">${params.longitudinalBars} ⌀${
      params.barDiameter
    }mm</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Stirrups:</strong></td>
            <td style="padding: 8px;">⌀${params.stirrupDiameter}mm @ ${
      params.stirrupSpacing
    }mm c/c</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;"><strong>Cover:</strong></td>
            <td style="padding: 8px;">${params.cover} mm</td>
          </tr>
        </table>
      </section>

      <section style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #ff9800;">
        <h3 style="color: #ff9800; margin-top: 0;">Placeholder Notes</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Design calculations to be implemented</li>
          <li>Load combinations to be added</li>
          <li>Code compliance checks (e.g., ACI, Eurocode) to be integrated</li>
          <li>Capacity vs. demand analysis to be performed</li>
          <li>Detailed drawings to be generated</li>
        </ul>
      </section>
    `;

    return container;
  },
};
