import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";
import { getRow } from "../row/getRow";

export type Sheet = {
  values: State<any[][]>;
};

export function getSheet(sheet: Sheet): HTMLElement {
  const container = document.createElement("div");

  /* Helper to generate column headers (A, B, ... Z, AA, AB, ...) */
  function getColumnHeader(colIndex: number): string {
    let header = "";
    let index = colIndex;
    while (index >= 0) {
      header = String.fromCharCode(65 + (index % 26)) + header;
      index = Math.floor(index / 26) - 1;
    }
    return header;
  }

  const template = () => {
    const colCount = sheet.values.val[0]?.length || 0;

    return html` <table>
      <thead>
        <tr>
          <th class="row-header-placeholder"></th>
          ${Array.from({ length: colCount }).map(
      (_, i) => html`<th class="column-header">${getColumnHeader(i)}</th>`
    )}
        </tr>
      </thead>
      <tbody>
        ${sheet.values.val.map((_, rowIndex) =>
      getRow({
        index: van.state(rowIndex),
        values: sheet.values,
      })
    )}
      </tbody>
    </table>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
