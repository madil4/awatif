import { html, render } from "lit-html";

import "./styles.css";

export function getHeader(): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="header">
      App is under construction. Join our newsletter:
      <a href="https://awatif.co" target="_blank" rel="noopener noreferrer"
        >awatif.co</a
      >
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
