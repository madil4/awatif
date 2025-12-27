import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { lineMesh, MeshComponents } from "@awatif/components";
import { ToolbarMode } from "../toolbar/getToolbar";

import "./styles.css";

export function getComponents({
  meshComponents,
  toolbarMode,
}: {
  meshComponents: MeshComponents;
  toolbarMode: State<ToolbarMode>;
}): HTMLElement {
  const container = document.createElement("div");

  const templates = [lineMesh];
  const components = van.state([
    { name: "Line Mesh", templateIndex: 0, geometry: [1, 2, 3] },
    { name: "Line Mesh 2", templateIndex: 0, geometry: [3, 4, 5] },
    { name: "Line Mesh 3", templateIndex: 0, geometry: [6, 7, 8] },
  ]);

  // meshComponents
  van.derive(() => {
    const newMeshComponents = new Map();

    components.val?.forEach((comp) => {
      comp.geometry?.forEach((index) =>
        newMeshComponents.set(index, templates[comp.templateIndex])
      );
    });

    meshComponents.val = newMeshComponents;
  });

  // Template
  const editingIndex = van.state<number | null>(null);

  const template = () => html`
    <details id="components" ?open=${toolbarMode.val === ToolbarMode.MESH}>
      <summary>Components</summary>
      ${components.val.map(
        (component, index) => html`
          <div class="components-item">
            ${editingIndex.val === index
              ? html`
                  <input
                    class="components-rename-input"
                    type="text"
                    .value=${component.name}
                    @blur=${(e: Event) =>
                      renameComponent(
                        components,
                        editingIndex,
                        index,
                        (e.target as HTMLInputElement).value
                      )}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === "Enter") {
                        renameComponent(
                          components,
                          editingIndex,
                          index,
                          (e.target as HTMLInputElement).value
                        );
                      } else if (e.key === "Escape") {
                        editingIndex.val = null;
                      }
                    }}
                    @input=${(e: Event) => e.stopPropagation()}
                  />
                `
              : html`
                  <label @dblclick=${() => (editingIndex.val = index)}
                    >${component.name}</label
                  >
                `}
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
          ${templates.map(
            (component, templateIndex) => html`
              <div class="components-item template">
                <label>${component.name}</label>
                <button
                  class="components-copy-btn"
                  @click=${() =>
                    copyTemplate(components, component.name, templateIndex)}
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
function copyTemplate(
  components: State<{ name: string; templateIndex?: number }[]>,
  baseName: string,
  templateIndex: number
) {
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

  components.val = [...components.val, { name: newName, templateIndex }];
}

function renameComponent(
  components: State<{ name: string }[]>,
  editingIndex: State<number | null>,
  index: number,
  newName: string
) {
  const trimmedName = newName.trim();
  if (trimmedName && trimmedName !== components.val[index].name) {
    components.val = components.val.map((comp, i) =>
      i === index ? { ...comp, name: trimmedName } : comp
    );
  }

  requestAnimationFrame(() => {
    if (editingIndex.val === index) {
      editingIndex.val = null;
    }
  });
}

function deleteComponent(components: State<{ name: string }[]>, index: number) {
  components.val = components.val.filter((_, i) => i !== index);
}
