import van from "vanjs-core";

import { getTables } from "./getTables";

const tables = new Map();

tables.set("nodes", {
  text: "Nodes",
  fields: [
    { field: "A", text: "X-coordinate", editable: { type: "float" } },
    { field: "B", text: "Y-coordinate", editable: { type: "float" } },
    { field: "C", text: "Z-coordinate", editable: { type: "float" } },
  ],
  data: van.state([
    [0, 0, 0],
    [1, 2, 3],
    [3, 4, 1],
  ]),
});

tables.set("elements", {
  text: "Elements",
  fields: [
    { field: "A", text: "Node 1", editable: { type: "float" } },
    { field: "B", text: "Node 2", editable: { type: "float" } },
  ],
  data: van.state([
    [0, 0],
    [1, 2],
    [3, 4],
  ]),
});

const tablesElm = getTables({ tables });

van.derive(() => {
  console.log(tables.get("nodes").data.val);
});

van.derive(() => {
  console.log(tables.get("elements").data.val);
});

document.body.appendChild(tablesElm);
