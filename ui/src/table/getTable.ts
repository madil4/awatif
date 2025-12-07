import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { getSheetContainter } from "./sheetContainer/getSheetContainer";

import "./styles.css";

export function getTable(): HTMLElement {
  const container = document.createElement("div");

  const template = () => html` ${getSheetContainter()} `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
