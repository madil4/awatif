import van from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getReport(): {
  button: HTMLElement;
  panel: HTMLElement;
} {
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "report-button";

  const panelContainer = document.createElement("div");
  panelContainer.id = "report-panel";

  const isOpen = van.state(false);

  const buttonTemplate = () => html`
    <button
      @click=${() => {
        isOpen.val = !isOpen.val;
      }}
    >
      Report
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
      <div class="report-body"></div>
    </div>
  `;

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
