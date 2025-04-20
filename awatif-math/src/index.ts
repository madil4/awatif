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
export function cross(a: Matrix, b: Matrix): Matrix {
  const ax = a.get(0, 0);
  const ay = a.get(1, 0);
  const az = a.get(2, 0);
  const bx = b.get(0, 0);
  const by = b.get(1, 0);
  const bz = b.get(2, 0);

  return new matrix([ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]);
}
