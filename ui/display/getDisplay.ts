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
  deformationScale: State<number>;
  view3D: State<boolean>;
  geometry: State<boolean>;
  mesh: State<boolean>;
  deformedShape: State<boolean>;
  loads: State<boolean>;
  supports: State<boolean>;
  releases: State<boolean>;
  memberIndex: State<boolean>;
  orientation: State<boolean>;
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
        <label>Deformation Scale</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          .value=${display.deformationScale.val}
          @input=${(e: Event) =>
            (display.deformationScale.val = Number(
              (e.target as HTMLInputElement).value,
            ))}
        />
        <span class="value-display">${display.deformationScale.val}</span>
      </div>
      <div class="display-item">
        <label>3D</label>
        <div class="display-toggle-group">
          <div class="display-toggle-option">
            <span class="display-toggle-label">On</span>
            <input
              type="checkbox"
              .checked=${display.view3D.val}
              @change=${(e: Event) =>
                (display.view3D.val = (
                  e.target as HTMLInputElement
                ).checked)}
            />
          </div>
          <div class="display-toggle-option display-toggle-option-separated">
            <span class="display-toggle-label">Extrude</span>
            <input
              type="checkbox"
              .checked=${display.extrudeSections.val}
              @change=${(e: Event) => {
                const checked = (e.target as HTMLInputElement).checked;
                display.extrudeSections.val = checked;
                display.view3D.val = checked;
              }}
            />
          </div>
        </div>
      </div>
      <div class="display-item">
        <label>Geometry</label>
        <div class="display-toggle-group">
          <div class="display-toggle-option">
            <span class="display-toggle-label">On</span>
            <input
              type="checkbox"
              .checked=${display.geometry.val}
              @change=${(e: Event) =>
                (display.geometry.val = (
                  e.target as HTMLInputElement
                ).checked)}
            />
          </div>
          <div class="display-toggle-option display-toggle-option-separated">
            <span class="display-toggle-label">Index</span>
            <input
              type="checkbox"
              .checked=${display.memberIndex.val}
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
        <div class="display-toggle-group">
          <div class="display-toggle-option">
            <span class="display-toggle-label">On</span>
            <input
              type="checkbox"
              .checked=${display.mesh.val}
              @change=${(e: Event) =>
                (display.mesh.val = (e.target as HTMLInputElement).checked)}
            />
          </div>
          <div class="display-toggle-option display-toggle-option-separated">
            <span class="display-toggle-label">Deformed</span>
            <input
              type="checkbox"
              .checked=${display.deformedShape.val}
              @change=${(e: Event) => {
                const checked = (e.target as HTMLInputElement).checked;
                display.deformedShape.val = checked;
                if (checked) display.mesh.val = true;
              }}
            />
          </div>
        </div>
      </div>
      <div class="display-item">
        <label>Orientation</label>
        <input
          type="checkbox"
          .checked=${display.orientation.val}
          @change=${(e: Event) =>
            (display.orientation.val = (
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
            value="Axial"
            ?selected=${display.lineResult.val === "Axial"}
          >
            Axial (N)
          </option>
          <option
            value="ShearY"
            ?selected=${display.lineResult.val === "ShearY"}
          >
            Shear Y (Vy)
          </option>
          <option
            value="ShearZ"
            ?selected=${display.lineResult.val === "ShearZ"}
          >
            Shear Z (Vz)
          </option>
          <option
            value="BendingZ"
            ?selected=${display.lineResult.val === "BendingZ"}
          >
            Bending Z (Mz)
          </option>
          <option
            value="BendingY"
            ?selected=${display.lineResult.val === "BendingY"}
          >
            Bending Y (My)
          </option>
          <option
            value="Torsion"
            ?selected=${display.lineResult.val === "Torsion"}
          >
            Torsion (Mx)
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
