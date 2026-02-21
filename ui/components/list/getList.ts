import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
  ActiveComponent,
} from "@awatif/components";

import "./styles.css";

type TaggedItem = {
  type: ComponentsType;
  index: number;
  item: { name: string; templateId: string; geometry: number[]; params?: Record<string, unknown> };
};

export function getList({
  types,
  geometryKind,
  geometry,
  components,
  activeComponent,
  templates,
}: {
  types: State<ComponentsType[]>;
  geometryKind: State<"point" | "line" | null>;
  geometry: Geometry;
  components: Components;
  activeComponent: State<ActiveComponent>;
  templates?: typeof Templates;
}): HTMLElement {
  const container = document.createElement("div");
  const editingIndex = van.state<number | null>(null);
  let isSyncing = false;

  const getTaggedList = (): TaggedItem[] => {
    const result: TaggedItem[] = [];
    for (const type of types.val) {
      const list = components.val.get(type) ?? [];
      list.forEach((item, i) => result.push({ type, index: i, item }));
    }
    return result;
  };

  const isPointBased = () => geometryKind.val === "point";
  const isLineBased = () => geometryKind.val === "line";

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

  const arraysEqual = (a: number[], b: number[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  // Reset activeComponent when types change
  van.derive(() => {
    types.val;
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
    const active = activeComponent.val;
    if (active === null || types.val.length === 0) return;

    const list = components.val.get(active.type) ?? [];
    const componentGeometry = list[active.index]?.geometry ?? [];
    isSyncing = true;
    setSelection(componentGeometry);
    isSyncing = false;
  });

  // Sync geometry.selection -> activeComponent's geometry
  van.derive(() => {
    const active = activeComponent.val;
    if (isSyncing || active === null || types.val.length === 0) return;
    if (geometry.selection.val === null) return;

    const list = components.val.get(active.type) ?? [];
    const current = list[active.index];
    if (!current) return;

    const selectedGeometry = getSelectedGeometry();
    if (arraysEqual(current.geometry ?? [], selectedGeometry)) return;

    const selectedSet = new Set(selectedGeometry);

    // Update the active component's geometry and remove those indices from others of the same type
    const updatedList = list.map((c, i) => {
      if (i === active.index) return { ...c, geometry: [...selectedGeometry] };
      return {
        ...c,
        geometry: (c.geometry ?? []).filter((g) => !selectedSet.has(g)),
      };
    });
    components.val = new Map(components.val).set(active.type, updatedList);
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
    typesToClean: ComponentsType[],
    deleted: Set<number>,
  ) => {
    for (const type of typesToClean) {
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
          [ComponentsType.MESH, ComponentsType.DESIGN, ComponentsType.IMPERFECTIONS],
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
    if (types.val.length === 0) return html``;

    const taggedList = getTaggedList();

    return html`
      <details
        id="list"
        open
        @toggle=${(e: Event) => {
          if (!(e.target as HTMLDetailsElement).open)
            activeComponent.val = null;
        }}
      >
        <summary>Components</summary>
        ${taggedList.map((tagged, combinedIdx) =>
          componentItem(tagged, combinedIdx),
        )}
        ${templatesSection()}
      </details>
    `;
  }

  function componentItem(tagged: TaggedItem, combinedIndex: number) {
    const active = activeComponent.val;
    const isActive =
      active !== null &&
      active.type === tagged.type &&
      active.index === tagged.index;
    const isEditing = editingIndex.val === combinedIndex;

    return html`
      <div
        class="components-item ${isActive ? "active" : ""}"
        @click=${() =>
          (activeComponent.val = isActive
            ? null
            : { type: tagged.type, index: tagged.index })}
      >
        ${isEditing
          ? renameInput(tagged.item.name, tagged)
          : nameLabel(tagged.item.name, combinedIndex)}
        <button
          class="components-delete-btn"
          @click=${(e: Event) => {
            e.stopPropagation();
            deleteComponent(tagged);
          }}
          title="Delete component"
        >
          ×
        </button>
      </div>
    `;
  }

  function renameInput(name: string, tagged: TaggedItem) {
    return html`
      <input
        class="components-rename-input"
        type="text"
        .value=${name}
        @blur=${(e: Event) =>
          commitRename(tagged, (e.target as HTMLInputElement).value)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter")
            commitRename(tagged, (e.target as HTMLInputElement).value);
          else if (e.key === "Escape") editingIndex.val = null;
        }}
        @input=${(e: Event) => e.stopPropagation()}
      />
    `;
  }

  function nameLabel(name: string, combinedIndex: number) {
    return html`
      <label @dblclick=${() => (editingIndex.val = combinedIndex)}
        >${name}</label
      >
    `;
  }

  function templatesSection() {
    if (!templates) return html``;

    const allEntries: Array<{
      type: ComponentsType;
      id: string;
      t: any;
    }> = [];
    for (const type of types.val) {
      const map = templates.get(type);
      if (map) {
        for (const [id, t] of map.entries()) {
          allEntries.push({ type, id, t });
        }
      }
    }
    if (allEntries.length === 0) return html``;

    return html`
      <details class="components-templates" open>
        <summary class="components-divider">templates</summary>
        ${allEntries.map(
          ({ type, id, t }) => html`
            <div class="components-item template">
              <label>${t.name}</label>
              <button
                class="components-copy-btn"
                @click=${() => copyTemplate(t.name, id, type)}
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
  function copyTemplate(
    baseName: string,
    templateId: string,
    targetType: ComponentsType,
  ) {
    const list = components.val.get(targetType) ?? [];
    const names = new Set(list.map((c) => c.name));
    let name = baseName;

    if (names.has(name)) {
      name = `${baseName} copy`;
      let n = 2;
      while (names.has(name)) name = `${baseName} copy ${n++}`;
    }

    const defaultParams = {
      ...templates?.get(targetType)?.get(templateId)?.defaultParams,
    };
    const updated = [
      ...list,
      { name, templateId, geometry: [], params: defaultParams },
    ];
    components.val = new Map(components.val).set(targetType, updated);
  }

  function commitRename(tagged: TaggedItem, newName: string) {
    const list = components.val.get(tagged.type) ?? [];
    const trimmed = newName.trim();

    if (trimmed && trimmed !== list[tagged.index]?.name) {
      const updated = list.map((c, i) =>
        i === tagged.index ? { ...c, name: trimmed } : c,
      );
      components.val = new Map(components.val).set(tagged.type, updated);
    }

    requestAnimationFrame(() => {
      editingIndex.val = null;
    });
  }

  function deleteComponent(tagged: TaggedItem) {
    const active = activeComponent.val;
    if (
      active !== null &&
      active.type === tagged.type &&
      active.index === tagged.index
    ) {
      activeComponent.val = null;
    }

    const list = components.val.get(tagged.type) ?? [];
    const updated = list.filter((_, i) => i !== tagged.index);
    components.val = new Map(components.val).set(tagged.type, updated);
  }

  return container;
}
