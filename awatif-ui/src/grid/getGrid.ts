import { w2grid } from "w2ui";
import van, { State } from "vanjs-core";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

type Table = number[][];
export type Data = object | Table;

export function getGrid({
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
    const field = FIELDS_INDEXES[e.detail.column];
    grid.records[e.detail.index][field] = e.detail.value.new;

    if (onChange) onChange(toData(grid.records, fields));
  };

  grid.onDelete = (e) => {
    e.detail.force = true;

    e.onComplete = () => {
      if (onChange) onChange(toData(grid.records, fields));
    };
  };

  grid.onPaste = (e) => {
    e.onComplete = () => {
      grid.mergeChanges();

      if (onChange) onChange(toData(grid.records, fields));
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
  const table = Array.isArray(data) ? data : toTable(data, fields);

  const records = Array(50)
    .fill(0)
    .map((_, i) => ({ recid: i }));
  const fieldsIndexes = FIELDS_INDEXES.split("");

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      records[i][fieldsIndexes[j]] = table[i][j];
    }
  }

  return records;

  // Utils
  function toTable(data: object, fields: object[]) {
    const fieldsMap = new Map();
    fields.forEach((v: any) => fieldsMap.set(v.field, v));

    return Object.keys(data).map((k) => [fieldsMap.get(k).text, data[k]]);
  }
}

function toData(records: object[], fields: object[]): Data {
  // @ts-ignore
  const isTable = FIELDS_INDEXES.includes(fields[0].field);

  if (isTable) return toTable(records, fields);

  return toObject(records, fields);

  // Utils
  function toTable(records: object[], fields: object[]): Table {
    let table = [...Array(records.length)].map(() => [...Array(fields.length)]);
    const fieldsIndexes = FIELDS_INDEXES.split("");

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j] = records[i][fieldsIndexes[j]] ?? "";
      }
    }

    return table.slice(0, findLastNonEmptyRow(table) + 1);

    // utils
    function findLastNonEmptyRow(table: Table) {
      for (let i = table.length - 1; i >= 0; i--) {
        // @ts-ignore
        if (table[i].some((v) => v !== "")) {
          return i;
        }
      }
    }
  }

  function toObject(records: object[], fields: object[]): object {
    return Object.fromEntries(
      fields.map(({ field }: any, i) => [field, records[i]["B"]])
    );
  }
}
