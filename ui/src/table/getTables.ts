import { html, render } from "lit-html";
import van, { State } from "vanjs-core";
import "./styles.css";

import { getTable, Table } from "./getTable.ts";

export type Tables = {
    tables: State<Map<string, Table>>;
};

export function getTables({ tables }: Tables): HTMLElement {
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
            console.log(modalContent.style.left);
            console.log(modalContent.style.top);
            modalContent.style.left = `${initialLeft + dx}px`;
            modalContent.style.top = `${initialTop + dy}px`;
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const template = () => {
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
            ${[...tables.val.entries()].map(([key, table]) => getTable(table))}
        </div>`;
    };
    van.derive(() => {
        render(template(), container);
    });

    return container as HTMLElement;
}