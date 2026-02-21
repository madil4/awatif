import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Grid } from "../viewer/grid/getGrid";
import { PointResultsDisplay } from "../viewer/pointResult/getPointResults";
import { LineResultsDisplay } from "../viewer/lineResult/getLineResults";

import "./styles.css";

export type Display = {
  grid?: Grid;
  geometry: State<boolean>;
  mesh: State<boolean>;
  deformedShape: State<boolean>;
  loads: State<boolean>;
  supports: State<boolean>;
  design: State<boolean>;
  extrudeSections?: State<boolean>;
  pointResult?: State<PointResultsDisplay>;
  lineResult: State<LineResultsDisplay>;
};

export function getDisplay({ display }: { display?: Display }): HTMLElement {
  const container = document.createElement("div");

  const grid = display?.grid;

  const template = () => html`
    <details id="display">
      <summary>Display</summary>
      ${grid
        ? html` <div class="display-item">
            <label>Grid Size & Spacing</label>
            <input
              type="number"
              min="1"
              max="50"
              value=${grid.size.val}
              @input=${(e: Event) =>
                (grid.size.val = Number((e.target as HTMLInputElement).value))}
            />
            <select
              @change=${(e: Event) =>
                (grid.spacing.val = Number(
                  (e.target as HTMLSelectElement).value,
                ))}
            >
              <option value="1" ?selected=${grid.spacing.val === 1}>1</option>
              <option value="0.5" ?selected=${grid.spacing.val === 0.5}>
                0.5
              </option>
              <option value="0.2" ?selected=${grid.spacing.val === 0.2}>
                0.2
              </option>
              <option value="0.1" ?selected=${grid.spacing.val === 0.1}>
                0.1
              </option>
            </select>
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
      ${display?.deformedShape
        ? html` <div class="display-item">
            <label>Deformed Shape</label>
            <input
              type="checkbox"
              .checked=${display.deformedShape.val}
              @change=${(e: Event) =>
                (display.deformedShape.val = (
                  e.target as HTMLInputElement
                ).checked)}
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
      ${display?.design
        ? html` <div class="display-item">
            <label>Design</label>
            <input
              type="checkbox"
              .checked=${display.design.val}
              @change=${(e: Event) =>
                (display.design.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
      ${display?.extrudeSections
        ? html` <div class="display-item">
            <label>Extrude Sections</label>
            <input
              type="checkbox"
              .checked=${display.extrudeSections.val}
              @change=${(e: Event) =>
                (display.extrudeSections!.val = (
                  e.target as HTMLInputElement
                ).checked)}
            />
          </div>`
        : ""}
      ${display?.pointResult
        ? html`
            <div class="display-item">
              <label>Point Results</label>
              <select
                @change=${(e: Event) =>
                  (display.pointResult!.val = (e.target as HTMLSelectElement)
                    .value as PointResultsDisplay)}
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
      ${display?.lineResult
        ? html`
            <div class="display-item">
              <label>Line Results</label>
              <select
                @change=${(e: Event) =>
                  (display.lineResult!.val = (e.target as HTMLSelectElement)
                    .value as LineResultsDisplay)}
              >
                <option
                  value="None"
                  ?selected=${display.lineResult.val === "None"}
                >
                  None
                </option>
                <option
                  value="Normals"
                  ?selected=${display.lineResult.val === "Normals"}
                >
                  Normals
                </option>
                <option
                  value="Shears"
                  ?selected=${display.lineResult.val === "Shears"}
                >
                  Shears
                </option>
                <option
                  value="Bendings"
                  ?selected=${display.lineResult.val === "Bendings"}
                >
                  Bendings
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
