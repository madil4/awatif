import { w2tabs, w2ui } from "w2ui";
import { grid } from "./grid/grid";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export function sheets(
  sheets: Map<
    string,
    {
      text: string;
      columns: object[];
      data: number[][] | Map<any, Record<string, any>>;
    }
  >,
  onChange?: ({ sheet, data }) => void
): HTMLElement {
  const sheetsElm = document.createElement("div");
  const tabsElm = document.createElement("div");

  const onGridChange = ({ name, data }) => {
    if (onChange) onChange({ sheet: name, data });
  };

  const tabsData = [];
  const grids = new Map<string, HTMLDivElement>();
  sheets.forEach((sheet, index) => {
    tabsData.push({ id: index, text: sheet.text });
    grids.set(index, grid(index, sheet.columns, sheet.data, onGridChange));
  });

  const tabs = new w2tabs({
    box: tabsElm,
    name: "tabs",
    active: tabsData[0].id,
    flow: "up",
    tabs: tabsData,
  });

  // update
  sheetsElm.id = "sheets";
  tabsElm.id = "tabs";

  sheetsElm.append(grids.values().next().value, tabsElm);

  // events
  tabs.onClick = (e: { target: string }) => {
    sheetsElm.firstChild.replaceWith(grids.get(e.target));
    w2ui[e.target].refresh();
  };

  return sheetsElm;
}
