import { w2grid } from "w2ui";
import van, { State } from "vanjs-core";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export type Data = object | number[][];

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
    records: toRecords(data.rawVal, fields),
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

    if (onChange)
      onChange(toData(grid.records, fields, Array.isArray(data.val)));
  };

  grid.onDelete = (e) => {
    e.detail.force = true;

    e.onComplete = () => {
      if (onChange) onChange(toData2D(grid.records, fields));
    };
  };

  grid.onPaste = (e) => {
    e.onComplete = () => {
      grid.mergeChanges();

      if (onChange) onChange(toData2D(grid.records, fields));
    };
  };

  // on data change
  van.derive(() => {
    grid.records = toRecords(data.val, fields);
    grid.refresh();
  });

  return gridElm;
}

// Utils
const FIELDS_INDEXES = "ABCDEFGHIJKLMNOPRST";

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

function toRecords(data: Data, fields: object[]): object[] {
  if (Array.isArray(data)) return toRecordsTable(data);

  return toRecordsObj(data, fields);
}

function toRecordsObj(data: object, fields: object[]): object[] {
  const records = Array(50)
    .fill(0)
    .map((_, i) => ({ recid: i }));
  const fieldsIndexes = FIELDS_INDEXES.split("");
  const keys = Object.keys(data);
  const values = Object.values(data);

  for (let i = 0; i < keys.length; i++) {
    records[i][fieldsIndexes[0]] = keys[i];
    records[i][fieldsIndexes[1]] = values[i];
  }

  // Todo: find a way to inject field data to grid

  return records;
}

function toRecordsTable(data: number[][]): object[] {
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

function toData(records: object[], fields: object[], is2D: boolean): Data {
  if (is2D) return toData2D(records, fields);
  return toDataObj(records, fields);
}

function toData2D(records: object[], fields: object[]): number[][] {
  let data = [...Array(records.length)].map(() => [...Array(fields.length)]);
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
  function findLastNonEmptyRow(data: number[][]) {
    for (let i = data.length - 1; i >= 0; i--) {
      // @ts-ignore
      if (data[i].some((v) => v !== "")) {
        return i;
      }
    }
  }
}

function toDataObj(records: object[], fields: object[]): object {
  const obj = { try: "yes" };

  return obj;
}
