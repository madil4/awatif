import van, { State } from "vanjs-core";
import { Text } from "awatif-ui/src/viewer/objects/Text";
import * as THREE from "three";
import {
  Parameters,
  parameters,
  sheets,
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
import { renderMath } from "./reportUtils";
import "./style.css";

//@ts-ignorets-ignore
import logo from "./awatif-logo.jpg";
import { Structure } from "awatif-data-structure";
import * as reportChecks from "./reportChecks";

// init
const params: Parameters = {
  support: { value: van.state(0), min: 0, max: 500 },
  serviceClass: { value: van.state(0), min: 0, max: 500 },
  loadDurationClass: { value: van.state(0), min: 0, max: 500 },
  grade: { value: van.state(0), min: 0, max: 500 },
};

const nodes: State<Node[]> = van.state([]);

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

const globalInputs = van.state([["pinned", 2, "permanent", "GL28h"]]);

const designResults = van.state([]);
const designResultsInterface = van.state([]);

const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);

const points = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.PointsMaterial({})
);

const column = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 30),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);

var text = new Text("Hello World");
text.position.set(5, 5, 0);

const objects3D = van.state([lines, points, text, column]);
const sheetsObj = new Map();

// global inputs
sheetsObj.set("global-Param", {
  text: "Global",
  size: "8px",
  fields: [
    { field: "A", text: "Support", editable: { type: "string" } },
    { field: "B", text: "serviceClass", editable: { type: "number" } },
    { field: "C", text: "loadDurationClass", editable: { type: "string" } },
    { field: "D", text: "Grade", editable: { type: "string" } },
  ],
  data: globalInputs,
});
// console.log(globalInputs)

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
  } else {
    changedData = globalInputs;
  }
  changedData.val = data; // Update the reactive state with new sheet data
};

const sheetsElm = sheets({
  sheets: sheetsObj,
  onChange: onSheetChange,
});

// sheets({ sheets: sheetsObj, onChange: onSheetChange })

const noCols = designInputs.val.length;
const colNames = [];
for (let i = 0; i < noCols; i++) {
  colNames.push(designInputs.val[i][0]);
}

