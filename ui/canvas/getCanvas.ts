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
  const container = document.createElement("div");

  const template = () => html`
    <div id="canvas" class=" ${toolbarButton.val ? "open" : ""}">
      <div class="canvas-header">
        <h2>${toolbarButton.val}</h2>
      </div>
      <div class="canvas-body">${canvas.val}</div>
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
