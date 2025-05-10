import {
  Node,
  Element,
  AnalyzePlateOutputs,
  DeformOutputs,
  ElementInputs,
} from "./data-model";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./utils/getLocalStiffnessMatrix";
import { multiply } from "mathjs";

// TODO:
// 1. get forces in local axes -
// 2. get forces in global axes or plate local axes?

export function analyzePlate(
  nodes: Node[],
  elements: Element[],
  elementInputs: ElementInputs,
  deformOutputs: DeformOutputs
): AnalyzePlateOutputs {
  const analyzeOutputs: AnalyzePlateOutputs = {
    forceX: new Map(),
    forceY: new Map(),
    forceZ: new Map(),
    momentX: new Map(),
    momentY: new Map(),
    momentZ: new Map(),
  };

  elements.forEach((e, i) => {
    const n0 = nodes[e[0]];
    const n1 = nodes[e[1]];
    const n2 = nodes[e[2]];

    const dxGlobal = [
      ...deformOutputs.deformations.get(e[0]),
      ...deformOutputs.deformations.get(e[1]),
      ...deformOutputs.deformations.get(e[2]),
    ];
    const T = getTransformationMatrix([n0, n1, n2]);
    const dxLocal = multiply(T, dxGlobal);
    const kLocal = getLocalStiffnessMatrix([n0, n1, n2], elementInputs, i);
    const fLocal = multiply(kLocal, dxLocal) as number[];

    analyzeOutputs.forceX.set(i, [fLocal[0], fLocal[6], fLocal[12]]);
    analyzeOutputs.forceY.set(i, [fLocal[1], fLocal[7], fLocal[13]]);
    analyzeOutputs.forceZ.set(i, [fLocal[2], fLocal[8], fLocal[14]]);
    analyzeOutputs.momentX.set(i, [fLocal[3], fLocal[9], fLocal[15]]);
    analyzeOutputs.momentY.set(i, [fLocal[4], fLocal[10], fLocal[16]]);
    analyzeOutputs.momentZ.set(i, [fLocal[5], fLocal[11], fLocal[17]]);
  });

  return analyzeOutputs;
}
