import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { ComponentsType } from "@awatif/components";
import { ActiveAnalysis } from "../analysisList/getAnalysisList";

import "./styles.css";

export function getComponentsBar({
  componentsBarMode,
  activeAnalysis,
}: {
  componentsBarMode: State<ComponentsType | null>;
  activeAnalysis?: ActiveAnalysis;
}): HTMLElement {
  const container = document.createElement("div");
  const showAnalysis = activeAnalysis && activeAnalysis.val !== undefined;

  const template = () => html`
    <div id="components-bar">
      ${showAnalysis
        ? html`
            <button
              class="components-bar-button ${componentsBarMode.val ===
              ComponentsType.ANALYSIS
                ? "active"
                : ""}"
              @click=${() =>
                (componentsBarMode.val =
                  componentsBarMode.val === ComponentsType.ANALYSIS
                    ? null
                    : ComponentsType.ANALYSIS)}
            >
              Analysis
            </button>
          `
        : ""}

      <button
        class="components-bar-button ${componentsBarMode.val ===
        ComponentsType.LOADS
          ? "active"
          : ""}"
        @click=${() =>
          (componentsBarMode.val =
            componentsBarMode.val === ComponentsType.LOADS
              ? null
              : ComponentsType.LOADS)}
      >
        Loads
      </button>

      <button
        class="components-bar-button ${componentsBarMode.val ===
        ComponentsType.SUPPORTS
          ? "active"
          : ""}"
        @click=${() =>
          (componentsBarMode.val =
            componentsBarMode.val === ComponentsType.SUPPORTS
              ? null
              : ComponentsType.SUPPORTS)}
      >
        Supports
      </button>

      <button
        class="components-bar-button ${componentsBarMode.val ===
        ComponentsType.DESIGN
          ? "active"
          : ""}"
        @click=${() =>
          (componentsBarMode.val =
            componentsBarMode.val === ComponentsType.DESIGN
              ? null
              : ComponentsType.DESIGN)}
      >
        Design
      </button>
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
