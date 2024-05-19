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
  let reportsMap = new Map<string, any>();
  let active = true;
  let renderCount = 0;

  // events
  function onDialogClose() {
    active = false;
    dialogElm.value?.close();
  }

  function onTopBarReportClick() {
    active = true;
    dialogElm.value?.show();
  }

  function onElementChange(ev: any) {
    currentElemIndex.val = ev.target.value;
  }

  // todo: a better approach is to leave this filtering to the user, you just gonna provide all data
  // on model model change: render dialog
  van.derive(() => {
    reportsMap.clear();

    // Todo: optimize these loops
    reports.forEach((report) => {
      modelState.val.designInputs.forEach((designInput) => {
        const reportName = report.name.slice(0, -6);
        if (reportName in designInput) {
          if (designInput.element != undefined)
            reportsMap.set("element " + designInput.element, report);
          if (designInput.node != undefined)
            reportsMap.set("node " + designInput.node, report);
        }
      });

      if (report.name === "summaryReport")
        reportsMap.set("summaryReport", report);
    });

    if (!currentElemIndex.val) {
      const k = reportsMap?.keys();
      k.next();
      currentElemIndex.val = k.next().value;
    }

    // init html
    const topBarTemp = html`<div class="topBar">
      <a @click=${onTopBarReportClick} href="#report">Report</a>
    </div>`;

    const elements = html` <select @change=${onElementChange}>
      ${Array.from(reportsMap.keys()).map(
        (key) => html`<option value="${key}">${key}</option>`
      )}
    </select>`;

    const dialogTemp = html`<dialog open ref=${ref(dialogElm)} >
    <div class="dialog-header">
      <span class="close" @click=${onDialogClose}>&times;</span>
      ${elements}
    </div>
    <div class="dialog-body" ref=${ref(dialogBodyElm)}>
  </dialog>`;

    render(html`${topBarTemp}${dialogTemp}`, document.body);
  });

  // on model change or current index change: render html
  van.derive(() => {
    currentElemIndex.val; // to trigger when changed
    modelState.val; // to trigger when changed

    if (
      (dialogBodyElm.value && active) ||
      (dialogBodyElm.value && renderCount < 2)
    ) {
      if (currentElemIndex.val === "summaryReport") {
        render(
          reportsMap.get(currentElemIndex.val)(modelState.val),
          dialogBodyElm.value
        );
      } else {
        render(
          reportsMap.get(currentElemIndex.val)(
            modelState.val.designInputs.get(currentElemIndex.val),
            modelState.val.designOutputs.get(currentElemIndex.val)
          ),
          dialogBodyElm.value
        );
      }

      renderCount++;
    }
  });

  setTimeout(() => {
    currentElemIndex.val = reportsMap?.keys().next().value;
  }, 100);
};
