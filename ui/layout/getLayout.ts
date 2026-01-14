import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  viewer,
  display,
  header,
  components,
  tooltips,
  canvas,
}: {
  viewer?: HTMLElement;
  display?: HTMLElement;
  header?: HTMLElement[];
  components?: HTMLElement;
  tooltips?: HTMLElement;
  canvas?: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="layout">
      <div class="viewer">${viewer}</div>
      <div class="display">${display}</div>
      <div class="header">${header}</div>
      <div class="bottom-left">
        <div class="components">${components}</div>
        <div class="tooltips">${tooltips}</div>
      </div>
      <div class="canvas">${canvas}</div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
