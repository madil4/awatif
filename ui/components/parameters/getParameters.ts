import van, { State } from "vanjs-core";
import { html, render, TemplateResult } from "lit-html";
import { Components, ComponentsType, templates } from "@awatif/components";

import "./styles.css";

export function getParameters({
  activeComponent,
  components,
  componentsBarMode,
}: {
  activeComponent: State<number | null>;
  components: Components;
  componentsBarMode: State<ComponentsType | null>;
}): HTMLElement {
  const container = document.createElement("div");

  // Map to store separate param states for each component by mode and index
  const componentParamsMap = new Map<string, State<Record<string, unknown>>>();

  // Get or create a param state for a specific component
  const getComponentParams = (
    mode: ComponentsType,
    idx: number,
    initialParams: Record<string, unknown>
  ): State<Record<string, unknown>> => {
    const key = `${mode}-${idx}`;
    if (!componentParamsMap.has(key)) {
      const paramState = van.state<Record<string, unknown>>({
        ...initialParams,
      });
      componentParamsMap.set(key, paramState);

      // Set up a derive for this specific component to sync params back
      van.derive(() => {
        const params = paramState.val;
        const currentIdx = activeComponent.val;
        if (componentsBarMode.val === null) return;
        const currentMode = componentsBarMode.val;

        // Only sync if this is the active component and mode
        if (currentIdx !== idx || currentMode !== mode) return;

        const currentComponents = components.val.get(currentMode) ?? [];
        const component = currentComponents[idx];
        if (!component) return;

        // Only update if params actually changed
        const currentParams = component.params;
        const hasChanges = Object.keys(params).some(
          (key) => params[key] !== currentParams[key]
        );

        if (hasChanges) {
          const updatedComponents = currentComponents.map((comp, i) =>
            i === idx ? { ...comp, params: { ...params } } : comp
          );
          components.val = new Map(components.val).set(
            currentMode,
            updatedComponents
          );
        }
      });
    }
    return componentParamsMap.get(key)!;
  };

  // Clean up param states when components are removed
  van.derive(() => {
    if (componentsBarMode.val === null) return;
    const mode = componentsBarMode.val;
    const currentComponents = components.val.get(mode) ?? [];
    const currentKeys = new Set(
      currentComponents.map((_, i) => `${mode}-${i}`)
    );

    // Remove param states for components that no longer exist in current mode
    for (const [key] of componentParamsMap) {
      if (key.startsWith(`${mode}-`) && !currentKeys.has(key)) {
        componentParamsMap.delete(key);
      }
    }
  });

  const getTemplateContent = (): TemplateResult | null => {
    const idx = activeComponent.val;
    if (idx === null || componentsBarMode.val === null) {
      return null;
    }

    const key = componentsBarMode.val;
    const currentComponents = components.val.get(key) ?? [];
    const component = currentComponents[idx];
    if (!component) return null;

    const meshTemplate = templates.get(key)?.[component.templateIndex];
    if (!meshTemplate) return null;

    // Get or create the param state for this component
    const localParams = getComponentParams(key, idx, component.params);

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
      params: localParams as any,
    });
  };

  const template = () => {
    const templateContent = getTemplateContent();

    return html`
      <div id="parameters" class="${templateContent ? "visible" : "hidden"}">
        ${templateContent}
      </div>
    `;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container;
}
