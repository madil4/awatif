import van, { State } from "vanjs-core";
import "./styles.css";

export function getLegend(values: State<number[]>): HTMLDivElement {
  const legendElm = document.createElement("div");
  legendElm.className = "legend";

  const markerRatios = [1, 0.75, 0.5, 0.25, 0];

  let markerElem: HTMLElement;
  let markerText: HTMLElement;
  markerRatios.forEach((_, i) => {
    markerElem = document.createElement("div");
    markerElem.id = `marker-${i}`;
    markerElem.className = "marker";

    markerText = document.createElement("p");
    markerText.id = `marker-text-${i}`;

    markerElem.append(markerText);
    legendElm.append(markerElem);
  });

  // update marker values
  van.derive(() => {
    markerRatios.forEach((ratio, i) => {
      markerText = document.getElementById(`marker-text-${i}`);
      markerText.innerHTML = getMarkerValue(values.val, ratio).toString();
    });
  });

  return legendElm;
}

function getMarkerValue(values: number[], ratio: number) {
  const valueRange = Math.max(...values) - Math.min(...values);

  return (Math.min(...values) + ratio * valueRange).toPrecision(3);
}