van.derive(() => {
  const results = [];
  const resultsInterface = [];
  for (let i = 0; i < noCols; i++) {
    var serviceClass = globalInputs.val[0][1] as number;
    var loadDurationClass = globalInputs.val[0][2] as string;
    var grade = globalInputs.val[0][3] as string;
    const { kMod, gamma, chi } = getKmod(serviceClass, loadDurationClass);

    var entryParams: EntryParams = {
      column: designInputs.val[i][0] as string,
      support: globalInputs.val[0][0] as any,
      grade: getGlulamProperties(grade),
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

    // const columnDesignResultsValues = Object.values(columnDesignResults).slice(0, 5);

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

// on inputPolyline change: render lines
var xyCoords = [];
for (let i = 0; i < noCols; i++) {
  const xCord = designInputs.val[i][7] as number; // x-coordinate
  const yCord = designInputs.val[i][8] as number; // y-coordinate
  const zCord = 0; // z-coordinate

  xyCoords.push([xCord, yCord, zCord]); // Push coordinates as an array
}

// THREEJS
van.derive(() => {
  //lines
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(slabInputs.val.flat(), 3)
  );
  lines.material.color.set(0x132e39); // Green lines

  //points
  const positions = xyCoords.flat();
  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  points.material.size = 1; // Larger points
  points.material.color.set(0xff0000); // Red points

  // columns
  // const column = createRectangularColumn(2, 5, 1, 0xff0000); // Red column with width=2, height=5, length=1

  // Position the column (optional, default is at the origin)

  //text
  // Clear existing text objects
  const currentTexts = objects3D.rawVal.filter((obj) => obj instanceof Text);
  currentTexts.forEach((textObj) =>
    objects3D.rawVal.splice(objects3D.rawVal.indexOf(textObj), 1)
  );

  // Add new text objects dynamically
  for (let i = 0; i < noCols; i++) {
    const xCord = designInputs.val[i][7] as number;
    const yCord = designInputs.val[i][8] as number;
    const zCord = 2;
    // const etaMax = Math.max(designResults.val[i][1], designResults.val[i][2]);
    const etaMax = (
      Math.max(
        designResultsInterface.val[i].maxEtaY,
        designResultsInterface.val[i].maxEtaZ
      ) * 100
    ).toFixed(0);

    // Multi-line text content
    const lines = [`Col${i + 1}`, `η: ${etaMax}%`];

    lines.forEach((line, index) => {
      const lineText = new Text(line);
      lineText.updateScale(0.7);
      lineText.position.set(xCord, yCord, zCord - index * 0.7); // Adjust yCord for each line
      objects3D.rawVal.push(lineText); // Add to objects
    });
  }

  // surface
  // Clear previous surfaces
  const currentSurfaces = objects3D.rawVal.filter(
    (obj) => obj instanceof THREE.Mesh
  );
  currentSurfaces.forEach((surface) => {
    surface.geometry.dispose(); // Dispose of geometry
    surface.material.dispose(); // Dispose of material
    objects3D.rawVal.splice(objects3D.rawVal.indexOf(surface), 1);
  });

  // Create and add the new surface
  const vertices = slabInputs.val.flat();
  const indices = [0, 1, 2, 0, 2, 3]; // Indices defining triangles
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);

  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({
    color: 0x132e39, // The color you want to use
    side: THREE.DoubleSide, // Make both sides of the object visible
  });

  const surface = new THREE.Mesh(geometry, material);
  //@ts-ignore
  objects3D.rawVal.push(surface);

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});
console.log(designResultsInterface.val[0]);

const templateReport: (nodes: Structure["nodes"]) => TemplateResult = (
  nodes
) => {
  // var i = 0;
  var i = colNames.indexOf(selectedColumn.val);

  var column = designInputs.val[i][0] as string;
  var length = designInputs.val[i][1] as number;
  var width = designInputs.val[i][2] as number;
  var height = designInputs.val[i][3] as number;
  var N_ed = designInputs.val[i][4] as number;
  var M_yd = designInputs.val[i][5] as number;
  var M_zd = designInputs.val[i][6] as number;
  var support = globalInputs.val[0][0] as any;
  var serviceClass = globalInputs.val[0][1] as number;
  var loadDurationClass = globalInputs.val[0][2] as string;
  var grade = globalInputs.val[0][3] as string;

  var results = designResultsInterface.val[i];
  var area = results.geometryProperties.area as number;
  var w_ply = results.geometryProperties.w_ply as number;
  var w_plz = results.geometryProperties.w_plz as number;
  var I_y = results.geometryProperties.I_y as number;
  var I_z = results.geometryProperties.I_z as number;
  var i_y = results.geometryProperties.i_y as number;
  var i_z = results.geometryProperties.i_z as number;

  var f_c0d = results.designResistance.f_c0d.toFixed(2) as number;
  var f_myd = results.designResistance.f_myd.toFixed(2) as number;
  var f_mzd = results.designResistance.f_mzd.toFixed(2) as number;

  const { kMod, gamma, chi } = getKmod(serviceClass, loadDurationClass);
  const glulam = getGlulamProperties(grade);
  const index = Array.from({ length: noCols }, (_, i) => i);

  return html`
    <header class="header">
      <div class="header-left">
        <p class="header-h1">Timber Column Designer</p>
        <p class="header-h2">https://awatif.co</p>
        <p class="header-h3">20.02.2025</p>
      </div>
      <div class="header-right">
        <img src=${logo} id="headerLogo" height="60px" />
      </div>
    </header>

    <br />
    <h1>Global Summary</h1>
    <h4>Overview of all design results</h4>
    <p class="caption">EN 1995-1-1: 2004</p>

    <p class="p1">The following table gives an overview of all results:</p>

    <br />

    <table id="data-table">
      <!-- First header row -->
      <tr>
        <th>Column</th>
        <th>Length</th>
        <th>Width</th>
        <th>Height</th>
        <th>Grade</th>
        <th>N<sub>ed</sub></th>
        <th>M<sub>yd</sub></th>
        <th>M<sub>zd</sub></th>
        <th>η<sub>y</sub></th>
        <th>η<sub>z</sub></th>
      </tr>

      <!-- Second header row for units -->
      <tr>
        <th>-</th>
        <th>m</th>
        <th>m</th>
        <th>m</th>
        <th>-</th>
        <th>kN</th>
        <th>kNm</th>
        <th>kNm</th>
        <th>%</th>
        <th>%</th>
      </tr>

      <!-- Table body -->
      ${index.map(
        (i) => html`
          <tr>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][2]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][3]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${globalInputs.val[0][3]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][4]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][5]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i][6]}</div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${(designResultsInterface.val[i].maxEtaY * 100).toFixed(0)}%
              </div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${(designResultsInterface.val[i].maxEtaZ * 100).toFixed(0)}%
              </div>
            </td>
          </tr>
        `
      )}
    </table>

    <br /><br />
    <h1>Report for Single Column</h1>
    <h4>Detailed structural check</h4>
    <p class="caption">EN 1995-1-1: 2004</p>

    ${columnDropdown()}
    <!-- Dropdown in UI -->
    <br /><br />

    <h2>Summary</h2>
    <h4>Relevant structural checks</h4>
    <p class="caption">EN 1995-1-1: 2004</p>

    ${M_yd === 0 && M_zd === 0
      ? html`
          <table id="data-table">
            <!-- First header row -->
            <tr>
              <th>Clause</th>
              <th>Check</th>
              <th>Utilization</th>
            </tr>

            <!-- Second header row for units -->
            <!-- Intermediate row for ULS -->
            <tr class="intermediate-row">
              <td colspan="3">Ultimate Limit State (ULS)</td>
            </tr>

            <!-- Table body -->
            <tr>
              <td>6.1</td>
              <td>Stress of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.1.4</td>
              <td>Compression parallel to the grain</td>
              <td>
                ${(
                  results.compressionCheckResult
                    .etaCheckCompressionParallelToGrain * 100
                ).toFixed(0)}%
              </td>
            </tr>
            <tr>
              <td>6.3</td>
              <td>Stability of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.3.2</td>
              <td>Either compression or combined compression and bending</td>
              <td>
                ${(
                  Math.max(
                    results.stabilityCheckResult.etaStabilityY,
                    results.stabilityCheckResult.etaStabilityZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>

            <!-- Second header row for units -->
            <!-- Second header row for units -->
            <tr class="intermediate-row">
              <td colspan="3">Serviceability Limit State (SLS)</td>
            </tr>

            <tr>
              <td>6.3.2</td>
              <td>Deflection</td>
              <td>${(results.maxEtaZ * 100).toFixed(0)}%</td>
            </tr>
          </table>
        `
      : M_yd !== 0 && M_zd === 0
      ? html`
          <table id="data-table">
            <!-- First header row -->
            <tr>
              <th>Clause</th>
              <th>Check</th>
              <th>Utilization</th>
            </tr>

            <!-- Second header row for units -->
            <!-- Intermediate row for ULS -->
            <tr class="intermediate-row">
              <td colspan="3">Ultimate Limit State (ULS)</td>
            </tr>

            <!-- Table body -->
            <tr>
              <td>6.1</td>
              <td>Stress of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.2.4</td>
              <td>Combined bending and axial compression</td>
              <td>
                ${(
                  Math.max(
                    results.combinedBendingCompressionCheckResult
                      .etaCheckCombinedBendingCompressionY,
                    results.combinedBendingCompressionCheckResult
                      .etaCheckCombinedBendingCompressionZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>
            <tr>
              <td>6.3</td>
              <td>Stability of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.3.2</td>
              <td>Either compression or combined compression and bending</td>
              <td>
                ${(
                  Math.max(
                    results.stabilityCheckResult.etaStabilityY,
                    results.stabilityCheckResult.etaStabilityZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>
            <tr>
              <td>6.3.3</td>
              <td>Lateral torsional buckling</td>
              <td>
                ${(
                  Math.max(
                    results.lTBCheckResult.etaLTBY,
                    results.lTBCheckResult.etaLTBZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>

            <!-- Second header row for units -->
            <!-- Second header row for units -->
            <tr class="intermediate-row">
              <td colspan="3">Serviceability Limit State (SLS)</td>
            </tr>

            <tr>
              <td>6.3.2</td>
              <td>Deflection</td>
              <td>${results.maxEtaZ.toFixed(2)}</td>
            </tr>
          </table>
        `
      : M_yd !== 0 && M_zd !== 0
      ? html`
          <table id="data-table">
            <!-- First header row -->
            <tr>
              <th>Clause</th>
              <th>Check</th>
              <th>Utilization</th>
            </tr>

            <!-- Second header row for units -->
            <!-- Intermediate row for ULS -->
            <tr class="intermediate-row">
              <td colspan="3">Ultimate Limit State (ULS)</td>
            </tr>

            <!-- Table body -->
            <tr>
              <td>6.1</td>
              <td>Stress of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.2.4</td>
              <td>Combined bending and axial compression</td>
              ${(
                Math.max(
                  results.combinedBendingCompressionCheckResult
                    .etaCheckCombinedBendingCompressionY,
                  results.combinedBendingCompressionCheckResult
                    .etaCheckCombinedBendingCompressionZ
                ) * 100
              ).toFixed(0)}%
            </tr>
            <tr>
              <td>6.3</td>
              <td>Stability of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.3.2</td>
              <td>Either compression or combined compression and bending</td>
              <td>
                ${(
                  Math.max(
                    results.stabilityCheckResult.etaStabilityY,
                    results.stabilityCheckResult.etaStabilityZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>

            <!-- Second header row for units -->
            <!-- Second header row for units -->
            <tr class="intermediate-row">
              <td colspan="3">Serviceability Limit State (SLS)</td>
            </tr>

            <tr>
              <td>6.3.2</td>
              <td>Deflection</td>
              <td>${results.maxEtaZ.toFixed(2)}</td>
            </tr>
          </table>
        `
      : html`
          <table id="data-table">
            <!-- First header row -->
            <tr>
              <th>Clause</th>
              <th>Check</th>
              <th>Utilization</th>
            </tr>

            <!-- Second header row for units -->
            <!-- Intermediate row for ULS -->
            <tr class="intermediate-row">
              <td colspan="3">Ultimate Limit State (ULS)</td>
            </tr>

            <!-- Table body -->
            <tr>
              <td>6.1</td>
              <td><bolt>Stress of Members</td>
              <td>-</td>
            </tr>
            <tr>
            <td>6.2.4</td>
            <td>Combined bending and axial compression</td>
            <td>
              ${(
                Math.max(
                  results.combinedBendingCompressionCheckResult
                    .etaCheckCombinedBendingCompressionY,
                  results.combinedBendingCompressionCheckResult
                    .etaCheckCombinedBendingCompressionZ
                ) * 100
              ).toFixed(0)}%
            </td>
            <tr>
              <td>6.3</td>
              <td>Stability of Members</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6.3.2</td>
              <td>Either compression or combined compression and bending</td>
              <td>
                ${(
                  Math.max(
                    results.stabilityCheckResult.etaStabilityY,
                    results.stabilityCheckResult.etaStabilityZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>
            <tr>
              <td>6.3.3</td>
              <td>Lateral torsional buckling</td>
              <td>
                ${(
                  Math.max(
                    results.lTBCheckResult.etaLTBY,
                    results.lTBCheckResult.etaLTBZ
                  ) * 100
                ).toFixed(0)}%
              </td>
            </tr>

            <!-- Second header row for units -->
            <tr class="intermediate-row">
              <td colspan="3">Serviceability Limit State (SLS)</td>
            </tr>

            <tr>
              <td>6.3.2</td>
              <td>Deflection</td>
              <td>${results.maxEtaZ.toFixed(2)}</td>
            </tr>
          </table>
        `}

    <br />
    <br />
    <br />
    <h2>Input Values</h2>
    <h4>Overview of input parameters</h4>

    <div class="geometry-container">
      <div class="column">
        <br />
        <h3>System</h3>
        <p class="p1">Column: ${column}</p>
        <p class="p1">Grade: ${grade}</p>
        <p class="p1">Support: ${support}</p>
      </div>
      <div class="column">
        <br />
        <h3>Geometry</h3>
        <p class="p1">Length: ${length} m</p>
        <p class="p1">Width: ${width} m</p>
        <p class="p1">Height: ${height} m</p>
      </div>
      <div class="column">
        <br />
        <h3>Load</h3>
        <p class="p1">Service class: ${serviceClass}</p>
        <p class="p1">Load duration class: ${loadDurationClass}</p>
      </div>
    </div>

    <br /><br />
    <h2>Geometry Properties</h2>
    <h4>Stiffness properties for design</h4>
    <p class="caption">EN1995-1-1 Ch. 2.4.1</p>

    <table id="data-table">
      <!-- First header row -->
      <tr>
        <th>Property</th>
        <th>y-axis</th>
        <th>z-axis</th>
      </tr>

      <!-- Second header row for units -->
      <tr>
        <th>-</th>
        <th>cm³, cm⁴, cm</th>
        <th>cm³, cm⁴, cm</th>
      </tr>

      <!-- Table body -->
      <tr>
        <td>Section modulus w<sub>pl,yz</sub></td>
        <td>${(w_ply * 0.1 ** 3).toFixed(0)}</td>
        <td>${(w_ply * 0.1 ** 3).toFixed(0)}</td>
      </tr>
      <tr>
        <td>Moment of inertia I<sub>yz</sub></td>
        <td>${(I_y * 0.1 ** 4).toFixed(0)}</td>
        <td>${(I_y * 0.1 ** 4).toFixed(0)}</td>
      </tr>
      <tr>
        <td>Radius of gyration i<sub>yz</sub></td>
        <td>${(i_y * 0.1).toFixed(1)}</td>
        <td>${(i_y * 0.1).toFixed(1)}</td>
      </tr>
    </table>

    <br /><br />
    <h2>Material Resistance</h2>
    <h4>Design values of material properties</h4>
    <p class="caption">EN1995-1-1 Ch. 2.4.1</p>

    <p class="p1">
      The design value of a strength property shall be factorized with:
    </p>
    <p class="math">
      ${renderMath(
        `\\chi = \\frac{k_{mod}}{\\gamma} = \\frac{${kMod}}{${gamma}} = ${chi.toFixed(
          2
        )}`
      )}
    </p>
    <br />
    <br />

    <table id="data-table">
      <!-- First header row -->
      <tr>
        <th>Property</th>
        <th>Characteristic Value</th>
        <th>Design Value</th>
      </tr>

      <!-- Second header row for units -->
      <tr>
        <th>-</th>
        <th>N/mm²</th>
        <th>N/mm²</th>
      </tr>

      <!-- Table body -->
      <tr>
        <td>Compressive strength f<sub>c,0</sub></td>
        <td>${glulam.f_c0k}</td>
        <td>${f_c0d}</td>
      </tr>
      <tr>
        <td>Bending strength around y-axis f<sub>m,y</sub></td>
        <td>${glulam.f_mk}</td>
        <td>${f_myd}</td>
      </tr>
      <tr>
        <td>Bending strength around z-axis f<sub>m,z</sub></td>
        <td>${glulam.f_mk}</td>
        <td>${f_mzd}</td>
      </tr>
      <tr>
        <td>Mean modulus of elasticity E<sub>mean,0</sub></td>
        <td>${glulam.E0mean}</td>
        <td>-</td>
      </tr>
      <tr>
        <td>Fifth-percentile modulus of elasticity E<sub>05</sub></td>
        <td>${glulam.E05}</td>
        <td>-</td>
      </tr>
      <tr>
        <td>Fifth-percentile shear modulus G<sub>05</sub></td>
        <td>${glulam.G05}</td>
        <td>-</td>
      </tr>
    </table>

    <br /><br />
    <h2>Design Loading</h2>
    <h4>Summary of applied design forces and moments</h4>
    <p class="caption">EN1991-1-1</p>

    <p class="p1">The following loads are applied:</p>

    <table id="data-table">
      <!-- First header row -->
      <tr>
        <th>N<sub>ed</sub></th>
        <th>M<sub>yd</sub></th>
        <th>M<sub>zd</sub></th>
      </tr>

      <!-- Second header row for units -->
      <tr>
        <th>kN</th>
        <th>kNm</th>
        <th>kNm</th>
      </tr>

      <!-- Table body -->
      <tr>
        <td>
          <div class="custom-cell-content">${N_ed}</div>
        </td>
        <td>
          <div class="custom-cell-content">${M_yd}</div>
        </td>
        <td>
          <div class="custom-cell-content">${M_zd}</div>
        </td>
      </tr>
    </table>

    ${M_yd === 0 && M_zd === 0
      ? html`
          <br /><br />
          <h2>Stress of Members</h2>
          ${reportChecks.generateCompressionCheckHTML(results)}
          <br /><br />
          <h2>Stability of Members</h2>
          ${reportChecks.generateStabilityCheckHTML(M_yd, M_zd, results)}
        `
      : html`
          <br /><br />
          <h2>Stress of Members</h2>
          ${reportChecks.generateCombinedBendingCompressionCheckHTML(
            M_yd,
            M_zd,
            results
          )}
          <br /><br />
          <h2>Stability of Members</h2>
          ${reportChecks.generateStabilityCheckHTML(M_yd, M_zd, results)}
          <br /><br /><br />
        `}

    <br /><br /><br />
  `;
};

// Assume colNames is an array of column names (e.g., ["Column 1", "Column 2", "Column 3"])
const selectedColumn = van.state(colNames[0]); // Default to the first column

// Function to create the dropdown
const columnDropdown = () =>
  van.tags.div(
    van.tags.p({ class: "p1" }, "Select a column to view results:"),
    van.tags.select(
      {
        id: "columnSelect",
        onchange: (e) => (selectedColumn.val = e.target.value), // Update state when selection changes
      },
      colNames.map((col) =>
        van.tags.option(
          { value: col, selected: col === selectedColumn.val },
          col
        )
      )
    )
  );

// Render the dropdown into the DOM
document.body.appendChild(columnDropdown());

document.body.append(
  viewer({
    objects3D,
    reportObj: {
      template: templateReport,
      data: nodes,
    },
  })
);
