import { TemplateResult, html, render } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import "./styles/report.css";
import { ModelState } from "./types";
import van from "vanjs-core";

export const report = (
  reports: ((i: any, b: any) => TemplateResult)[],
  modelState: ModelState
) => {
  // init
  let currentElemIndex = van.state(0);
  let dialogElm = createRef<HTMLDialogElement>();
  let dialogBodyElm = createRef<HTMLDivElement>();

  // Todo: optimize these loops
  const elementReports = new Map<number, any>();
  reports.forEach((report) => {
    modelState.val.designInputs.forEach((designInput) => {
      const reportName = report.name.slice(0, -6);
      if (reportName in designInput) {
        elementReports.set(designInput.element, report);
      }
    });
  });

  // init html
  const topBarTemp = html`<div class="topBar">
    <a @click=${onTopBarReportClick} href="#report">Report</a>
  </div>`;

  const elements = html` <select @change=${onElementChange}>
    ${Array.from(elementReports.keys()).map(
      (key) => html`<option value="${key}">element ${key}</option>`
    )}
  </select>`;

  const dialogTemp = html`<dialog ref=${ref(dialogElm)}>
    <div class="dialog-header">
      <span class="close" @click=${onDialogClose}>&times;</span>
      ${elements}
    </div>
    <div class="dialog-body" ref=${ref(dialogBodyElm)} />
  </dialog>`;

  // update
  render(html`${topBarTemp}${dialogTemp}`, document.body);

  // events
  function onDialogClose() {
    dialogElm.value?.close();
  }

  function onTopBarReportClick() {
    dialogElm.value?.show();
  }

  function onElementChange(ev: any) {
    currentElemIndex.val = Number(ev.target.value);
  }

  // on model change or current index change: render html
  van.derive(() => {
    if (dialogBodyElm.value)
      render(
        elementReports.get(currentElemIndex.val)(
          modelState.val.designInputs.get(currentElemIndex.val),
          modelState.val.designOutputs.get(currentElemIndex.val)
        ),
        dialogBodyElm.value
      );
  });
};
