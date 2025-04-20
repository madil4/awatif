import {
  Node,
  Element,
  AnalyzeOutputs,
  DeformOutputs,
  ElementInputs,
} from "./data-model";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./utils/getLocalStiffnessMatrix";
import { matrix } from "awatif-math";

export function analyze(
  nodes: Node[],
  elements: Element[],
  elementInputs: ElementInputs,
  deformOutputs: DeformOutputs
): AnalyzeOutputs {
  const analyzeOutputs: AnalyzeOutputs = {
    normals: new Map(),
    shearsY: new Map(),
    shearsZ: new Map(),
    torsions: new Map(),
    bendingsY: new Map(),
    bendingsZ: new Map(),
  };

  elements.forEach((e, i) => {
    const n0 = nodes[e[0]];
    const n1 = nodes[e[1]];

    const dxGlobal = [
      ...deformOutputs.deformations.get(e[0]),
      ...deformOutputs.deformations.get(e[1]),
    ];
    const T = getTransformationMatrix([n0, n1]);
    const dxLocal = T.matMul(new matrix(dxGlobal));
    const kLocal = getLocalStiffnessMatrix([n0, n1], elementInputs, i);
    let fLocal = kLocal.matMul(dxLocal);

    analyzeOutputs.normals.set(i, [fLocal.get(0, 0), fLocal.get(6, 0)]);
    analyzeOutputs.shearsY.set(i, [fLocal.get(1, 0), fLocal.get(7, 0)]);
    analyzeOutputs.shearsZ.set(i, [fLocal.get(2, 0), fLocal.get(8, 0)]);
    analyzeOutputs.torsions.set(i, [fLocal.get(3, 0), fLocal.get(9, 0)]);
    analyzeOutputs.bendingsY.set(i, [fLocal.get(4, 0), fLocal.get(10, 0)]);
    analyzeOutputs.bendingsZ.set(i, [fLocal.get(5, 0), fLocal.get(11, 0)]);
  });

  return analyzeOutputs;
}
