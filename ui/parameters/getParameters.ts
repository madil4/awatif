import van from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getParameters({}: {} = {}): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <details id="parameters">
      <summary>Parameters</summary>
      <div>Hello</div>
    </details>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
