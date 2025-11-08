import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  header,
  display,
  footer,
}: {
  header?: HTMLElement;
  display?: HTMLElement;
  footer?: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="layout">
      <div class="top">
        <div class="display">${display}</div>
        <div class="header">${header}</div>
      </div>
      <div class="footer">${footer}</div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
