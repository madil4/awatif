import { w2grid } from "w2ui";

import "w2ui/w2ui-2.0.min.css";

export function grid(
  name: string,
  columns: object[],
  data: number[][] | Map<any, Record<string, any>>,
  onChange?: (e: any) => void
): HTMLDivElement {
  // init
  const gridElm = document.createElement("div");

  const baseColumn = {
    size: "120px",
    sortable: true,
    resizable: false,
  };
  const grid = new w2grid({
    name: getID(name),
    selectType: "cell",
    columns: [
      {
        field: "recid",
        text: "Index",
        ...baseColumn,
        size: "60px",
      },
      ...columns.map((v) => ({ ...baseColumn, ...v })),
    ],
    records: getRecords(data),
  });

  // update
  gridElm.setAttribute("id", "grid");
  gridElm.style.height = "250px";

  grid.render(gridElm);

  // event
  grid.onChange = (e) => {
    if (onChange) onChange(e);

    // change record value since its stored to be saved to trigger onChange with original values
    grid.records[e.detail.index][e.detail.column - 1] = e.detail.value.new;
  };

  return gridElm;
}

// Utils
function getRecords(data: number[][] | Map<number, any>): object[] {
  if (Array.isArray(data)) return data.map((v, i) => ({ recid: i, ...v }));

  const records: object[] = [];
  data.forEach((v, k) => records.push({ recid: k, ...v }));
  return records;
}

function getID(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, "");
}
