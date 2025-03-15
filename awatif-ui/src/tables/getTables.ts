import { w2tabs } from "w2ui";
import { State } from "vanjs-core";
import { Data, getGrid } from "../grid/getGrid";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export function getTables({
  tables,
  onChange,
}: {
  tables: Map<
    string,
    {
      text: string;
      fields: object[];
      data: State<Data>;
    }
  >;
  onChange?: ({ table, data }) => void;
}): HTMLElement {
  const tablesElm = document.createElement("div");
  const tabsElm = document.createElement("div");

  const tabsData = [];
  const grids = new Map<string, HTMLDivElement>();
  tables.forEach((table, index) => {
    tabsData.push({ id: index, text: table.text });
    grids.set(
      index,
      getGrid({
        fields: table.fields,
        data: table.data,
        onChange: onGridChange,
      })
    );
  });

  const tabs = new w2tabs({
    box: tabsElm,
    name: "tabs",
    active: tabsData[0].id,
    flow: "up",
    tabs: tabsData,
  });

  // update
  tablesElm.id = "tables";
  tabsElm.id = "tabs";

  tablesElm.append(grids.values().next().value, tabsElm);

  // events
  tabs.onClick = (e: { target: string }) => {
    tablesElm.firstChild.replaceWith(grids.get(e.target));
  };

  function onGridChange(data: Data) {
    if (onChange) onChange({ table: tabs.active, data });
  }

  return tablesElm;
}
