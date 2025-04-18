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
