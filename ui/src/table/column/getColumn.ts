import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { getCell } from "../cell/getCell";

import "./styles.css";

export function getColumn(): HTMLElement {
  const container = document.createElement("td");

  const template = () => {
    return html`
      ${getCell({
        value: van.state("hello"),
        id: van.state("A1"),
        isEditMode: van.state(false),
      })}
    `;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
