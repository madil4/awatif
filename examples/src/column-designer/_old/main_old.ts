import van, { State } from "vanjs-core";
import { Text } from "awatif-ui/src/viewer/objects/Text";
import * as THREE from "three";
import {
  Parameters,
  parameters,
  table,
  viewer,
  layout,
  title,
  grid,
  marketing,
} from "awatif-ui";
import { html, TemplateResult } from "lit-html";
import {
  timberColumnDesign,
  SupportType,
  TimberColumnDesignInput,
  Loads,
  EntryParams,
  Geometry,
} from "../utils/timber-column-designer";
import { getKmod, getGlulamProperties } from "../utils/ec5Utils";
import "./styles.css";

//@ts-ignorets-ignore
import logo from "./awatif-logo.jpg";
import * as reportChecks from "../utils/reportChecks";
import { toolbar } from "awatif-ui/src/toolbar/toolbar";
import { templateReport, templateTables } from "../utils/template";
import { dialog } from "awatif-ui/src/dialog/dialog";
import { levelState, paramsGrade, paramsLoadDurationClass, paramsServiceClass, paramsSupport } from "../utils/parameters";
import { createColumn, createNodes, createSurface, createText } from "../utils/threejsUtils";

const designResults = van.state([]);
const nodes: State<Node[]> = van.state([]);
const designResultsInterface = van.state([]);
const sheetsObj = new Map();
const objects3D = van.state([]);
interface GlobalInputs {
  support: string;
  serviceClass: number;
  loadDurationClass: string;
  grade: string;
}

const designInputs = van.state([
  ["Col1", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 0, 0],
  ["Col2", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 0, 0],
  ["Col3", 4.2, 0.4, 0.3, 2000, 0, 15, 10, 0, 0],
  ["Col4", 4.2, 0.4, 0.3, 2000, 0, 15, 15, 0, 0],
  ["Col5", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 5, 0],
  ["Col6", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 5, 0],
  ["Col7", 4.2, 0.4, 0.3, 2000, 0, 15, 10, 5, 0],
  ["Col8", 4.2, 0.4, 0.3, 2000, 0, 15, 15, 5, 0],
  ["Col9", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 10, 0],
  ["Col10", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 10, 0],
  ["Col11", 4.2, 0.4, 0.3, 2000, 0, 15, 10, 10, 0],
  ["Col12", 4.2, 0.4, 0.3, 2000, 0, 15, 15, 10, 0],
  ["Col13", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 0, 3],
  ["Col14", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 0, 3],
  ["Col15", 4.2, 0.4, 0.3, 2000, 0, 15, 10, 0, 3],
  ["Col16", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 5, 3],
  ["Col17", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 5, 3],
  ["Col18", 4.2, 0.4, 0.3, 2000, 0, 15, 10, 5, 3],
  ["Col19", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 10, 3],
  ["Col20", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 10, 3],
  ["Col21", 4.2, 0.4, 0.3, 2000, 0, 15, 10, 10, 3],
  ["Col22", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 0, 6],
  ["Col23", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 0, 6],
  ["Col24", 4.2, 0.4, 0.3, 2000, 0, 15, 5, 5, 6],
  ["Col25", 4.2, 0.4, 0.3, 2000, 0, 15, 0, 5, 6]
]);

const slabInputs = van.state([
  [0, 0, 3], 
  [15, 0, 3], 
  [15, 10, 3], 
  [0, 10, 3], 
  [0, 0, 6], 
  [10, 0, 6], 
  [10, 10, 6], 
  [0, 10, 6], 
  [0, 0, 9], 
  [5, 0, 9], 
  [5, 5, 9], 
  [0, 5, 9]
]);


// slab inputs
sheetsObj.set("slab-Inputs", {
  text: "Slab",
  fields: [
    { field: "A", text: "xCord", editable: { type: "int" } },
    { field: "B", text: "yCord", editable: { type: "int" } },
    { field: "C", text: "zCord", editable: { type: "int" } },
  ],
  data: slabInputs,
});

// design inputs
sheetsObj.set("design-Inputs", {
  text: "Columns",
  fields: [
    { field: "A", text: "Column", editable: { type: "string" } },
    { field: "B", text: "Length", editable: { type: "float" } },
    { field: "C", text: "Width", editable: { type: "float" } },
    { field: "D", text: "Height", editable: { type: "float" } },
    { field: "E", text: "Ned", editable: { type: "int" } },
    { field: "F", text: "Myd", editable: { type: "int" } },
    { field: "G", text: "Mzd", editable: { type: "int" } },
    { field: "H", text: "xCord", editable: { type: "float" } },
    { field: "I", text: "yCord", editable: { type: "float" } },
    { field: "J", text: "zCord", editable: { type: "float" } },
  ],
  data: designInputs,
});

// events
const onSheetChange = ({ data, sheet }) => {
  console.log(`Data updated on sheet: ${sheet}`);
  if (sheet == "design-Inputs") {
    var changedData = designInputs;
  } else if (sheet == "slab-Inputs") {
    changedData = slabInputs;
  }
  changedData.val = data; // Update the reactive state with new sheet data
};

const sheetsElm = table({
  sheets: sheetsObj,
  onChange: onSheetChange,
});

