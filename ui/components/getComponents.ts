import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import {
  Geometry,
  Components,
  ComponentsType,
  ActiveComponent,
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
import type { Display } from "../display/getDisplay";

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
      return [
        ComponentsType.MESH,
        ComponentsType.IMPERFECTIONS,
        ComponentsType.RELEASES,
      ];
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
  analysisStatus,
  display,
}: {
  geometry: Geometry;
  components: Components;
  componentsBarMode: State<ComponentsType | null>;
  templates?: typeof Templates;
  activeAnalysis?: ActiveAnalysis;
  analysisStatus?: AnalysisStatus;
  display?: Display;
}): HTMLElement {
  const container = document.createElement("div");
  const activeComponent = van.state<ActiveComponent>(null);
  const loadCase = display?.loadCase;

  const types = van.derive(() => getTypesForMode(componentsBarMode.val));

  const list = getList({
    types,
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
