import { multiply, matrix, Matrix, mean } from "mathjs";
import {
  Node,
  Element,
  AnalyzeOutputs,
  DeformOutputs,
  ElementInputs,
} from "./data-model";
import { getTransformationMatrix } from "./utils/getTransformationMatrix";
import {
  getLocalStiffnessMatrix,
  getIsotropicInPlaneConstitutiveMatrix,
  getOrthotropicInPlaneConstitutiveMatrix,
} from "./utils/getLocalStiffnessMatrix";
import { computeLaminateESL } from "./awatif-clt/laminate";
import { getShellLinearKinematics } from "./awatif-clt/stress/kinematics";

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
    membraneXX: new Map(),
    membraneYY: new Map(),
    membraneXY: new Map(),
    tranverseShearX: new Map(),
    tranverseShearY: new Map(),
  };

  const analyzeOutputsElements = {
    bendingXX: new Map(),
    bendingYY: new Map(),
    bendingXY: new Map(),
    membraneXX: new Map(),
    membraneYY: new Map(),
    membraneXY: new Map(),
    tranverseShearX: new Map(),
    tranverseShearY: new Map(),
  };

  elements.forEach((e, i) => {
    const elmNodes = e.map((e) => nodes[e]);

    const dxGlobal = e.reduce(
      (a, b) => a.concat(deformOutputs.deformations.get(b)),
      []
    );
    const T = getTransformationMatrix(elmNodes);
    const dxLocal = multiply(T, dxGlobal) as number[];

    if (e.length === 2) {
      const kLocal = getLocalStiffnessMatrix(elmNodes, elementInputs, i);
      let fLocal = multiply(kLocal, dxLocal);

      // Frame element
      analyzeOutputs.normals.set(i, [fLocal[0], fLocal[6]]);
      analyzeOutputs.shearsY.set(i, [fLocal[1], fLocal[7]]);
      analyzeOutputs.shearsZ.set(i, [fLocal[2], fLocal[8]]);
      analyzeOutputs.torsions.set(i, [fLocal[3], fLocal[9]]);
      analyzeOutputs.bendingsY.set(i, [fLocal[4], fLocal[10]]);
      analyzeOutputs.bendingsZ.set(i, [fLocal[5], fLocal[11]]);
    } else {
      const { membraneStiffness3x3Matrix, bendingStiffness3x3Matrix } =
        getShellMaterialStiffnessMatrices(
        elementInputs,
        i
      );
      const localNodes = getElementLocalNodes(elmNodes, T as number[][]);
      const { membraneStrain, curvature } = getShellLinearKinematics(
        localNodes,
        dxLocal
      );

      const membraneForces = multiply(
        membraneStiffness3x3Matrix,
        matrix([[membraneStrain[0]], [membraneStrain[1]], [membraneStrain[2]]])
      ) as Matrix;
      const bendingMoments = multiply(
        bendingStiffness3x3Matrix,
        matrix([[curvature[0]], [curvature[1]], [curvature[2]]])
      ) as Matrix;

      const Nvals = membraneForces.toArray() as number[][];
      const Mvals = bendingMoments.toArray() as number[][];

      const Nx = Nvals[0][0];
      const Ny = Nvals[1][0];
      const Nxy = Nvals[2][0];

      const Mx = Mvals[0][0];
      const My = Mvals[1][0];
      const Mxy = Mvals[2][0];

      analyzeOutputsElements.membraneXX.set(i, Nx);
      analyzeOutputsElements.membraneYY.set(i, Ny);
      analyzeOutputsElements.membraneXY.set(i, Nxy);
      analyzeOutputsElements.bendingXX.set(i, Mx);
      analyzeOutputsElements.bendingYY.set(i, My);
      analyzeOutputsElements.bendingXY.set(i, Mxy);
    }
  });

  const nodeToCentroidElementIndiciesMap =
    getNodeToCentroidElementIndicesMap(elements);

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;
    let membraneXXs: [number, number, number] = [0, 0, 0];
    let membraneYYs: [number, number, number] = [0, 0, 0];
    let membraneXYs: [number, number, number] = [0, 0, 0];
    let bendingXXs: [number, number, number] = [0, 0, 0];
    let bendingYYs: [number, number, number] = [0, 0, 0];
    let bendingXYs: [number, number, number] = [0, 0, 0];

    element.forEach((nodeIndex, pos) => {
      const elementIndicies =
        nodeToCentroidElementIndiciesMap.get(nodeIndex) || [];

      membraneXXs[pos] = mean(
        elementIndicies.map(
          (elementIndex) =>
            analyzeOutputsElements.membraneXX.get(elementIndex) ?? 0
        )
      );
      membraneYYs[pos] = mean(
        elementIndicies.map(
          (elementIndex) =>
            analyzeOutputsElements.membraneYY.get(elementIndex) ?? 0
        )
      );
      membraneXYs[pos] = mean(
        elementIndicies.map(
          (elementIndex) =>
            analyzeOutputsElements.membraneXY.get(elementIndex) ?? 0
        )
      );
      bendingXXs[pos] = mean(
        elementIndicies.map(
          (elementIndex) =>
            analyzeOutputsElements.bendingXX.get(elementIndex) ?? 0
        )
      );
      bendingYYs[pos] = mean(
        elementIndicies.map(
          (elementIndex) =>
            analyzeOutputsElements.bendingYY.get(elementIndex) ?? 0
        )
      );
      bendingXYs[pos] = mean(
        elementIndicies.map(
          (elementIndex) =>
            analyzeOutputsElements.bendingXY.get(elementIndex) ?? 0
        )
      );
    });

    analyzeOutputs.membraneXX.set(elementIndex, membraneXXs);
    analyzeOutputs.membraneYY.set(elementIndex, membraneYYs);
    analyzeOutputs.membraneXY.set(elementIndex, membraneXYs);
    analyzeOutputs.bendingXX.set(elementIndex, bendingXXs);
    analyzeOutputs.bendingYY.set(elementIndex, bendingYYs);
    analyzeOutputs.bendingXY.set(elementIndex, bendingXYs);
  });

  return analyzeOutputs;
}

