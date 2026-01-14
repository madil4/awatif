import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { ToolbarButtons } from "../toolbar/getToolbar";

import "./styles.css";

export function getCanvas({
  canvas,
  toolbarButton,
}: {
  canvas: State<HTMLDivElement | null>;
  toolbarButton: State<ToolbarButtons | null>;
}): HTMLElement {
  const panelContainer = document.createElement("div");
  panelContainer.id = "canvas-panel";

  const template = () => html`
    <div class="canvas-content ${toolbarButton.val ? "open" : ""}">
      <div class="canvas-header">
        <h2>${toolbarButton.val}</h2>
      </div>
      <div class="canvas-body">${canvas.val?.innerHTML}</div>
    </div>
  `;

  van.derive(() => {
    render(template(), panelContainer);
  });

  return panelContainer;
}
