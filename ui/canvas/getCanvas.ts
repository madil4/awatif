import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getCanvas({
  activeCanvas,
}: {
  activeCanvas: State<HTMLElement>;
}): HTMLElement {
  const panelContainer = document.createElement("div");
  panelContainer.id = "canvas-panel";

  const panelTemplate = () => html`
    <div class="canvas-content open">
      <div class="canvas-header">
        <h2>Canvas</h2>
      </div>
      <div class="canvas-body">${activeCanvas.val}</div>
    </div>
  `;

  van.derive(() => {
    render(panelTemplate(), panelContainer);
  });

  return panelContainer;
}
