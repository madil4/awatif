import van from "vanjs-core";
import { getTable } from "./getTable";

// Init
const fields = [
  {
    field: "A",
    text: "X-coordinate",
    editable: { type: "float" },
  },
  {
    field: "B",
    text: "Y-coordinate",
    editable: { type: "float" },
  },
  {
    field: "C",
    text: "Z-coordinate",
    editable: { type: "float" },
  },
];
const data = van.state([
  [0, 0, 0],
  [1, 2, 3],
  [3, 4, 1],
]);

const tableElm = getTable({
  fields,
  data,
});

// Update
tableElm.style.height = "250px";

// Events
setTimeout(() => (data.val = [[0, 0, 0]]), 2000); // test on data change

van.derive(() => console.log(data.val));

document.body.appendChild(tableElm);

// Another test case
// Init
const fieldsObj = [
  {
    field: "xPosition",
    text: "X-Position",
  },
  {
    field: "zPosition",
    text: "Z-Position",
  },
];
const dataObj = van.state({
  xPosition: 600,
  zPosition: 0,
});

const tableElmObj = getTable({
  fields: fieldsObj,
  data: dataObj,
});

// Update
tableElmObj.style.height = "250px";
tableElmObj.style.top = "260px";

// Events
van.derive(() => console.log(dataObj.val));

document.body.appendChild(tableElmObj);
