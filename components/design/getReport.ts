import { html, render } from "lit-html";
import { DesignTemplate, LineElementForces, DesignResult } from "./data-model";
import { templates } from "../templates";
import { Components, ComponentsType, Mesh, ElementForces } from "../data-model";

const toggleStates = new Map<string, boolean>();

export function getReport({
  components,
  geometryMapping,
  internalForces,
  designResults,
}: {
  components: Components["val"];
  geometryMapping?: Mesh["geometryMapping"]["val"];
  internalForces?: Map<number, ElementForces>;
  designResults?: Map<number, DesignResult>;
}): HTMLDivElement {
  const container = document.createElement("div");
  container.style.padding = "10px";

  const designComponents = components.get(ComponentsType.DESIGN) ?? [];

  // Track toggle states for each line

  const renderReport = () => {
    let isFirstLine = true;

    const reportTemplate = html`
      <div>
        ${designComponents.map((component) => {
          const template = templates.get(ComponentsType.DESIGN)?.[
            component.templateIndex
          ] as DesignTemplate<any>;

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
                const elementForces: ElementForces[] = [];

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
              params: component.params as Parameters<
                typeof template.getReport
              >[0]["params"],
              lineId,
              lineElementForces,
              designResult: designResults?.get(lineId),
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
                  <span style="font-weight: 500;">Line ${lineId}</span>
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
