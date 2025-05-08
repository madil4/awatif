import {
  Node,
  Element,
  AnalyzePlateOutputs,
  DeformOutputs,
  ElementInputs,
} from "./data-model";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./utils/getLocalStiffnessMatrix";
import { matrix } from "awatif-math";

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
    const dxLocal = T.matMul(new matrix(dxGlobal));
    const kLocal = getLocalStiffnessMatrix([n0, n1, n2], elementInputs, i);
    let fLocal = kLocal.matMul(dxLocal);

    analyzeOutputs.forceX.set(i, [
      fLocal.get(0, 0),
      fLocal.get(6, 0),
      fLocal.get(12, 0),
    ]);
    analyzeOutputs.forceY.set(i, [
      fLocal.get(1, 0),
      fLocal.get(7, 0),
      fLocal.get(13, 0),
    ]);
    analyzeOutputs.forceZ.set(i, [
      fLocal.get(2, 0),
      fLocal.get(8, 0),
      fLocal.get(14, 0),
    ]);
    analyzeOutputs.momentX.set(i, [
      fLocal.get(3, 0),
      fLocal.get(9, 0),
      fLocal.get(15, 0),
    ]);
    analyzeOutputs.momentY.set(i, [
      fLocal.get(4, 0),
      fLocal.get(10, 0),
      fLocal.get(16, 0),
    ]);
    analyzeOutputs.momentZ.set(i, [
      fLocal.get(5, 0),
      fLocal.get(11, 0),
      fLocal.get(17, 0),
    ]);
  });

  return analyzeOutputs;
}
