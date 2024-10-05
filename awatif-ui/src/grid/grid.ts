import { w2grid } from "w2ui";
import van, { State } from "vanjs-core";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export type Data = number[][];

export function grid(
  columns: object[],
  data: State<Data>,
  onChange?: (data: Data) => void
): HTMLDivElement {
  // init
  const gridElm = document.createElement("div");

  const baseColumn = {
    size: "120px",
    resizable: false,
  };
  const grid = new w2grid({
    name: Math.random().toString().substring(2),
    box: gridElm,
    selectType: "cell",
    show: { columnMenu: false },
    columns: [
      {
        ...baseColumn,
        field: "recid",
        text: "Index",
        size: "50px",
        style: "background-color: #f4f6f9",
      },
      ...columns.map((v) => ({ ...baseColumn, ...v })),
    ],
    records: toRecords(data.rawVal),
    contextMenu: [
      { id: "delete", text: "Delete row", icon: "w2ui-icon-cross" },
      { id: "Insert", text: "Insert row", icon: "w2ui-icon-plus" },
    ],
    onDelete: (e) => e.preventDefault(),
  });

  let recordsIndex = grid.records.length;

  // update
  gridElm.setAttribute("id", "grid");

  // events
  // on field edit
  grid.onChange = (e) => {
    const field = columns[e.detail.column - 1]["field"];
    grid.records[e.detail.index][field] = e.detail.value.new;

    if (onChange) onChange(toData(grid.records));
  };

  // on delete and insert
  grid.onContextMenuClick = (e) => {
    const menuItem = e.detail.menuItem.id;

    if (menuItem == "delete")
      grid.records = grid.records.filter((r) => r.recid != e.detail.recid);

    if (menuItem == "Insert") grid.records.push({ recid: recordsIndex++ });

    grid.refresh();

    if (onChange) onChange(toData(grid.records));
  };

  // on data change
  van.derive(() => {
    grid.records = toRecords(data.val);
    grid.refresh();
  });

  // on size change
  const resizeObserver = new ResizeObserver(() => grid.refresh());
  resizeObserver.observe(gridElm);

  return gridElm;
}

// Utils
function toRecords(data: number[][]): object[] {
  return data.map((v, i) => ({ recid: i, ...v }));
}

function toData(records: object[]): number[][] {
  return records.map((rec: any) => {
    const { recid, w2ui, ...rest } = rec;
    return Object.values(rest);
  });
}
