import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import { getSheet } from "../sheet/getSheet";

import "./styles.css";

export function getSheetContainter(): HTMLElement {
  const container = document.createElement("div");
  const sheetData = van.state([
    ["hi", "this", "is", "a", "test"],
    ["is", "awatif", "sheet", "with", "five"],
    ["hi", "this", "is", "a", "test"],
    ["is", "awatif", "sheet", "with", "five"],
    ["hi", "this", "is", "a", "test"],
    ["is", "awatif", "sheet", "with", "five"],
    ["hi", "this", "is", "a", "test"],
    ["is", "awatif", "sheet", "with", "five"],
    ["hi", "this", "is", "a", "test"],
    ["is", "awatif", "sheet", "with", "five"],
  ]);

  const template = () => {
    const colCount = sheetData.val[0]?.length || 0;
    const rowCount = sheetData.val.length;

    return html`
      <div class="sheet-grid-container">
        <!-- Corner cell -->
        <div class="sheet-corner"></div>

        <div class="sheet-content">
          ${getSheet({
      values: sheetData,
    })}
        </div>
      </div>
    `;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
