import van, { State } from "vanjs-core";
import * as THREE from "three";
import {
  timberColumnDesign,
  SupportType,
  Loads,
  EntryParams,
  Geometry,
  ColumnDesignInput,
} from "./utils/timber-column-designer";
import { getKmod, getGlulamProperties } from "./utils/ec5Utils";
import { getViewer, getTables, getToolbar, getDialog, getReport } from "awatif-ui/src";

// import "./styles.css";

//@ts-ignorets-ignore
import * as reportChecks from "./utils/reportChecks";
import { template } from "./utils/template";
import { gradeState, levelState, loadDurationClassState, paramsGrade, paramsLoadDurationClass, paramsServiceClass, paramsSupport, serviceClassState, showGeoState, showNedState, supportState } from "./utils/parameters";
import { createColumn, createNodes, createSurface, createText } from "./utils/threejsUtils";


// ---------------------------------------------------
// Initialization of states and global variables
// ---------------------------------------------------

const designResults = van.state([]);
const nodes: State<Node[]> = van.state([]);
const sheetsObj = new Map();
const objects3D = van.state([]);
const tables = new Map();

interface GlobalInputs {
  support: State<string>;
  serviceClass: State<number>;
  loadDurationClass: State<string>;
  grade: State<string>;
}

var globalInputs: GlobalInputs = {
  support: supportState,
  serviceClass: serviceClassState,
  loadDurationClass: loadDurationClassState,
  grade: gradeState,
};


// ---------------------------------------------------
// Table Data for Design Inputs and Slab Inputs
// ---------------------------------------------------

