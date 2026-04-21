import van, { State } from "vanjs-core";
import { html, render } from "lit-html";

import "./styles.css";

export type AnalysisStatus = State<{
  success: boolean;
  iterations?: number;
  unassignedLines?: number[];
}>;

export function getAnalysisStatus(
  status: AnalysisStatus,
  display?: { lineIndex: State<boolean> },
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

  if (display?.lineIndex) {
    let previousLineIndex = false;
    el.addEventListener("mouseenter", () => {
      if (status.val.unassignedLines?.length) {
        previousLineIndex = display.lineIndex.val;
        display.lineIndex.val = true;
      }
    });
    el.addEventListener("mouseleave", () => {
      if (status.val.unassignedLines?.length) {
        display.lineIndex.val = previousLineIndex;
      }
    });
  }

  van.derive(() => {
    const { success, iterations, unassignedLines } = status.val;
    const hasWarning = unassignedLines && unassignedLines.length > 0;
    const warningSuffix = hasWarning
      ? ` — lines ${unassignedLines.map((id) => `${id}`).join(", ")} have no design member assigned`
      : "";

    if (success) {
      dot.className = "dot success" + (hasWarning ? " warning" : "");
      label.textContent = iterations !== undefined ? `${iterations} iters` : "";
      tooltip.textContent =
        iterations !== undefined
          ? `Analysis done (${iterations} iterations)${warningSuffix}`
          : `Analysis done${warningSuffix}`;
    } else {
      dot.className = "dot error" + (hasWarning ? " warning" : "");
      label.textContent = "";
      tooltip.textContent = `Unstable structure${warningSuffix}`;
    }
  });

  return el;
}
