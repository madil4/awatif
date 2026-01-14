import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export function getToolbar({
  buttons,
  activeButton,
}: {
  buttons: string[];
  activeButton: State<string | null>;
}): HTMLElement {
  const container = document.createElement("div");
  container.id = "toolbar";

  const toolbarTemplate = () => html`
    ${buttons.map(
      (button) => html`
        <button
          @click=${() => {
            activeButton.val = activeButton.val === button ? null : button;
          }}
        >
          ${button}
        </button>
      `
    )}
  `;

  van.derive(() => {
    render(toolbarTemplate(), container);
  });

  return container;
}
