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
    const dxLocal = multiply(T, dxGlobal);

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
      const materialStiffness3x3Matrix = getMaterialStiffnessMatrix3x3(
        elementInputs,
        i
      );
      const linearFieldMatrix3x6 = getLinearFieldMatrix3x6(elmNodes);
      const displacmentMattrix6x2 = getDisplacementMatrix6x2(dxGlobal);
      const elementArea = getElementArea(elmNodes);

      const fLocal = multiply(
        1 / (2 * elementArea),
        multiply(
          multiply(materialStiffness3x3Matrix, linearFieldMatrix3x6),
          displacmentMattrix6x2
        )
      );

      const fGlobal = fLocal.toArray() as number[][];

      // Plate element
      const thickness = elementInputs.thicknesses?.get(i) ?? 1;

      const Nx = fGlobal[0][0] * thickness;
      const Ny = fGlobal[1][0] * thickness;
      const Nxy = fGlobal[2][0] * thickness;

      const Mx = fGlobal[0][1] * (thickness ** 3 / 12);
      const My = fGlobal[1][1] * (thickness ** 3 / 12);
      const Mxy = fGlobal[2][1] * (thickness ** 3 / 12);

      analyzeOutputsElements.membraneXX.set(i, Nx);
      analyzeOutputsElements.membraneYY.set(i, Ny);
      analyzeOutputsElements.membraneXY.set(i, Nxy);
      analyzeOutputsElements.bendingXX.set(i, Mx);
      analyzeOutputsElements.bendingYY.set(i, My);
      analyzeOutputsElements.bendingXY.set(i, Mxy);
    }
  });

  const { nodeToCentroidNodesMap, nodeToCentroidElementIndiciesMap } =
    getCentroidsMaps(nodes, elements);

  elements.forEach((element, elementIndex) => {
    if (element.length !== 3) return;
    let membraneXXs: [number, number, number] = [0, 0, 0];
    let membraneYYs: [number, number, number] = [0, 0, 0];
    let membraneXYs: [number, number, number] = [0, 0, 0];
    let bendingXXs: [number, number, number] = [0, 0, 0];
    let bendingYYs: [number, number, number] = [0, 0, 0];
    let bendingXYs: [number, number, number] = [0, 0, 0];

    element.forEach((nodeIndex, pos) => {
      const centroidNodes = nodeToCentroidNodesMap.get(nodeIndex) || [];
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

function getMaterialStiffnessMatrix3x3(
  elementInputs: ElementInputs,
  index: number
): Matrix {
  const elasticityX = elementInputs.elasticities?.get(index) ?? 0;
  const elasticityY = elementInputs.elasticitiesOrthogonal?.get(index) ?? 0;
  const poissonRatio = elementInputs.poissonsRatios?.get(index) ?? 0;
  const shearModulus = elementInputs.shearModuli?.get(index) ?? 0;
  const thickness = elementInputs.thicknesses?.get(index) ?? 0;

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

function getLinearFieldMatrix3x6(nodeCoordinates: Node[]): Matrix {
  const [x1, y1] = nodeCoordinates[0];
  const [x2, y2] = nodeCoordinates[1];
  const [x3, y3] = nodeCoordinates[2];

  const y23 = y2 - y3;
  const y31 = y3 - y1;
  const y12 = y1 - y2;

  const x32 = x3 - x2;
  const x13 = x1 - x3;
  const x21 = x2 - x1;

  return matrix([
    [y23, y31, y12, 0, 0, 0],
    [0, 0, 0, x32, x13, x21],
    [x32, x13, x21, y23, y31, y12],
  ]);
}

function getDisplacementMatrix6x2(dxLocal: number[]): Matrix {
  const [u1, u2, u3] = [dxLocal[0], dxLocal[6], dxLocal[12]];
  const [v1, v2, v3] = [dxLocal[1], dxLocal[7], dxLocal[13]];
  const [theta_y1, theta_y2, theta_y3] = [dxLocal[4], dxLocal[10], dxLocal[16]];
  const [theta_x1, theta_x2, theta_x3] = [dxLocal[3], dxLocal[9], dxLocal[15]];
  return matrix([
    [u1, -theta_y1],
    [u2, -theta_y2],
    [u3, -theta_y3],
    [v1, theta_x1],
    [v2, theta_x2],
    [v3, theta_x3],
  ]);
}

function getElementArea(nodeCoordinates: Node[]) {
  const [x1, y1] = nodeCoordinates[0];
  const [x2, y2] = nodeCoordinates[1];
  const [x3, y3] = nodeCoordinates[2];

  const x21 = x2 - x1;
  const x31 = x3 - x1;
  const y31 = y3 - y1;
  const y12 = y1 - y2;

  return 0.5 * (x21 * y31 - x31 * -y12);
}

function getCentroidsMaps(
  nodes: Node[],
  elements: Element[]
): {
  nodeToCentroidNodesMap: Map<number, Node[]>;
  nodeToCentroidElementIndiciesMap: Map<number, number[]>;
} {
  const nodeToCentroidNodesMap: Map<number, Node[]> = new Map();
  const nodeToCentroidElementIndiciesMap: Map<number, number[]> = new Map();
  elements.forEach((element, elementIndex) => {
    const elmNodes = element.map((index) => nodes[index]);
    const centroidNode = getCentroidFromNodes(elmNodes) as Node;
    element.forEach((nodeIndex) => {
      if (!nodeToCentroidNodesMap.has(nodeIndex)) {
        nodeToCentroidNodesMap.set(nodeIndex, []);
      }
      nodeToCentroidNodesMap.get(nodeIndex)?.push(centroidNode);

      if (!nodeToCentroidElementIndiciesMap.has(nodeIndex)) {
        nodeToCentroidElementIndiciesMap.set(nodeIndex, []);
      }
      nodeToCentroidElementIndiciesMap.get(nodeIndex)?.push(elementIndex);
    });
  });
  return {
    nodeToCentroidNodesMap: nodeToCentroidNodesMap,
    nodeToCentroidElementIndiciesMap: nodeToCentroidElementIndiciesMap,
  };
}

function getCentroidFromNodes(
  nodeCoordinates: Node[]
): [number, number, number] {
  const x =
    nodeCoordinates.reduce((sum, n) => sum + n[0], 0) / nodeCoordinates.length;
  const y =
    nodeCoordinates.reduce((sum, n) => sum + n[1], 0) / nodeCoordinates.length;
  const z =
    nodeCoordinates.reduce((sum, n) => sum + n[2], 0) / nodeCoordinates.length;
  return [x, y, z];
}

function getLinearlyInterpolatedValueInTriangle(
  targetNode: Node,
  n1: Node,
  n2: Node,
  n3: Node,
  f1: number,
  f2: number,
  f3: number
): number {
  // Compute barycentric coordinates for targetNode in triangle (n1, n2, n3)
  const [x, y] = targetNode;
  const [x1, y1] = n1;
  const [x2, y2] = n2;
  const [x3, y3] = n3;

  const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
  const lambda1 = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
  const lambda2 = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
  const lambda3 = 1 - lambda1 - lambda2;

  // Interpolate value using barycentric coordinates
  return lambda1 * f1 + lambda2 * f2 + lambda3 * f3;
}
