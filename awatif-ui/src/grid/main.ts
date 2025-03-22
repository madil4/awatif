import van from "vanjs-core";
import { getGrid } from "./getGrid";

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

const gridElm = getGrid({
  fields,
  data,
  onChange: (e) => console.log(e), // test on change
});

setTimeout(() => (data.val = [[0, 0, 0]]), 3000); // test on data change

gridElm.style.height = "250px";

document.body.appendChild(gridElm);

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

const gridElmObj = getGrid({
  fields: fieldsObj,
  data: dataObj,
  onChange: (v) => console.log(v), // to test on change
});

gridElmObj.style.height = "250px";
gridElmObj.style.top = "260px";

document.body.appendChild(gridElmObj);
