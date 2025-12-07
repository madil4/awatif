import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export type Cell = {
  value: State<string | number>;
  isEditMode: State<boolean>;
  id: State<string>;
};

export function getCell(cell: Cell): HTMLElement {
  const container = document.createElement("div");

  const onClickOutsideInputHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target?.id !== cell.id.val) {
      cell.isEditMode.val = false;
    }
  };

  document.addEventListener("click", onClickOutsideInputHandler);

  const template = () => {
    return cell.isEditMode.val
      ? html`<input
          type="text"
          id=${cell.id.val}
          value=${cell.value.val}
          @input="${(e: Event) => {
            cell.value.val = (e.target as HTMLInputElement).value;
          }}"
        />`
      : html`<div
          id=${cell.id.val}
          @click=${() => {
            cell.isEditMode.val = true;
          }}
        >
          ${cell.value.val}
        </div>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
