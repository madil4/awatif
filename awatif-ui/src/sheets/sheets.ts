import { w2tabs, w2ui } from "w2ui";

import { grid } from "./grid/grid";

import "w2ui/w2ui-2.0.min.css";

export function sheets(
  sheets: Map<
    string,
    { columns: object[]; data: number[][] | Map<any, Record<string, any>> }
  >
): HTMLDivElement {
  const container = document.createElement("div");
  const tabsElm = document.createElement("div");

  const tabsData = [];
  const grids = new Map<string, HTMLDivElement>();
  sheets.forEach((sheet, index) => {
    tabsData.push({ id: index, text: index });
    grids.set(index, grid(index, sheet.columns, sheet.data));
  });

  const tabs = new w2tabs({
    active: tabsData[0].id,
    flow: "up",
    tabs: tabsData,
  });

  // update
  container.id = "sheets";
  container.style.width = "fit-content";
  tabsElm.id = "tabs";

  tabs.render(tabsElm);

  container.appendChild(grids.values().next().value);
  container.appendChild(tabsElm);

  // events
  tabs.onClick = (e: { target: string }) => {
    container.firstChild.replaceWith(grids.get(e.target));
    w2ui[e.target].refresh();
  };

  return container;
}
