import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  viewer,
  display,
  toolbar,
  components,
  tooltips,
  canvas,
}: {
  viewer?: HTMLElement;
  display?: HTMLElement;
  toolbar?: HTMLElement[];
  components?: HTMLElement;
  tooltips?: HTMLElement;
  canvas?: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="layout">
      <div class="viewer">${viewer}</div>
      <div class="display">${display}</div>
      <div class="toolbar">${toolbar}</div>
      <div class="bottom-left">${components} ${tooltips}</div>
      <div class="canvas">${canvas}</div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
