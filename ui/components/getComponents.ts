import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Geometry, Components, templates } from "@awatif/components";
import { ToolbarMode } from "../toolbar/getToolbar";

import "./styles.css";

export function getComponents({
  toolbarMode,
  geometry,
  components,
  activeComponent,
}: {
  toolbarMode: State<ToolbarMode>;
  geometry: Geometry;
  components: Components;
  activeComponent: State<number | null>;
}): HTMLElement {
  const container = document.createElement("div");

  const editingIndex = van.state<number | null>(null);

  // Flag to prevent infinite sync loops
  let isSyncing = false;

  // Sync 1: When activeIndex changes, update geometry.selection to show component's geometry
  van.derive(() => {
    const idx = activeComponent.val;
    if (idx === null) {
      // No active component - clear selection
      if (!isSyncing && geometry.selection.val !== null) {
        isSyncing = true;
        geometry.selection.val = null;
        isSyncing = false;
      }
      return;
    }

    const currentComponents =
      components.val.get(ToolbarMode[toolbarMode.val]) ?? [];
    const component = currentComponents[idx];
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
    const idx = activeComponent.val;

    // Skip if syncing or no active component
    if (isSyncing || idx === null) return;

    const selectedLines = selection?.lines ?? [];

    const key = ToolbarMode[toolbarMode.val];
    const currentComponents = components.val.get(key) ?? [];
    const currentComponent = currentComponents[idx];
    if (!currentComponent) return;

    // Only update if the geometry actually changed
    const currentGeometry = currentComponent.geometry ?? [];
    const isSame =
      currentGeometry.length === selectedLines.length &&
      currentGeometry.every((line, i) => line === selectedLines[i]);

    if (!isSame) {
      const updatedComponents = currentComponents.map((comp, i) =>
        i === idx ? { ...comp, geometry: [...selectedLines] } : comp
      );
      components.val = new Map(components.val).set(key, updatedComponents);
    }
  });

  van.derive(() => {
    if (activeComponent.val === null) geometry.selection.val = null;
  });

  const template = () => {
    const currentComponents =
      components.val.get(ToolbarMode[toolbarMode.val]) ?? [];

    return html`
      <details
        id="components"
        ?open=${toolbarMode.val === ToolbarMode.MESH}
        @toggle=${(e: Event) => {
          const details = e.target as HTMLDetailsElement;
          if (!details.open) {
            activeComponent.val = null;
          }
        }}
      >
        <summary>Components</summary>
        ${currentComponents.map(
          (component, index) => html`
            <div
              class="components-item ${activeComponent.val === index
                ? "active"
                : ""}"
              @click=${() =>
                (activeComponent.val =
                  activeComponent.val === index ? null : index)}
            >
              ${editingIndex.val === index
                ? html`
                    <input
                      class="components-rename-input"
                      type="text"
                      .value=${component.name}
                      @blur=${(e: Event) =>
                        renameComponent(
                          components,
                          toolbarMode,
                          editingIndex,
                          index,
                          (e.target as HTMLInputElement).value
                        )}
                      @keydown=${(e: KeyboardEvent) => {
                        if (e.key === "Enter") {
                          renameComponent(
                            components,
                            toolbarMode,
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
                  deleteComponent(
                    components,
                    toolbarMode,
                    activeComponent,
                    index
                  )}
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
            ${templates.get(ToolbarMode[toolbarMode.val])?.map(
              (component, templateIndex) => html`
                <div class="components-item template">
                  <label>${component.name}</label>
                  <button
                    class="components-copy-btn"
                    @click=${() =>
                      copyTemplate(
                        components,
                        toolbarMode,
                        component.name,
                        templateIndex
                      )}
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
  };

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}

// Utils
function copyTemplate(
  components: Components,
  toolbarMode: State<ToolbarMode>,
  baseName: string,
  templateIndex: number
) {
  const key = ToolbarMode[toolbarMode.val];
  const currentComponents = components.val.get(key) ?? [];
  const existingNames = currentComponents.map((c) => c.name);

  let newName = baseName;

  if (existingNames.includes(baseName)) {
    newName = `${baseName} copy`;
    let counter = 2;

    while (existingNames.includes(newName)) {
      newName = `${baseName} copy ${counter}`;
      counter++;
    }
  }

  // Get default params from the template
  const template = templates.get(key)?.[templateIndex];
  const defaultParams = template ? { ...template.defaultParams } : {};

  const updatedComponents = [
    ...currentComponents,
    { name: newName, templateIndex, geometry: [], params: defaultParams },
  ];

  components.val = new Map(components.val).set(key, updatedComponents);
}

function renameComponent(
  components: Components,
  toolbarMode: State<ToolbarMode>,
  editingIndex: State<number | null>,
  index: number,
  newName: string
) {
  const key = ToolbarMode[toolbarMode.val];
  const currentComponents = components.val.get(key) ?? [];

  const trimmedName = newName.trim();
  if (trimmedName && trimmedName !== currentComponents[index].name) {
    const updatedComponents = currentComponents.map((comp, i) =>
      i === index ? { ...comp, name: trimmedName } : comp
    );
    components.val = new Map(components.val).set(key, updatedComponents);
  }

  requestAnimationFrame(() => {
    if (editingIndex.val === index) {
      editingIndex.val = null;
    }
  });
}

function deleteComponent(
  components: Components,
  toolbarMode: State<ToolbarMode>,
  activeComponent: State<number | null>,
  index: number
) {
  // Clear active state if we're deleting the active component
  if (activeComponent.val === index) {
    activeComponent.val = null;
  }
  // Adjust active index if the deleted component is before the active one
  else if (activeComponent.val !== null && activeComponent.val > index) {
    activeComponent.val = activeComponent.val - 1;
  }

  const key = ToolbarMode[toolbarMode.val];
  const currentComponents = components.val.get(key) ?? [];
  const updatedComponents = currentComponents.filter((_, i) => i !== index);
  components.val = new Map(components.val).set(key, updatedComponents);
}
