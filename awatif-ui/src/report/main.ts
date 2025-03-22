import van from "vanjs-core";
import { html } from "lit-html";

import { getReport } from "./getReport";

const nodes = van.state([0, 0, 1]);

const template = (nodes) => {
  return html`<p>Number of nodes: ${nodes.val.length}</p>`;
};

setTimeout(() => {
  nodes.val = [];
}, 1000);

const reportElm = getReport({
  template,
  data: nodes,
});

document.body.appendChild(reportElm);
