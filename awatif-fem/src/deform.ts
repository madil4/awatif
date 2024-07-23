import { Node, Element, AnalysisInputs } from "awatif-data-structure";
import { getElementNodesIndices } from "./utils/getElementNodesIndices";
import { getFreeIndices } from "./utils/getFreeIndices";
import { getStiffnessMatrix } from "./utils/getStiffnessMatrix";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import * as mathjs from "mathjs";

enum AnalysisType {
  Bar,
  Beam,
}

export function deform(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInputs,
  analysisType: AnalysisType
) {
  // stiffness matrix
  const dof = nodes.length * (analysisType === AnalysisType.Bar ? 3 : 6);

  let kGlobalAssembly = mathjs.zeros(dof, dof);
  elements.forEach((element, index) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = mathjs.norm(mathjs.subtract(node1, node0)) as number;

    const kLocal = getStiffnessMatrix[analysisType](analysisInputs, index, L);
    const T = getTransformationMatrix[analysisType](node0, node1);
    const kGlobal = mathjs.multiply(
      mathjs.transpose(T),
      mathjs.multiply(kLocal, T)
    );

    const elementInd = getElementNodesIndices[analysisType](element);
    const KCurrent = mathjs.subset(
      kGlobalAssembly,
      mathjs.index(elementInd, elementInd)
    );
    kGlobalAssembly = mathjs.subset(
      kGlobalAssembly,
      mathjs.index(elementInd, elementInd),
      mathjs.add(KCurrent, kGlobal)
    );
  });

  // loads
  let f = mathjs.zeros([dof]);
  analysisInputs.pointLoads?.forEach((force, index) => {
    const nodeInd = {
      [AnalysisType.Bar]: [index * 3, index * 3 + 1, index * 3 + 2],
      [AnalysisType.Beam]: [
        index * 6,
        index * 6 + 1,
        index * 6 + 2,
        index * 6 + 3,
        index * 6 + 4,
        index * 6 + 5,
      ],
    };
    const current = mathjs.subset(f, mathjs.index(nodeInd[analysisType]));
    f = mathjs.subset(
      f,
      mathjs.index(nodeInd[analysisType]),
      mathjs.add(
        current,
        analysisType == AnalysisType.Bar ? force.slice(0, 3) : force
      )
    );
  });

  // compute deformations
  const freeInd = getFreeIndices[analysisType](
    analysisInputs.pointSupports,
    dof
  );
  const fFree = mathjs.subset(f, mathjs.index(freeInd));
  const kFree = mathjs.subset(kGlobalAssembly, mathjs.index(freeInd, freeInd));
  const dxFree = mathjs.lusolve(kFree as any, fFree);
  const deformations = mathjs.subset(
    mathjs.zeros(dof),
    mathjs.index(freeInd),
    mathjs.flatten(dxFree)
  ) as mathjs.Matrix;

  let reactions = mathjs.multiply(kGlobalAssembly, deformations);

  return {
    deformations: deformations.toArray() as number[],
    reactions: reactions.toArray() as number[],
  };
}
