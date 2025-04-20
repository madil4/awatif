import eig from "./egien/eigen.js";

// @ts-ignore
await eig.ready;

export const matrix = eig.Matrix;
export const simplicialCholesky = eig.SimplicialCholesky;
export const sparseMatrix = eig.SparseMatrix;
export const tripletVector = eig.TripletVector;
export const gc = eig.GC;

export type Matrix = eig.Matrix;
export type SimplicialCholesky = eig.SimplicialCholesky;
export type SparseMatrix = eig.SparseMatrix;
export type TripletVector = eig.TripletVector;
export type GC = eig.GC;

// Missing functions from Eigen
export function kronecker(A: Matrix, B: Matrix): Matrix {
  const m = A.rows();
  const n = A.cols();
  const p = B.rows();
  const q = B.cols();

  const result = new matrix(m * p, n * q);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const aij = A.get(i, j);
      for (let bi = 0; bi < p; bi++) {
        for (let bj = 0; bj < q; bj++) {
          result.set(i * p + bi, j * q + bj, aij * B.get(bi, bj));
        }
      }
    }
  }

  return result;
}

export function cross(a: Matrix, b: Matrix): Matrix {
  const ax = a.get(0, 0),
    ay = a.get(1, 0),
    az = a.get(2, 0);
  const bx = b.get(0, 0),
    by = b.get(1, 0),
    bz = b.get(2, 0);

  return new matrix([ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]);
}
