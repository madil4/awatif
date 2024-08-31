import { w2tabs, w2ui } from "w2ui";
import { collapsible } from "../common/collapsible/collapsible";

import { grid } from "./grid/grid";

import "w2ui/w2ui-2.0.min.css";

export function sheets(
  sheets: Map<
    string,
    {
      text: string;
      columns: object[];
      data: number[][] | Map<any, Record<string, any>>;
    }
  >,
  onChange?: ({ sheet, index, field, value }) => void
): HTMLElement {
  const sheetsElm = document.createElement("div");
  const tabsElm = document.createElement("div");
  const collapsibleElm = collapsible("Sheets", sheetsElm);

  const onGridChange = (e) => {
    const sheet = e.target;
    const index = e.detail.recid;
    const field = sheets.get(sheet).columns[e.detail.column - 1]["field"];
    const value = e.detail.value.new;

    if (onChange) onChange({ sheet, index, field, value });
  };

  const tabsData = [];
  const grids = new Map<string, HTMLDivElement>();
  sheets.forEach((sheet, index) => {
    tabsData.push({ id: index, text: sheet.text });
    grids.set(index, grid(index, sheet.columns, sheet.data, onGridChange));
  });

  const tabs = new w2tabs({
    box: tabsElm,
    name: "sheets",
    active: tabsData[0].id,
    flow: "up",
    tabs: tabsData,
  });

  // update
  sheetsElm.id = "sheets";
  tabsElm.id = "tabs";

  collapsibleElm.style.position = "absolute";
  collapsibleElm.style.left = "8px";
  collapsibleElm.style.bottom = "0px";
  collapsibleElm.style.width = "50%";

  sheetsElm.append(grids.values().next().value, tabsElm);

  // events
  tabs.onClick = (e: { target: string }) => {
    sheetsElm.firstChild.replaceWith(grids.get(e.target));
    w2ui[e.target].refresh();
  };

  return collapsibleElm;
}
