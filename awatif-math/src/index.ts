import eig from "./egien/eigen.js";

// @ts-ignore
await eig.ready;

export const matrix = eig.Matrix;
export const simplicialCholesky = eig.SimplicialCholesky;
export const sparseMatrix = eig.SparseMatrix;
export const tripletVector = eig.TripletVector;
export const gc = eig.GC;
