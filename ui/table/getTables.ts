import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import "./styles.css";

import { getTable, Table } from "./getTable.ts";

export type Tables = State<Map<string, Table>>;

type ActiveTable = State<string | null>;

export function getTables(tables: Tables): HTMLElement {
  const container = document.createElement("div");
  container.id = "Tables";
  container.classList.add("modal");

  const activeTable: ActiveTable = van.state(
    tables.val.keys().next().value ?? null
  );

  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const handleMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".close")) return;

    const modalContent = container.querySelector(
      ".modal-content"
    ) as HTMLElement;
    if (!modalContent) return;

    startX = e.clientX;
    startY = e.clientY;
    initialLeft = modalContent.offsetLeft;
    initialTop = modalContent.offsetTop;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const modalContent = container.querySelector(
      ".modal-content"
    ) as HTMLElement;
    if (modalContent) {
      console.log(modalContent.style.left);
      console.log(modalContent.style.top);
      modalContent.style.left = `${initialLeft + dx}px`;
      modalContent.style.top = `${initialTop + dy}px`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const defaultTable: Table = { values: van.state([[]]) };

  const template = () => {
    return html` <div class="modal-content">
      <div class="modal-header" @mousedown=${handleMouseDown}>
        <span
          class="close"
          @mousedown=${(e: Event) => e.stopPropagation()}
          @click=${() => {
            container.remove();
          }}
          >&times;</span
        >
      </div>
      ${getTable(tables.val.get(activeTable.val || "") ?? defaultTable)}
      ${getTabs([...tables.val.keys()], activeTable)}
    </div>`;
  };
  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}

function getTabs(tabs: string[], activeTable: ActiveTable): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("tab");

  const template = () => {
    return html` <div class="tab">
      ${tabs.map(
        (tab) => html` <button
          class="tablinks ${tab === activeTable.val ? "active" : ""}"
          @click=${() => (activeTable.val = tab)}
        >
          ${tab}
        </button>`
      )}
    </div>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
