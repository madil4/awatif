import van from "vanjs-core";
import { html, render } from "lit-html";
import { State } from "vanjs-core";

import "./styles.css";

export enum ToolbarButtons {
  REPORT = "Report",
  LOGIN = "Login",
}

export function getToolbar({
  toolbarButton,
}: {
  toolbarButton: State<ToolbarButtons | null>;
}): HTMLElement {
  const buttons = [ToolbarButtons.REPORT, ToolbarButtons.LOGIN];

  const container = document.createElement("div");
  container.id = "toolbar";

  const template = () => html`
    ${buttons.map(
      (button) => html`
        <button
          @click=${() => {
            toolbarButton.val = toolbarButton.val === button ? null : button;
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
