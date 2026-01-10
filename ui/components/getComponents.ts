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
  toolbarMode: State<ToolbarMode | null>;
  geometry: Geometry;
  components: Components;
  activeComponent: State<number | null>;
}): HTMLElement {
  const container = document.createElement("div");
  const editingIndex = van.state<number | null>(null);
  let isSyncing = false;

  const getKey = () => ToolbarMode[toolbarMode.val!];
  const getList = () => components.val.get(getKey()) ?? [];
  const usesPoints = () =>
    toolbarMode.val === ToolbarMode.LOADS ||
    toolbarMode.val === ToolbarMode.SUPPORTS;

  // Sync activeComponent -> geometry.selection
  van.derive(() => {
    const idx = activeComponent.val;
    if (idx === null || toolbarMode.val === null) {
      if (!isSyncing && geometry.selection.val !== null) {
        isSyncing = true;
        geometry.selection.val = null;
        isSyncing = false;
      }
      return;
    }

    const componentGeometry = getList()[idx]?.geometry ?? [];
    isSyncing = true;
    geometry.selection.val = usesPoints()
      ? { points: componentGeometry, lines: [] }
      : { points: [], lines: componentGeometry };
    isSyncing = false;
  });

  // Sync geometry.selection -> activeComponent's geometry
  van.derive(() => {
    const selection = geometry.selection.val;
    const idx = activeComponent.val;
    if (isSyncing || idx === null || toolbarMode.val === null) return;

    const selectedGeometry = usesPoints()
      ? selection?.points ?? []
      : selection?.lines ?? [];

    const list = getList();
    const current = list[idx];
    if (!current) return;

    const currentGeometry = current.geometry ?? [];
    const unchanged =
      currentGeometry.length === selectedGeometry.length &&
      currentGeometry.every((v, i) => v === selectedGeometry[i]);

    if (!unchanged) {
      // Create a set of the selected geometry indices for quick lookup
      const selectedSet = new Set(selectedGeometry);

      // Update all components: assign to active, remove from others in same category
      const updated = list.map((c, i) => {
        if (i === idx) {
          // Active component gets the new selection
          return { ...c, geometry: [...selectedGeometry] };
        } else {
          // Other components: remove any geometry that's now assigned to active
          const filteredGeometry = (c.geometry ?? []).filter(
            (g) => !selectedSet.has(g)
          );
          return { ...c, geometry: filteredGeometry };
        }
      });

      components.val = new Map(components.val).set(getKey(), updated);
    }
  });

  // Reset on toolbar mode change or when details closes
  van.derive(() => {
    toolbarMode.val;
    activeComponent.val = null;
  });

  van.derive(() => {
    if (activeComponent.val === null) geometry.selection.val = null;
  });

  // Render
  van.derive(() => {
    render(template(), container);
  });

  function template() {
    if (toolbarMode.val === null) return html``;

    const list = getList();
    const isOpen =
      toolbarMode.val === ToolbarMode.MESH ||
      toolbarMode.val === ToolbarMode.LOADS ||
      toolbarMode.val === ToolbarMode.SUPPORTS;

    return html`
      <details
        id="components"
        ?open=${isOpen}
        @toggle=${(e: Event) => {
          if (!(e.target as HTMLDetailsElement).open)
            activeComponent.val = null;
        }}
      >
        <summary>Components</summary>
        ${list.map((comp, i) => componentItem(comp, i))} ${templatesSection()}
      </details>
    `;
  }

  function componentItem(comp: { name: string }, index: number) {
    const isActive = activeComponent.val === index;
    const isEditing = editingIndex.val === index;

    return html`
      <div
        class="components-item ${isActive ? "active" : ""}"
        @click=${() => (activeComponent.val = isActive ? null : index)}
      >
        ${isEditing
          ? renameInput(comp.name, index)
          : nameLabel(comp.name, index)}
        <button
          class="components-delete-btn"
          @click=${(e: Event) => {
            e.stopPropagation();
            deleteComponent(index);
          }}
          title="Delete component"
        >
          ×
        </button>
      </div>
    `;
  }

  function renameInput(name: string, index: number) {
    return html`
      <input
        class="components-rename-input"
        type="text"
        .value=${name}
        @blur=${(e: Event) =>
          commitRename(index, (e.target as HTMLInputElement).value)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter")
            commitRename(index, (e.target as HTMLInputElement).value);
          else if (e.key === "Escape") editingIndex.val = null;
        }}
        @input=${(e: Event) => e.stopPropagation()}
      />
    `;
  }

  function nameLabel(name: string, index: number) {
    return html`
      <label @dblclick=${() => (editingIndex.val = index)}>${name}</label>
    `;
  }

  function templatesSection() {
    const list = templates.get(getKey()) ?? [];
    return html`
      <details class="components-templates" open>
        <summary class="components-divider">templates</summary>
        ${list.map(
          (t, i) => html`
            <div class="components-item template">
              <label>${t.name}</label>
              <button
                class="components-copy-btn"
                @click=${() => copyTemplate(t.name, i)}
                title="Copy template"
              >
                +
              </button>
            </div>
          `
        )}
      </details>
    `;
  }

  // Actions
  function copyTemplate(baseName: string, templateIndex: number) {
    if (toolbarMode.val === null) return;

    const list = getList();
    const names = new Set(list.map((c) => c.name));
    let name = baseName;

    if (names.has(name)) {
      name = `${baseName} copy`;
      let n = 2;
      while (names.has(name)) name = `${baseName} copy ${n++}`;
    }

    const defaultParams = {
      ...templates.get(getKey())?.[templateIndex]?.defaultParams,
    };
    const updated = [
      ...list,
      { name, templateIndex, geometry: [], params: defaultParams },
    ];
    components.val = new Map(components.val).set(getKey(), updated);
  }

  function commitRename(index: number, newName: string) {
    if (toolbarMode.val === null) return;

    const list = getList();
    const trimmed = newName.trim();

    if (trimmed && trimmed !== list[index].name) {
      const updated = list.map((c, i) =>
        i === index ? { ...c, name: trimmed } : c
      );
      components.val = new Map(components.val).set(getKey(), updated);
    }

    requestAnimationFrame(() => {
      if (editingIndex.val === index) editingIndex.val = null;
    });
  }

  function deleteComponent(index: number) {
    if (toolbarMode.val === null) return;
    if (activeComponent.val === index) activeComponent.val = null;

    const updated = getList().filter((_, i) => i !== index);
    components.val = new Map(components.val).set(getKey(), updated);
  }

  return container;
}
