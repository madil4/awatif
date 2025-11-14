import { html, render } from "lit-html";

import "./styles.css";

export function getDisplay(): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <details id="display" open>
      <summary>Display</summary>
      <div class="display-item">
        <label>Grid size & division</label>
        <input type="number" />
        <input type="number" />
      </div>
    </details>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
