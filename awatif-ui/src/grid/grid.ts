import { w2grid } from "w2ui";
import van, { State } from "vanjs-core";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export type Data = number[][];

export function grid({
  fields,
  data,
  onChange,
}: {
  fields: object[];
  data: State<Data>;
  onChange?: (data: Data) => void;
}): HTMLDivElement {
  // init
  const gridElm = document.createElement("div");

  const grid = new w2grid({
    name: Math.random().toString().substring(2),
    box: gridElm,
    selectType: "cell",
    recordHeight: 26,
    show: { columnMenu: false, lineNumbers: true },
    columns: toColumns(fields),
    records: toRecords(data.rawVal),
  });

  // update
  gridElm.setAttribute("id", "grid");

  // events
  // on size change
  const resizeObserver = new ResizeObserver(() => grid.refresh());
  resizeObserver.observe(gridElm);

  // on field edit
  grid.onChange = (e) => {
    // ignore changes if outside fields
    if (!fields[e.detail.column]) return;

    // update records manually, mergeChanges give error, this is a breaking change to w2ui!
    const field = fields[e.detail.column]["field"];
    grid.records[e.detail.index][field] = e.detail.value.new;

    if (onChange) onChange(toData(grid.records, fields.length));
  };

  grid.onDelete = (e) => {
    e.detail.force = true;

    e.onComplete = () => {
      if (onChange) onChange(toData(grid.records, fields.length));
    };
  };

  grid.onPaste = (e) => {
    e.onComplete = () => {
      grid.mergeChanges();

      if (onChange) onChange(toData(grid.records, fields.length));
    };
  };

  // on data change
  van.derive(() => {
    grid.records = toRecords(data.val);
    grid.refresh();
  });

  return gridElm;
}

// Utils
const FIELDS_INDEXES = "ABCDEFGHIJKLMNOPRST";

function toRecords(data: number[][]): object[] {
  const records = Array(50)
    .fill(0)
    .map((_, i) => ({ recid: i }));
  const fieldsIndexes = FIELDS_INDEXES.split("");

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      records[i][fieldsIndexes[j]] = data[i][j];
    }
  }

  return records;
}

function toColumns(fields: object[]): object[] {
  const columns = FIELDS_INDEXES.split("").map((fieldIndex) => ({
    field: fieldIndex,
    text: '<div style="text-align: center">' + fieldIndex + "</div>",
    size: "90px",
    resizable: true,
    sortable: true,
    editable: { type: "text" },
  }));

  return columns.map((baseColumn) => {
    const matchingField = fields.find(
      // @ts-ignore
      (field) => field.field === baseColumn.field
    );

    if (matchingField) {
      return {
        ...baseColumn,
        ...matchingField,
      };
    }
    return baseColumn;
  });
}

function toData(records: object[], columns: number): number[][] {
  let data = [...Array(records.length)].map(() => [...Array(columns)]);
  const fieldsIndexes = FIELDS_INDEXES.split("");

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      data[i][j] = records[i][fieldsIndexes[j]] ?? "";
    }
  }

  data = data.slice(0, findLastNonEmptyRow(data) + 1);

  // cast to numbers and leave empty fields as string
  data = data.map((row) => row.map((col) => (col === "" ? "" : Number(col))));

  return data;

  // utils
  function findLastNonEmptyRow(data: Data) {
    for (let i = data.length - 1; i >= 0; i--) {
      // @ts-ignore
      if (data[i].some((v) => v !== "")) {
        return i;
      }
    }
  }
}
