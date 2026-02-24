import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { ComponentsType, LoadCase } from "@awatif/components";
import { ActiveAnalysis } from "../analysisList/getAnalysisList";

import "./styles.css";

export function getComponentsBar({
  componentsBarMode,
  activeAnalysis,
  loadCase,
}: {
  componentsBarMode: State<ComponentsType | null>;
  activeAnalysis?: ActiveAnalysis;
  loadCase?: State<LoadCase>;
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
              ${activeAnalysis?.val
                ? html`<span class="analysis-badge"
                    >${activeAnalysis.val === "linear"
                      ? "Linear"
                      : "Nonlinear"}</span
                  >`
                : ""}
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
        ${loadCase?.val
          ? html`<span class="analysis-badge"
              >${loadCase.val.charAt(0).toUpperCase() +
              loadCase.val.slice(1)}</span
            >`
          : ""}
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
        ComponentsType.SPECIAL
          ? "active"
          : ""}"
        @click=${() =>
          (componentsBarMode.val =
            componentsBarMode.val === ComponentsType.SPECIAL
              ? null
              : ComponentsType.SPECIAL)}
      >
        Special
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
