import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { CanvasButtons } from "../toolbar/getToolbar";

import "./styles.css";

export function getCanvas({
  canvas,
  canvasButton,
}: {
  canvas: State<HTMLDivElement | null>;
  canvasButton: State<CanvasButtons | null>;
}): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <div id="canvas" class=" ${canvasButton.val ? "open" : ""}">
      <div class="canvas-header">
        <h2>${canvasButton.val}</h2>
      </div>
      <div class="canvas-body">${canvas.val}</div>
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
