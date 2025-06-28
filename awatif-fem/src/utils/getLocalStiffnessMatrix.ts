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

function getLocalStiffnessMatrixFrame(
  nodes: Node[],
  elementInputs: ElementInputs,
  index: number
): number[][] {
  const Iz = elementInputs?.momentsOfInertiaZ?.get(index) ?? 0;
  const Iy = elementInputs?.momentsOfInertiaY?.get(index) ?? 0;
  const E = elementInputs?.elasticities?.get(index) ?? 0;
  const A = elementInputs?.areas?.get(index) ?? 0;
  const G = elementInputs?.shearModuli?.get(index) ?? 0;
  const J = elementInputs?.torsionalConstants?.get(index) ?? 0;
  const L = norm(subtract(nodes[0], nodes[1])) as number;

  const EA = (E * A) / L;
  const EIz = (E * Iz) / L ** 3;
  const EIy = (E * Iy) / L ** 3;
  const GJ = (G * J) / L;

  return [
    [EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0],
    [0, 12 * EIz, 0, 0, 0, 6 * L * EIz, 0, -12 * EIz, 0, 0, 0, 6 * L * EIz],
    [0, 0, 12 * EIy, 0, -6 * L * EIy, 0, 0, 0, -12 * EIy, 0, -6 * L * EIy, 0],
    [0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
    ],
    [-EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0],
    [0, -12 * EIz, 0, 0, 0, -6 * EIz * L, 0, 12 * EIz, 0, 0, 0, -6 * EIz * L],
    [0, 0, -12 * EIy, 0, 6 * L * EIy, 0, 0, 0, 12 * EIy, 0, 6 * L * EIy, 0],
    [0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
    ],
  ];
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

/** Isotropic in-plane constitutive matrix Qin */
export function buildIsoQin(E: number, nu: number): Matrix {
  const q1 = E / (1 - nu * nu);
  return matrix([
    [q1, q1 * nu, 0],
    [q1 * nu, q1, 0],
    [0, 0, (q1 * (1 - nu)) / 2],
  ]) as Matrix;
}

/** Orthotropic in-plane constitutive matrix Qin */
export function buildOrthotropicQin(
  Ex: number,
  Ey: number,
  Gxy: number,
  nu_xy: number
): Matrix {
  const nu_yx = (Ey * nu_xy) / Ex;
  const denom = 1 - nu_xy * nu_yx;
  const Q11 = Ex / denom;
  const Q22 = Ey / denom;
  const Q12 = (nu_xy * Ey) / denom;
  const Q66 = Gxy;
  return matrix([
    [Q11, Q12, 0],
    [Q12, Q22, 0],
    [0, 0, Q66],
  ]) as Matrix;
}

/** 3-node shell element local stiffness (18×18) */
export function getLocalStiffnessMatrixMembrane(
  nodes: Node[],
  elementInputs: ElementInputs,
  index: number
): number[][] {
  const E = elementInputs.elasticities?.get(index) ?? 0;
  const Eo = elementInputs.elasticitiesOrthogonal?.get(index) ?? 0;
  const nu = elementInputs.poissonsRatios?.get(index) ?? 0;
  const Gxy = elementInputs.shearModuli?.get(index) ?? 0;
  const h = elementInputs.thicknesses?.get(index) ?? 0;

  const Qin = Eo ? buildOrthotropicQin(E, Eo, Gxy, nu) : buildIsoQin(E, nu);

  let K = (zeros(18, 18) as Matrix).toArray() as number[][];
  let Km = (zeros(9, 9) as Matrix).toArray() as number[][];
  let Kh = (zeros(9, 9) as Matrix).toArray() as number[][];
  let Kb = (zeros(9, 9) as Matrix).toArray() as number[][];
  let L = (zeros(9, 3) as Matrix).toArray() as number[][];
  let T0 = (zeros(3, 9) as Matrix).toArray() as number[][];
  let Te = (zeros(3, 3) as Matrix).toArray() as number[][];
  let Q1 = (zeros(3, 3) as Matrix).toArray() as number[][];
  let Q2 = (zeros(3, 3) as Matrix).toArray() as number[][];
  let Q3 = (zeros(3, 3) as Matrix).toArray() as number[][];
  let Q4 = (zeros(3, 3) as Matrix).toArray() as number[][];
  let Q5 = (zeros(3, 3) as Matrix).toArray() as number[][];
  let Q6 = (zeros(3, 3) as Matrix).toArray() as number[][];
  let KO = (zeros(3, 3) as Matrix).toArray() as number[][];

  const alpha = 1 / 8;
  const ab = alpha / 6;
  const b0 = alpha ** 2 / 4;
  const b1 = 1;
  const b2 = 2;
  const b3 = 1;
  const b4 = 0;
  const b5 = 1;
  const b6 = -1;
  const b7 = -1;
  const b8 = -1;
  const b9 = -2;

  const x1 = nodes[0][0],
    y1 = nodes[0][1];
  const x2 = nodes[1][0],
    y2 = nodes[1][1];
  const x3 = nodes[2][0],
    y3 = nodes[2][1];

  const x12 = x1 - x2;
  const x23 = x2 - x3;
  const x31 = x3 - x1;
  const y12 = y1 - y2;
  const y23 = y2 - y3;
  const y31 = y3 - y1;
  const x21 = -x12;
  const x32 = -x23;
  const x13 = -x31;
  const y21 = -y12;
  const y32 = -y23;
  const y13 = -y31;

  const Ae = 0.5 * (x21 * y31 - x31 * -y12);
  const A2 = 2 * Ae;
  const A4 = 4 * Ae;
  const h2 = 0.5 * h;
  const V = Ae * h;

  const LL21 = x21 ** 2 + y21 ** 2;
  const LL32 = x32 ** 2 + y32 ** 2;
  const LL13 = x13 ** 2 + y13 ** 2;

  // lumping matrix
  L[0][0] = h2 * y23;
  L[0][2] = h2 * x32;
  L[1][1] = h2 * x32;
  L[1][2] = h2 * y23;
  L[2][0] = h2 * y23 * (y13 - y21) * ab;
  L[2][1] = h2 * x32 * (x31 - x12) * ab;
  L[2][2] = h2 * (x31 * y13 - x12 * y21) * 2 * ab;

  L[3][0] = h2 * y31;
  L[3][2] = h2 * x13;
  L[4][1] = h2 * x13;
  L[4][2] = h2 * y31;
  L[5][0] = h2 * y31 * (y21 - y32) * ab;
  L[5][1] = h2 * x13 * (x12 - x23) * ab;
  L[5][2] = h2 * (x12 * y21 - x23 * y32) * 2 * ab;

  L[6][0] = h2 * y12;
  L[6][2] = h2 * x21;
  L[7][1] = h2 * x21;
  L[7][2] = h2 * y12;
  L[8][0] = h2 * y12 * (y32 - y13) * ab;
  L[8][1] = h2 * x21 * (x23 - x31) * ab;
  L[8][2] = h2 * (x23 * y32 - x31 * y13) * 2 * ab;

  // basic stiffness
  Kb = (
    multiply(multiply(matrix(L), Qin), transpose(matrix(L))) as Matrix
  ).toArray() as number[][];
  Kb = (multiply(matrix(Kb), 1 / V) as Matrix).toArray() as number[][];

  // transformation hierarchical rotations
  T0[0][0] = x32 / A4;
  T0[0][1] = y32 / A4;
  T0[0][2] = 1;
  T0[0][3] = x13 / A4;
  T0[0][4] = y13 / A4;
  T0[0][6] = x21 / A4;
  T0[0][7] = y21 / A4;

  T0[1][0] = x32 / A4;
  T0[1][1] = y32 / A4;
  T0[1][3] = x13 / A4;
  T0[1][4] = y13 / A4;
  T0[1][5] = 1;
  T0[1][6] = x21 / A4;
  T0[1][7] = y21 / A4;

  T0[2][0] = x32 / A4;
  T0[2][1] = y32 / A4;
  T0[2][3] = x13 / A4;
  T0[2][4] = y13 / A4;
  T0[2][6] = x21 / A4;
  T0[2][7] = y21 / A4;
  T0[2][8] = 1;

  // transformation natural pattern
  const A14 = 1 / (Ae * A4);
  Te[0][0] = A14 * y23 * y13 * LL21;
  Te[0][1] = A14 * y31 * y21 * LL32;
  Te[0][2] = A14 * y12 * y32 * LL13;
  Te[1][0] = A14 * x23 * x13 * LL21;
  Te[1][1] = A14 * x31 * x21 * LL32;
  Te[1][2] = A14 * x12 * x32 * LL13;
  Te[2][0] = A14 * (y23 * x31 + x32 * y13) * LL21;
  Te[2][1] = A14 * (y31 * x12 + x13 * y21) * LL32;
  Te[2][2] = A14 * (y12 * x23 + x21 * y32) * LL13;

  const A14b = A2 / 3;

  // nodal strain-displ.-matrix
  Q1[0][0] = (A14b * b1) / LL21;
  Q1[0][1] = (A14b * b2) / LL21;
  Q1[0][2] = (A14b * b3) / LL21;
  Q1[1][0] = (A14b * b4) / LL32;
  Q1[1][1] = (A14b * b5) / LL32;
  Q1[1][2] = (A14b * b6) / LL32;
  Q1[2][0] = (A14b * b7) / LL13;
  Q1[2][1] = (A14b * b8) / LL13;
  Q1[2][2] = (A14b * b9) / LL13;

  Q2[0][0] = (A14b * b9) / LL21;
  Q2[0][1] = (A14b * b7) / LL21;
  Q2[0][2] = (A14b * b8) / LL21;
  Q2[1][0] = (A14b * b3) / LL32;
  Q2[1][1] = (A14b * b1) / LL32;
  Q2[1][2] = (A14b * b2) / LL32;
  Q2[2][0] = (A14b * b6) / LL13;
  Q2[2][1] = (A14b * b4) / LL13;
  Q2[2][2] = (A14b * b5) / LL13;

  Q3[0][0] = (A14b * b5) / LL21;
  Q3[0][1] = (A14b * b6) / LL21;
  Q3[0][2] = (A14b * b4) / LL21;
  Q3[1][0] = (A14b * b8) / LL32;
  Q3[1][1] = (A14b * b9) / LL32;
  Q3[1][2] = (A14b * b7) / LL32;
  Q3[2][0] = (A14b * b2) / LL13;
  Q3[2][1] = (A14b * b3) / LL13;
  Q3[2][2] = (A14b * b1) / LL13;

  Q4 = (
    multiply(add(matrix(Q1), matrix(Q2)), 0.5) as Matrix
  ).toArray() as number[][];
  Q5 = (
    multiply(add(matrix(Q2), matrix(Q3)), 0.5) as Matrix
  ).toArray() as number[][];
  Q6 = (
    multiply(add(matrix(Q3), matrix(Q1)), 0.5) as Matrix
  ).toArray() as number[][];

  const Enat = multiply(
    multiply(transpose(matrix(Te)), Qin),
    matrix(Te)
  ) as Matrix;

  // higher stiffness with respect to hier...rots
  KO = (
    add(
      add(
        multiply(multiply(transpose(matrix(Q4)), Enat), matrix(Q4)),
        multiply(multiply(transpose(matrix(Q5)), Enat), matrix(Q5))
      ),
      multiply(multiply(transpose(matrix(Q6)), Enat), matrix(Q6))
    ) as Matrix
  ).toArray() as number[][];
  KO = (
    multiply(matrix(KO), (3 / 4) * b0 * V) as Matrix
  ).toArray() as number[][];

  // higher stiffness [18x18)
  Kh = (
    multiply(multiply(transpose(matrix(T0)), matrix(KO)), matrix(T0)) as Matrix
  ).toArray() as number[][];
  Km = (add(matrix(Kb), matrix(Kh)) as Matrix).toArray() as number[][];

  for (let i = 0; i < 3; i++) {
    K[0 + i * 6][0] = Km[0 + i * 3][0];
    K[0 + i * 6][1] = Km[0 + i * 3][1];
    K[0 + i * 6][5] = Km[0 + i * 3][2];
    K[0 + i * 6][6] = Km[0 + i * 3][3];
    K[0 + i * 6][7] = Km[0 + i * 3][4];
    K[0 + i * 6][11] = Km[0 + i * 3][5];
    K[0 + i * 6][12] = Km[0 + i * 3][6];
    K[0 + i * 6][13] = Km[0 + i * 3][7];
    K[0 + i * 6][17] = Km[0 + i * 3][8];

    K[1 + i * 6][0] = Km[1 + i * 3][0];
    K[1 + i * 6][1] = Km[1 + i * 3][1];
    K[1 + i * 6][5] = Km[1 + i * 3][2];
    K[1 + i * 6][6] = Km[1 + i * 3][3];
    K[1 + i * 6][7] = Km[1 + i * 3][4];
    K[1 + i * 6][11] = Km[1 + i * 3][5];
    K[1 + i * 6][12] = Km[1 + i * 3][6];
    K[1 + i * 6][13] = Km[1 + i * 3][7];
    K[1 + i * 6][17] = Km[1 + i * 3][8];

    K[5 + i * 6][0] = Km[2 + i * 3][0];
    K[5 + i * 6][1] = Km[2 + i * 3][1];
    K[5 + i * 6][5] = Km[2 + i * 3][2];
    K[5 + i * 6][6] = Km[2 + i * 3][3];
    K[5 + i * 6][7] = Km[2 + i * 3][4];
    K[5 + i * 6][11] = Km[2 + i * 3][5];
    K[5 + i * 6][12] = Km[2 + i * 3][6];
    K[5 + i * 6][13] = Km[2 + i * 3][7];
    K[5 + i * 6][17] = Km[2 + i * 3][8];
  }

  return K;
}
