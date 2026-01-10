import { html, render } from "lit-html";

import "./styles.css";

export function getLayout({
  viewer,
  header,
  display,
  toolbar,
  tooltips,
  parameters,
  components,
}: {
  viewer?: HTMLElement;
  header?: HTMLElement[];
  display?: HTMLElement;
  toolbar?: HTMLElement;
  tooltips?: HTMLElement;
  parameters?: HTMLElement;
  components?: HTMLElement;
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
        <div class="panels-row">
          <div class="components">${components}</div>
          <div class="parameters">${parameters}</div>
        </div>
        <div class="toolbar">${toolbar}</div>
        <div class="tooltips">${tooltips}</div>
      </div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
