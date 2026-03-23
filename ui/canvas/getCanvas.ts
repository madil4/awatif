import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { CanvasButtons } from "../canvasBar/getCanvasBar";

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
        <div class="canvas-header-left">
          <h2>${canvasButton.val}</h2>
          ${canvasButton.val === CanvasButtons.REPORT
            ? html`<button
                @click=${() => printCanvas(canvas)}
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

function printCanvas(canvas: State<HTMLDivElement | null>) {
  if (canvas.val == null) return;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (doc == null) return;

  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
    doc.head.appendChild(node.cloneNode(true));
  });

  const style = doc.createElement("style");
  style.textContent = "* { overflow: visible !important; }";
  doc.head.appendChild(style);

  doc.body.appendChild(canvas.val.cloneNode(true));
  doc.close();

  iframe.contentWindow?.focus();

  iframe.contentWindow?.addEventListener("afterprint", () => {
    document.body.removeChild(iframe);
  });

  iframe.contentWindow?.print();
}
