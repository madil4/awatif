import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export type AnalysisStatus = State<{ success: boolean; iterations?: number }>;

export function getAnalysisStatus(
  status: AnalysisStatus,
): HTMLElement {
  const container = document.createElement("div");

  const template = html`
    <div id="analysis-status">
      <span class="dot"></span>
      <span class="label"></span>
      <span class="tooltip"></span>
    </div>
  `;

  render(template, container);

  const el = container.firstElementChild as HTMLElement;
  const dot = el.querySelector(".dot") as HTMLElement;
  const label = el.querySelector(".label") as HTMLElement;
  const tooltip = el.querySelector(".tooltip") as HTMLElement;

  van.derive(() => {
    const { success, iterations } = status.val;
    if (success) {
      dot.className = "dot success";
      label.textContent = iterations !== undefined ? `${iterations} iters` : "";
      tooltip.textContent =
        iterations !== undefined
          ? `Analysis done (${iterations} iterations)`
          : "Analysis done";
    } else {
      dot.className = "dot error";
      label.textContent = "";
      tooltip.textContent = "Unstable structure";
    }
  });

  return el;
}
