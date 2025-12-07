import { html, render } from "lit-html";
import van, { State } from "vanjs-core";

import "./styles.css";

export function getRow(): HTMLElement {
  const container = document.createElement("div");

  return container as HTMLElement;
}
