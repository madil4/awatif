import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { State } from "vanjs-core";
import { TemplateResult } from "lit-html";

export type ImperfectionsParams = {
  // Global Inclination — EC2 §5.2(5)
  globalInclination: boolean;
  theta0: string; // Basic value θ₀ [rad] (default 1/200 = 0.005)
  height: string; // l [m] for αₕ = 2/√l clamped [2/3, 1]
  memberCount: string; // m for αₘ = √(0.5·(1+1/m))

  // Local Initial Bow — EC2 §5.2(7), Table 5.1
  localBow: boolean;
  bowRatioDenominator: string; // d where e₀ = L/d (default 400)

  // Direction
  direction: string; // "positive" | "negative" (X-axis)
};

export function computeAlphaH(height: number): number {
  return Math.min(1, Math.max(2 / 3, 2 / Math.sqrt(height)));
}

export function computeAlphaM(memberCount: number): number {
  return Math.sqrt(0.5 * (1 + 1 / memberCount));
}

export function computeThetaI(params: ImperfectionsParams): number {
  const theta0 = Number(params.theta0);
  const h = Number(params.height);
  const m = Number(params.memberCount);
  return theta0 * computeAlphaH(h) * computeAlphaM(m);
}

export const imperfections: {
  name: string;
  defaultParams: ImperfectionsParams;
  getParamsTemplate: ({
    params,
  }: {
    params: State<ImperfectionsParams>;
  }) => TemplateResult;
} = {
  name: "Imperfections",
  defaultParams: {
    globalInclination: true,
    theta0: "0.005",
    height: "4",
    memberCount: "1",
    localBow: false,
    bowRatioDenominator: "400",
    direction: "positive",
  },

  getParamsTemplate: ({ params }) => {
    const p = params.val;
    const alphaH = computeAlphaH(Number(p.height));
    const alphaM = computeAlphaM(Number(p.memberCount));
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
                    theta0: (e.target as HTMLInputElement).value,
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
                    height: (e.target as HTMLInputElement).value,
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
                    memberCount: (e.target as HTMLInputElement).value,
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
                    bowRatioDenominator: (e.target as HTMLInputElement).value,
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
