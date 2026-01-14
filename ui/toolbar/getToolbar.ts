import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export enum CanvasButtons {
  REPORT = "Report",
  LOGIN = "Login",
}

export function getCanvasBar({
  canvasButton,
}: {
  canvasButton: State<CanvasButtons | null>;
}): HTMLElement {
  const buttons = [CanvasButtons.REPORT, CanvasButtons.LOGIN];

  const container = document.createElement("div");
  container.id = "toolbar";

  const template = () => html`
    ${buttons.map(
      (button) => html`
        <button
          @click=${() => {
            canvasButton.val = canvasButton.val === button ? null : button;
          }}
        >
          ${button}
        </button>
      `
    )}
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container;
}
