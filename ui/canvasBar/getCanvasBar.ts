import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export enum CanvasButtons {
  REPORT = "Report",
  DOCS = "Docs",
}

export function getCanvasBar({
  canvasButton,
}: {
  canvasButton: State<CanvasButtons | null>;
}): HTMLElement {
  const buttons = [CanvasButtons.DOCS, CanvasButtons.REPORT];

  const container = document.createElement("div");
  container.id = "canvas-bar";

  const template = () => html`
    ${buttons.map(
      (button) => html`
        <button
          class="${button === CanvasButtons.DOCS ? "docs-button " : ""}${canvasButton
            .val === button
            ? "active"
            : ""}"
          @click=${() => {
            canvasButton.val = canvasButton.val === button ? null : button;
          }}
        >
          ${button === CanvasButtons.DOCS ? "?" : button}
        </button>
      `,
    )}
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container;
}
