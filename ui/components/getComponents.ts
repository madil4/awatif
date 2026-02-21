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

import "./styles.css";

function getTypesForMode(
  mode: ComponentsType | null,
): { types: ComponentsType[]; geometryKind: "point" | "line" | null } {
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
        types: [ComponentsType.MESH, ComponentsType.IMPERFECTIONS],
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
}: {
  geometry: Geometry;
  components: Components;
  componentsBarMode: State<ComponentsType | null>;
  templates?: typeof Templates;
  activeAnalysis?: ActiveAnalysis;
}): HTMLElement {
  const container = document.createElement("div");
  const activeComponent = van.state<ActiveComponent>(null);

  const types = van.derive(() => getTypesForMode(componentsBarMode.val).types);
  const geometryKind = van.derive(
    () => getTypesForMode(componentsBarMode.val).geometryKind,
  );

  const list = getList({
    types,
    geometryKind,
    geometry,
    components,
    activeComponent,
    templates,
  });

  const parameters = getParameters({
    activeComponent,
    components,
    templates,
  });

  const componentsBar = getComponentsBar({ componentsBarMode, activeAnalysis });
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
