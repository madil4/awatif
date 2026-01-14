import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getCanvas({
  activeCanvas,
  activeButton,
}: {
  activeCanvas: State<HTMLElement>;
  activeButton: State<string | null>;
}): HTMLElement {
  const panelContainer = document.createElement("div");
  panelContainer.id = "canvas-panel";

  const panelTemplate = () => html`
    <div class="canvas-content ${activeButton.val ? "open" : ""}">
      <div class="canvas-header">
        <h2>${activeButton.val}</h2>
      </div>
      <div class="canvas-body">${activeCanvas.val}</div>
    </div>
  `;

  van.derive(() => {
    render(panelTemplate(), panelContainer);
  });

  return panelContainer;
}
