import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { ComponentsType, LoadSelection, LOAD_SELECTION_LABELS } from "@awatif/components";
import { ActiveAnalysis } from "../analysisList/getAnalysisList";
import { getAnalysisStatus, AnalysisStatus } from "../../analysisStatus/getAnalysisStatus";

import "./styles.css";

export function getComponentsBar({
  componentsBarMode,
  activeAnalysis,
  loadCase,
  analysisStatus,
  display,
}: {
  componentsBarMode: State<ComponentsType | null>;
  activeAnalysis?: ActiveAnalysis;
  loadCase?: State<LoadSelection>;
  analysisStatus?: AnalysisStatus;
  display?: { lineIndex: State<boolean> };
}): HTMLElement {
  const container = document.createElement("div");
  const showAnalysis = activeAnalysis && activeAnalysis.val !== undefined;
  const statusEl = analysisStatus ? getAnalysisStatus(analysisStatus, display) : null;

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
        ${loadCase?.val && loadCase.val !== "uls-live" && loadCase.val !== "uls-wind"
          ? html`<span class="analysis-badge"
              >${LOAD_SELECTION_LABELS[loadCase.val]}</span
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

      ${statusEl}
    </div>
  `;

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
