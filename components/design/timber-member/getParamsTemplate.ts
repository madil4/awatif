import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { State } from "vanjs-core";
import { TimberMemberParams } from "./timberMember";
import { TIMBER_CLASSES } from "./timberClasses";
import type { ActiveAnalysis } from "../data-model";

const timberClassOptions = Object.keys(TIMBER_CLASSES);

const loadDurationOptions = [
  "permanent",
  "long-term",
  "medium-term",
  "short-term",
  "instantaneous",
];

export function getParamsTemplate({
  params,
  activeAnalysis,
}: {
  params: State<TimberMemberParams>;
  activeAnalysis: ActiveAnalysis;
}) {
  return html`
    <div>
      <label>Width (mm):</label>
      <input
        type="number"
        min="1"
        .value=${live(params.val.width)}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          params.val = { ...params.val, width: value };
        }}
      />
    </div>

    <div>
      <label>Depth (mm):</label>
      <input
        type="number"
        min="1"
        .value=${live(params.val.depth)}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          params.val = { ...params.val, depth: value };
        }}
      />
    </div>

    <div>
      <label>Timber Class:</label>
      <select
        .value=${live(params.val.timberClass)}
        @change=${(e: Event) =>
          (params.val = {
            ...params.val,
            timberClass: (e.target as HTMLSelectElement).value,
          })}
      >
        ${timberClassOptions.map(
          (g) =>
            html`<option value=${g} ?selected=${params.val.timberClass === g}>
              ${g}
            </option>`,
        )}
      </select>
    </div>

    <div>
      <label>Service Class:</label>
      <select
        .value=${live(String(params.val.serviceClass))}
        @change=${(e: Event) =>
          (params.val = {
            ...params.val,
            serviceClass: Number(
              (e.target as HTMLSelectElement).value,
            ) as TimberMemberParams["serviceClass"],
          })}
      >
        ${[1, 2, 3].map(
          (sc) =>
            html`<option
              value=${sc}
              ?selected=${params.val.serviceClass === sc}
            >
              ${sc}
            </option>`,
        )}
      </select>
    </div>

    <div>
      <label>Load Duration:</label>
      <select
        .value=${live(params.val.loadDurationClass)}
        @change=${(e: Event) =>
          (params.val = {
            ...params.val,
            loadDurationClass: (e.target as HTMLSelectElement).value,
          })}
      >
        ${loadDurationOptions.map(
          (ld) =>
            html`<option
              value=${ld}
              ?selected=${params.val.loadDurationClass === ld}
            >
              ${ld}
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
