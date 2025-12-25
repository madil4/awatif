import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { lineMesh } from "@awatif/components";

import "./styles.css";

export function getComponents(): HTMLElement {
  const container = document.createElement("div");

  const templateComponents = [lineMesh];

  const components = van.state([
    { name: "Component 1" },
    { name: "Component 2" },
    { name: "Component 3" },
  ]);

  const template = () => html`
    <details id="components" open>
      <summary>Components</summary>
      ${components.val.map(
        (component, index) => html`
          <div class="components-item">
            <label>${component.name}</label>
            <button
              class="components-delete-btn"
              @click=${() => deleteComponent(components, index)}
              title="Delete component"
            >
              ×
            </button>
          </div>
        `
      )}
      ${html`
        <details class="components-templates" open>
          <summary class="components-divider">templates</summary>
          ${templateComponents.map(
            (component) => html`
              <div class="components-item template">
                <label>${component.name}</label>
                <button
                  class="components-copy-btn"
                  @click=${() => copyTemplate(components, component.name)}
                  title="Copy template"
                >
                  +
                </button>
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

// Utils
function deleteComponent(components: State<{ name: string }[]>, index: number) {
  components.val = components.val.filter((_, i) => i !== index);
}

function copyTemplate(components: State<{ name: string }[]>, baseName: string) {
  const existingNames = components.val.map((c) => c.name);

  let newName = baseName;

  if (existingNames.includes(baseName)) {
    newName = `${baseName} copy`;
    let counter = 2;

    while (existingNames.includes(newName)) {
      newName = `${baseName} copy ${counter}`;
      counter++;
    }
  }

  components.val = [...components.val, { name: newName }];
}
