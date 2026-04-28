import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export function getCanvasBar({
  canvasButton,
  buttons = [],
}: {
  canvasButton: State<string | null>;
  buttons?: string[] | State<string[]>;
}): HTMLElement {
  const container = document.createElement("div");
  container.id = "canvas-bar";

  van.derive(() => {
    const buttonList = buttons instanceof Array ? buttons : buttons.val;
    render(
      html`
        ${buttonList.map(
          (button) => html`
            <button
              class="${canvasButton.val === button ? "active" : ""}"
              @click=${() => {
                canvasButton.val = canvasButton.val === button ? null : button;
              }}
            >
              ${button}
            </button>
          `,
        )}
      `,
      container,
    );
  });

  return container;
}
