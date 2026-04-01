import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export enum CanvasButtons {
  REPORT = "Report",
  DOCS = "Docs",
  UPGRADE = "Upgrade",
}

export function getCanvasBar({
  canvasButton,
  buttons = [CanvasButtons.UPGRADE, CanvasButtons.DOCS, CanvasButtons.REPORT],
}: {
  canvasButton: State<CanvasButtons | null>;
  buttons?: CanvasButtons[];
}): HTMLElement {

  const container = document.createElement("div");
  container.id = "canvas-bar";

  const template = () => html`
    ${buttons.map(
      (button) => html`
        <button
          class="${button === CanvasButtons.DOCS
            ? "docs-button "
            : ""}${button === CanvasButtons.UPGRADE
            ? "upgrade-button "
            : ""}${canvasButton.val === button ? "active" : ""}"
          @click=${() => {
            canvasButton.val = canvasButton.val === button ? null : button;
          }}
        >
          ${button === CanvasButtons.DOCS
            ? "?"
            : button === CanvasButtons.UPGRADE
              ? "★"
              : button}
        </button>
      `,
    )}
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container;
}
