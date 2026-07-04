import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export function getCanvas({
  canvas,
  canvasButton,
}: {
  canvas: State<HTMLDivElement | null>;
  canvasButton: State<string | null>;
}): HTMLElement {
  const container = document.createElement("div");

  const template = () => html`
    <div id="canvas" class=" ${canvasButton.val ? "open" : ""}">
      <div class="canvas-header">
        <div class="canvas-header-left">
          <h2>${canvasButton.val}</h2>
          ${canvasButton.val === "Report"
            ? html`<button
                @click=${() => printCanvas()}
                class="print-button"
                title="Print"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Print
              </button>`
            : ""}
        </div>
        <button
          class="close-button"
          @click=${() => (canvasButton.val = null)}
          title="Close"
        >
          ×
        </button>
      </div>
      <div class="canvas-body">${canvas.val}</div>
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}

function printCanvas() {
  document.documentElement.classList.add("printing-canvas");
  document.body.classList.add("printing-canvas");
  window.print();

  const cleanup = () => {
    document.documentElement.classList.remove("printing-canvas");
    document.body.classList.remove("printing-canvas");
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);

  // Fallback for browsers that don't support afterprint or if it fires early.
  setTimeout(cleanup, 1000);
}
