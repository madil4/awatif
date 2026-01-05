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

  // Map to store separate param states for each component by index
  const componentParamsMap = new Map<number, State<Record<string, unknown>>>();

  // Get or create a param state for a specific component
  const getComponentParams = (
    idx: number,
    initialParams: Record<string, unknown>
  ): State<Record<string, unknown>> => {
    if (!componentParamsMap.has(idx)) {
      const paramState = van.state<Record<string, unknown>>({
        ...initialParams,
      });
      componentParamsMap.set(idx, paramState);

      // Set up a derive for this specific component to sync params back
      van.derive(() => {
        const params = paramState.val;
        const currentIdx = activeComponent.val;

        // Only sync if this is the active component
        if (currentIdx !== idx) return;

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
    }
    return componentParamsMap.get(idx)!;
  };

  // Clean up param states when components are removed
  van.derive(() => {
    const currentComponents = meshComponents.val;
    const currentIndices = new Set(currentComponents.map((_, i) => i));

    // Remove param states for components that no longer exist
    for (const [idx] of componentParamsMap) {
      if (!currentIndices.has(idx)) {
        componentParamsMap.delete(idx);
      }
    }
  });

  const getTemplateContent = (): TemplateResult | null => {
    const idx = activeComponent.val;
    if (idx === null) {
      return null;
    }

    const component = meshComponents.val[idx];
    if (!component) return null;

    const meshTemplate = meshTemplates[component.templateIndex];
    if (!meshTemplate) return null;

    // Get or create the param state for this component
    const localParams = getComponentParams(idx, component.params);

    // Update the local params if the component's params changed externally
    const currentParams = component.params;
    const localParamsVal = localParams.val;
    const needsUpdate =
      Object.keys(currentParams).some(
        (key) => currentParams[key] !== localParamsVal[key]
      ) ||
      Object.keys(localParamsVal).length !== Object.keys(currentParams).length;

    if (needsUpdate) {
      localParams.val = { ...currentParams };
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
