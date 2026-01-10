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

    const componentGeometry = component.geometry ?? [];

    // Update selection to reflect the active component's geometry
    // MESH mode uses lines, LOADS and SUPPORTS modes use points
    isSyncing = true;
    if (
      toolbarMode.val === ToolbarMode.LOADS ||
      toolbarMode.val === ToolbarMode.SUPPORTS
    ) {
      geometry.selection.val = { points: componentGeometry, lines: [] };
    } else {
      geometry.selection.val = { points: [], lines: componentGeometry };
    }
    isSyncing = false;
  });

  // Sync 2: When geometry.selection changes, update active component's geometry
  van.derive(() => {
    const selection = geometry.selection.val;
    const idx = activeComponent.val;

    // Skip if syncing or no active component
    if (isSyncing || idx === null) return;

    // MESH mode uses lines, LOADS and SUPPORTS modes use points
    const selectedGeometry =
      toolbarMode.val === ToolbarMode.LOADS ||
      toolbarMode.val === ToolbarMode.SUPPORTS
        ? selection?.points ?? []
        : selection?.lines ?? [];

    const key = ToolbarMode[toolbarMode.val];
    const currentComponents = components.val.get(key) ?? [];
    const currentComponent = currentComponents[idx];
    if (!currentComponent) return;

    // Only update if the geometry actually changed
    const currentGeometry = currentComponent.geometry ?? [];
    const isSame =
      currentGeometry.length === selectedGeometry.length &&
      currentGeometry.every((item, i) => item === selectedGeometry[i]);

    if (!isSame) {
      const updatedComponents = currentComponents.map((comp, i) =>
        i === idx ? { ...comp, geometry: [...selectedGeometry] } : comp
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
        ?open=${toolbarMode.val === ToolbarMode.MESH ||
        toolbarMode.val === ToolbarMode.LOADS ||
        toolbarMode.val === ToolbarMode.SUPPORTS}
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
                @click=${(e: Event) => {
                  e.stopPropagation();
                  deleteComponent(
                    components,
                    toolbarMode,
                    activeComponent,
                    index
                  );
                }}
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
  if (activeComponent.val === index) activeComponent.val = null;

  const key = ToolbarMode[toolbarMode.val];
  const currentComponents = components.val.get(key) ?? [];
  const updatedComponents = currentComponents.filter((_, i) => i !== index);
  components.val = new Map(components.val).set(key, updatedComponents);
}
