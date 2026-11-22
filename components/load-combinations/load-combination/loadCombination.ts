import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { LoadCombinationTemplate, LoadCombinationEntry } from "../data-model";
import { ComponentsType } from "../../data-model";

const REMOVE_BUTTON_STYLE = `
  padding: 0 6px;
  cursor: pointer;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
`;

const ADD_CASE_VALUE = "";

export const loadCombination: LoadCombinationTemplate = {
  name: "Load Combination",
  defaultParams: {
    entries: [],
  },

  getParamsTemplate: ({ params, components }) => {
    const entries = params.val.entries ?? [];
    const loadCases = components?.get(ComponentsType.LOAD_CASES) ?? [];

    const setEntries = (next: LoadCombinationEntry[]) => {
      params.val = { ...params.val, entries: next };
    };

    const nameOf = (loadCaseId: string) =>
      loadCases.find((c) => c.id === loadCaseId)?.name ?? "Unknown case";

    const usedIds = new Set(entries.map((e) => e.loadCaseId));
    const availableCases = loadCases.filter(
      (c) => c.id !== undefined && !usedIds.has(c.id),
    );

    return html`
      ${loadCases.length === 0
        ? html`<div><label>Create load cases first.</label></div>`
        : null}
      ${entries.map(
        (entry, index) => html`
          <div>
            <label>${nameOf(entry.loadCaseId)}:</label>
            <input
              type="number"
              step="0.05"
              .value=${live(entry.factor)}
              @input=${(e: Event) => {
                const factor = (e.target as HTMLInputElement).valueAsNumber;
                if (isNaN(factor)) return;
                setEntries(
                  entries.map((c, i) => (i === index ? { ...c, factor } : c)),
                );
              }}
            />
            <button
              style=${REMOVE_BUTTON_STYLE}
              title="Remove load case from combination"
              @click=${() => setEntries(entries.filter((_, i) => i !== index))}
            >
              ×
            </button>
          </div>
        `,
      )}
      ${availableCases.length > 0
        ? html`
            <div>
              <label>Add case:</label>
              <select
                .value=${live(ADD_CASE_VALUE)}
                @change=${(e: Event) => {
                  const select = e.target as HTMLSelectElement;
                  const loadCaseId = select.value;
                  select.value = ADD_CASE_VALUE;
                  if (!loadCaseId) return;
                  setEntries([...entries, { loadCaseId, factor: 1 }]);
                }}
              >
                <option value=${ADD_CASE_VALUE}>+ Add case…</option>
                ${availableCases.map(
                  (c) => html`<option value=${c.id}>${c.name}</option>`,
                )}
              </select>
            </div>
          `
        : null}
    `;
  },
};
