import { html, render } from "lit-html";
import { ref, createRef } from "lit-html/directives/ref.js";

import "./styles/report.css";

export const report = (reports: Function[]) => {
  // init
  let dialogElm = createRef<HTMLDialogElement>();

  const topBarTemp = html`<div class="topBar">
    <a @click=${onTopBarReportClick} href="#report">Report</a>
  </div>`;

  const dialogTemp = html`<dialog ref=${ref(dialogElm)}>
    <div class="dialog-content">
      <span class="close" @click=${onDialogClose}>&times;</span>

      ${reports[0](undefined, undefined)}
    </div>
  </dialog>`;

  // update
  render(html`${topBarTemp}${dialogTemp}`, document.body);

  // events
  function onDialogClose() {
    dialogElm.value?.close();
  }

  function onTopBarReportClick() {
    dialogElm.value?.showModal();
  }
};
