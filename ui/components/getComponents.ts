import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Geometry, MeshComponents, templates } from "@awatif/components";
import { ToolbarMode } from "../toolbar/getToolbar";

import "./styles.css";

export function getComponents({
  toolbarMode,
  geometry,
  meshComponents,
}: {
  toolbarMode: State<ToolbarMode>;
  geometry: Geometry;
  meshComponents: MeshComponents;
}): HTMLElement {
  const container = document.createElement("div");

  meshComponents.val = [
    { name: "Top Chords", templateIdx: 0, geometry: [4, 5] },
    { name: "Bottom Chords", templateIdx: 0, geometry: [1, 2, 3] },
    { name: "Webs", templateIdx: 0, geometry: [6, 7, 8, 9, 10, 11] },
  ];

  const activeIndex = van.state<number | null>(null);
  const editingIndex = van.state<number | null>(null);

  // Flag to prevent infinite sync loops
  let isSyncing = false;

  // Sync 1: When activeIndex changes, update geometry.selection to show component's geometry
  van.derive(() => {
    const idx = activeIndex.val;
    if (idx === null) {
      // No active component - clear selection
      if (!isSyncing && geometry.selection.val !== null) {
        isSyncing = true;
        geometry.selection.val = null;
        isSyncing = false;
      }
      return;
    }

    const component = meshComponents.val[idx];
    if (!component) return;

    const componentLines = component.geometry ?? [];

    // Update selection to reflect the active component's geometry
    isSyncing = true;
    geometry.selection.val = { points: [], lines: componentLines };
    isSyncing = false;
  });

  // Sync 2: When geometry.selection.lines changes, update active component's geometry
  van.derive(() => {
    const selection = geometry.selection.val;
    const idx = activeIndex.val;

    // Skip if syncing or no active component
    if (isSyncing || idx === null) return;

    const selectedLines = selection?.lines ?? [];

    // Update the active component's geometry with the new selection
    const currentComponent = meshComponents.val[idx];
    if (!currentComponent) return;

    // Only update if the geometry actually changed
    const currentGeometry = currentComponent.geometry ?? [];
    const isSame =
      currentGeometry.length === selectedLines.length &&
      currentGeometry.every((line, i) => line === selectedLines[i]);

    if (!isSame) {
      meshComponents.val = meshComponents.val.map((comp, i) =>
        i === idx ? { ...comp, geometry: [...selectedLines] } : comp
      );
    }
  });

  const template = () => html`
    <details id="components" ?open=${toolbarMode.val === ToolbarMode.MESH}>
      <summary>Components</summary>
      ${meshComponents.val.map(
        (component, index) => html`
          <div
            class="components-item ${activeIndex.val === index ? "active" : ""}"
            @click=${() => (activeIndex.val = index)}
          >
            ${editingIndex.val === index
              ? html`
                  <input
                    class="components-rename-input"
                    type="text"
                    .value=${component.name}
                    @blur=${(e: Event) =>
                      renameComponent(
                        meshComponents,
                        editingIndex,
                        index,
                        (e.target as HTMLInputElement).value
                      )}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === "Enter") {
                        renameComponent(
                          meshComponents,
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
              @click=${() =>
                deleteComponent(meshComponents, activeIndex, index)}
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
                    copyTemplate(meshComponents, component.name, templateIndex)}
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

function deleteComponent(
  components: State<{ name: string }[]>,
  activeIndex: State<number | null>,
  index: number
) {
  // Clear active state if we're deleting the active component
  if (activeIndex.val === index) {
    activeIndex.val = null;
  }
  // Adjust active index if the deleted component is before the active one
  else if (activeIndex.val !== null && activeIndex.val > index) {
    activeIndex.val = activeIndex.val - 1;
  }

  components.val = components.val.filter((_, i) => i !== index);
}
