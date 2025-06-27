import { Node, ElementInputs } from ".././data-model";
import {
  add,
  matrix,
  multiply,
  norm,
  subtract,
  transpose,
  zeros,
  Matrix,
} from "mathjs";

export function getLocalStiffnessMatrix(
  nodes: Node[],
  elementInputs: ElementInputs,
  index: number
): number[][] {
  if (nodes.length === 2)
    return getLocalStiffnessMatrixFrame(nodes, elementInputs, index);

  if (nodes.length === 3)
    return getLocalStiffnessMatrixPlate(nodes, elementInputs, index);
}

/** Isotropic bending stiffness Db */
export function buildIsoDb(E: number, nu: number, t: number): Matrix {
  const q1 = E / (1 - nu * nu);
  const Q = matrix([
    [q1, q1 * nu, 0],
    [q1 * nu, q1, 0],
    [0, 0, (q1 * (1 - nu)) / 2],
  ]);
  return multiply(t ** 3 / 12, Q) as Matrix;
}

/** Isotropic shear stiffness Ds */
export function buildIsoDs(E: number, nu: number, t: number): Matrix {
  const k_s = 5 / 6;
  const q_s = E / (2 * (1 + nu));
  return matrix([
    [k_s * q_s * t, 0],
    [0, k_s * q_s * t],
  ]);
}

/** Orthotropic bending stiffness Db */
export function buildOrthotropicDb(
  Ex: number,
  Ey: number,
  Gxy: number,
  nu_xy: number,
  t: number
): Matrix {
  const nu_yx = (Ey * nu_xy) / Ex;
  const denom = 1 - nu_xy * nu_yx;
  const Q11 = Ex / denom;
  const Q22 = Ey / denom;
  const Q12 = (nu_xy * Ey) / denom;
  const Q66 = Gxy;
  const Q = matrix([
    [Q11, Q12, 0],
    [Q12, Q22, 0],
    [0, 0, Q66],
  ]);
  return multiply(t ** 3 / 12, Q) as Matrix;
}

/** Orthotropic shear stiffness Ds */
export function buildOrthotropicDs(Gxy: number, t: number): Matrix {
  const k_s = 5 / 6;
  return matrix([
    [k_s * Gxy * t, 0],
    [0, k_s * Gxy * t],
  ]);
}

/**
 * Cell-smoothing subroutine: returns [bs1, bs2, bs3, Ai]
 */
function computeCS(
  X: number[],
  Y: number[]
): [number[][], number[][], number[][], number] {
  const bs1 = (zeros(2, 6) as Matrix).toArray() as number[][];
  const bs2 = (zeros(2, 6) as Matrix).toArray() as number[][];
  const bs3 = (zeros(2, 6) as Matrix).toArray() as number[][];

  const x21 = X[1] - X[0];
  const x13 = X[0] - X[2];
  const y31 = Y[2] - Y[0];
  const y12 = Y[0] - Y[1];
  const x32 = X[2] - X[1];
  const y23 = Y[1] - Y[2];

  const Ae = 0.5 * (x21 * y31 - x13 * y12);
  const a1 = 0.5 * y12 * x13;
  const a2 = 0.5 * y31 * x21;
  const a3 = 0.5 * x21 * x13;
  const a4 = 0.5 * y12 * y31;

  // bs1
  bs1[0][2] = (0.5 * x32) / Ae;
  bs1[0][3] = -0.5;
  bs1[1][2] = (0.5 * y23) / Ae;
  bs1[1][4] = 0.5;

  // bs2
  bs2[0][2] = (0.5 * x13) / Ae;
  bs2[0][3] = (0.5 * a1) / Ae;
  bs2[0][4] = (0.5 * a3) / Ae;
  bs2[1][2] = (0.5 * y31) / Ae;
  bs2[1][3] = (0.5 * a4) / Ae;
  bs2[1][4] = (0.5 * a2) / Ae;

  // bs3
  bs3[0][2] = (0.5 * x21) / Ae;
  bs3[0][3] = (-0.5 * a2) / Ae;
  bs3[0][4] = (-0.5 * a3) / Ae;
  bs3[1][2] = (0.5 * y12) / Ae;
  bs3[1][3] = (-0.5 * a4) / Ae;
  bs3[1][4] = (-0.5 * a1) / Ae;

  return [bs1, bs2, bs3, Ae];
}

