import { TemplateResult, html, render } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";
import { ModelState } from "./types";
import van from "vanjs-core";

import "./styles/report.css";

export const report = (
  reports: ((i: any, b: any) => TemplateResult)[],
  modelState: ModelState
) => {
  // init
  let currentElemIndex = van.state("");
  let dialogElm = createRef<HTMLDialogElement>();
  let dialogBodyElm = createRef<HTMLDivElement>();

  // Todo: optimize these loops
  const reportsMap = new Map<string, any>();
  reports.forEach((report) => {
    modelState.val.designInputs.forEach((designInput) => {
      const reportName = report.name.slice(0, -6);
      if (reportName in designInput) {
        //if (designInput.element != undefined)
        // reportsMap.set("element " + designInput.element, report);
        if (designInput.node != undefined)
          reportsMap.set("node " + designInput.node, report);
      }
    });
  });

  currentElemIndex.val = reportsMap.keys().next().value;

  // init html
  const topBarTemp = html`<div class="topBar">
    <a @click=${onTopBarReportClick} href="#report">Report</a>
  </div>`;

  const elements = html` <select @change=${onElementChange}>
    ${Array.from(reportsMap.keys()).map(
      (key) => html`<option value="${key}">${key}</option>`
    )}
  </select>`;

  const dialogTemp = html`<dialog ref=${ref(dialogElm)}>
    <div class="dialog-header">
      <span class="close" @click=${onDialogClose}>&times;</span>
      ${elements}
    </div>
    <div class="dialog-body" ref=${ref(dialogBodyElm)}>
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
    currentElemIndex.val = ev.target.value;
  }

  // on model change or current index change: render html
  van.derive(() => {
    if (dialogBodyElm.value)
      render(
        reportsMap.get(currentElemIndex.val)(
          modelState.val.designInputs.get(currentElemIndex.val),
          modelState.val.designOutputs.get(currentElemIndex.val)
        ),
        dialogBodyElm.value
      );
  });
};
