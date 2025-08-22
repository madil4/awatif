import { html } from "lit-html";

import "./template.css";

//@ts-ignore
import logo from "./awatif-logo.png";
//@ts-ignore
import bending_stress_image from "./clt-bending-stress.png";

export const getTemplate = ({ designMomentInput, designOutputs }) =>
  html`
    <div id="report">
      <header class="header">
        <div class="header-left">
          <p class="header-title">Report</p>
          <a href="https://awatif.co" class="header-link" target="_blank"
            >https://awatif.co</a
          >
        </div>
        <div class="header-right">
          <img src="${logo}" id="headerLogo" alt="Logo" />
        </div>
      </header>

      <br />
      <h1>Cross-Laminated Timber (CLT)</h1>
      <p class="caption">EN 1995-1-1: 2004</p>

      <br />
      <h2>Bending Design</h2>
      <p class="caption">EN 1995-1-1: 2004</p>
      <p class="p1">The following shows the results of the maximum node.</p>

      <h3>Summary Table</h3>
      <table>
        <tr>
          <th>Property</th>
          <th>Value</th>
          <th>Unit</th>
        </tr>
        <tr>
          <td>Slab Height</td>
          <td>${designOutputs.val.slabHeight}</td>
          <td>mm</td>
        </tr>
        <tr>
          <td>Moment of Inertia</td>
          <td>${designOutputs.val.inertia.toFixed(0)}</td>
          <td>mm⁴</td>
        </tr>
        <tr>
          <td>Bending Moment</td>
          <td>${designMomentInput.val.toFixed(1)}</td>
          <td>kNm</td>
        </tr>
        <tr>
          <td>Bending Stress</td>
          <td>${designOutputs.val.bendingStressMax.toFixed(1)}</td>
          <td>N/mm²</td>
        </tr>
        <tr>
          <td>Bending Resistance</td>
          <td>${designOutputs.val.f_md.toFixed(1)}</td>
          <td>N/mm²</td>
        </tr>
        <tr>
          <td>Maximum Utilization Ratio</td>
          <td>${(designOutputs.val.etaMax * 100).toFixed(0)}</td>
          <td>%</td>
        </tr>
      </table>

      <br />

      <h3>Bending Stress Layout Table</h3>
      <table>
        <tr>
          <th>Layer</th>
          <th>z-Coordinate</th>
          <th>Bending Stress</th>
          <th>Utilization Ratio</th>
        </tr>
        <tbody id="stressTable">
          ${designOutputs.val.bendingStresses.map(
            (stress, i) => html`
              <tr>
                <td>Layer ${i + 1}</td>
                <td>${designOutputs.val.zCordsFromMid[i]} mm</td>
                <td>${stress.toFixed(2)} N/mm²</td>
                <td>${(designOutputs.val.eta[i] * 100).toFixed(0)}%</td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <br /><br />

      <h3>Structural Sketch</h3>
      <img
        id="threeCanvas"
        width="600"
        height="400"
        style="border:1px solid #ccc;"
        src=${bending_stress_image}
      />

      <br /><br />
    </div>
  `;
