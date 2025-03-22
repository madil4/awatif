import van, { State } from "vanjs-core";
import "./styles.css";

export function getLegend(
  values: State<number[]>,
): HTMLDivElement {
  const legendElm = document.createElement("div");
  legendElm.className = "legend";

  return legendElm;
}