// create objects from arrays
const slabInputsObj = slabInputs.val.map(([x, y, z]) => ({ x, y, z }));
const designInputsObj = designInputs.val.map(([name, length, width, height, Ned, Myd, Mzd, x, y, z]) => ({ name, length, width, height, Ned, Myd, Mzd, x, y, z }));

// Group coordinates by unique Z values
const groupByZ = (data) => [...new Set(data.map((p) => p.z))].map((z) => data.filter((p) => p.z === z));
const filteredSlabCords = groupByZ(slabInputsObj);
const filteredColCords = groupByZ(designInputsObj);
const uniqueZValues = [...new Set([...filteredColCords, ...filteredSlabCords].flat().map((p) => p.z))];
const columnLengths = uniqueZValues.slice(1).map((val, i) => val - uniqueZValues[i]);

// console.log(columnLengths)

// Colors
const colorBlue = 0x132e39;
const colorGrey = 0x29292E;
const colorWhite = 0xFFFFFF;
const colorNodeDefault = 0xff0000;

const noCols = designInputs.val.length;
const colNames = [];
for (let i = 0; i < noCols; i++) {
  colNames.push(designInputs.val[i][0]);
}

var globalInputs: GlobalInputs = {
  support: paramsSupport.support,
  serviceClass: paramsServiceClass.serviceClass,
  loadDurationClass: paramsLoadDurationClass.loadDurationClass,
  grade: paramsGrade.grade,
};

van.derive(() => {
  const results = [];
  const resultsInterface = [];
  for (let i = 0; i < noCols; i++) {
    const { kMod, gamma, chi } = getKmod(globalInputs.serviceClass, globalInputs.loadDurationClass);

    var entryParams: EntryParams = {
      column: designInputsObj[i].name as string,
      support: globalInputs.support as any,
      grade: getGlulamProperties(globalInputs.grade),
      chi: chi,
    };

    var loads: Loads = {
      N_ed: designInputsObj[i].Ned as number,
      M_yd: designInputsObj[i].Myd as number,
      M_zd: designInputsObj[i].Mzd as number,
    };

    // console.log(designInputsObj[i].name)

    var geometry: Geometry = {
      length: designInputs.val[i][1] as number,
      width: designInputs.val[i][2] as number,
      height: designInputs.val[i][3] as number,
    };

    var timberColumnDesignInput: TimberColumnDesignInput = {
      entryParams: entryParams,
      geometry: geometry,
      loads: loads,
    };

    const columnDesignResults = timberColumnDesign(timberColumnDesignInput);
    resultsInterface.push(columnDesignResults);
    const columnDesignResultsValues = Object.values(columnDesignResults)
      .slice(0, 40)
      .map((value) =>
        typeof value === "number" ? Number(value.toFixed(2)) : value
      );

    results.push(columnDesignResultsValues);
    // designResults.val = [...designResults.val, columnDesignResults];
  }
  designResults.val = results;
  designResultsInterface.val = resultsInterface;
});

// console.log(designResults.val)
// THREEJS
// Generate scene objects
van.derive(() => {
  const surfaces = filteredSlabCords.map((cords, i) => {
    const color = levelState.val === i + 1 ? colorBlue : colorGrey;
    const surface = createSurface(cords, color);
    surface.position.set(0, 0, uniqueZValues[i+1]);
    return surface;
  });

  const columns = [], points = [], texts = [];
  filteredColCords.forEach((cols, i) => {
    const length = columnLengths[i];
    cols.forEach((point, colNo) => {
      if (levelState.val === i + 1) {
        const colText = [`Col${colNo + 1}`, `Level ${designResults.val}`];
        texts.push(...createText(point.x, point.y, point.z, length, colText));
        points.push(createNodes(point.x, point.y, point.z, colorNodeDefault));
        const nodesCopy = points[points.length - 1].clone();
        nodesCopy.position.z = length;
        points.push(nodesCopy);
        columns.push(createColumn(point.x, point.y, point.z, length, colorWhite));
      } else {
        columns.push(createColumn(point.x, point.y, point.z, length, colorGrey));
      }
    });
  });


  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(10, 10, 30);
  light.castShadow = true;

    // Update objects
    objects3D.val = [...surfaces, ...columns, light, ...points, ...texts];
  });



// Report input
const reportInput = {
  colNames,
  designInputs,
  globalInputs,
  designResultsInterface,
  noCols,
  logo,
  reportChecks,
};

// Toolbar
const toolbarElm = toolbar(["tables", "report"]);

// Open Report Dialog on Toolbar Button Click
for (let i = 0; i < toolbarElm.length; i += 1) {
  if (toolbarElm[i].title === "tables") {
    toolbarElm[i].on("click", () => {
      console.log("Tables button clicked"); // Check if the button works
      // @ts-ignore
      const dialogObjTables = dialog({
        template: () => templateTables({ sheetsElm }),
      });
      console.log(dialogObjTables); // Check if the button works
      document.body.appendChild(dialogObjTables);
    });
  } else if (toolbarElm[i].title === "report") {
    toolbarElm[i].on("click", () => {
      console.log("Report button clicked"); // Check if the button works
      // @ts-ignore
      const dialogObjReport = dialog({
        template: () => templateReport(reportInput),
      });
      document.body.appendChild(dialogObjReport);
    });
  }
}

document.body.append(
  viewer({
    objects3D,
  })
);
