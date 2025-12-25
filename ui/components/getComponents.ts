import van from "vanjs-core";
import { html, render } from "lit-html";
import { lineMesh } from "@awatif/components";

import "./styles.css";

export function getComponents(): HTMLElement {
  const container = document.createElement("div");

  const templateComponents = [lineMesh];

  const components = [
    { name: "Component 1" },
    { name: "Component 2" },
    { name: "Component 3" },
  ];

  const template = () => html`
    <details id="components">
      <summary>Components</summary>
      ${components.map(
        (component) => html`
          <div class="components-item">
            <label>${component.name}</label>
          </div>
        `
      )}
      ${html`
        <details class="components-templates" open>
          <summary class="components-divider">templates</summary>
          ${templateComponents.map(
            (component) => html`
              <div class="components-item">
                <label>${component.name}</label>
              </div>
            `
          )}
        </details>
      `}
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
