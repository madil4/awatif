import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export type Cell = {
  values: State<any[][]>;
  isEditMode: State<boolean>;
  colIndex: State<number>;
  rowIndex: State<number>;
};

export function getCell(cell: Cell): HTMLElement {
  const container = document.createElement("div");

  const id = `cell-${cell.rowIndex.val}-${cell.colIndex.val}`;

  const onClickOutsideInputHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target?.id !== id) {
      cell.isEditMode.val = false;
    }
  };

  document.addEventListener("click", onClickOutsideInputHandler);

  const template = () => {
    return cell.isEditMode.val
      ? html`<div id=${id}>
          <input
            type="text"
            id=${id}
            value=${cell.values.val[cell.rowIndex.val][cell.colIndex.val]}
            @input="${(e: Event) => {
              cell.values.val[cell.rowIndex.val][cell.colIndex.val] = (
                e.target as HTMLInputElement
              ).value;
            }}"
          />
        </div>`
      : html`<div
          id=${id}
          @click=${() => {
            cell.isEditMode.val = true;
          }}
        >
          ${cell.values.val[cell.rowIndex.val][cell.colIndex.val]}
        </div>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
