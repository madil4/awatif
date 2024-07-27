import * as mathjs from "mathjs";
import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";
import { deform } from "./deform";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getElementNodesIndices } from "./utils/getElementNodesIndices";
import { getStiffness } from "./utils/getStiffness";

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

  const { deformations, reactions } = deform(
    nodes,
    elements,
    analysisInputs,
    analysisType
  );

  const analysisOutputs: AnalysisOutputs = {
    nodes: new Map(),
    elements: new Map(),
  };

  nodes.forEach((_, index) => {
    const deformation = {
      [AnalysisType.Bar]: [
        deformations[index * 3],
        deformations[index * 3 + 1],
        deformations[index * 3 + 2],
        0,
        0,
        0,
      ] as [number, number, number, number, number, number],
      [AnalysisType.Beam]: [
        deformations[index * 6],
        deformations[index * 6 + 1],
        deformations[index * 6 + 2],
        deformations[index * 6 + 3],
        deformations[index * 6 + 4],
        deformations[index * 6 + 5],
      ] as [number, number, number, number, number, number],
    };

    const reaction = {
      [AnalysisType.Bar]: [
        reactions[index * 3],
        reactions[index * 3 + 1],
        reactions[index * 3 + 2],
        0,
        0,
        0,
      ] as [number, number, number, number, number, number],
      [AnalysisType.Beam]: [
        reactions[index * 6] as number,
        reactions[index * 6 + 1] as number,
        reactions[index * 6 + 2] as number,
        reactions[index * 6 + 3] as number,
        reactions[index * 6 + 4] as number,
        reactions[index * 6 + 5] as number,
      ] as [number, number, number, number, number, number],
    };

    const hasReaction = analysisInputs.pointSupports?.get(index);

    analysisOutputs.nodes?.set(index, {
      deformation: deformation[analysisType],
      ...(hasReaction && { reaction: reaction[analysisType] }),
    });
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
    const kLocal = getStiffness[analysisType](
      analysisInputs.sections?.get(index),
      analysisInputs.materials?.get(index),
      L
    );
    let fLocal = mathjs.multiply(kLocal, dxLocal) as number[];

    const analysisOutput = {
      [AnalysisType.Bar]: {
        normal: [-fLocal[0], -fLocal[0]] as [number, number],
      },
      [AnalysisType.Beam]: {
        normal: [fLocal[0], fLocal[6]] as [number, number],
        shearY: [fLocal[1], fLocal[7]] as [number, number],
        shearZ: [fLocal[2], fLocal[8]] as [number, number],
        torsion: [fLocal[3], fLocal[9]] as [number, number],
        bendingY: [fLocal[4], fLocal[10]] as [number, number],
        bendingZ: [fLocal[5], fLocal[11]] as [number, number],
      },
    };
    analysisOutputs.elements?.set(index, analysisOutput[analysisType]);
  });

  return analysisOutputs;
}
