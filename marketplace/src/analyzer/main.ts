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
sheetsObj.set("Nodes", {
  data: structure.nodes.rawVal,
  columns: [
    { field: "0", text: "X-coordinate" },
    { field: "1", text: "Y-coordinate" },
    { field: "2", text: "Z-coordinate" },
  ],
});
sheetsObj.set("Elements", {
  data: structure.elements.rawVal,
  columns: [
    { field: "0", text: "Node 1" },
    { field: "1", text: "Node 2" },
  ],
});

const sheetsElm = sheets(sheetsObj);

document.body.append(viewerElm, sheetsElm);
