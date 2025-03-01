import {
  Node,
  Element,
  ElementInputs,
  AnalyzeOutputs,
  DeformOutputs,
} from "awatif-data-structure";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./utils/getLocalStiffnessMatrix";
import { multiply } from "mathjs";

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
    const dxLocal = multiply(T, dxGlobal);
    const kLocal = getLocalStiffnessMatrix([n0, n1], elementInputs, i);
    let fLocal = multiply(kLocal, dxLocal) as number[];

    analyzeOutputs.normals.set(i, [fLocal[0], fLocal[6]]);
    analyzeOutputs.shearsY.set(i, [fLocal[1], fLocal[7]]);
    analyzeOutputs.shearsZ.set(i, [fLocal[2], fLocal[8]]);
    analyzeOutputs.torsions.set(i, [fLocal[3], fLocal[9]]);
    analyzeOutputs.bendingsY.set(i, [fLocal[4], fLocal[10]]);
    analyzeOutputs.bendingsZ.set(i, [fLocal[5], fLocal[11]]);
  });

  return analyzeOutputs;
}
