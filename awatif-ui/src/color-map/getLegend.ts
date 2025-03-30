import van, { State } from "vanjs-core";

import "./styles.css";

export function getLegend(
  values: State<number[]>,
  numMarkerIntervals: number = 8
): HTMLDivElement {
  const legendElm = document.createElement("div");
  legendElm.id = "legend";

  const markerRatios = Array.from(
    { length: numMarkerIntervals + 1 },
    (_, i) => i / numMarkerIntervals
  ).reverse();

  let markerElem: HTMLElement;
  let markerText: HTMLElement;
  markerRatios.forEach((_, i) => {
    markerElem = document.createElement("div");
    markerElem.id = `marker-${i}`;
    markerElem.className = "marker";
    markerElem.style.marginTop =
      i == 0 ? `0px` : `calc(${50 / numMarkerIntervals}vh - 1px)`;

    markerText = document.createElement("p");
    markerText.id = `marker-text-${i}`;

    markerElem.append(markerText);
    legendElm.append(markerElem);
  });

  // update marker values
  setTimeout(() => {
    van.derive(() => {
      // ensure update is done after all DOM elements are created
      markerRatios.forEach((ratio, i) => {
        markerText = document.getElementById(`marker-text-${i}`);
        markerText.innerText = getMarkerValue(values.val, ratio).toString();
      });
    });
  });

  return legendElm;
}

// Utils
function getMarkerValue(values: number[], ratio: number) {
  const valueRange = Math.max(...values) - Math.min(...values);
  return (Math.min(...values) + ratio * valueRange).toPrecision(3);
}
