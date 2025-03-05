import { html } from "lit-html";

import "./template.css";

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
  nodes,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
}) => {
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
        <svg
          class="flex-shrink-0 size-7"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 -3 35 35"
          fill="#015f73"
        >
          <path
            d="M2,29.14l9.86-16.87c1.86,3.34,4.56,7.62,3.34,11.57a7.61,7.61,0,0,1-2.61,3.68,7.78,7.78,0,0,1-5,1.61c-1.48,0-3,0-4.47,0A4.5,4.5,0,0,0,2,29.14Z"
          ></path>
          <path
            d="M12.86,10.43l5.71-10L35.12,29.14H31a13.92,13.92,0,0,1-8.44-3.54,18.23,18.23,0,0,1-3.44-4.5c-.55-.92-1.08-1.85-1.61-2.79-1.25-2.21-2.56-4.39-3.85-6.58Z"
          ></path>
        </svg>
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
};