function getElementLocalNodes(
  elementNodes: Node[],
  transform: number[][]
): Node[] {
  const [originX, originY, originZ] = elementNodes[0];
  const rotation = [
    [transform[0][0], transform[0][1], transform[0][2]],
    [transform[1][0], transform[1][1], transform[1][2]],
    [transform[2][0], transform[2][1], transform[2][2]],
  ];

  return elementNodes.map(([x, y, z]) => {
    const relative = [x - originX, y - originY, z - originZ];
    const local = mul3x3Vec(rotation, relative);
    return [local[0], local[1], local[2]];
  });
}

function mul3x3Vec(m: number[][], v: number[]): [number, number, number] {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

function getMaterialStiffnessMatrix3x3(
  elementInputs: ElementInputs,
  index: number
): Matrix {
  const elasticityX = elementInputs.elasticities?.get(index) ?? 0;
  const elasticityY = elementInputs.elasticitiesOrthogonal?.get(index) ?? 0;
  const poissonRatio = elementInputs.poissonsRatios?.get(index) ?? 0;
  const shearModulus = elementInputs.shearModuli?.get(index) ?? 0;

  // Determine if the material is orthotropic based on the presence of elasticityY
  const isOrthotropic = elasticityY > 0;
  return isOrthotropic
    ? getOrthotropicInPlaneConstitutiveMatrix(
        elasticityX,
        elasticityY,
        shearModulus,
        poissonRatio
      )
    : getIsotropicInPlaneConstitutiveMatrix(elasticityX, poissonRatio);
}

function getShellMaterialStiffnessMatrices(
  elementInputs: ElementInputs,
  index: number
): { membraneStiffness3x3Matrix: Matrix; bendingStiffness3x3Matrix: Matrix } {
  const cltLayup = elementInputs.cltLayups?.get(index);
  if (cltLayup) {
    const esl = computeLaminateESL(cltLayup);
    return {
      membraneStiffness3x3Matrix: matrix(esl.A) as Matrix,
      bendingStiffness3x3Matrix: matrix(esl.D) as Matrix,
    };
  }

  const thickness = elementInputs.thicknesses?.get(index) ?? 1;
  const q = getMaterialStiffnessMatrix3x3(elementInputs, index);

  return {
    membraneStiffness3x3Matrix: multiply(q, thickness) as Matrix,
    bendingStiffness3x3Matrix: multiply(q, thickness ** 3 / 12) as Matrix,
  };
}

function getNodeToCentroidElementIndicesMap(
  elements: Element[]
): Map<number, number[]> {
  const nodeToCentroidElementIndiciesMap: Map<number, number[]> = new Map();
  elements.forEach((element, elementIndex) => {
    element.forEach((nodeIndex) => {
      if (!nodeToCentroidElementIndiciesMap.has(nodeIndex)) {
        nodeToCentroidElementIndiciesMap.set(nodeIndex, []);
      }
      nodeToCentroidElementIndiciesMap.get(nodeIndex)?.push(elementIndex);
    });
  });
  return nodeToCentroidElementIndiciesMap;
}
