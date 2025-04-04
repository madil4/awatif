import { html } from "lit-html";
import van, { State } from "vanjs-core";

//@ts-ignore
import logo from "./awatif-logo.jpg";

export const template = ({ glulam, nodes, moments, results, analyzeOutputs }) => {

  // node dropdown
  const nodesNames = [...nodes.val];
  const nodeIndices = nodesNames.map((_, index) => index);
  const selectedNode = van.state(nodeIndices[0]); // Default auf den ersten Index

  // max eta
  const maxEtas = results.val.map(results => Math.max(...results.eta))
  const maxEta = Math.max(...maxEtas)
  let index = maxEtas.indexOf(maxEta);

  return html`
    <header class="header">
      <div class="header-left">
        <p class="header-title">Report</p>
        <a href="https://awatif.co" class="header-link" target="_blank">
          https://awatif.co
        </a>
      </div>
      <div class="header-right">
        <img src="${logo}" id="headerLogo" alt="Logo" />
      </div>
    </header>

    <br/>
    <h1>Cross-Laminated Timber (CLT)</h1>
    <p class="caption">EN 1995-1-1: 2004</p>

    <br/>

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
        <td id="slabHeight">${results.val[index].slabHeight}</td>
        <td>mm</td>
      </tr>
      <tr>
        <td>Moment of Inertia</td>
        <td id="inertia">${results.val[index].inertia.toFixed(0)}</td>
        <td>mm⁴</td>
      </tr>
      <tr>
        <td>Bending Stress</td>
        <td id="inertia">${results.val[index].bendingStressMax.toFixed(1)}</td>
        <td>N/mm²</td>
      </tr>
      <tr>
        <td>Bending Resistance</td>
        <td id="inertia">${results.val[index].f_md.toFixed(1)}</td>
        <td>N/mm²</td>
      </tr>
      <tr>
        <td>Maximum Utilization Ratio</td>
        <td id="etaMax">${(results.val[index].etaMax * 100).toFixed(0)}</td>
        <td>%</td>
      </tr>
    </table>

    <br/>
    
    <h3>Bending Stress Layout Table</h3>
    <table>
    <tr>
      <th>Layer</th>
      <th>z-Cordinate</th>
      <th>Bending Stress</th>
      <th>Utilization Ratio</th>
    </tr>
    <tbody id="stressTable">
      ${results.val[index].bendingStress.map((stress, i) => html`
        <tr>
          <td>Layer ${i + 1}</td>
          <td>${results.val[index].zCordsFromMid[i]} mm</td>
          <td>${stress.toFixed(2)} N/mm²</td>
          <td>${(results.val[index].eta[i] * 100).toFixed(0)}%</td>
        </tr>
      `)}
    </tbody>
  </table>
  <br/><br/>

  `;
};
