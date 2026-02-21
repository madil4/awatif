import van, { State } from "vanjs-core";
import { html, render, TemplateResult } from "lit-html";
import {
  Components,
  ActiveComponent,
  templates as Templates,
} from "@awatif/components";
import "./styles.css";

export function getParameters({
  activeComponent,
  components,
  templates,
}: {
  activeComponent: State<ActiveComponent>;
  components: Components;
  templates?: typeof Templates;
}): HTMLElement {
  const container = document.createElement("div");

  const templateContent = van.state<TemplateResult | null>(null);
  const params = van.state<Record<string, unknown> | null>(null);

  // Render parameters
  van.derive(() => {
    templateContent.val = null;
    params.val = null;

    const active = activeComponent.val;
    if (active === null || !templates) return;

    const component = components.val.get(active.type)?.[active.index];
    if (!component) return;

    const template = templates.get(active.type)?.get(component?.templateId);
    if (!template?.getParamsTemplate) return;

    params.val = component.params || template.defaultParams || {};

    templateContent.val = template.getParamsTemplate({
      params,
    });
  });

  // Update components when parameters change
  van.derive(() => {
    const active = activeComponent.val;
    if (!params.val || active === null) {
      return;
    }

    const currentComponents = components.val.get(active.type);
    if (!currentComponents) return;

    const component = currentComponents[active.index];
    if (!component) return;

    // Check if params actually changed to avoid infinite loops
    const currentParams = component.params ?? {};
    const hasChanges = Object.keys(params.val).some(
      (key) => params.val![key] !== currentParams[key],
    );

    if (!hasChanges) return;

    // Update the component with new params
    const updatedComponents = currentComponents.map((comp, i) =>
      i === active.index ? { ...comp, params: { ...params.val } } : comp,
    );

    components.val = new Map(components.val).set(
      active.type,
      updatedComponents,
    );
  });

  const template = () => html`
    <div id="parameters" class="${templateContent.val ? "visible" : "hidden"}">
      ${templateContent.val}
    </div>
  `;

  van.derive(() => render(template(), container));

  return container;
}
