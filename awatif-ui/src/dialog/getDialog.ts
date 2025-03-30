import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";

import "./styles.css";

export function getDialog({
  dialogBody,
}: {
  dialogBody: State<HTMLElement | undefined>;
}): HTMLElement {
  // Init
  const element = document.createElement("div");

  const dialogElm = createRef<HTMLDialogElement>();

  function template() {
    return html`
      <dialog ref=${ref(dialogElm)}>
        <div class="dialog-header">
          <span class="close" @click=${onClose}>&times;</span>
        </div>

        <div class="dialog-body">${dialogBody.val}</div>

        <div class="resize-handle resize-handle-right"></div>
        <div class="resize-handle resize-handle-top"></div>
      </dialog>
    `;
  }

  // Update
  element.id = "dialog";

  // Events
  // On dialogBody change render the dialog
  van.derive(() => {
    render(template(), element);
  });

  // On dialogBody change show the dialog
  van.derive(() => {
    if (dialogBody.val) dialogElm.value?.show();
  });

  // On close button click close the dialog and reset dialogBody
  function onClose() {
    dialogElm.value?.close();
    dialogBody.val = undefined;
  }

  // On resize click resize dialog
  addResizeListeners(dialogElm.value);

  return element;
}

// Utils
function addResizeListeners(dialog: HTMLDialogElement | null) {
  if (!dialog) return;

  const rightHandle = dialog.querySelector(".resize-handle-right")!;
  const topHandle = dialog.querySelector(".resize-handle-top")!;
  let isResizing = false;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let startTop = 0;

  // Resize from the right
  rightHandle.addEventListener("mousedown", (e: any) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = dialog.offsetWidth;
    document.body.style.cursor = "ew-resize";
    e.preventDefault();
  });

  // Resize from the top
  topHandle.addEventListener("mousedown", (e: any) => {
    isResizing = true;
    startY = e.clientY;
    startHeight = dialog.offsetHeight;
    startTop = parseFloat(getComputedStyle(dialog).top) || 0; // Track initial top position
    document.body.style.cursor = "ns-resize";
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    // Resizing from the right
    if (document.body.style.cursor === "ew-resize") {
      const newWidth = startWidth + (e.clientX - startX);
      dialog.style.width = `${newWidth}px`;
    }

    // Resizing from the top
    if (document.body.style.cursor === "ns-resize") {
      const deltaY = e.clientY - startY; // Difference in vertical movement
      const newHeight = startHeight - deltaY;
      const newTop = startTop + deltaY;

      if (newHeight > 100) {
        // Prevent collapsing below 100px height
        dialog.style.height = `${newHeight}px`;
        dialog.style.top = `${newTop}px`;
      }
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.cursor = "default";
  });
}
