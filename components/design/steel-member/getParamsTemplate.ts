import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { State } from "vanjs-core";
import { SteelMemberParams } from "./steelMember";
import { STEEL_PROFILES, STEEL_GRADES } from "./steelProfiles";
import type { ActiveAnalysis } from "../data-model";

const profileOptions = Object.keys(STEEL_PROFILES);
const gradeOptions = Object.keys(STEEL_GRADES);

export function getParamsTemplate({
  params,
  activeAnalysis,
}: {
  params: State<SteelMemberParams>;
  activeAnalysis: ActiveAnalysis;
}) {
  return html`
    <div>
      <label>Profile:</label>
      <select
        .value=${live(params.val.profile)}
        @change=${(e: Event) =>
          (params.val = {
            ...params.val,
            profile: (e.target as HTMLSelectElement).value,
          })}
      >
        ${profileOptions.map(
          (p) =>
            html`<option value=${p} ?selected=${params.val.profile === p}>
              ${p}
            </option>`,
        )}
      </select>
    </div>

    <div>
      <label>Steel Grade:</label>
      <select
        .value=${live(params.val.steelGrade)}
        @change=${(e: Event) =>
          (params.val = {
            ...params.val,
            steelGrade: (e.target as HTMLSelectElement).value,
          })}
      >
        ${gradeOptions.map(
          (g) =>
            html`<option value=${g} ?selected=${params.val.steelGrade === g}>
              ${g}
            </option>`,
        )}
      </select>
    </div>

    ${activeAnalysis == "linear"
      ? html`
          <div>
            <label>Length Factor (l₀/l):</label>
            <input
              type="number"
              step="0.05"
              min="0.05"
              .value=${live(params.val.lengthFactor ?? 1)}
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).valueAsNumber;
                if (isNaN(value)) return;
                params.val = { ...params.val, lengthFactor: value };
              }}
            />
          </div>
        `
      : null}
  `;
}
