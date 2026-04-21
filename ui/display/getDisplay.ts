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
  view2D: State<boolean>;
  geometry: State<boolean>;
  mesh: State<boolean>;
  deformedShape: State<boolean>;
  loads: State<boolean>;
  supports: State<boolean>;
  releases: State<boolean>;
  lineIndex: State<boolean>;
  pointIndex: State<boolean>;
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
          <option value="10" ?selected=${grid.spacing.val === 10}>10</option>
          <option value="5" ?selected=${grid.spacing.val === 5}>5</option>
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
          max="10"
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
        <div class="display-pair">
          <label>2D View</label>
          <input
            type="checkbox"
            .checked=${display.view2D.val}
            @change=${(e: Event) =>
              (display.view2D.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
        <div class="display-pair-separator"></div>
        <div class="display-pair">
          <label>Extrude</label>
          <input
            type="checkbox"
            .checked=${display.extrudeSections.val}
            @change=${(e: Event) =>
              (display.extrudeSections.val = (
                e.target as HTMLInputElement
              ).checked)}
          />
        </div>
      </div>
      <div class="display-item">
        <div class="display-pair">
          <label>Geometry</label>
          <input
            type="checkbox"
            .checked=${display.geometry.val}
            @change=${(e: Event) =>
              (display.geometry.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
        <div class="display-pair-separator"></div>
        <div class="display-pair">
          <label>Mesh</label>
          <input
            type="checkbox"
            .checked=${display.mesh.val}
            @change=${(e: Event) =>
              (display.mesh.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
      </div>
      <div class="display-item">
        <div class="display-pair">
          <label>Line Index</label>
          <input
            type="checkbox"
            .checked=${display.lineIndex.val}
            @change=${(e: Event) =>
              (display.lineIndex.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
        <div class="display-pair-separator"></div>
        <div class="display-pair">
          <label>Point Index</label>
          <input
            type="checkbox"
            .checked=${display.pointIndex.val}
            @change=${(e: Event) =>
              (display.pointIndex.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
      </div>
      <div class="display-item">
        <div class="display-pair">
          <label>Loads</label>
          <input
            type="checkbox"
            .checked=${display.loads.val}
            @change=${(e: Event) =>
              (display.loads.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
        <div class="display-pair-separator"></div>
        <div class="display-pair">
          <label>Supports</label>
          <input
            type="checkbox"
            .checked=${display.supports.val}
            @change=${(e: Event) =>
              (display.supports.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
      </div>
      <div class="display-item">
        <div class="display-pair">
          <label>Releases</label>
          <input
            type="checkbox"
            .checked=${display.releases.val}
            @change=${(e: Event) =>
              (display.releases.val = (e.target as HTMLInputElement).checked)}
          />
        </div>
        <div class="display-pair-separator"></div>
        <div class="display-pair">
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
