import { multiply } from "mathjs";
import {
  Node,
  Element,
  AnalyzeOutputs,
  DeformOutputs,
  ElementInputs,
} from "./data-model";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getLocalStiffnessMatrix } from "./utils/getLocalStiffnessMatrix";

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
    bendingXX: new Map(),
    bendingYY: new Map(),
    bendingXY: new Map(),
  };

  elements.forEach((e, i) => {
    const elmNodes = e.map((e) => nodes[e]);

    const dxGlobal = e.reduce(
      (a, b) => a.concat(deformOutputs.deformations.get(b)),
      []
    );
    const T = getTransformationMatrix(elmNodes);
    const dxLocal = multiply(T, dxGlobal);
    const kLocal = getLocalStiffnessMatrix(elmNodes, elementInputs, i);
    let fLocal = multiply(kLocal, dxLocal);

    if (e.length === 2) {
      // Frame element
      analyzeOutputs.normals.set(i, [fLocal[0], fLocal[6]]);
      analyzeOutputs.shearsY.set(i, [fLocal[1], fLocal[7]]);
      analyzeOutputs.shearsZ.set(i, [fLocal[2], fLocal[8]]);
      analyzeOutputs.torsions.set(i, [fLocal[3], fLocal[9]]);
      analyzeOutputs.bendingsY.set(i, [fLocal[4], fLocal[10]]);
      analyzeOutputs.bendingsZ.set(i, [fLocal[5], fLocal[11]]);
    } else {
      // Plate element
      analyzeOutputs.bendingXY.set(i, [fLocal[2], fLocal[8], fLocal[14]]);
      analyzeOutputs.bendingXX.set(i, [fLocal[3], fLocal[9], fLocal[15]]);
      analyzeOutputs.bendingXX.set(i, [fLocal[4], fLocal[10], fLocal[16]]);
    }
  });

  return analyzeOutputs;
}
