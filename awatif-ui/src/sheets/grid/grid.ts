import { w2grid } from "w2ui";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

type Data = number[][] | Map<any, Record<string, any>>;

export function grid(
  name: string,
  columns: object[],
  data: Data,
  onChange?: ({ name, data }: { name: string; data: Data }) => void
): HTMLDivElement {
  // init
  const gridElm = document.createElement("div");

  const baseColumn = {
    size: "120px",
    resizable: false,
  };
  const grid = new w2grid({
    box: gridElm,
    name: getID(name),
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
    records: toRecords(data),
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

    if (onChange)
      onChange({
        name: grid.name,
        data: toData(grid.records, Array.isArray(data)),
      });
  };

  grid.onContextMenuClick = (e) => {
    const menuItem = e.detail.menuItem.id;

    if (menuItem == "delete")
      grid.records = grid.records.filter((r) => r.recid != e.detail.recid);

    if (menuItem == "Insert") grid.records.push({ recid: recordsIndex++ });

    grid.refresh();

    if (onChange)
      onChange({
        name: grid.name,
        data: toData(grid.records, Array.isArray(data)),
      });
  };

  // on size change
  const resizeObserver = new ResizeObserver(() => grid.refresh());
  resizeObserver.observe(gridElm);

  return gridElm;
}

// Utils
function toRecords(data: number[][] | Map<number, any>): object[] {
  if (Array.isArray(data)) return data.map((v, i) => ({ recid: i, ...v }));

  const records: object[] = [];
  data.forEach((v, k) => records.push({ recid: k, ...v }));
  return records;
}

function toData(
  records: object[],
  isArray: boolean
): number[][] | Map<number, any> {
  if (isArray)
    return records.map((rec: any) => {
      const { recid, w2ui, ...rest } = rec;
      return Object.values(rest);
    });

  const map = new Map<number, any>();
  records.forEach((rec: any) => {
    const { recid, w2ui, ...rest } = rec;
    map.set(recid, rest);
  });
  return map;
}

function getID(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, "");
}
