import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import "./styles.css";

export type Table = {
  values: State<any[][]>;
};

type Row = {
  index: State<number>;
  values: State<any[][]>;
};

type Cell = {
  values: State<any[][]>;
  isEditMode: State<boolean>;
  colIndex: State<number>;
  rowIndex: State<number>;
};

export function getTable(table: Table): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("modal");

  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const handleMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".close")) return;

    const modalContent = container.querySelector(".modal-content") as HTMLElement;
    if (!modalContent) return;

    startX = e.clientX;
    startY = e.clientY;
    initialLeft = modalContent.offsetLeft;
    initialTop = modalContent.offsetTop;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const modalContent = container.querySelector(".modal-content") as HTMLElement;
    if (modalContent) {
      modalContent.style.left = `${initialLeft + dx}px`;
      modalContent.style.top = `${initialTop + dy}px`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const template = () => {
    const colCount = table.values.val[0]?.length || 0;

    return html`
      <div class="modal-content">
        <div class="modal-header" @mousedown=${handleMouseDown}>
          <span
            class="close"
            @mousedown=${(e: Event) => e.stopPropagation()}
            @click=${() => {
        container.remove();
      }}
            >&times;</span
          >
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="row-header-placeholder"></th>
                ${Array.from({ length: colCount }).map(
        (_, i) => html`<th class="column-header">${getColumnHeader(i)}</th>`
      )}
              </tr>
            </thead>
            <tbody>
              ${table.values.val.map((_, rowIndex) =>
        getRow({
          index: van.state(rowIndex),
          values: table.values,
        })
      )}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}

function getColumnHeader(colIndex: number): string {
  let header = "";
  let index = colIndex;
  while (index >= 0) {
    header = String.fromCharCode(65 + (index % 26)) + header;
    index = Math.floor(index / 26) - 1;
  }
  return header;
}

function getRow(rowProps: Row): HTMLElement {
  const container = document.createElement("tr");

  const rowValues = rowProps.values.val[rowProps.index.val];

  const template = () => {
    return html`
      <th class="row-header">${rowProps.index.val + 1}</th>
      ${rowValues.map((_, colIndex) =>
      html`<td>${getCell({
        colIndex: van.state(colIndex),
        rowIndex: rowProps.index,
        values: rowProps.values,
        isEditMode: van.state(false),
      })}</td>`
    )}`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}

function getCell(cell: Cell): HTMLElement {
  const container = document.createElement("div");

  const id = `cell-${cell.rowIndex.val}-${cell.colIndex.val}`;

  const onClickOutsideInputHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target?.id !== id) {
      cell.isEditMode.val = false;
    }
  };

  document.addEventListener("click", onClickOutsideInputHandler);

  const template = () => {
    return cell.isEditMode.val
      ? html`<div id=${id}>
        <input
          type="text"
          id=${id}
          value=${cell.values.val[cell.rowIndex.val][cell.colIndex.val]}
          @input="${(e: Event) => {
          cell.values.val[cell.rowIndex.val][cell.colIndex.val] = (
            e.target as HTMLInputElement
          ).value;
        }}"
        />
        </div>`
      : html`<div
          id=${id}
          @click=${() => {
          cell.isEditMode.val = true;
        }}
        >
          ${cell.values.val[cell.rowIndex.val][cell.colIndex.val]}
        </div>`;
  };

  van.derive(() => {
    render(template(), container);
  });

  return container as HTMLElement;
}
