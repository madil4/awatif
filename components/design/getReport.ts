import { html, render } from "lit-html";
import { DesignTemplate, LineElementForces } from "./data-model";
import { Components, ComponentsType, Mesh } from "../data-model";
import {
  LoadSelection,
  LOAD_SELECTION_LABELS,
  ULS_COMBINATIONS,
} from "../loads/data-model";

const toggleStates = new Map<string, boolean>();

export function getReport({
  components,
  geometryMapping,
  internalForces,
  designs,
  templates,
  activeLoadCase,
}: {
  components: Components["val"];
  geometryMapping?: Mesh["geometryMapping"]["val"];
  internalForces?: Mesh["internalForces"]["val"];
  designs?: Map<number, any>;
  templates: Map<ComponentsType, Map<string, any>>;
  activeLoadCase?: LoadSelection;
}): HTMLDivElement {
  const container = document.createElement("div");
  container.style.padding = "10px";

  const designComponents = components.get(ComponentsType.DESIGN) ?? [];

  // Track toggle states for each line

  const loadCaseLabel = activeLoadCase
    ? LOAD_SELECTION_LABELS[activeLoadCase]
    : null;
  const ulsFactors =
    activeLoadCase && activeLoadCase in ULS_COMBINATIONS
      ? ULS_COMBINATIONS[activeLoadCase as keyof typeof ULS_COMBINATIONS]
      : null;
  const hasMembers = designComponents.some((c) => c.geometry.length > 0);

  const renderReport = () => {
    let isFirstLine = true;

    const reportTemplate = html`
      <div>
        ${loadCaseLabel
          ? html`<div
              style="margin-bottom: 10px; padding: 6px 12px; border-radius: 4px; background: var(--bg-secondary); border: 1px solid var(--border); font-size: 0.8rem; color: var(--text-secondary);"
            >
              <span style="font-weight: 500; color: var(--text-primary);"
                >Load case:</span
              >
              ${ulsFactors
                ? html`<span style="margin-left: 6px;"
                    >${loadCaseLabel} — ${ulsFactors.dead}·G +
                    ${ulsFactors.live}·Q + ${ulsFactors.wind}·W</span
                  >`
                : html`<span style="margin-left: 6px;">${loadCaseLabel}</span>`}
            </div>`
          : null}
        ${!hasMembers
          ? html`<div
              style="padding: 24px; text-align: center; color: var(--text-secondary); background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 4px; display: flex; flex-direction: column; gap: 8px; align-items: center;"
            >
              <span style="font-size: 1.2rem; opacity: 0.5;">📋</span>
              <div style="font-weight: 500; color: var(--text-primary);">
                No Report Available
              </div>
              <div style="font-size: 0.85rem; line-height: 1.4;">
                Add a design component to your model to generate a detailed
                report for your members.
              </div>
            </div>`
          : null}
        ${designComponents.map((component) => {
          const template = templates
            .get(ComponentsType.DESIGN)
            ?.get(component.templateId) as DesignTemplate<any, any>;

          if (!template) return null;

          return html` ${component.geometry.map((lineId) => {
            // Skip if template doesn't have a getReport function
            if (!template.getReport) {
              return null;
            }

            // Extract element forces for this line
            let lineElementForces: LineElementForces | undefined;

            if (geometryMapping && internalForces) {
              const elementIndices =
                geometryMapping.lineToElements.get(lineId) ?? [];

              if (elementIndices.length > 0) {
                const elementForces = [];

                for (const elemIdx of elementIndices) {
                  const forces = internalForces.get(elemIdx);
                  if (forces) {
                    elementForces.push(forces);
                  }
                }

                if (elementForces.length > 0) {
                  lineElementForces = {
                    elementIndices,
                    elementForces,
                  };
                }
              }
            }

            const report = template.getReport({
              params: ({ ...template.defaultParams, ...component.params }) as Parameters<
                typeof template.getReport
              >[0]["params"],
              design: designs?.get(lineId),
            });
            const toggleKey = `${component.name}-${lineId}`;
            const defaultOpen = isFirstLine;
            isFirstLine = false;
            const isOpen = toggleStates.get(toggleKey) ?? defaultOpen;

            return html`
              <div
                style="margin-bottom: 8px; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; background: var(--bg-secondary);"
              >
                <button
                  style="width: 100%; text-align: left; cursor: pointer; padding: 10px 12px; border: none; background: ${isOpen
                    ? "var(--bg-tertiary)"
                    : "var(--bg-secondary)"}; color: var(--text-primary); font-size: 0.85rem; display: flex; align-items: center; gap: 10px; transition: background 0.15s ease;"
                  @click=${() => {
                    toggleStates.set(toggleKey, !isOpen);
                    renderReport();
                  }}
                  @mouseover=${(e: MouseEvent) => {
                    (e.target as HTMLElement).style.background =
                      "var(--bg-hover)";
                  }}
                  @mouseout=${(e: MouseEvent) => {
                    (e.target as HTMLElement).style.background = isOpen
                      ? "var(--bg-tertiary)"
                      : "var(--bg-secondary)";
                  }}
                >
                  <span style="color: var(--text-secondary); font-size: 0.7rem;"
                    >${isOpen ? "▼" : "▶"}</span
                  >
                  <span style="font-weight: 500;">Member ${lineId}</span>
                  <span style="color: var(--text-secondary); font-size: 0.8rem;"
                    >· ${component.name}</span
                  >
                </button>
                ${isOpen
                  ? html`<div
                      style="padding: 12px; background: var(--bg-primary); border-top: 1px solid var(--border);"
                    >
                      ${report}
                    </div>`
                  : null}
              </div>
            `;
          })}`;
        })}
      </div>
    `;

    render(reportTemplate, container);
  };

  renderReport();

  return container;
}
