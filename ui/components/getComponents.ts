import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import {
  Geometry,
  Components,
  ComponentsType,
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
  const activeComponent = van.state<number | null>(null);

  const list = getList({
    componentsBarMode,
    geometry,
    components,
    activeComponent,
    templates,
  });

  const parameters = getParameters({
    activeComponent,
    components,
    componentsBarMode,
    templates,
    activeAnalysis,
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
