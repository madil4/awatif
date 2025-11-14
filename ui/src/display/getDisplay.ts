import { html, render } from "lit-html";
import { Grid } from "../viewer/grid/getGrid";

import "./styles.css";

export function getDisplay({ grid }: { grid: Grid }): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <details id="display" open>
      <summary>Display</summary>
      <div class="display-item">
        <label>Grid size & division</label>
        <input
          type="number"
          value=${grid.size.val}
          @input=${(e: Event) =>
            (grid.size.val = Number((e.target as HTMLInputElement).value))}
        />
        <input
          type="number"
          value=${grid.division.val}
          @input=${(e: Event) =>
            (grid.division.val = Number((e.target as HTMLInputElement).value))}
        />
      </div>
    </details>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
