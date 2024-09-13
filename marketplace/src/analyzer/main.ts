import van from "vanjs-core";
import { Structure } from "awatif-data-structure";
import { layout, sheets, viewer } from "awatif-ui";

const structure: Structure = {
  nodes: van.state([
    [0, 0, 0],
    [0, 0, 10],
    [10, 0, 0],
  ]),
  elements: van.state([
    [0, 2],
    [1, 2],
  ]),
};

const sheetsObj = new Map();
sheetsObj.set("nodes", {
  text: "Nodes",
  data: structure.nodes.rawVal,
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
    { field: "2", text: "Z-coordinate", editable: { type: "float" } },
  ],
});
sheetsObj.set("elements", {
  text: "Elements",
  data: structure.elements.rawVal,
  columns: [
    { field: "0", text: "Node 1", editable: { type: "float" } },
    { field: "1", text: "Node 2", editable: { type: "float" } },
  ],
});

const onSheetChange = ({ sheet, data }) => {
  structure[sheet].val = data;
};

document.body.append(
  layout({
    main: sheets(sheetsObj, onSheetChange),
    right: viewer({ structure }),
  })
);
