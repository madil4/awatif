import van from "vanjs-core";
import { Structure } from "awatif-data-structure";
import { sheets, viewer } from "awatif-ui";

const structure: Structure = {
  nodes: van.state([]),
  elements: van.state([]),
};

structure.nodes.val = [
  [0, 0, 0],
  [0, 0, 10],
  [10, 0, 0],
];
structure.elements.val = [
  [0, 2],
  [1, 2],
];

const viewerElm = viewer(structure);

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

const onSheetChange = ({ sheet, index, field, value }) => {
  const updatedObj = [...structure[sheet].rawVal];
  updatedObj[index][field] = value;

  structure[sheet].val = updatedObj;
};

const sheetsElm = sheets(sheetsObj, onSheetChange);

document.body.append(viewerElm, sheetsElm);
