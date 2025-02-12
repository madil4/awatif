import { Structure } from "awatif-data-structure";
import { html, TemplateResult } from "lit-html";

//@ts-ignore
import logo from "./awatif-logo.jpg";

import "./template.css";

export function template({
  nodes,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
}: Structure): TemplateResult {
  return html`
    <br />
    <header class="header">
      <div class="header-left">
        <h6>Report</h6>
        <p class="bold">
          <a href="https://awatif.co" target="_blank">Awatif.co</a>
        </p>
        <p class="normal" id="reportDate">
          ${new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div class="header-right">
        <img src=${logo} id="headerLogo" height="60px" />
      </div>
    </header>

    <br />
    <h1>Bars</h1>

    <br />
    <h2>Nodes</h2>
    <p class="text">
      The following table gives an overview of the node coordinates.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>xCoord</th>
        <th>yCoord</th>
        <th>zCoord</th>
      </tr>
      ${nodes.val.map(
        (node, index) => html`
          <tr>
            <td><div class="custom-cell-content">${index}</div></td>
            <td>
              <div class="custom-cell-content">${node[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${node[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${node[2]}</div>
            </td>
          </tr>
        `
      )}
    </table>

    <br />
    <h2>Supports</h2>
    <p class="text">
      The following table gives an overview of the support conditions.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>ux</th>
        <th>uy</th>
        <th>uz</th>
        <th>mx</th>
        <th>my</th>
        <th>mz</th>
      </tr>
      ${[...nodeInputs.val.supports].map(
        ([index, support]) => html`
          <tr>
            <td><div class="custom-cell-content">${index}</div></td>
            <td>
              <div class="custom-cell-content">${support[0]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${support[1]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${support[2]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${support[3]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${support[4]}</div>
            </td>
            <td>
              <div class="custom-cell-content">${support[5]}</div>
            </td>
          </tr>
        `
      )}
    </table>

    <br />
    <h2>Reactions</h2>
    <p class="text">
      The following table gives an overview of the reaction forces.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Node</th>
        <th>Fx</th>
        <th>Fy</th>
        <th>Fz</th>
      </tr>
      ${[...deformOutputs.val.reactions].map(
        ([index, reaction]) => html`
          <tr>
            <td><div class="custom-cell-content">${index}</div></td>
            <td>
              <div class="custom-cell-content">${reaction[0].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${reaction[1].toFixed(0)}</div>
            </td>
            <td>
              <div class="custom-cell-content">${reaction[2].toFixed(0)}</div>
            </td>
          </tr>
        `
      )}
    </table>

    <br />
    <h2>Elements</h2>
    <p class="text">
      The following table gives an overview of the element results.
    </p>
    <br />

    <!-- Table Section -->
    <table id="data-table">
      <tr>
        <th>Bar</th>
        <th>Area</th>
        <th>Normal</th>
      </tr>
      ${[...analyzeOutputs.val.normals].map(
        ([index, normal]) => html`
          <tr>
            <td><div class="custom-cell-content">${index}</div></td>
            <td>
              <div class="custom-cell-content">
                ${elementInputs.val.areas.get(index)}
              </div>
            </td>
            <td>
              <div class="custom-cell-content">${normal[0].toFixed(0)}</div>
            </td>
          </tr>
        `
      )}
    </table>
    <br /><br /><br />
  `;
}
