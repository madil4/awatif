import { w2grid } from "w2ui";

import "w2ui/w2ui-2.0.min.css";

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
    sortable: true,
    resizable: false,
  };
  const grid = new w2grid({
    name: getID(name),
    selectType: "cell",
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
    onDelete: (e) => e.preventDefault(),
  });

  // update
  gridElm.setAttribute("id", "grid");
  gridElm.style.height = "250px";

  grid.render(gridElm);

  // events
  grid.onChange = (e) => {
    // update records
    const field = columns[e.detail.column - 1]["field"];
    grid.records[e.detail.index][field] = e.detail.value.new;

    if (onChange)
      onChange({
        name: grid.name,
        data: toData(grid.records, Array.isArray(data)),
      });
  };

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
