import { w2tabs } from "w2ui";
import { State } from "vanjs-core";

import { Data, getTable } from "../table/getTable";

import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export function getTables({
  tables,
}: {
  tables: Map<
    string,
    {
      text: string;
      fields: object[];
      data: State<Data>;
    }
  >;
}): HTMLElement {
  // Init
  const tablesElm = document.createElement("div");
  const tabsElm = document.createElement("div");

  const tabsData = [];
  const tablesMap = new Map<string, HTMLDivElement>();
  tables.forEach((table, index) => {
    tabsData.push({ id: index, text: table.text });
    tablesMap.set(
      index,
      getTable({
        fields: table.fields,
        data: table.data,
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

  // Update
  tablesElm.id = "tables";
  tabsElm.id = "tabs";

  tablesElm.append(tablesMap.values().next().value, tabsElm);

  // Events
  // On tab click replace table
  tabs.onClick = (e: { target: string }) => {
    tablesElm.firstChild.replaceWith(tablesMap.get(e.target));
  };

  return tablesElm;
}
