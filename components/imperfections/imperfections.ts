import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { ImperfectionsTemplate } from "./data-model";

export type ImperfectionsParams = {
  // Global Inclination — EC2 §5.2(5)
  globalInclination: boolean;
  theta0: number; // Basic value θ₀ [rad] (default 1/200 = 0.005)
  // Local Initial Bow — EC2 §5.2(7), Table 5.1
  localBow: boolean;
  bowRatioDenominator: number; // d where e₀ = L/d (default 400)

  direction: string; // "y-positive" | "y-negative" | "z-positive" | "z-negative"
};

export const imperfections: ImperfectionsTemplate<ImperfectionsParams> = {
  name: "Imperfections",
  defaultParams: {
    globalInclination: true,
    theta0: 0.005,
    localBow: false,
    bowRatioDenominator: 400,
    direction: "z-negative",
  },

  getParamsTemplate: ({ params }) => {
    const p = params.val;

    return html`
      <div>
        <label>
          <input
            type="checkbox"
            .checked=${p.globalInclination}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                globalInclination: (e.target as HTMLInputElement).checked,
              })}
          />
          Global Inclination
        </label>
      </div>

      ${p.globalInclination
        ? html`
            <div>
              <label>θ₀ (rad):</label>
              <input
                type="number"
                step="0.001"
                min="0"
                .value=${live(p.theta0)}
                @input=${(e: Event) => {
                  const value = (e.target as HTMLInputElement).valueAsNumber;
                  if (isNaN(value)) return;
                  params.val = { ...params.val, theta0: value };
                }}
              />
            </div>
          `
        : html``}

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${p.localBow}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                localBow: (e.target as HTMLInputElement).checked,
              })}
          />
          Local Bow
        </label>
      </div>

      ${p.localBow
        ? html`
            <div>
              <label>e₀ = L / d, d:</label>
              <input
                type="number"
                step="1"
                min="1"
                .value=${live(p.bowRatioDenominator)}
                @input=${(e: Event) => {
                  const value = (e.target as HTMLInputElement).valueAsNumber;
                  if (isNaN(value)) return;
                  params.val = { ...params.val, bowRatioDenominator: value };
                }}
              />
            </div>
          `
        : html``}

      <div>
        <label>Direction:</label>
        <select
          .value=${live(p.direction)}
          @change=${(e: Event) =>
            (params.val = {
              ...params.val,
              direction: (e.target as HTMLSelectElement).value,
            })}
        >
          <option value="y-positive">Local +Y</option>
          <option value="y-negative">Local -Y</option>
          <option value="z-positive">Local +Z</option>
          <option value="z-negative">Local -Z</option>
        </select>
      </div>
    `;
  },
};
