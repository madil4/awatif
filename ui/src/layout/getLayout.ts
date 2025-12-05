import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  viewer,
  header,
  display,
  toolbar,
  tooltips,
  parameters,
}: {
  viewer?: HTMLElement;
  header?: HTMLElement[];
  display?: HTMLElement;
  toolbar?: HTMLElement;
  tooltips?: HTMLElement;
  parameters?: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="layout">
      <div class="viewer">${viewer}</div>
      <div class="top">
        <div class="display">${display}</div>
        <div class="header">${header}</div>
      </div>
      <div class="bottom">
        <div class="bottom-group">
          <div class="toolbar">${toolbar}</div>
          <div class="tooltips">${tooltips}</div>
        </div>
        <div class="parameters">${parameters}</div>
      </div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
