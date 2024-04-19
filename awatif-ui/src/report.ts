import { TemplateResult, html, render } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import "./styles/report.css";

export const report = (
  reports: ((i: any, b: any) => TemplateResult)[],
  designInputs: any[],
  designOutputs: any[]
) => {
  const processedAnalysis: any = {
    0: "analysis 0",
    1: "analysis 1",
  };
  const processedDesign: any = {
    0: "design 0",
    1: "design 1",
  };

  // Todo: optimize these loops
  const elementReports = new Map<number, any>();
  reports.forEach((report) => {
    designInputs.forEach((designInput) => {
      const reportName = report.name.slice(0, -6);
      if (reportName in designInput) {
        elementReports.set(designInput.element, report);
      }
    });
  });

  // init
  let dialogElm = createRef<HTMLDialogElement>();
  let dialogBodyElm = createRef<HTMLDivElement>();

  const topBarTemp = html`<div class="topBar">
    <a @click=${onTopBarReportClick} href="#report">Report</a>
  </div>`;

  const elements = html` <select @change=${onElementChange}>
    ${Array.from(elementReports.keys()).map(
      (key) => html`<option value="${key}">element ${key}</option>`
    )}
  </select>`;

  const dialogTemp = html`<dialog open ref=${ref(dialogElm)}>
    <div class="dialog-content">
      <div class="dialog-header">
        <span class="close" @click=${onDialogClose}>&times;</span>
        ${elements}
      </div>
      <div class="dialog-body" ref=${ref(dialogBodyElm)} />
    </div>
  </dialog>`;

  // update
  render(html`${topBarTemp}${dialogTemp}`, document.body);
  if (dialogBodyElm.value)
    render(
      elementReports.get(0)(processedAnalysis[0], processedDesign[0]),
      dialogBodyElm.value
    );

  // events
  function onDialogClose() {
    dialogElm.value?.close();
  }

  function onTopBarReportClick() {
    dialogElm.value?.showModal();
  }

  function onElementChange(ev: any) {
    const i = Number(ev.target.value);

    if (dialogBodyElm.value)
      render(
        elementReports.get(i)(processedAnalysis[i], processedDesign[i]),
        dialogBodyElm.value
      );
  }
};
