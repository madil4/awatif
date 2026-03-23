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
        <h2>${canvasButton.val}</h2>
        <div class="canvas-header-actions">
          <button
            @click=${() => printCanvas(canvas)}
            class="print-button"
            title="Print"
          >
            Print
          </button>
          <button
            class="close-button"
            @click=${() => (canvasButton.val = null)}
            title="Close"
          >
            ×
          </button>
        </div>
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
