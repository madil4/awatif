import {
  Node,
  Element,
  AnalysisInputs,
  AnalysisOutputs,
} from "awatif-data-structure";
import { deform } from "./deform";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import { getStiffness } from "./utils/getStiffnes";
import { multiply, norm, subset, subtract, index } from "mathjs";

export function analyze(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInputs
): AnalysisOutputs {
  const { deformations, reactions } = deform(nodes, elements, analysisInputs);

  const analysisOutputs: AnalysisOutputs = {
    nodes: new Map(),
    elements: new Map(),
  };

  nodes.forEach((_, index) => {
    const hasReaction = analysisInputs.pointSupports?.get(index);

    analysisOutputs.nodes?.set(index, {
      deformation: [
        deformations[index * 6],
        deformations[index * 6 + 1],
        deformations[index * 6 + 2],
        deformations[index * 6 + 3],
        deformations[index * 6 + 4],
        deformations[index * 6 + 5],
      ],
      ...(hasReaction && {
        reaction: [
          reactions[index * 6],
          reactions[index * 6 + 1],
          reactions[index * 6 + 2],
          reactions[index * 6 + 3],
          reactions[index * 6 + 4],
          reactions[index * 6 + 5],
        ],
      }),
    });
  });

  elements.forEach((element, elmIndex) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0)) as number;

    const dxGlobal = subset(
      deformations,
      index(getElementNodesIndices(element))
    );
    const T = getTransformationMatrix(node0, node1);
    const dxLocal = multiply(T, dxGlobal);
    const kLocal = getStiffness(
      analysisInputs.sections?.get(elmIndex),
      analysisInputs.materials?.get(elmIndex),
      L
    );
    let fLocal = multiply(kLocal, dxLocal) as number[];

    const section = analysisInputs.sections?.get(elmIndex);
    const isFrame = section?.momentOfInertiaY && section.momentOfInertiaZ;

    analysisOutputs.elements?.set(elmIndex, {
      normal: [fLocal[0], fLocal[6]],
      ...(isFrame && {
        shearY: [fLocal[1], fLocal[7]],
        shearZ: [fLocal[2], fLocal[8]],
        torsion: [fLocal[3], fLocal[9]],
        bendingY: [fLocal[4], fLocal[10]],
        bendingZ: [fLocal[5], fLocal[11]],
      }),
    });
  });

  return analysisOutputs;
}

// Utils functions
function getElementNodesIndices(element: Element): number[] {
  const node1Range = [
    element[0] * 6,
    element[0] * 6 + 1,
    element[0] * 6 + 2,
    element[0] * 6 + 3,
    element[0] * 6 + 4,
    element[0] * 6 + 5,
  ];
  const node2Range = [
    element[1] * 6,
    element[1] * 6 + 1,
    element[1] * 6 + 2,
    element[1] * 6 + 3,
    element[1] * 6 + 4,
    element[1] * 6 + 5,
  ];
  return [...node1Range, ...node2Range];
}
