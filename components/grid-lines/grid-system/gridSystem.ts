import { html } from "lit-html";
import { live } from "lit-html/directives/live.js";
import { GridLine, GridSystemParams, GridSystemTemplate } from "../data-model";

type Axis = keyof GridSystemParams;

const AXES: { axis: Axis; title: string }[] = [
  { axis: "x", title: "X Grid Data" },
  { axis: "y", title: "Y Grid Data" },
  { axis: "z", title: "Z Grid Data" },
];

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

const CELL_INPUT_STYLE = "width: 100%; min-width: 0; box-sizing: border-box;";

const line = (id: string, ordinate: number, bubble: GridLine["bubble"]) => ({
  id,
  ordinate,
  visible: true,
  bubble,
});

// A, B, ... Z, AA, AB, ...
function letters(index: number): string {
  let name = "";
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26))
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
  return name;
}

// Same defaults as SAP2000: X labels at the end, Y at the start
const LABELS: Record<Axis, (i: number) => string> = {
  x: letters,
  y: (i) => `${i + 1}`,
  z: (i) => `Z${i + 1}`,
};
const BUBBLE: Record<Axis, GridLine["bubble"]> = {
  x: "end",
  y: "start",
  z: "end",
};

function generate(axis: Axis, count: number, spacing: number): GridLine[] {
  return Array.from({ length: count }, (_, i) =>
    line(LABELS[axis](i), i * spacing, BUBBLE[axis]),
  );
}

const byOrdinate = (a: GridLine, b: GridLine) => a.ordinate - b.ordinate;

export const gridSystem: GridSystemTemplate = {
  name: "Grid System",
  defaultParams: {
    x: generate("x", 3, 5),
    y: generate("y", 3, 5),
    z: [line("Z1", 0, "end")],
  },

  getParamsTemplate: ({ params }) => {
    const set = (next: Partial<GridSystemParams>) => {
      params.val = { ...params.val, ...next };
    };

    const setLines = (axis: Axis, lines: GridLine[]) =>
      set({ [axis]: lines });

    const update = (axis: Axis, index: number, patch: Partial<GridLine>) =>
      setLines(
        axis,
        params.val[axis].map((l, i) => (i === index ? { ...l, ...patch } : l)),
      );

    const add = (axis: Axis) => {
      const lines = params.val[axis];
      const last = lines[lines.length - 1];
      const prev = lines[lines.length - 2];
      const step = last && prev ? last.ordinate - prev.ordinate || 1 : 1;

      setLines(axis, [
        ...lines,
        line(LABELS[axis](lines.length), last ? last.ordinate + step : 0, BUBBLE[axis]),
      ]);
    };

    // Reorder Ordinates, as in SAP2000. Done on commit, not per keystroke, so
    // a row cannot jump away while it is being typed into
    const reorder = (axis: Axis) =>
      setLines(axis, [...params.val[axis]].sort(byOrdinate));

    const quickStart = (e: Event) => {
      const root = (e.target as HTMLElement).closest("details")!;
      const read = (name: string) =>
        (root.querySelector(`[name="${name}"]`) as HTMLInputElement)
          .valueAsNumber;

      const next: Partial<GridSystemParams> = {};
      for (const { axis } of AXES) {
        const count = Math.round(read(`${axis}-count`));
        const spacing = read(`${axis}-spacing`);
        if (!(count >= 0) || !Number.isFinite(spacing)) return;
        next[axis] = generate(axis, count, spacing);
      }
      set(next);
    };

    const row = (axis: Axis, l: GridLine, index: number) => html`
      <tr>
        <td>
          <input
            type="text"
            style=${CELL_INPUT_STYLE}
            .value=${live(l.id)}
            @input=${(e: Event) =>
              update(axis, index, { id: (e.target as HTMLInputElement).value })}
          />
        </td>
        <td>
          <input
            type="number"
            step="0.1"
            style=${CELL_INPUT_STYLE}
            .value=${live(l.ordinate)}
            @input=${(e: Event) => {
              const ordinate = (e.target as HTMLInputElement).valueAsNumber;
              if (isNaN(ordinate)) return;
              update(axis, index, { ordinate });
            }}
            @change=${() => reorder(axis)}
          />
        </td>
        <td>
          <input
            type="checkbox"
            .checked=${l.visible}
            @change=${(e: Event) =>
              update(axis, index, {
                visible: (e.target as HTMLInputElement).checked,
              })}
          />
        </td>
        <td>
          <select
            .value=${live(l.bubble)}
            @change=${(e: Event) =>
              update(axis, index, {
                bubble: (e.target as HTMLSelectElement)
                  .value as GridLine["bubble"],
              })}
          >
            <option value="start">Start</option>
            <option value="end">End</option>
          </select>
        </td>
        <td>
          <button
            style=${REMOVE_BUTTON_STYLE}
            title="Delete grid line"
            @click=${() =>
              setLines(
                axis,
                params.val[axis].filter((_, i) => i !== index),
              )}
          >
            ×
          </button>
        </td>
      </tr>
    `;

    const section = ({ axis, title }: { axis: Axis; title: string }) => html`
      <div><label>${title}</label></div>
      <table style="width: 100%; table-layout: fixed;">
        <thead style="font-size: 0.75rem; font-weight: 500; text-align: left;">
          <tr>
            <th style="width: 20%">ID</th>
            <th style="width: 27%">Ord.</th>
            <th style="width: 15%">Vis.</th>
            <th style="width: 28%">Bubble</th>
            <th style="width: 10%"></th>
          </tr>
        </thead>
        <tbody>
          ${params.val[axis].map((l, i) => row(axis, l, i))}
        </tbody>
      </table>
      <div>
        <button @click=${() => add(axis)}>+ Add</button>
      </div>
    `;

    return html`
      ${AXES.map(section)}
      <details>
        <summary>Quick Start</summary>
        ${AXES.map(
          ({ axis }) => html`
            <div>
              <label>${axis.toUpperCase()}:</label>
              <input
                type="number"
                name="${axis}-count"
                min="0"
                step="1"
                .value=${String(params.val[axis].length)}
                title="Number of lines"
              />
              <input
                type="number"
                name="${axis}-spacing"
                step="0.1"
                .value=${String(
                  params.val[axis].length > 1
                    ? params.val[axis][1].ordinate -
                        params.val[axis][0].ordinate
                    : 5,
                )}
                title="Spacing"
              />
            </div>
          `,
        )}
        <div>
          <button @click=${quickStart}>Generate</button>
        </div>
      </details>
    `;
  },
};
