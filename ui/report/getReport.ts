import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getReport(): {
  button: HTMLElement;
  panel: HTMLElement;
} {
  const isOpen = van.state(false);

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "report-button";

  // Create panel container
  const panelContainer = document.createElement("div");
  panelContainer.id = "report-panel";

  const buttonTemplate = () => html`
    <button
      @click=${() => {
        isOpen.val = !isOpen.val;
      }}
    >
      ${isOpen.val ? "Report" : "Report"}
    </button>
  `;

  const panelTemplate = () => html`
    <div class="report-content ${isOpen.val ? "open" : ""}">
      <div class="report-header">
        <h2>Report</h2>
        <button
          class="close-button"
          @click=${() => {
            isOpen.val = false;
          }}
        >
          ×
        </button>
      </div>
      <div class="report-body">
        <!-- Empty panel for now -->
      </div>
    </div>
  `;

  // Reactive rendering
  van.derive(() => {
    render(buttonTemplate(), buttonContainer);
  });

  van.derive(() => {
    render(panelTemplate(), panelContainer);
  });

  return {
    button: buttonContainer,
    panel: panelContainer,
  };
}
