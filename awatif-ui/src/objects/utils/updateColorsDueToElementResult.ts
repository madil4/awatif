import * as THREE from "three";
import van from "vanjs-core";
import { ModelState, SettingsState } from "../../types";
import { Element } from "../../../../awatif-data-structure/src";
import { Lut } from "three/examples/jsm/math/Lut.js";
import { divideNodesElements } from "./divideNodesElements";
import { getKeys } from "./getKeys";

export function updateColorsDueToElementResult(
  elements: Element[],
  model: ModelState,
  settings: SettingsState,
  lines: THREE.LineSegments
) {
  // init
  const lut = new Lut();
  lut.setColorMap("rainbow");
  lut.setMin(0);
  lut.setMax(1);

  // change color according to design result
  van.derive(() => {
    const { elementOutputs } = divideNodesElements(model.val.designOutputs);
    const keys = getKeys(elementOutputs);

    if (keys.includes(settings.elementResults.val)) {
      const outputs = processOutputs(elementOutputs, keys);
      const curOutputs = outputs.get(settings.elementResults.val);

      const colors: any[] = [];
      elements.forEach((_, i) => {
        const outputPerNode = curOutputs.get(i) ?? { utilizationRatio: 0 };
        const utilizationRatio = outputPerNode.utilizationRatio || 0;
        const color = lut.getColor(utilizationRatio);

        colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      });

      lines.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
    } else {
      lines.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(
          model.val.elements
            .map(() => [...Array(6)])
            .flat()
            .fill(1),
          3
        )
      );
    }
  });
}

function processOutputs(outputs: object[], keys: string[]) {
  const outputsM = new Map<string, any>();

  keys.forEach((key) => {
    const keyValue = new Map<number, any>();

    outputs.forEach((output: any) => {
      if (key in output) keyValue.set(output.element, output[key]);
    });

    outputsM.set(key, keyValue);
  });

  return outputsM;
}
