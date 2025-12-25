import van from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getComponents(): HTMLElement {
  const container = document.createElement("div");

  const componentsList = [
    { name: "component 1", isTemplate: false },
    { name: "component 2", isTemplate: false },
    { name: "component 3", isTemplate: true },
  ];

  const normalComponents = componentsList.filter((c) => !c.isTemplate);
  const templateComponents = componentsList.filter((c) => c.isTemplate);

  const template = () => html`
    <details id="components">
      <summary>Components</summary>
      ${normalComponents.map(
        (component) => html`
          <div class="components-item">
            <label>${component.name}</label>
          </div>
        `
      )}
      ${templateComponents.length > 0
        ? html`
            <div class="components-divider">templates</div>
            ${templateComponents.map(
              (component) => html`
                <div class="components-item">
                  <label>${component.name}</label>
                </div>
              `
            )}
          `
        : ""}
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
