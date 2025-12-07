import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";
import { getRow } from "../row/getRow";

export type Sheet = {
  values: State<any[][]>;
};

export function getSheet(sheet: Sheet): HTMLElement {
  const container = document.createElement("div");

  const template = () => {
    return html` <table>
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
