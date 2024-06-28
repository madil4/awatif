import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../../types";
import { Node } from "awatif-data-structure";
import { Lut } from "three/examples/jsm/math/Lut.js";
import { divideNodesElements } from "./divideNodesElements";
import { getKeys } from "./getKeys";

export function updateColorsDueToNodeResult(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState,
  points: THREE.Points
) {
  // init
  const lut = new Lut();
  lut.setColorMap("rainbow");
  lut.setMin(0);
  lut.setMax(1);

  // on model change: color according to design result
  van.derive(() => {
    const { nodeOutputs } = divideNodesElements(model.val.designOutputs);
    const keys = getKeys(nodeOutputs);

    if (keys.includes(settings.nodeResults.val)) {
      const outputs = processOutputs(nodeOutputs, keys);
      const curOutputs = outputs.get("utilizationRatio");

      const colors: any[] = [];
      nodes.val.forEach((_, i) => {
        const outputPerNode = curOutputs.get(i) ?? 0;
        const color = lut.getColor(outputPerNode);

        colors.push(color.r, color.g, color.b);
      });

      points.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
    } else {
      points.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(nodes.val.flat().fill(1), 3)
      );
    }
  });
}

function processOutputs(outputs: object[], keys: string[]) {
  const outputsM = new Map<string, any>();

  keys.forEach((key) => {
    const keyValue = new Map<number, any>();

    outputs.forEach((output: any) => {
      if (key in output) keyValue.set(output.node, output[key]);
    });

    outputsM.set(key, keyValue);
  });

  return outputsM;
}
