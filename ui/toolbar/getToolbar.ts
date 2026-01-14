import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export enum ToolbarButtons {
  REPORT = "Report",
  LOGIN = "Login",
}

export function getToolbar({
  activeButton,
}: {
  activeButton: State<ToolbarButtons | null>;
}): HTMLElement {
  const buttons = [ToolbarButtons.REPORT, ToolbarButtons.LOGIN];

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
