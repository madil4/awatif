import * as mathjs from "mathjs";
import { deform as deform } from "./deform";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
  DeformationAnalysisOutput,
  ReactionAnalysisOutput,
  FrameAnalysisOutput,
} from "awatif-data-structure";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getElementNodesIndices } from "./utils/getElementNodesIndices";
import { getStiffnessMatrix } from "./utils/getStiffnessMatrix";

// to be removed after refactoring the solver
enum AnalysisType {
  Bar,
  Beam,
}

export function analyze(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInputs
): AnalysisOutputs {
  let analysisType = AnalysisType.Bar;

  const anySection = analysisInputs.sections?.values().next().value;
  if ("momentOfInertiaZ" in anySection || "momentOfInertiaZ" in anySection)
    analysisType = AnalysisType.Beam;

  const { deformations, forces } = deform(
    nodes,
    elements,
    analysisInputs,
    analysisType
  );

  const analysisOutputs: AnalysisOutputs[keyof AnalysisOutputs] = [];
  nodes.forEach((_, index) => {
    const deformation = {
      0: [
        deformations[index * 3],
        deformations[index * 3 + 1],
        deformations[index * 3 + 2],
      ] as DeformationAnalysisOutput["deformation"],
      1: [
        deformations[index * 6],
        deformations[index * 6 + 1],
        deformations[index * 6 + 2],
        deformations[index * 6 + 3],
        deformations[index * 6 + 4],
        deformations[index * 6 + 5],
      ] as DeformationAnalysisOutput["deformation"],
    };
    analysisOutputs.push({
      node: index,
      deformation: deformation[analysisType],
    });

    const reaction = {
      0: [
        forces[index * 3],
        forces[index * 3 + 1],
        forces[index * 3 + 2],
      ] as ReactionAnalysisOutput["reaction"],
      1: [
        forces[index * 6] as number,
        forces[index * 6 + 1] as number,
        forces[index * 6 + 2] as number,
        forces[index * 6 + 3] as number,
        forces[index * 6 + 4] as number,
        forces[index * 6 + 5] as number,
      ] as ReactionAnalysisOutput["reaction"],
    };
    if (analysisInputs.pointSupports?.get(index)) {
      analysisOutputs.push({
        node: index,
        reaction: reaction[analysisType],
      });
    }
  });

  elements.forEach((element, index) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = mathjs.norm(mathjs.subtract(node1, node0)) as number;

    const dxGlobal = mathjs.subset(
      deformations,
      mathjs.index(getElementNodesIndices[analysisType](element))
    );
    const T = getTransformationMatrix[analysisType](node0, node1);
    const dxLocal = mathjs.multiply(T, dxGlobal);
    const kLocal = getStiffnessMatrix[analysisType](analysisInputs, index, L);
    let fLocal = mathjs.multiply(kLocal, dxLocal).toArray() as number[];

    const analysisOutput = {
      0: {
        element: index,
        normal: [-fLocal[0], -fLocal[0]],
      } as FrameAnalysisOutput, // sign flips according to Logan's book,
      1: {
        element: index,
        normal: [fLocal[0], fLocal[6]],
        shearY: [fLocal[1], fLocal[7]],
        shearZ: [fLocal[2], fLocal[8]],
        torsion: [fLocal[3], fLocal[9]],
        bendingY: [fLocal[4], fLocal[10]],
        bendingZ: [fLocal[5], fLocal[11]],
      } as FrameAnalysisOutput,
    };
    analysisOutputs.push(analysisOutput[analysisType]);
  });

  return { default: analysisOutputs };
}
