import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { State } from "vanjs-core";
import { ConcreteMemberParams } from "./concreteMember";
import type { ActiveAnalysis } from "../data-model";

export function getParamsTemplate({
  params,
  activeAnalysis,
}: {
  params: State<ConcreteMemberParams>;
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
      <label>Cover (mm):</label>
      <input
        type="number"
        min="1"
        .value=${live(params.val.cover)}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          params.val = { ...params.val, cover: value };
        }}
      />
    </div>

    <div>
      <label>Steel Area (mm²):</label>
      <input
        type="number"
        min="50"
        step="50"
        .value=${live(params.val.steelArea)}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          params.val = { ...params.val, steelArea: value };
        }}
      />
    </div>

    <div>
      <label>Stirrup Area (mm²/m):</label>
      <input
        type="number"
        min="0"
        step="50"
        .value=${live(params.val.stirrupArea)}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          params.val = { ...params.val, stirrupArea: value };
        }}
      />
    </div>

    <div>
      <label>φ<sub>ef</sub> (creep):</label>
      <input
        type="number"
        step="0.05"
        min="0"
        .value=${live(params.val.creepCoefficient)}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).valueAsNumber;
          if (isNaN(value)) return;
          params.val = { ...params.val, creepCoefficient: value };
        }}
      />
    </div>

    <div>
      <label>Concrete Grade:</label>
      <select
        .value=${live(params.val.concreteGrade)}
        @change=${(e: Event) =>
          (params.val = {
            ...params.val,
            concreteGrade: (e.target as HTMLSelectElement).value,
          })}
      >
        ${[
          "C12",
          "C16",
          "C20",
          "C25",
          "C30",
          "C35",
          "C40",
          "C45",
          "C50",
          "C55",
          "C60",
          "C70",
          "C80",
          "C90",
        ].map(
          (g) =>
            html`<option value=${g} ?selected=${params.val.concreteGrade === g}>
              ${g}
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
        ${["S220", "S400", "S500", "S600"].map(
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
            <label>Braced:</label>
            <input
              type="checkbox"
              .checked=${live(params.val.braced)}
              @change=${(e: Event) =>
                (params.val = {
                  ...params.val,
                  braced: (e.target as HTMLInputElement).checked,
                })}
            />
          </div>

          <div>
            <label>Length Factor (l₀/l):</label>
            <input
              type="number"
              step="0.05"
              min="0.05"
              .value=${live(params.val.lengthFactor)}
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
