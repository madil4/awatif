import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Grid } from "../viewer/grid/getGrid";

import "./styles.css";

export type Display = {
  geometry: State<boolean>;
  mesh: State<boolean>;
  loads: State<boolean>;
  supports: State<boolean>;
  pointResult?: State<string>;
};

export function getDisplay({
  grid,
  display,
}: {
  grid?: Grid;
  display?: Display;
}): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <details id="display">
      <summary>Display</summary>
      ${grid
        ? html` <div class="display-item">
            <label>Grid Size & Divisions</label>
            <input
              type="number"
              min="1"
              max="1000"
              value=${grid.size.val}
              @input=${(e: Event) =>
                (grid.size.val = Number((e.target as HTMLInputElement).value))}
            />
            <input
              type="number"
              min="1"
              max="100"
              value=${grid.division.val}
              @input=${(e: Event) =>
                (grid.division.val = Number(
                  (e.target as HTMLInputElement).value
                ))}
            />
          </div>`
        : ""}
      ${display?.geometry
        ? html` <div class="display-item">
            <label>Geometry</label>
            <input
              type="checkbox"
              .checked=${display.geometry.val}
              @change=${(e: Event) =>
                (display.geometry.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
      ${display?.mesh
        ? html` <div class="display-item">
            <label>Mesh</label>
            <input
              type="checkbox"
              .checked=${display.mesh.val}
              @change=${(e: Event) =>
                (display.mesh.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
      ${display?.loads
        ? html` <div class="display-item">
            <label>Loads</label>
            <input
              type="checkbox"
              .checked=${display.loads.val}
              @change=${(e: Event) =>
                (display.loads.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
      ${display?.supports
        ? html` <div class="display-item">
            <label>Supports</label>
            <input
              type="checkbox"
              .checked=${display.supports.val}
              @change=${(e: Event) =>
                (display.supports.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
      ${display?.pointResult
        ? html`
            <div class="display-item">
              <label>Point Results</label>
              <select
                @change=${(e: Event) =>
                  (display.pointResult!.val = (
                    e.target as HTMLSelectElement
                  ).value)}
              >
                <option
                  value="None"
                  ?selected=${display.pointResult.val === "None"}
                >
                  None
                </option>
                <option
                  value="Displacements"
                  ?selected=${display.pointResult.val === "Displacements"}
                >
                  Displacements
                </option>
                <option
                  value="Reactions"
                  ?selected=${display.pointResult.val === "Reactions"}
                >
                  Reactions
                </option>
              </select>
            </div>
          `
        : ""}
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
