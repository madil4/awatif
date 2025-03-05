import { html, render, TemplateResult } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";
import van, { State } from "vanjs-core";
import "./styles.css";

export function dialog({
    template,
    data,
  }: {
    template: (data: State<object>) => TemplateResult;
    data: State<object>;
  }): HTMLElement {
    const container = document.createElement("div");
  
    // dialog
    let dialogElm = createRef<HTMLDialogElement>();
    let dialogBodyElm = createRef<HTMLDivElement>();
  
    // dialog template
    const dialogTemp = html`
      <dialog open class="dialog-input" ref=${ref(dialogElm)}>
        <div class="resize-handle resize-handle-right"></div>
        <div class="resize-handle resize-handle-top"></div>
        <div class="dialog-header">
          <span class="close" @click=${() => dialogElm.value?.close()}>&times;</span>
        </div>
        <div class="dialog-body" ref=${ref(dialogBodyElm)}>
          <div class="input-content">
            <!-- Content generated from the template -->
          </div>
        </div>
      </dialog>
    `;
  
    render(dialogTemp, container);
  
    // Add resizing functionality
    addResizeListeners(dialogElm.value);
  
    // Render report content inside the dialog
    van.derive(() => {
      render(template(data), dialogBodyElm.value);
    });
  
    return container;
  }

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
    rightHandle.addEventListener("mousedown", (e) => {
      isResizing = true;
      startX = e.clientX;
      startWidth = dialog.offsetWidth;
      document.body.style.cursor = "ew-resize";
      e.preventDefault();
    });
  
    // Resize from the top
    topHandle.addEventListener("mousedown", (e) => {
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
  
        if (newHeight > 100) { // Prevent collapsing below 100px height
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
  