/** Compute the 2×18 shear-strain displacement matrix Bs */
function computeBs(X: number[][]): number[][] {
  const Bs = (zeros(2, 18) as Matrix).toArray() as number[][];
  const x1 = X[0][0],
    x2 = X[1][0],
    x3 = X[2][0];
  const y1 = X[0][1],
    y2 = X[1][1],
    y3 = X[2][1];

  const Ae = 0.5 * ((x2 - x1) * (y3 - y1) - (x3 - x1) * -(y1 - y2));
  const x0 = (x1 + x2 + x3) / 3;
  const y0 = (y1 + y2 + y3) / 3;

  const X1 = [x0, x1, x2],
    Y1 = [y0, y1, y2];
  const X2 = [x0, x2, x3],
    Y2 = [y0, y2, y3];
  const X3 = [x0, x3, x1],
    Y3 = [y0, y3, y1];

  const a3 = 1 / 3;

  const [bs1_1, bs2_1, bs3_1, Ai1] = computeCS(X1, Y1);
  const [bs1_2, bs2_2, bs3_2, Ai2] = computeCS(X2, Y2);
  const [bs1_3, bs2_3, bs3_3, Ai3] = computeCS(X3, Y3);

  const B1 = (zeros(2, 18) as Matrix).toArray() as number[][];
  const B2 = (zeros(2, 18) as Matrix).toArray() as number[][];
  const B3 = (zeros(2, 18) as Matrix).toArray() as number[][];

  // assemble B1, B2, B3
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      B1[i][j] = a3 * bs1_1[i][j] + bs2_1[i][j];
      B1[i][j + 6] = a3 * bs1_1[i][j] + bs3_1[i][j];
      B1[i][j + 12] = a3 * bs1_1[i][j];

      B2[i][j] = a3 * bs1_2[i][j];
      B2[i][j + 6] = a3 * bs1_2[i][j] + bs2_2[i][j];
      B2[i][j + 12] = a3 * bs1_2[i][j] + bs3_2[i][j];

      B3[i][j] = a3 * bs1_3[i][j] + bs3_3[i][j];
      B3[i][j + 6] = a3 * bs1_3[i][j];
      B3[i][j + 12] = a3 * bs1_3[i][j] + bs2_3[i][j];
    }
  }
  // scale by sub‐areas
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 18; j++) {
      B1[i][j] *= Ai1;
      B2[i][j] *= Ai2;
      B3[i][j] *= Ai3;
      Bs[i][j] = (B1[i][j] + B2[i][j] + B3[i][j]) / Ae;
    }
  }

  return Bs;
}

/** Compute the 3×18 bending-strain displacement matrix Bb */
function computeBb(X: number[][]): number[][] {
  const bb = (zeros(3, 18) as Matrix).toArray() as number[][];
  const x21 = X[1][0] - X[0][0];
  const x31 = X[2][0] - X[0][0];
  const x32 = X[2][0] - X[1][0];
  const y23 = X[1][1] - X[2][1];
  const y31 = X[2][1] - X[0][1];
  const y12 = X[0][1] - X[1][1];

  const Ae = 0.5 * (x21 * y31 - x31 * -y12);

  const dNdx1 = y23 / (2 * Ae);
  const dNdy1 = x32 / (2 * Ae);
  const dNdx2 = y31 / (2 * Ae);
  const dNdy2 = -x31 / (2 * Ae);
  const dNdx3 = y12 / (2 * Ae);
  const dNdy3 = x21 / (2 * Ae);

  bb[0][4] = dNdx1;
  bb[0][10] = dNdx2;
  bb[0][16] = dNdx3;

  bb[1][3] = -dNdy1;
  bb[1][9] = -dNdy2;
  bb[1][15] = -dNdy3;

  bb[2][3] = -dNdx1;
  bb[2][4] = dNdy1;
  bb[2][9] = -dNdx2;
  bb[2][10] = dNdy2;
  bb[2][15] = -dNdx3;
  bb[2][16] = dNdy3;

  return bb;
}

/** 3-node plate element local stiffness (18×18) */
export function getLocalStiffnessMatrixPlate(
  nodes: Node[],
  elementInputs: ElementInputs,
  index: number
): number[][] {
  const E = elementInputs.elasticities?.get(index) ?? 0;
  const Eo = elementInputs.elasticitiesOrthogonal?.get(index) ?? 0;
  const nu = elementInputs.poissonsRatios?.get(index) ?? 0;
  const Gxy = elementInputs.shearModuli?.get(index) ?? 0;
  const t = elementInputs.thicknesses?.get(index) ?? 0;

  const Db = Eo ? buildOrthotropicDb(E, Eo, Gxy, nu, t) : buildIsoDb(E, nu, t);

  const Ds = Eo ? buildOrthotropicDs(Gxy, t) : buildIsoDs(E, nu, t);

  const X = nodes.map(([x, y]) => [x, y]) as number[][];
  const x21 = X[1][0] - X[0][0];
  const x31 = X[2][0] - X[0][0];
  const y12 = X[0][1] - X[1][1];
  const y31 = X[2][1] - X[0][1];
  const Ae = 0.5 * (x21 * y31 - x31 * -y12);

  const Bs = computeBs(X);
  const Bb = computeBb(X);

  const shearTerm = multiply(multiply(transpose(Bs), Ds), Bs);
  const bendTerm = multiply(multiply(transpose(Bb), Db), Bb);
  const Kp = multiply(add(shearTerm, bendTerm), Ae) as Matrix;

  return Kp.toArray() as number[][];
}
