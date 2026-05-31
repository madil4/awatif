import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  viewer,
  display,
  header,
  components,
  canvas,
  footer,
}: {
  viewer?: HTMLElement;
  display?: HTMLElement;
  header?: HTMLElement[];
  components?: HTMLElement;
  canvas?: HTMLElement;
  footer?: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="layout">
      <div class="viewer">${viewer}</div>
      <div class="display">${display}</div>
      <div class="header">${header}</div>
      <div class="canvas">${canvas}</div>
      <div class="bottom-left">${components}</div>
      <div class="footer">${footer}</div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
