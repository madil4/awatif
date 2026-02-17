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
