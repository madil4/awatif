import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export enum ToolbarMode {
  SOON,
  GEOMETRY,
  MESH,
}

export type Toolbar = {
  toolbarMode: State<ToolbarMode | null>;
};

export function getToolbar({ toolbarMode }: Toolbar): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <div id="toolbar">
      <button
        class="toolbar-button ${toolbarMode.val === ToolbarMode.SOON
          ? "active"
          : ""}"
        @click=${() =>
          (toolbarMode.val =
            toolbarMode.val === ToolbarMode.SOON ? null : ToolbarMode.SOON)}
      >
        Soon
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
      <button
        class="toolbar-button ${toolbarMode.val === ToolbarMode.MESH
          ? "active"
          : ""}"
        @click=${() =>
          (toolbarMode.val =
            toolbarMode.val === ToolbarMode.MESH ? null : ToolbarMode.MESH)}
      >
        Mesh
      </button>
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
