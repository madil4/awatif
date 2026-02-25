import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import type { ImperfectionsTemplate } from "./data-model";

export type ImperfectionsParams = {
  // Global Inclination — EC2 §5.2(5)
  globalInclination: boolean;
  theta0: number; // Basic value θ₀ [rad] (default 1/200 = 0.005)
  height: number; // l [m] for αₕ = 2/√l clamped [2/3, 1]
  memberCount: number; // m for αₘ = √(0.5·(1+1/m))

  // Local Initial Bow — EC2 §5.2(7), Table 5.1
  localBow: boolean;
  bowRatioDenominator: number; // d where e₀ = L/d (default 400)

  direction: string; // "positive" | "negative" (X-axis)
};

export const imperfections: ImperfectionsTemplate<ImperfectionsParams> = {
  name: "Imperfections",
  defaultParams: {
    globalInclination: true,
    theta0: 0.005,
    height: 5,
    memberCount: 2,
    localBow: false,
    bowRatioDenominator: 400,
    direction: "positive",
  },

  getParamsTemplate: ({ params }) => {
    const p = params.val;
    const alphaH = computeAlphaH(p.height);
    const alphaM = computeAlphaM(p.memberCount);
    const thetaI = computeThetaI(p);

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
                @input=${(e: Event) =>
                  (params.val = {
                    ...params.val,
                    theta0: (e.target as HTMLInputElement).valueAsNumber,
                  })}
              />
            </div>

            <div>
              <label>Height l (m):</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                .value=${live(p.height)}
                @input=${(e: Event) =>
                  (params.val = {
                    ...params.val,
                    height: (e.target as HTMLInputElement).valueAsNumber,
                  })}
              />
            </div>

            <div>
              <label>Member count m:</label>
              <input
                type="number"
                step="1"
                min="1"
                .value=${live(p.memberCount)}
                @input=${(e: Event) =>
                  (params.val = {
                    ...params.val,
                    memberCount: (e.target as HTMLInputElement).valueAsNumber,
                  })}
              />
            </div>

            <div>
              <label style="color: var(--text-secondary); font-size: 0.85em;">
                αₕ = ${alphaH.toFixed(3)}, αₘ = ${alphaM.toFixed(3)}, θᵢ =
                ${thetaI.toFixed(6)} rad
              </label>
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
                @input=${(e: Event) =>
                  (params.val = {
                    ...params.val,
                    bowRatioDenominator: (e.target as HTMLInputElement)
                      .valueAsNumber,
                  })}
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
          <option value="positive">Positive X</option>
          <option value="negative">Negative X</option>
        </select>
      </div>
    `;
  },
};

// Helpers
export function computeAlphaH(height: number): number {
  return Math.min(1, Math.max(2 / 3, 2 / Math.sqrt(height)));
}

export function computeAlphaM(memberCount: number): number {
  return Math.sqrt(0.5 * (1 + 1 / memberCount));
}

export function computeThetaI(params: ImperfectionsParams): number {
  const theta0 = params.theta0;
  const h = params.height;
  const m = params.memberCount;
  return theta0 * computeAlphaH(h) * computeAlphaM(m);
}
