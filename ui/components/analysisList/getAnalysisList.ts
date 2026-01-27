import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { ComponentsType } from "@awatif/components";

export type ActiveAnalysis = State<"linear" | "nonlinear">;

export function getAnalysisList({
  componentsBarMode,
  activeAnalysis,
}: {
  componentsBarMode: State<ComponentsType | null>;
  activeAnalysis?: ActiveAnalysis;
}): HTMLElement {
  const container = document.createElement("div");

  const template = () => {
    if (componentsBarMode.val !== ComponentsType.ANALYSIS) return html``;

    return html`
      <div id="list" ?open=${true}>
        <summary>Components</summary>
        ${analysisItem("Linear analysis", "linear")}
        ${analysisItem("Nonlinear analysis", "nonlinear")}
      </div>
    `;
  };

  function analysisItem(name: string, id: string) {
    const isActive = activeAnalysis?.val === id;

    return html`
      <div
        class="components-item ${isActive ? "active" : ""}"
        @click=${() =>
          activeAnalysis && (activeAnalysis.val = id as "linear" | "nonlinear")}
      >
        <label>${name}</label>
      </div>
    `;
  }

  van.derive(() => {
    render(template(), container);
  });

  return container;
}
