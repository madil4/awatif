import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  viewer,
  display,
  header,
  components,
  footer,
  canvas,
  promptPanel,
}: {
  viewer?: HTMLElement;
  display?: HTMLElement;
  header?: HTMLElement[];
  components?: HTMLElement;
  footer?: HTMLElement[];
  canvas?: HTMLElement;
  promptPanel?: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="layout">
      <div class="viewer">${viewer}</div>
      <div class="display">${display}</div>
      <div class="header">${header}</div>
      <div class="bottom-left">
        ${components}
        <div class="footer">${footer}</div>
      </div>
      <div class="canvas">${canvas}</div>
      <div class="bottom-right">
        <div class="prompt-panel">${promptPanel}</div>
      </div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
