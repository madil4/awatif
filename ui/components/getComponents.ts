import van from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getComponents(): HTMLElement {
  const container = document.createElement("div");

  const componentsList = ["component 1", "component 2", "component 3"];

  const template = () => html`
    <details id="components">
      <summary>Components</summary>
      ${componentsList.map(
        (component) => html`
          <div class="components-item">
            <label>${component}</label>
          </div>
        `
      )}
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
