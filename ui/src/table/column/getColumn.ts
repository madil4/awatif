import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { getCell } from "../cell/getCell";

import "./styles.css";

export type Column = {
  colIndex: State<number>;
  rowIndex: State<number>;
  values: State<any[][]>;
};

export function getColumn(col: Column): HTMLElement {
  const container = document.createElement("td");

  const template = () => {
    return html`
      ${getCell({
        values: col.values,
        colIndex: col.colIndex,
        rowIndex: col.rowIndex,
        isEditMode: van.state(false),
      })}
    `;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
