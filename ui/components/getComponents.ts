import van, { State } from "vanjs-core";
import { html, render } from "lit-html";
import { Geometry, Components, ComponentsType } from "@awatif/components";
import { getList } from "./list/getList";
import { getParameters } from "./parameters/getParameters";
import { getComponentsBar } from "./componentsBar/getComponentsBar";

import "./styles.css";

export function getComponents({
  componentsBarMode,
  geometry,
  components,
}: {
  componentsBarMode: State<ComponentsType | null>;
  geometry: Geometry;
  components: Components;
}): HTMLElement {
  const container = document.createElement("div");
  const activeComponent = van.state<number | null>(null);

  const list = getList({
    componentsBarMode,
    geometry,
    components,
    activeComponent,
  });

  const parameters = getParameters({
    activeComponent,
    components,
    componentsBarMode,
  });

  const componentsBar = getComponentsBar({ componentsBarMode });

  const template = html`
    <div id="components">
      <div class="components-column">${list} ${parameters}</div>
      <div class="components-bar">${componentsBar}</div>
    </div>
  `;

  render(template, container);

  return container.firstElementChild as HTMLElement;
}
