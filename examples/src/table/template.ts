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
