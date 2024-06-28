import { Node, Element } from "awatif-data-structure";
import { getElementNodesIndices } from "./utils/getElementNodesIndices";
import { getEquivalentDistributedLoad } from "./utils/getEquivalentDistributedLoad";
import { getFreeIndices } from "./utils/getFreeIndices";
import { getStiffnessMatrix } from "./utils/getStiffnessMatrix";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import {
  AnalysisType,
  ProcessedAnalysisInputs,
} from "./utils/processAnalysisInputs";
import * as mathjs from "mathjs";

export function deform(
  nodes: Node[],
  elements: Element[],
  pa: ProcessedAnalysisInputs
) {
  // stiffness matrix
  const dof = nodes.length * (pa.analysisType === AnalysisType.Bar ? 3 : 6);

  let kGlobalAssembly = mathjs.zeros(dof, dof);
  elements.forEach((element, index) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = mathjs.norm(mathjs.subtract(node1, node0)) as number;

    const kLocal = getStiffnessMatrix[pa.analysisType](pa, index, L);
    const T = getTransformationMatrix[pa.analysisType](node0, node1);
    const kGlobal = mathjs.multiply(
      mathjs.transpose(T),
      mathjs.multiply(kLocal, T)
    );

    const elementInd = getElementNodesIndices[pa.analysisType](element);
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
  pa.loads.forEach((force, index) => {
    const nodeInd = {
      0: [index * 3, index * 3 + 1, index * 3 + 2],
      1: [
        index * 6,
        index * 6 + 1,
        index * 6 + 2,
        index * 6 + 3,
        index * 6 + 4,
        index * 6 + 5,
      ],
    };
    const current = mathjs.subset(f, mathjs.index(nodeInd[pa.analysisType]));
    f = mathjs.subset(
      f,
      mathjs.index(nodeInd[pa.analysisType]),
      mathjs.add(current, force)
    );
  });

  // distributed loads
  pa.distributedLoads.forEach(([wY, wZ], index) => {
    const element = elements[index];
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = mathjs.norm(mathjs.subtract(node1, node0)) as number;

    const ind = mathjs.index(getElementNodesIndices[pa.analysisType](element));
    const current = mathjs.subset(f, ind);
    const load = getEquivalentDistributedLoad(wY, wZ, L);
    f = mathjs.subset(f, ind, mathjs.add(current, load));
  });

  // compute deformations
  const freeInd = getFreeIndices[pa.analysisType](pa.supports, dof);
  const fFree = mathjs.subset(f, mathjs.index(freeInd));
  const kFree = mathjs.subset(kGlobalAssembly, mathjs.index(freeInd, freeInd));
  const dxFree = mathjs.lusolve(kFree as any, fFree);
  const dx = mathjs.subset(
    mathjs.zeros(dof),
    mathjs.index(freeInd),
    mathjs.flatten(dxFree)
  ) as mathjs.Matrix;

  let forces = mathjs.multiply(kGlobalAssembly, dx);

  // correct forces or reactions due to distributed loads
  pa.distributedLoads.forEach(([wY, wZ], index) => {
    const element = elements[index];
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = mathjs.norm(mathjs.subtract(node1, node0)) as number;

    const ind = mathjs.index(getElementNodesIndices[pa.analysisType](element));
    const current = mathjs.subset(forces, ind);
    const load = getEquivalentDistributedLoad(wY, wZ, L);
    forces = mathjs.subset(forces, ind, mathjs.subtract(current, load));
  });

  return {
    deformations: dx.toArray() as number[],
    forces: forces.toArray() as number[],
  };
}
