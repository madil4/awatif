import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export function getTable(): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <p>Table</p>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
