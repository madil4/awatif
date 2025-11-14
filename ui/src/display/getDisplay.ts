import { html, render } from "lit-html";

import "./styles.css";

export function getDisplay(): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <details id="display">
      <summary>Display</summary>
      Something small enough to escape casual notice.
    </details>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
