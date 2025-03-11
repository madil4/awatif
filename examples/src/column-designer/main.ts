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
} from "./timber-column-designer";
import { getKmod, getGlulamProperties } from "./utils";
import "./styles.css";

//@ts-ignorets-ignore
import logo from "./awatif-logo.jpg";
import * as reportChecks from "./reportChecks";
import { toolbar } from "awatif-ui/src/toolbar/toolbar";
import { templateReport, templateTables } from "./template";
import { dialog } from "awatif-ui/src/dialog/dialog";
import { renderThreeJs } from "./threejs";
import { paramsGrade, paramsLoadDurationClass, paramsServiceClass, paramsSupport } from "./parameters";

const designResults = van.state([]);
const nodes: State<Node[]> = van.state([]);
const designResultsInterface = van.state([]);
const sheetsObj = new Map();
interface GlobalInputs {
  support: string;
  serviceClass: number;
  loadDurationClass: string;
  grade: string;
}

const designInputs = van.state([
  ["Col1", 5, 0.4, 0.3, 2000, 0, 15, 1.0, 1.0],
  ["Col2", 4.2, 0.5, 0.6, 3000, 20, 0, 1.0, 8.25],
  ["Col3", 4.2, 0.4, 0.4, 3000, 0, 0, 1.0, 16],
  ["Col4", 4.2, 0.5, 0.5, 3000, 30, 35, 8.25, 1.0],
  ["Col5", 4.2, 0.4, 0.4, 2000, 30, 35, 16, 1.0],
  ["Col6", 4.2, 0.4, 0.4, 2000, 30, 35, 16, 16],
  ["Col7", 4.2, 0.5, 0.5, 3000, 30, 35, 16, 8.25],
  ["Col8", 4.2, 0.5, 0.5, 3000, 30, 35, 8.25, 16],
  ["Col9", 4.2, 0.6, 0.6, 5000, 0, 0, 8.25, 8.25],
]);

const slabInputs = van.state([
  [0.5, 0.5, 0],
  [16.5, 0.5, 0],
  [16.5, 16.5, 0],
  [0.5, 16.5, 0],
  [0.5, 0.5, 0],
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
      column: designInputs.val[i][0] as string,
      support: globalInputs.support as any,
      grade: getGlulamProperties(globalInputs.grade),
      chi: chi,
    };

    var loads: Loads = {
      N_ed: designInputs.val[i][4] as number,
      M_yd: designInputs.val[i][5] as number,
      M_zd: designInputs.val[i][6] as number,
    };

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

console.log(slabInputs.val)
// THREEJS
const objects3D = renderThreeJs(
  slabInputs,
  designInputs,
  designResultsInterface
)

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
