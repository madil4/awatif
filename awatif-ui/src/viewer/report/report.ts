import { html, render, TemplateResult } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";
import van from "vanjs-core";

import "./style.css";

export function report({
  template,
  data,
}: {
  template: (data: any) => TemplateResult;
  data: any;
}): HTMLElement {
  // Init
  const container = document.createElement("div");

  const button = document.createElement("report-button");
  button.textContent = "Report";
  button.classList.add("report-button");

  const dialogElm = createRef<HTMLDialogElement>();
  const dialogBodyElm = createRef<HTMLDivElement>();

  const dialogTemp = html`
    <dialog ref=${ref(dialogElm)}>
      <div class="dialog-header">
        <span class="close" @click=${() =>
          dialogElm.value?.close()}>&times;</span>
      </div>
      <div class="dialog-body" ref=${ref(dialogBodyElm)}>
        <div class="report-content">
          <!-- Content generated from the template -->
      </div>
    </dialog>
  `;

  // Update
  render(dialogTemp, container);
  container.append(button);

  // Events
  // Open the dialog when the Report button is clicked
  button.addEventListener("click", () => {
    dialogElm.value?.show();
  });

  // Render report content inside the dialog
  van.derive(() => {
    render(template(data), dialogBodyElm.value);
  });

  return container;
}
