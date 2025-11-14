import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export enum ToolbarMode {
  ANALYSIS,
  GEOMETRY,
}

export type Toolbar = {
  toolbarMode: State<ToolbarMode | null>;
};

export function getToolbar({ toolbarMode }: Toolbar): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <div id="toolbar">
      <button
        class="toolbar-button ${toolbarMode.val === ToolbarMode.ANALYSIS
          ? "active"
          : ""}"
        @click=${() =>
          (toolbarMode.val =
            toolbarMode.val === ToolbarMode.ANALYSIS
              ? null
              : ToolbarMode.ANALYSIS)}
      >
        Analysis
      </button>
      <button
        class="toolbar-button ${toolbarMode.val === ToolbarMode.GEOMETRY
          ? "active"
          : ""}"
        @click=${() =>
          (toolbarMode.val =
            toolbarMode.val === ToolbarMode.GEOMETRY
              ? null
              : ToolbarMode.GEOMETRY)}
      >
        Geometry
      </button>
    </div>
  `;

  van.derive(() => {
    render(template(), container); // template is a function to be reactive
  });

  return container.firstElementChild as HTMLElement;
}
