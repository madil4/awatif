import { Node } from "../../data-model";

export type ShellLinearKinematics = {
  membraneStrain: [number, number, number];
  curvature: [number, number, number];
  elementArea: number;
};

/**
 * Computes constant membrane strain and curvature for one 3-node shell element
 * using the same linear triangle field currently used by analyze.ts.
 *
 * `elementDisplacements` must follow shell element DOF ordering:
 * [ux, uy, wz, rx, ry, rz] per node, concatenated for the 3 nodes.
 */
export function getShellLinearKinematics(
  nodeCoordinates: Node[],
  elementDisplacements: number[],
): ShellLinearKinematics {
  const elementArea = getTriangleArea(nodeCoordinates);
  if (Math.abs(elementArea) < 1e-12) {
    return {
      membraneStrain: [0, 0, 0],
      curvature: [0, 0, 0],
      elementArea: 0,
    };
  }

  const b = getLinearFieldMatrix3x6(nodeCoordinates);
  const d = getDisplacementMatrix6x2(elementDisplacements);
  const scale = 1 / (2 * elementArea);

  const e00 =
    scale *
    (b[0][0] * d[0][0] +
      b[0][1] * d[1][0] +
      b[0][2] * d[2][0] +
      b[0][3] * d[3][0] +
      b[0][4] * d[4][0] +
      b[0][5] * d[5][0]);
  const e10 =
    scale *
    (b[1][0] * d[0][0] +
      b[1][1] * d[1][0] +
      b[1][2] * d[2][0] +
      b[1][3] * d[3][0] +
      b[1][4] * d[4][0] +
      b[1][5] * d[5][0]);
  const e20 =
    scale *
    (b[2][0] * d[0][0] +
      b[2][1] * d[1][0] +
      b[2][2] * d[2][0] +
      b[2][3] * d[3][0] +
      b[2][4] * d[4][0] +
      b[2][5] * d[5][0]);

  const e01 =
    scale *
    (b[0][0] * d[0][1] +
      b[0][1] * d[1][1] +
      b[0][2] * d[2][1] +
      b[0][3] * d[3][1] +
      b[0][4] * d[4][1] +
      b[0][5] * d[5][1]);
  const e11 =
    scale *
    (b[1][0] * d[0][1] +
      b[1][1] * d[1][1] +
      b[1][2] * d[2][1] +
      b[1][3] * d[3][1] +
      b[1][4] * d[4][1] +
      b[1][5] * d[5][1]);
  const e21 =
    scale *
    (b[2][0] * d[0][1] +
      b[2][1] * d[1][1] +
      b[2][2] * d[2][1] +
      b[2][3] * d[3][1] +
      b[2][4] * d[4][1] +
      b[2][5] * d[5][1]);

  return {
    membraneStrain: [e00, e10, e20],
    curvature: [e01, e11, e21],
    elementArea,
  };
}

export function getShellTransverseShearStrain(
  nodeCoordinates: Node[],
  elementDisplacements: number[],
): [number, number] {
  const bs = getShearStrainDisplacementMatrix(nodeCoordinates);
  return [
    dotRow(bs[0], elementDisplacements),
    dotRow(bs[1], elementDisplacements),
  ];
}

function getLinearFieldMatrix3x6(nodeCoordinates: Node[]): number[][] {
  const [x1, y1] = nodeCoordinates[0];
  const [x2, y2] = nodeCoordinates[1];
  const [x3, y3] = nodeCoordinates[2];

  const y23 = y2 - y3;
  const y31 = y3 - y1;
  const y12 = y1 - y2;

  const x32 = x3 - x2;
  const x13 = x1 - x3;
  const x21 = x2 - x1;

  return [
    [y23, y31, y12, 0, 0, 0],
    [0, 0, 0, x32, x13, x21],
    [x32, x13, x21, y23, y31, y12],
  ];
}

