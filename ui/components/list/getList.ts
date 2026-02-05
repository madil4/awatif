import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
} from "@awatif/components";

import "./styles.css";

export function getList({
  componentsBarMode,
  geometry,
  components,
  activeComponent,
  templates,
}: {
  componentsBarMode: State<ComponentsType | null>;
  geometry: Geometry;
  components: Components;
  activeComponent: State<number | null>;
  templates?: typeof Templates;
}): HTMLElement {
  const container = document.createElement("div");
  const editingIndex = van.state<number | null>(null);
  let isSyncing = false;

  const getKey = () => componentsBarMode.val as ComponentsType;
  const getComponentList = () => components.val.get(getKey()) ?? [];

  const isPointBased = () =>
    componentsBarMode.val === ComponentsType.LOADS ||
    componentsBarMode.val === ComponentsType.SUPPORTS;

  const isLineBased = () =>
    componentsBarMode.val === ComponentsType.MESH ||
    componentsBarMode.val === ComponentsType.DESIGN;

  const getSelectedGeometry = () => {
    const sel = geometry.selection.val;
    if (isPointBased()) return sel?.points ?? [];
    if (isLineBased()) return sel?.lines ?? [];
    return [];
  };

  const setSelection = (indices: number[]) => {
    if (isPointBased()) {
      geometry.selection.val = { points: indices, lines: [] };
    } else if (isLineBased()) {
      geometry.selection.val = { points: [], lines: indices };
    } else {
      geometry.selection.val = null;
    }
  };

  const updateComponents = (
    updater: (
      list: typeof getComponentList extends () => infer R ? R : never,
    ) => typeof list,
  ) => {
    components.val = new Map(components.val).set(
      getKey(),
      updater(getComponentList()),
    );
  };

  const arraysEqual = (a: number[], b: number[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  // Reset activeComponent when mode changes
  van.derive(() => {
    componentsBarMode.val;
    activeComponent.val = null;
  });

  // Clear selection when no active component
  van.derive(() => {
    if (activeComponent.val === null && !isSyncing) {
      geometry.selection.val = null;
    }
  });

  // Exit active component when selection is cleared externally (e.g., right-click in viewer)
  van.derive(() => {
    if (
      geometry.selection.val === null &&
      activeComponent.rawVal !== null &&
      !isSyncing
    ) {
      activeComponent.val = null;
    }
  });

  // Sync activeComponent -> geometry.selection
  van.derive(() => {
    const idx = activeComponent.val;
    if (idx === null || componentsBarMode.val === null) return;

    const componentGeometry = getComponentList()[idx]?.geometry ?? [];
    isSyncing = true;
    setSelection(componentGeometry);
    isSyncing = false;
  });

  // Sync geometry.selection -> activeComponent's geometry
  van.derive(() => {
    const idx = activeComponent.val;
    if (isSyncing || idx === null || componentsBarMode.val === null) return;
    if (geometry.selection.val === null) return;

    const current = getComponentList()[idx];
    if (!current) return;

    const selectedGeometry = getSelectedGeometry();
    if (arraysEqual(current.geometry ?? [], selectedGeometry)) return;

    const selectedSet = new Set(selectedGeometry);
    updateComponents((list) =>
      list.map((c, i) =>
        i === idx
          ? { ...c, geometry: [...selectedGeometry] }
          : {
              ...c,
              geometry: (c.geometry ?? []).filter((g) => !selectedSet.has(g)),
            },
      ),
    );
  });

  // Sync geometry deletions -> remove deleted indices from components
  let prevPointKeys = new Set(geometry.points.val.keys());
  let prevLineKeys = new Set(geometry.lines.val.keys());

  const findDeleted = (prev: Set<number>, current: Set<number>) => {
    const deleted = new Set<number>();
    for (const key of prev) {
      if (!current.has(key)) deleted.add(key);
    }
    return deleted;
  };

  const removeDeletedFromTypes = (
    componentsMap: Map<ComponentsType, { geometry: number[] }[]>,
    types: ComponentsType[],
    deleted: Set<number>,
  ) => {
    for (const type of types) {
      const list = componentsMap.get(type);
      if (list) {
        componentsMap.set(
          type,
          list.map((c) => ({
            ...c,
            geometry: c.geometry.filter((idx) => !deleted.has(idx)),
          })),
        );
      }
    }
  };

  van.derive(() => {
    const currentPointKeys = new Set(geometry.points.val.keys());
    const currentLineKeys = new Set(geometry.lines.val.keys());

    const deletedPoints = findDeleted(prevPointKeys, currentPointKeys);
    const deletedLines = findDeleted(prevLineKeys, currentLineKeys);

    if (deletedPoints.size > 0 || deletedLines.size > 0) {
      const updated = new Map(components.val);

      if (deletedPoints.size > 0) {
        removeDeletedFromTypes(
          updated,
          [ComponentsType.LOADS, ComponentsType.SUPPORTS],
          deletedPoints,
        );
      }
      if (deletedLines.size > 0) {
        removeDeletedFromTypes(
          updated,
          [ComponentsType.MESH, ComponentsType.DESIGN],
          deletedLines,
        );
      }

      components.val = updated;
    }

    prevPointKeys = currentPointKeys;
    prevLineKeys = currentLineKeys;
  });

  // Render
  van.derive(() => {
    render(template(), container);
  });

  function template() {
    if (componentsBarMode.val === null) return html``;
    if (componentsBarMode.val === ComponentsType.ANALYSIS) return html``;

    const list = getComponentList();
    const isOpen =
      componentsBarMode.val === ComponentsType.MESH ||
      componentsBarMode.val === ComponentsType.LOADS ||
      componentsBarMode.val === ComponentsType.SUPPORTS ||
      componentsBarMode.val === ComponentsType.DESIGN;

    return html`
      <details
        id="list"
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
    if (!templates) return html``;
    const map = templates.get(getKey());
    if (!map) return html``;

    return html`
      <details class="components-templates" open>
        <summary class="components-divider">templates</summary>
        ${Array.from(map.entries()).map(
          ([id, t]) => html`
            <div class="components-item template">
              <label>${t.name}</label>
              <button
                class="components-copy-btn"
                @click=${() => copyTemplate(t.name, id)}
                title="Copy template"
              >
                +
              </button>
            </div>
          `,
        )}
      </details>
    `;
  }

  // Actions
  function copyTemplate(baseName: string, templateId: string) {
    if (componentsBarMode.val === null) return;

    const list = getComponentList();
    const names = new Set(list.map((c) => c.name));
    let name = baseName;

    if (names.has(name)) {
      name = `${baseName} copy`;
      let n = 2;
      while (names.has(name)) name = `${baseName} copy ${n++}`;
    }

    const defaultParams = {
      ...templates?.get(getKey())?.get(templateId)?.defaultParams,
    };
    const updated = [
      ...list,
      { name, templateId, geometry: [], params: defaultParams },
    ];
    components.val = new Map(components.val).set(getKey(), updated);
  }

  function commitRename(index: number, newName: string) {
    if (componentsBarMode.val === null) return;

    const list = getComponentList();
    const trimmed = newName.trim();

    if (trimmed && trimmed !== list[index].name) {
      const updated = list.map((c, i) =>
        i === index ? { ...c, name: trimmed } : c,
      );
      components.val = new Map(components.val).set(getKey(), updated);
    }

    requestAnimationFrame(() => {
      if (editingIndex.val === index) editingIndex.val = null;
    });
  }

  function deleteComponent(index: number) {
    if (componentsBarMode.val === null) return;
    if (activeComponent.val === index) activeComponent.val = null;

    const updated = getComponentList().filter((_, i) => i !== index);
    components.val = new Map(components.val).set(getKey(), updated);
  }

  return container;
}
