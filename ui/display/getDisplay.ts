import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Grid } from "../viewer/grid/getGrid";
import { PointResultsDisplay } from "../viewer/pointResult/getPointResults";
import { LineResultsDisplay } from "../viewer/lineResult/getLineResults";
import { LoadSelection, LOAD_SELECTION_LABELS } from "@awatif/components";

import "./styles.css";

export type Display = {
  grid: Grid;
  displayScale: State<number>;
  geometry: State<boolean>;
  mesh: State<boolean>;
  deformedShape: State<boolean>;
  loads: State<boolean>;
  supports: State<boolean>;
  releases: State<boolean>;
  memberIndex: State<boolean>;
  extrudeSections: State<boolean>;
  pointResult: State<PointResultsDisplay>;
  lineResult: State<LineResultsDisplay>;
  loadCase: State<LoadSelection>;
};

export function getDisplay({ display }: { display: Display }): HTMLElement {
  const container = document.createElement("div");

  const grid = display.grid;

  const template = () => html`
    <details id="display">
      <summary>Display</summary>
      <div class="display-item">
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
            (grid.spacing.val = Number((e.target as HTMLSelectElement).value))}
        >
          <option value="1" ?selected=${grid.spacing.val === 1}>1</option>
          <option value="0.5" ?selected=${grid.spacing.val === 0.5}>0.5</option>
          <option value="0.2" ?selected=${grid.spacing.val === 0.2}>0.2</option>
          <option value="0.1" ?selected=${grid.spacing.val === 0.1}>0.1</option>
        </select>
      </div>
      <div class="display-item">
        <label>Display Scale</label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          .value=${display.displayScale.val}
          @input=${(e: Event) =>
            (display.displayScale.val = Number(
              (e.target as HTMLInputElement).value,
            ))}
        />
        <span class="value-display">${display.displayScale.val}</span>
      </div>
      <div class="display-item">
        <label>Geometry</label>
        <div style="display: flex; gap: 8px; align-items: center;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span
              style="font-size: 0.7rem; color: var(--text-secondary); letter-spacing: 0.05em;"
              >Line</span
            >
            <input
              type="checkbox"
              .checked=${display.geometry.val}
              ?disabled=${display.extrudeSections.val}
              @change=${(e: Event) =>
                (display.geometry.val = (
                  e.target as HTMLInputElement
                ).checked)}
            />
          </div>
          <div
            style="display: flex; align-items: center; gap: 4px; border-left: 1px solid var(--border); padding-left: 8px;"
          >
            <span
              style="font-size: 0.7rem; color: var(--text-secondary); letter-spacing: 0.05em;"
              >Index</span
            >
            <input
              type="checkbox"
              .checked=${display.memberIndex.val}
              ?disabled=${display.extrudeSections.val}
              @change=${(e: Event) =>
                (display.memberIndex.val = (
                  e.target as HTMLInputElement
                ).checked)}
            />
          </div>
        </div>
      </div>
      <div class="display-item">
        <label>Mesh</label>
        <input
          type="checkbox"
          .checked=${display.mesh.val}
          @change=${(e: Event) =>
            (display.mesh.val = (e.target as HTMLInputElement).checked)}
        />
      </div>
      <div class="display-item">
        <label>Deformed Shape</label>
        <input
          type="checkbox"
          .checked=${display.deformedShape.val}
          @change=${(e: Event) =>
            (display.deformedShape.val = (
              e.target as HTMLInputElement
            ).checked)}
        />
      </div>
      <div class="display-item">
        <label>Loads</label>
        <input
          type="checkbox"
          .checked=${display.loads.val}
          @change=${(e: Event) =>
            (display.loads.val = (e.target as HTMLInputElement).checked)}
        />
      </div>
      <div class="display-item">
        <label>Supports</label>
        <input
          type="checkbox"
          .checked=${display.supports.val}
          @change=${(e: Event) =>
            (display.supports.val = (e.target as HTMLInputElement).checked)}
        />
      </div>
      <div class="display-item">
        <label>Releases</label>
        <input
          type="checkbox"
          .checked=${display.releases.val}
          @change=${(e: Event) =>
            (display.releases.val = (e.target as HTMLInputElement).checked)}
        />
      </div>
      <div class="display-item">
        <label>Extrude Sections</label>
        <input
          type="checkbox"
          .checked=${display.extrudeSections.val}
          @change=${(e: Event) =>
            (display.extrudeSections.val = (
              e.target as HTMLInputElement
            ).checked)}
        />
      </div>
      <!-- Point Results is hidden until reactions are unblocked.
      <div class="display-item">
        <label>Point Results</label>
        <select
          @change=${(e: Event) =>
            (display.pointResult.val = (e.target as HTMLSelectElement)
              .value as PointResultsDisplay)}
        >
          <option value="None" ?selected=${display.pointResult.val === "None"}>
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
      -->
      <div class="display-item">
        <label>Line Results</label>
        <select
          @change=${(e: Event) =>
            (display.lineResult.val = (e.target as HTMLSelectElement)
              .value as LineResultsDisplay)}
        >
          <option value="None" ?selected=${display.lineResult.val === "None"}>
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
      <div class="display-item">
        <label>Load Case</label>
        <select
          @change=${(e: Event) =>
            (display.loadCase.val = (e.target as HTMLSelectElement)
              .value as LoadSelection)}
        >
          ${Object.entries(LOAD_SELECTION_LABELS).map(
            ([value, label]) => html`
              <option
                value=${value}
                ?selected=${display.loadCase.val === value}
              >
                ${label}
              </option>
            `,
          )}
        </select>
      </div>
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
