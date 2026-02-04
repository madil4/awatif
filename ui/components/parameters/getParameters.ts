import van, { State } from "vanjs-core";
import { html, render, TemplateResult } from "lit-html";
import {
  Components,
  ComponentsType,
  templates as Templates,
} from "@awatif/components";
import { ActiveAnalysis } from "../../components/analysisList/getAnalysisList";

import "./styles.css";

export function getParameters({
  activeComponent,
  components,
  componentsBarMode,
  templates,
  activeAnalysis,
}: {
  activeComponent: State<number | null>;
  components: Components;
  componentsBarMode: State<ComponentsType | null>;
  templates?: typeof Templates;
  activeAnalysis?: ActiveAnalysis;
}): HTMLElement {
  const container = document.createElement("div");

  const templateContent = van.state<TemplateResult | null>(null);
  const params = van.state<Record<string, unknown> | null>(null);

  // Render parameters
  van.derive(() => {
    templateContent.val = null;
    params.val = null;

    if (
      activeComponent.val === null ||
      !templates ||
      componentsBarMode.val === null
    )
      return;

    const component = components.val.get(componentsBarMode.val)?.[
      activeComponent.val
    ];
    if (!component) return;

    const template = templates
      .get(componentsBarMode.val)
      ?.get(component?.templateId);
    if (!template?.getParamsTemplate) return;

    params.val = component.params || template.defaultParams || {};

    templateContent.val = template.getParamsTemplate({
      params,
      activeAnalysis,
    });
  });

  // Update components when parameters change
  van.derive(() => {
    if (
      !params.val ||
      activeComponent.val === null ||
      componentsBarMode.val === null
    ) {
      return;
    }

    const currentComponents = components.val.get(componentsBarMode.val);
    if (!currentComponents) return;

    const component = currentComponents[activeComponent.val];
    if (!component) return;

    // Check if params actually changed to avoid infinite loops
    const currentParams = component.params ?? {};
    const hasChanges = Object.keys(params.val).some(
      (key) => params.val![key] !== currentParams[key],
    );

    if (!hasChanges) return;

    // Update the component with new params
    const updatedComponents = currentComponents.map((comp, i) =>
      i === activeComponent.val ? { ...comp, params: { ...params.val } } : comp,
    );

    components.val = new Map(components.val).set(
      componentsBarMode.val,
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
