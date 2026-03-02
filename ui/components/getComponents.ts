import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import {
  Geometry,
  Components,
  ComponentsType,
  ActiveComponent,
  LoadSelection,
  templates as Templates,
} from "@awatif/components";
import { getList } from "./list/getList";
import { getParameters } from "./parameters/getParameters";
import { getComponentsBar } from "./componentsBar/getComponentsBar";
import {
  getAnalysisList,
  ActiveAnalysis,
} from "./analysisList/getAnalysisList";

import "./styles.css";

function getTypesForMode(mode: ComponentsType | null): ComponentsType[] {
  switch (mode) {
    case ComponentsType.LOADS:
      return [ComponentsType.LOADS];
    case ComponentsType.SUPPORTS:
      return [ComponentsType.SUPPORTS];
    case ComponentsType.MESH:
      return [ComponentsType.MESH];
    case ComponentsType.DESIGN:
      return [ComponentsType.DESIGN];
    case ComponentsType.IMPERFECTIONS:
      return [ComponentsType.IMPERFECTIONS];
    case ComponentsType.SPECIAL:
      return [ComponentsType.MESH, ComponentsType.IMPERFECTIONS, ComponentsType.RELEASES];
    default:
      return [];
  }
}

export function getComponents({
  geometry,
  components,
  componentsBarMode,
  templates,
  activeAnalysis,
  loadCase,
}: {
  geometry: Geometry;
  components: Components;
  componentsBarMode: State<ComponentsType | null>;
  templates?: typeof Templates;
  activeAnalysis?: ActiveAnalysis;
  loadCase?: State<LoadSelection>;
}): HTMLElement {
  const container = document.createElement("div");
  const activeComponent = van.state<ActiveComponent>(null);

  const resolvedTemplates = templates ?? Templates;

  const types = van.derive(() => getTypesForMode(componentsBarMode.val));
  const geometryKind = van.derive((): "point" | "line" | null => {
    const active = activeComponent.val;
    if (active !== null) {
      const templateId = components.val.get(active.type)?.[active.index]?.templateId;
      if (templateId) {
        const tmpl = resolvedTemplates.get(active.type)?.get(templateId);
        if (tmpl?.geometryKind) return tmpl.geometryKind;
      }
    }
    // Fallback: use the first template's geometryKind for the current mode
    const mode = componentsBarMode.val;
    if (mode === null) return null;
    const modeTemplates = resolvedTemplates.get(mode);
    if (!modeTemplates) return null;
    const firstTemplate = modeTemplates.values().next().value;
    return firstTemplate?.geometryKind ?? null;
  });

  const list = getList({
    types,
    geometryKind,
    geometry,
    components,
    activeComponent,
    templates,
    loadCase,
  });

  const parameters = getParameters({
    activeComponent,
    components,
    templates,
    activeAnalysis,
  });

  const componentsBar = getComponentsBar({ componentsBarMode, activeAnalysis, loadCase });
  const analysisList = getAnalysisList({ componentsBarMode, activeAnalysis });

  const template = html`
    <div id="components">
      <div class="components-column">${list} ${analysisList} ${parameters}</div>
      <div class="components-bar">${componentsBar}</div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
