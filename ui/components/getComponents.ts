import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Geometry, Components } from "@awatif/components";
import { getList } from "./list/getList";
import { getParameters } from "./parameters/getParameters";
import {
  getComponentsBar,
  ToolbarMode,
} from "./componentsBar/getComponentsBar";

import "./styles.css";

export function getComponents({
  toolbarMode,
  geometry,
  components,
}: {
  toolbarMode: State<ToolbarMode | null>;
  geometry: Geometry;
  components: Components;
}): HTMLElement {
  const container = document.createElement("div");
  const activeComponent = van.state<number | null>(null);

  const list = getList({
    toolbarMode,
    geometry,
    components,
    activeComponent,
  });

  const parameters = getParameters({
    activeComponent,
    components,
    toolbarMode,
  });

  const componentsBar = getComponentsBar({ toolbarMode });

  const template = html`
    <div class="components">
      <div class="list">${list}</div>
      <div class="parameters">${parameters}</div>
    </div>
    <div class="components-bar">${componentsBar}</div>
  `;

  render(template, container);

  return container;
}
