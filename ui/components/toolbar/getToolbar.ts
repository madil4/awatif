import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export enum ToolbarMode {
  MESH,
  LOADS,
  SUPPORTS,
}

export type Toolbar = {
  toolbarMode: State<ToolbarMode | null>;
};

export function getToolbar({ toolbarMode }: Toolbar): HTMLElement {
  const container = document.createElement("div");
  const modes = getToolbarModes();

  const template = () => html`
    <div id="toolbar">
      ${modes.map(
        (mode) => html`
          <button
            class="toolbar-button ${toolbarMode.val === mode.value
              ? "active"
              : ""}"
            @click=${() =>
              (toolbarMode.val =
                toolbarMode.val === mode.value ? null : mode.value)}
          >
            ${mode.label}
          </button>
        `
      )}
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}

// Utils
function getToolbarModes() {
  return Object.keys(ToolbarMode)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: ToolbarMode[key as keyof typeof ToolbarMode],
      label: getDisplayName(key),
    }));

  function getDisplayName(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  }
}
