import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { getSheet } from "../sheet/getSheet";

import "./styles.css";

export function getSheetContainter(): HTMLElement {
  const container = document.createElement("div");

  const template = () => {
    return html`${getSheet()}`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