function getShearStrainDisplacementMatrix(nodeCoordinates: Node[]): number[][] {
  const bsMatrix = zeros(2, 18);
  const [x1, y1] = nodeCoordinates[0];
  const [x2, y2] = nodeCoordinates[1];
  const [x3, y3] = nodeCoordinates[2];

  const elementArea = 0.5 * ((x2 - x1) * (y3 - y1) - (x3 - x1) * -(y1 - y2));
  if (Math.abs(elementArea) < 1e-12) return bsMatrix;

  const centroidX = (x1 + x2 + x3) / 3;
  const centroidY = (y1 + y2 + y3) / 3;

  const triangle1CoordsX = [centroidX, x1, x2];
  const triangle1CoordsY = [centroidY, y1, y2];
  const triangle2CoordsX = [centroidX, x2, x3];
  const triangle2CoordsY = [centroidY, y2, y3];
  const triangle3CoordsX = [centroidX, x3, x1];
  const triangle3CoordsY = [centroidY, y3, y1];

  const oneThird = 1 / 3;

  const [bs1_1, bs2_1, bs3_1, area1] = getCellSmoothingTerms(
    triangle1CoordsX,
    triangle1CoordsY,
  );
  const [bs1_2, bs2_2, bs3_2, area2] = getCellSmoothingTerms(
    triangle2CoordsX,
    triangle2CoordsY,
  );
  const [bs1_3, bs2_3, bs3_3, area3] = getCellSmoothingTerms(
    triangle3CoordsX,
    triangle3CoordsY,
  );

  const B1 = zeros(2, 18);
  const B2 = zeros(2, 18);
  const B3 = zeros(2, 18);

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      B1[i][j] = oneThird * bs1_1[i][j] + bs2_1[i][j];
      B1[i][j + 6] = oneThird * bs1_1[i][j] + bs3_1[i][j];
      B1[i][j + 12] = oneThird * bs1_1[i][j];

      B2[i][j] = oneThird * bs1_2[i][j];
      B2[i][j + 6] = oneThird * bs1_2[i][j] + bs2_2[i][j];
      B2[i][j + 12] = oneThird * bs1_2[i][j] + bs3_2[i][j];

      B3[i][j] = oneThird * bs1_3[i][j] + bs3_3[i][j];
      B3[i][j + 6] = oneThird * bs1_3[i][j];
      B3[i][j + 12] = oneThird * bs1_3[i][j] + bs2_3[i][j];
    }
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 18; j++) {
      B1[i][j] *= area1;
      B2[i][j] *= area2;
      B3[i][j] *= area3;
      bsMatrix[i][j] = (B1[i][j] + B2[i][j] + B3[i][j]) / elementArea;
    }
  }

  return bsMatrix;
}

function getCellSmoothingTerms(
  X: number[],
  Y: number[],
): [number[][], number[][], number[][], number] {
  const bs1 = zeros(2, 6);
  const bs2 = zeros(2, 6);
  const bs3 = zeros(2, 6);

  const x21 = X[1] - X[0];
  const x13 = X[0] - X[2];
  const y31 = Y[2] - Y[0];
  const y12 = Y[0] - Y[1];
  const x32 = X[2] - X[1];
  const y23 = Y[1] - Y[2];

  const subTriangleArea = 0.5 * (x21 * y31 - x13 * y12);
  const a1 = 0.5 * y12 * x13;
  const a2 = 0.5 * y31 * x21;
  const a3 = 0.5 * x21 * x13;
  const a4 = 0.5 * y12 * y31;

  bs1[0][2] = (0.5 * x32) / subTriangleArea;
  bs1[0][3] = -0.5;
  bs1[1][2] = (0.5 * y23) / subTriangleArea;
  bs1[1][4] = 0.5;

  bs2[0][2] = (0.5 * x13) / subTriangleArea;
  bs2[0][3] = (0.5 * a1) / subTriangleArea;
  bs2[0][4] = (0.5 * a3) / subTriangleArea;
  bs2[1][2] = (0.5 * y31) / subTriangleArea;
  bs2[1][3] = (0.5 * a4) / subTriangleArea;
  bs2[1][4] = (0.5 * a2) / subTriangleArea;

  bs3[0][2] = (0.5 * x21) / subTriangleArea;
  bs3[0][3] = (-0.5 * a2) / subTriangleArea;
  bs3[0][4] = (-0.5 * a3) / subTriangleArea;
  bs3[1][2] = (0.5 * y12) / subTriangleArea;
  bs3[1][3] = (-0.5 * a4) / subTriangleArea;
  bs3[1][4] = (-0.5 * a1) / subTriangleArea;

  return [bs1, bs2, bs3, subTriangleArea];
}

function getDisplacementMatrix6x2(dxLocal: number[]): number[][] {
  const [u1, u2, u3] = [dxLocal[0], dxLocal[6], dxLocal[12]];
  const [v1, v2, v3] = [dxLocal[1], dxLocal[7], dxLocal[13]];
  const [thetaY1, thetaY2, thetaY3] = [dxLocal[4], dxLocal[10], dxLocal[16]];
  const [thetaX1, thetaX2, thetaX3] = [dxLocal[3], dxLocal[9], dxLocal[15]];

  return [
    [u1, -thetaY1],
    [u2, -thetaY2],
    [u3, -thetaY3],
    [v1, thetaX1],
    [v2, thetaX2],
    [v3, thetaX3],
  ];
}

function zeros(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function dotRow(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * (b[i] ?? 0);
  return sum;
}

function getTriangleArea(nodeCoordinates: Node[]): number {
  const [x1, y1] = nodeCoordinates[0];
  const [x2, y2] = nodeCoordinates[1];
  const [x3, y3] = nodeCoordinates[2];

  const x21 = x2 - x1;
  const x31 = x3 - x1;
  const y31 = y3 - y1;
  const y12 = y1 - y2;

  return 0.5 * (x21 * y31 - x31 * -y12);
}