const designInputsArray = van.state([
  ["Col1", 0, 7, 0.4, 0.4, 3000, 0, 15, 0, 0, 0],
  ["Col2", 0, 7, 0.4, 0.4, 2000, 0, 15, 5, 0, 0],
  ["Col3", 0, 7, 0.4, 0.4, 2000, 0, 15, 10, 0, 0],
  ["Col4", 0, 7, 0.4, 0.4, 2000, 0, 15, 15, 0, 0],
  ["Col5", 0, 7, 0.4, 0.4, 2000, 0, 15, 0, 5, 0],
  ["Col6", 0, 7, 0.6, 0.6, 5800, 0, 15, 5, 5, 0],
  ["Col7", 0, 7, 0.6, 0.6, 5200, 0, 15, 10, 5, 0],
  ["Col8", 0, 7, 0.4, 0.4, 2000, 0, 15, 15, 5, 0],
  ["Col9", 0, 7, 0.4, 0.4, 2000, 0, 15, 0, 10, 0],
  ["Col10", 0, 7, 0.5, 0.5, 4300, 0, 15, 5, 10, 0],
  ["Col11", 0, 7, 0.5, 0.5, 4800, 0, 15, 10, 10, 0],
  ["Col12", 0, 7, 0.5, 0.5, 2000, 0, 15, 15, 10, 0],
  ["Col1", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 0, 0, 3],
  ["Col2", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 5, 0, 3],
  ["Col3", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 10, 0, 3],
  ["Col4", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 0, 5, 3],
  ["Col5", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 5, 5, 3],
  ["Col6", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 10, 5, 3],
  ["Col7", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 0, 10, 3],
  ["Col8", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 5, 10, 3],
  ["Col9", 1, 4.2, 0.4, 0.3, 3000, 0, 15, 10, 10, 3],
  ["Col1", 2, 4.2, 0.2, 0.2, 3000, 0, 0, 0, 0, 6],
  ["Col2", 2, 4.2, 0.3, 0.3, 3500, 0, 0, 5, 0, 6],
  ["Col3", 2, 4.2, 0.3, 0.3, 2700, 0, 0, 5, 5, 6],
  ["Col4", 2, 4.2, 0.2, 0.2, 3100, 0, 0, 0, 5, 6]
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
tables.set("slab-Inputs", {
  text: "Slab",
  fields: [
    { field: "A", text: "xCord", editable: { type: "int" } },
    { field: "B", text: "yCord", editable: { type: "int" } },
    { field: "C", text: "zCord", editable: { type: "int" } },
  ],
  data: slabInputs,
});

// design inputs
tables.set("design-Inputs", {
  text: "Columns",
  fields: [
    { field: "A", text: "Column", editable: { type: "string" } },
    { field: "B", text: "Level", editable: { type: "float" } },
    { field: "C", text: "Length", editable: { type: "float" } },
    { field: "D", text: "Width", editable: { type: "float" } },
    { field: "E", text: "Height", editable: { type: "float" } },
    { field: "F", text: "Ned", editable: { type: "int" } },
    { field: "G", text: "Myd", editable: { type: "int" } },
    { field: "H", text: "Mzd", editable: { type: "int" } },
    { field: "I", text: "xCord", editable: { type: "float" } },
    { field: "J", text: "yCord", editable: { type: "float" } },
    { field: "K", text: "zCord", editable: { type: "float" } },
  ],
  data: designInputsArray,
});


// ---------------------------------------------------
// Event Handling for Sheet Changes
// ---------------------------------------------------

const onSheetChange = ({ data, sheet }) => {
  console.log(`Data updated on sheet: ${sheet}`);

  if (sheet === "design-Inputs") {
    van.derive(() => (designInputsArray.val = data));
  } else if (sheet === "slab-Inputs") {
    van.derive(() => (slabInputs.val = data));
  }
};

// ---------------------------------------------------
// Processing Design and Slab Inputs into Objects
// ---------------------------------------------------

const slabInputsObj = van.derive(() => 
  slabInputs.val.map(([x, y, z]) => ({ x, y, z }))
);

const designInputs = van.derive(() =>
  designInputsArray.val.map(([name, level, length, width, height, Ned, Myd, Mzd, x, y, z]) => 
    ({ name, level, length, width, height, Ned, Myd, Mzd, x, y, z })
  )
);


// ---------------------------------------------------
// Calculation and Grouping of Data by Z-Level
// ---------------------------------------------------

const groupByZ = (data) =>
  van.derive(() =>
    [...new Set(data.val.map((p) => p.z))].map((z) => data.val.filter((p) => p.z === z))
  );

const filteredSlabCords = groupByZ(slabInputsObj);
const filteredColCords = groupByZ(designInputs);
const uniqueZValues = [...new Set([...filteredColCords.val, ...filteredSlabCords.val].flat().map((p) => p.z))];
const columnLengths = uniqueZValues.slice(1).map((val, i) => val - uniqueZValues[i]);
const noCols = designInputs.val.length;


// ---------------------------------------------------
// Calculation and Grouping of Data by Z-Level
// ---------------------------------------------------

van.derive(() => {

  const results = [];
  const resultsInterface = [];
  const { kMod, gamma, chi } = getKmod(globalInputs.serviceClass.val, globalInputs.loadDurationClass.val);

  // loop through columns
  for (let i = 0; i < noCols; i++) {
    
    // define inputs
    var entryParams: EntryParams = {
      column: designInputs.val[i].name as string,
      support: globalInputs.support.val as any,
      grade: getGlulamProperties(globalInputs.grade.val),
      kmod: kMod,
      gamma: gamma,
      chi: chi,
    };

    var geometry: Geometry = {
      length: designInputs.val[i].length as number,
      width: designInputs.val[i].width as number,
      height: designInputs.val[i].height as number,
    };

    var loads: Loads = {
      N_ed: designInputs.val[i].Ned as number,
      M_yd: designInputs.val[i].Myd as number,
      M_zd: designInputs.val[i].Mzd as number,
    };

    var columnDesignInput: ColumnDesignInput = {
      entryParams: entryParams,
      geometry: geometry,
      loads: loads
    }

    // column desgin
    const columnDesignResults = timberColumnDesign(columnDesignInput);

    // store results
    resultsInterface.push(columnDesignResults);
  }
  designResults.val = resultsInterface;
});


// ---------------------------------------------------
// ThreeJS
// ---------------------------------------------------

// Colors
const colorBlue = 0x132e39;
const colorGrey = 0x29292E;
const colorWhite = 0xFFFFFF;
const colorNodeDefault = 0xff0000;
const colorRed = 0xFF0000;  // Pure red
const colorGreen = 0x00FF00;  // Pure green

// generate scene objects
van.derive(() => {

  // surface
  const surfaces = filteredSlabCords.val.map((cords, i) => {
    const color = levelState.val === i + 1 ? colorBlue : colorGrey;
    const surface = createSurface(cords, color);
    surface.position.set(0, 0, uniqueZValues[i+1]);
    return surface;
  });

  const columns = [], points = [], texts = [];
  filteredColCords.val.forEach((cols, i) => {
    
    const length = columnLengths[i];
    let j = 0
    cols.forEach((point, colNo) => {
      if (levelState.val === i + 1) {
        // console.log(j)
        
        // color
        let colorText = colorGreen
        if (designResults.val[j].compressionCheckResult.etaCheckCompressionParallelToGrain < 1) {
          colorText = colorGreen
        } else { colorText = colorRed}

        // text
        const colText = [`${designResults.val[j].entryParams.column}`];
        if (showGeoState.val === true) {
          colText.push(`w/h = ${designInputs.val[j].width}/${designInputs.val[j].height}m`)
        } 
        if (showNedState.val === true) { 
          colText.push(`Ned = ${designInputs.val[j].Ned}kN`)
        }
        colText.push(`η = ${(designResults.val[j].compressionCheckResult.etaCheckCompressionParallelToGrain * 100).toFixed(0)}%`)

        texts.push(...createText(point.x, point.y, point.z, length, colText, colorText));

        points.push(createNodes(point.x, point.y, point.z, colorNodeDefault));
        const nodesCopy = points[points.length - 1].clone();
        nodesCopy.position.z = length;
        points.push(nodesCopy);
        columns.push(createColumn(point.x, point.y, point.z, length, colorWhite));
      } else {
        columns.push(createColumn(point.x, point.y, point.z, length, colorGrey));
      } j++
    }); 
  });

  // lights
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(10, 10, 30);
  light.castShadow = true;

    // update objects
    objects3D.val = [...surfaces, ...columns, light, ...points, ...texts];
  });

// report
const reportInput = {
  designInputs,
  globalInputs,
  designResults,
  reportChecks
};

// dialog
const clickedButton = van.state("");
const dialogBody = van.state(undefined);
van.derive(() => {
  if (clickedButton.val === "Tables") {
    dialogBody.val = getTables({ tables });
  } else if (clickedButton.val === "Report") {
    dialogBody.val = getReport({ template, data: reportInput });
  }
});

// ---------------------------------------------------
// UI Components - Toolbar, Dialog, and Viewer
// ---------------------------------------------------

document.body.append(
  getToolbar({
    clickedButton,
    buttons: ["Tables", "Report"],
    sourceCode: "https://github.com/madil4/awatif/blob/main/examples/src/tables/main.ts",
    author: "https://www.linkedin.com/in/cal-mense/",
  }),
  getDialog({ dialogBody }),
  getViewer({ objects3D })
);