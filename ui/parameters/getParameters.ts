import van, { State } from "vanjs-core";
import { html, render, TemplateResult } from "lit-html";
import { MeshComponents, meshTemplates } from "@awatif/components";

import "./styles.css";

export function getParameters({
  activeComponent,
  meshComponents,
}: {
  activeComponent: State<number | null>;
  meshComponents: MeshComponents;
}): HTMLElement {
  const container = document.createElement("div");

  // Local reactive state for the active component's params
  const localParams = van.state<Record<string, unknown>>({});

  // Track which component we're currently editing to detect changes
  let currentComponentIndex: number | null = null;

  // Sync local params changes back to meshComponents
  van.derive(() => {
    const params = localParams.val;
    const idx = activeComponent.val;

    if (idx === null) return;

    const component = meshComponents.val[idx];
    if (!component) return;

    // Only update if params actually changed
    const currentParams = component.params;
    const hasChanges = Object.keys(params).some(
      (key) => params[key] !== currentParams[key]
    );

    if (hasChanges) {
      meshComponents.val = meshComponents.val.map((comp, i) =>
        i === idx ? { ...comp, params: { ...params } } : comp
      );
    }
  });

  const getTemplateContent = (): TemplateResult | null => {
    const idx = activeComponent.val;
    if (idx === null) {
      currentComponentIndex = null;
      return null;
    }

    const component = meshComponents.val[idx];
    if (!component) return null;

    const meshTemplate = meshTemplates[component.templateIndex];
    if (!meshTemplate) return null;

    // If we switched to a different component, load its params
    if (currentComponentIndex !== idx) {
      currentComponentIndex = idx;
      localParams.val = { ...component.params };
    }

    return meshTemplate.getTemplate({
      params: localParams as State<typeof meshTemplate.defaultParams>,
    });
  };

  const template = () => {
    const idx = activeComponent.val;
    const templateContent = getTemplateContent();

    return html`
      <details id="parameters" ?open=${idx !== null}>
        <summary>Parameters</summary>
        ${templateContent ??
        html`<div class="no-selection">Select a component</div>`}
      </details>
    `;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container.firstElementChild as HTMLElement;
}
