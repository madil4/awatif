import van from "vanjs-core";
import { html, render } from "lit-html";
import { Grid } from "../viewer/grid/getGrid";
import { Geometry } from "../viewer/geometry/getGeometry";
import { Mesh } from "../viewer/mesh/getMesh";

import "./styles.css";

export function getDisplay({
  grid,
  geometry,
  mesh,
}: {
  grid?: Grid;
  geometry?: Geometry;
  mesh?: Mesh;
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
      ${geometry
        ? html` <div class="display-item">
            <label>Geometry</label>
            <input
              type="checkbox"
              .checked=${geometry.visible.val}
              @change=${(e: Event) =>
                (geometry.visible.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
      ${mesh
        ? html` <div class="display-item">
            <label>Mesh</label>
            <input
              type="checkbox"
              .checked=${mesh.visible.val}
              @change=${(e: Event) =>
                (mesh.visible.val = (e.target as HTMLInputElement).checked)}
            />
          </div>`
        : ""}
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
