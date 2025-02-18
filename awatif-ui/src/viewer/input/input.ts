import { html, render, TemplateResult } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";
import van, { State } from "vanjs-core";
import "./style.css";

export function input({
  template,
  data,
  sheetsElm,
}: {
  template: (data: State<object>) => TemplateResult;
  data: State<object>;
  sheetsElm: HTMLElement;
}): HTMLElement {
  const container = document.createElement("div");

  // report button
  const button = document.createElement("input-button");
  button.textContent = "Input";
  button.classList.add("input-button");

  // dialog
  let dialogElm = createRef<HTMLDialogElement>();
  let dialogBodyElm = createRef<HTMLDivElement>();
  
  // dialog template
  const dialogTemp = html`
    <dialog class="dialog-input" ref=${ref(dialogElm)}>
      <div class="dialog-header" @mousedown=${startDrag}>
        <span
          class="close"
          @click=${() => dialogElm.value?.close()}
          >&times;</span
        >
      </div>
      <div class="dialog-body" ref=${ref(dialogBodyElm)}>
        <div class="input-content">
          <!-- Content generated from the template -->
        </div>
      </div>
      <div class="dialog-body" style="display: flex; justify-content: center;">
        <div class="sheets-container">
          <!-- Include the sheetsElm here -->
          ${sheetsElm}
        </div>
      </div>
    </dialog>
  `;

  render(dialogTemp, container);
  container.append(button);

  // Open the dialog when the Report button is clicked
  button.addEventListener("click", () => {
    dialogElm.value?.showModal();
  });

  // Render report content inside the dialog
  van.derive(() => {
    render(template(data), dialogBodyElm.value);
  });

  // Draggable functionality
  let offsetX = 0, offsetY = 0;

  function startDrag(event: MouseEvent) {
    // Get initial mouse position and dialog position
    offsetX = event.clientX - dialogElm.value!.getBoundingClientRect().left;
    offsetY = event.clientY - dialogElm.value!.getBoundingClientRect().top;

    // Add mousemove and mouseup listeners
    document.addEventListener("mousemove", dragDialog);
    document.addEventListener("mouseup", stopDrag);
  }

  function dragDialog(event: MouseEvent) {
    const dialog = dialogElm.value!;
    dialog.style.left = `${event.clientX - offsetX}px`;
    dialog.style.top = `${event.clientY - offsetY}px`;
  }

  function stopDrag() {
    document.removeEventListener("mousemove", dragDialog);
    document.removeEventListener("mouseup", stopDrag);
  }

  return container;
}
