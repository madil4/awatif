import { html, TemplateResult } from "lit-html";
import van, { State } from "vanjs-core";
//@ts-ignorets-ignore
import logo from "./awatif-logo.jpg";

// import "./template.css";
import { getGlulamProperties, getKmod } from "./ec5Utils";
import { renderMath } from "./reportUtils";

export const template = ({
  designInputs,
  globalInputs,
  designResults,
  reportChecks,
}) => {
  // var i = 0;

  const noCols = designInputs.val.length;
  const index = Array.from({ length: noCols }, (_, i) => i);
  const glulam = getGlulamProperties(globalInputs.grade.val);
  
  const colNames = [];
  for (let j = 0; j < noCols; j++) {
    colNames.push(designInputs.val[j].name);
  }
  const selectedColumn = van.state(colNames[0]); // Default to the first column
  var i = colNames.indexOf(selectedColumn.val);


  return html`
    <header class="header">
    <div class="header-left">
      <p class="header-title">Report</p>
      <a href="https://awatif.co" class="header-link" target="_blank">https://awatif.co</a>
    </div>
    <div class="header-right">
      <img src="${logo}" id="headerLogo" alt="Logo" />
    </div>
  </header>

    <br />
    <h1>Timber Column Design</h1>
    <p class="caption">EN 1995-1-1: 2004</p>
    <br />


    <h1>Global Summary</h1>
    <h4>Overview of all design results</h4>

    <p class="p1">The following table gives an overview of all results:</p>

    <br />

    <table id="data-table">
      <!-- First header row -->
      <tr>
        <th>Column</th>
        <th>Level</th>
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
              <div class="custom-cell-content">${designInputs.val[i].name}</div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${designInputs.val[i].level}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${designInputs.val[i].length}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${designInputs.val[i].width}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${designInputs.val[i].height}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">${globalInputs.grade.val}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i].Ned}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i].Myd}</div>
            </td>
            <td>
              <div class="custom-cell-content">${designInputs.val[i].Mzd}</div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${(designResults.val[i].maxEtaY * 100).toFixed(0)}%
              </div>
            </td>
            <td>
              <div class="custom-cell-content">
                ${(designResults.val[i].maxEtaZ * 100).toFixed(0)}%
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

    <br /><br />
    <h2>Material Resistance</h2>
    <h4>Design values of material properties</h4>
    <p class="caption">EN1995-1-1 Ch. 2.4.1</p>

    <p class="p1">
      The design value of a strength property shall be factorized with:
    </p>
    <p class="math">
      ${renderMath(
        `\\chi = \\frac{k_{mod}}{\\gamma} = \\frac{${
          designResults.val[i].entryParams.kmod
        }}{${designResults.val[i].entryParams.gamma}} = ${designResults.val[
          i
        ].entryParams.chi.toFixed(2)}`
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
        <td>${designResults.val[i].resistance.f_c0d.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Bending strength around y-axis f<sub>m,y</sub></td>
        <td>${glulam.f_mk}</td>
        <td>${designResults.val[i].resistance.f_myd.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Bending strength around z-axis f<sub>m,z</sub></td>
        <td>${glulam.f_mk}</td>
        <td>${designResults.val[i].resistance.f_mzd.toFixed(2)}</td>
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
          <div class="custom-cell-content">${designInputs.val[i].Ned}</div>
        </td>
        <td>
          <div class="custom-cell-content">${designInputs.val[i].Myd}</div>
        </td>
        <td>
          <div class="custom-cell-content">${designInputs.val[i].Mzd}</div>
        </td>
      </tr>
    </table>

    <br /><br />
    <h2>Stress of Members</h2>
    ${reportChecks.generateCompressionCheckHTML(designResults.val[i])}
  `;
};
