import { html, render } from "lit-html";
import { DesignTemplate } from "./data-model";
import { templates } from "../templates";
import { Components, ComponentsType } from "../data-model";

export function getReport({
  components,
}: {
  components: Components["val"];
}): HTMLDivElement {
  const container = document.createElement("div");
  container.style.padding = "20px";

  const designComponents = components.get(ComponentsType.DESIGN) ?? [];

  // Track toggle states for each line
  const toggleStates = new Map<string, boolean>();

  const renderReport = () => {
    const reportTemplate = html`
      <div>
        ${designComponents.map((component) => {
          const template = templates.get(ComponentsType.DESIGN)?.[
            component.templateIndex
          ] as DesignTemplate<any>;

          if (!template) return null;

          const report = template.getReport({
            params: component.params as Parameters<
              typeof template.getReport
            >[0]["params"],
          });

          return html`
            ${component.geometry.map((lineId) => {
              const toggleKey = `${component.name}-${lineId}`;
              const isOpen = toggleStates.get(toggleKey) ?? false;

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
                    <span
                      style="color: var(--text-secondary); font-size: 0.7rem;"
                      >${isOpen ? "▼" : "▶"}</span
                    >
                    <span style="font-weight: 500;">Line ${lineId}</span>
                    <span
                      style="color: var(--text-secondary); font-size: 0.8rem;"
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
            })}
          `;
        })}
      </div>
    `;

    render(reportTemplate, container);
  };

  renderReport();

  return container;
}
