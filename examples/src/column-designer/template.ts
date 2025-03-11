import { html, TemplateResult } from "lit-html";
import { Structure } from "awatif-data-structure";
import van, { State } from "vanjs-core";

import "./template.css";
import { getGlulamProperties, getKmod } from "./utils";
import { renderMath } from "./reportUtils";

// Template for the tables dialog
export const templateTables = ({ sheetsElm }) => {
  return html`
    <div>
      <h2>Tables</h2>
      <div id="sheets-container">
        ${sheetsElm}
        <!-- Render the sheets here -->
      </div>
    </div>
  `;
};

export const templateReport = ({
  colNames,
  designInputs,
  globalInputs,
  designResultsInterface,
  noCols,
  logo,
  reportChecks,
}) => {
  // var i = 0;
  const selectedColumn = van.state(colNames[0]); // Default to the first column

  var i = colNames.indexOf(selectedColumn.val);

  var input = designInputs.val[i];
  var column = designInputs.val[i][0] as string;
  var length = designInputs.val[i][1] as number;
  var width = designInputs.val[i][2] as number;
  var height = designInputs.val[i][3] as number;
  var N_ed = designInputs.val[i][4] as number;
  var M_yd = designInputs.val[i][5] as number;
  var M_zd = designInputs.val[i][6] as number;
  var support = globalInputs.support;
  var serviceClass = globalInputs.serviceClass;
  var loadDurationClass = globalInputs.loadDurationClass;
  var grade = globalInputs.grade;

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
              <div class="custom-cell-content">${globalInputs.grade}</div>
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

    <p class="p1">Select a column to view results:</p>

  <select
    id="columnSelect"
    @change=${(e) => (selectedColumn.val = e.target.value)}
  >
    ${colNames.map(
      (col) =>
        html`<option value=${col} ?selected=${col === selectedColumn.val}>
          ${col}
        </option>`
    )}
  </select>
  <br /><br />
  
    <!-- Dropdown in UI -->
    <br />

    <h2>Summary</h2>
    <h4>Relevant structural checks</h4>
    <p class="caption">EN 1995-1-1: 2004</p>

    <table id="table-design">
      <!-- First header row -->
      <tr>
        <th>Clause</th>
        <th>Check</th>
        <th>Utilization</th>
      </tr>

      <!-- Second header row for units -->
      <tr>
        <th>ULS</th>
        <th>Ultimate Limit State</th>
        <th>-</th>
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
        <td>${results.maxEtaZ.toFixed(2)}</td>
      </tr>
      <tr>
        <td>6.3</td>
        <td>Stability of Members</td>
        <td>-</td>
      </tr>
      <tr>
        <td>6.3.2</td>
        <td>Either compression or combined compression and bending</td>
        <td>${results.maxEtaZ.toFixed(2)}</td>
      </tr>

      <!-- Second header row for units -->
      <tr>
        <th>SLS</th>
        <th>Serviceability Limit State</th>
        <th>-</th>
      </tr>

      <tr>
        <td>6.3.2</td>
        <td>Deflection</td>
        <td>${results.maxEtaZ.toFixed(2)}</td>
      </tr>
    </table>

    ${M_yd === 0 && M_zd === 0
      ? html`
      <p class="p1">In summary, for timber column design, the relevant clauses in EN 1995-1-1: 2004 are:</p>
      <h3>Ultimate Limit State</h3>
      <h4>Clause 6.1 Stress of members</h4>
      <ul>
        <li><p1>Clause 6.1.4</p1> Compression parallel to the grain </li>
      </ul>
      <h4>Clause 6.3 Stability of members</h4>
      <ul>
        <li><p1>Clause 6.3.2</p1> Columns subjected to either compression or combined compression and bending </li>
      </ul>
      <h3>Serviceability Limit State</h3>
      <ul>
        <li><p1>Deflection </li>
      </ul>

    `
      : M_yd !== 0 && M_zd === 0
      ? html`
      <p class="p1">
        In summary, for timber column design, the relevant clauses in EN
        1995-1-1: 2004 are:
        <h3>Ultimate Limit State</h3>
      </p>
      <h4>
      Clause 6.2 Stress of members
      </h4>
      <ul>
        <li>
          <p1>Clause 6.2.4</p1> Combined bending and axial compression
        </li>
      </ul>
      <h4>Clause 6.3 Stability of members</h4>
      <ul>
        <li>
          <p1>Clause 6.3.2</p1> Buckling: Columns subjected to either compression or
          combined compression and bending
        </li>
        <li>
          <p1>Clause 6.3.3</p1> Lateral torsional buckling: Columns either bending or combined bending and compression
        </li>
      </ul>
      <h3>Serviceability Limit State</h3>
      <ul>
        <li><p1>Deflection </li>
      </ul>
    `
      : M_yd !== 0 && M_zd !== 0
      ? html`
        <p class="p1">
          In summary, for timber column design, the relevant clauses in EN
          1995-1-1: 2004 are:
          <h3>Ultimate Limit State</h3>
        </p>
        <h4>
        Clause 6.2 Stress of members
        </h4>
        <ul>
          <li>
            <p1>Clause 6.2.4</p1> Combined bending and axial compression
          </li>
        </ul>
        <h4>Clause 6.3 Stability of members</h4>
        <ul>
          <li>
            <p1>Clause 6.3.2</p1> Buckling: Columns subjected to either compression or
            combined compression and bending
          </li>
        </ul>
        <h3>Serviceability Limit State</h3>
        <ul>
          <li><p1>Deflection </li>
        </ul>
      `
      : html`
  <p class="p1">
    In summary, for timber column design, the relevant clauses in EN
    1995-1-1: 2004 are:
    <h3>Ultimate Limit State</h3>
  </p>
  <h4>
    Clause 6.2 Stress of members
  </h4>
  <ul>
    <li>
      <p1>Clause 6.2.4</p1> Combined bending and axial compression
    </li>
  </ul>
  <h4>Clause 6.3 Stability of members</h4>
  <ul>
    <li>
      <p1>Clause 6.3.2</p1> Buckling: Columns subjected to either compression or
      combined compression and bending
    </li>
    <li>
      <p1>Clause 6.3.3</p1> Lateral torsional buckling: Columns either bending or combined bending and compression
    </li>
  </ul>
  <h3>Serviceability Limit State</h3>
  <ul>
        <li><p1>Deflection </li>
      </ul>
    `}

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

    <table id="table-design">
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

    <table id="table-design">
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

const templateInput: (nodes: Structure["nodes"]) => TemplateResult = (
  sheetsElm
) => {
  return html`
    <h2>Input Table</h2>

    ${sheetsElm}
  `;
};


