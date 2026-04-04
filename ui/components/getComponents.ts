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
import { AnalysisStatus } from "../analysisStatus/getAnalysisStatus";

import "./styles.css";

function getTypesForMode(mode: ComponentsType | null): {
  types: ComponentsType[];
  geometryKind: "point" | "line" | null;
} {
  switch (mode) {
    case ComponentsType.LOADS:
      return { types: [ComponentsType.LOADS], geometryKind: "point" };
    case ComponentsType.SUPPORTS:
      return { types: [ComponentsType.SUPPORTS], geometryKind: "point" };
    case ComponentsType.MESH:
      return { types: [ComponentsType.MESH], geometryKind: "line" };
    case ComponentsType.DESIGN:
      return { types: [ComponentsType.DESIGN], geometryKind: "line" };
    case ComponentsType.IMPERFECTIONS:
      return { types: [ComponentsType.IMPERFECTIONS], geometryKind: "line" };
    case ComponentsType.SPECIAL:
      return {
        types: [
          ComponentsType.MESH,
          ComponentsType.IMPERFECTIONS,
          ComponentsType.RELEASES,
        ],
        geometryKind: "line",
      };
    default:
      return { types: [], geometryKind: null };
  }
}

export function getComponents({
  geometry,
  components,
  componentsBarMode,
  templates,
  activeAnalysis,
  loadCase,
  analysisStatus,
  display,
}: {
  geometry: Geometry;
  components: Components;
  componentsBarMode: State<ComponentsType | null>;
  templates?: typeof Templates;
  activeAnalysis?: ActiveAnalysis;
  loadCase?: State<LoadSelection>;
  analysisStatus?: AnalysisStatus;
  display?: { memberIndex: State<boolean> };
}): HTMLElement {
  const container = document.createElement("div");
  const activeComponent = van.state<ActiveComponent>(null);

  const types = van.derive(() => getTypesForMode(componentsBarMode.val).types);
  const geometryKind = van.derive(() => {
    const mode = componentsBarMode.val;
    const baseKind = getTypesForMode(mode).geometryKind;
    // TODO: extra logic due to inadequate data structure - the geometry kind should really be stored at the template level, not component type
    if (mode === ComponentsType.LOADS && activeComponent.val !== null) {
      const active = activeComponent.val;
      const templateId = (components.val.get(active.type) ?? [])[active.index]
        ?.templateId;
      const template = templates?.get(active.type)?.get(templateId);
      return (template?.geometryKind ?? baseKind) as "point" | "line" | null;
    }
    return baseKind;
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

  const componentsBar = getComponentsBar({
    componentsBarMode,
    activeAnalysis,
    loadCase,
    analysisStatus,
    display,
  });
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
