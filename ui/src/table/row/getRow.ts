import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { getColumn } from "../column/getColumn";

import "./styles.css";

export type Row = {
  index: State<number>;
  values: State<any[][]>;
};

export function getRow(rowProps: Row): HTMLElement {
  const container = document.createElement("tr");

  const rowValues = rowProps.values.val[rowProps.index.val];

  const template = () => {
    return html`
      ${rowValues.map((_, colIndex) =>
        getColumn({
          colIndex: van.state(colIndex),
          rowIndex: rowProps.index,
          values: rowProps.values,
        })
      )}
    `;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
