import van, { State } from "vanjs-core";
import "./styles.css";

export function getLegend(values: State<number[]>): HTMLDivElement {
  const legendElm = document.createElement("div");
  legendElm.className = "legend";

  const markerRatios = [1, 0.75, 0.5, 0.25, 0];

  markerRatios.forEach((ratio, i) => {
    const markerElem = document.createElement("div");
    markerElem.id = `marker-${i}`;
    markerElem.className = "marker";

    const markerText = document.createElement("p");
    markerText.innerHTML = getMarkerValue(values.val, ratio).toString();

    markerElem.append(markerText);
    legendElm.append(markerElem);
  });

  return legendElm;
}

function getMarkerValue(values: number[], ratio: number) {
  const valueRange = Math.max(...values) - Math.min(...values);

  return (Math.min(...values) + ratio * valueRange).toPrecision(3);
}
