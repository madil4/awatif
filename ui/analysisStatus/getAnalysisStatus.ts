import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export type AnalysisStatus = State<boolean>;

export function getAnalysisStatus(
  status: AnalysisStatus,
): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="analysis-status">
      <span class="dot"></span>
      <span class="tooltip"></span>
    </div>
  `;

  render(template, container);

  const el = container.firstElementChild as HTMLElement;
  const dot = el.querySelector(".dot") as HTMLElement;
  const tooltip = el.querySelector(".tooltip") as HTMLElement;

  van.derive(() => {
    if (status.val) {
      dot.className = "dot success";
      tooltip.textContent = "Analysis done";
    } else {
      dot.className = "dot error";
      tooltip.textContent = "Unstable structure";
    }
  });

  return el;
}
