import van from "vanjs-core";
import { SettingsState } from "../types";
// @ts-ignore
import colorMapURL from "./colorMap.jpg";

export function colorMap(settingsState: SettingsState) {
  const img = document.createElement("img");
  img.width = 10;
  img.height = 300;
  img.src = colorMapURL;

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = "20px";
  div.style.top = "150px";
  div.style.zIndex = "1";
  div.hidden = true;
  div.setAttribute("id", "colorMap");

  const pTop = document.createElement("p");
  pTop.textContent = "max: 1";
  pTop.style.margin = "0 0 5px 0";
  pTop.style.color = "white";

  const pBottom = document.createElement("p");
  pBottom.textContent = "min: 0";
  pBottom.style.margin = "0";
  pBottom.style.color = "white";

  div.appendChild(pTop);
  div.appendChild(img);
  div.appendChild(pBottom);

  document.body.appendChild(div);

  van.derive(() => {
    settingsState.elementResults.val.endsWith("Design") ||
    settingsState.nodeResults.val.endsWith("Design")
      ? (div.hidden = false)
      : (div.hidden = true);
  });
}
