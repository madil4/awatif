import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export enum CanvasButtons {
  REPORT = "Report",
  DOCS = "Docs",
  AI_ASSISTANT = "AI-Assistant",
  UPGRADE = "Upgrade",
}

export function getCanvasBar({
  canvasButton,
  buttons = [CanvasButtons.DOCS, CanvasButtons.UPGRADE, CanvasButtons.REPORT],
  upgraded,
}: {
  canvasButton: State<CanvasButtons | null>;
  buttons?: CanvasButtons[];
  upgraded?: State<boolean>;
}): HTMLElement {
  const container = document.createElement("div");
  container.id = "canvas-bar";

  van.derive(() => {
    const buttonList = upgraded?.val
      ? buttons.filter((b) => b !== CanvasButtons.UPGRADE)
      : buttons;
    render(
      html`
        ${buttonList.map(
          (button) => html`
            <button
              class="${button === CanvasButtons.DOCS
                ? "docs-button "
                : ""}${canvasButton.val === button ? "active" : ""}"
              @click=${() => {
                canvasButton.val = canvasButton.val === button ? null : button;
              }}
            >
              ${button === CanvasButtons.DOCS ? "?" : button}
            </button>
          `,
        )}
      `,
      container,
    );
  });

  return container;
}
