import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";
import { getRow } from "../row/getRow";

export function getSheet(): HTMLElement {
  const container = document.createElement("div");

  const template = () => {
    return html` <table>
      <tbody>
        ${getRow()}
      </tbody>
    </table>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
