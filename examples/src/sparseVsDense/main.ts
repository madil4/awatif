import * as math from "mathjs";
import { performance } from "perf_hooks";

// Function to create a tridiagonal matrix as a dense matrix
function createDenseTridiagonal(n: number): math.Matrix {
  const data: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    data[i][i] = 2; // Main diagonal
    if (i > 0) data[i][i - 1] = -1; // Subdiagonal
    if (i < n - 1) data[i][i + 1] = -1; // Superdiagonal
  }
  return math.matrix(data); // Creates a dense matrix
}

// Function to create a tridiagonal matrix as a sparse matrix
function createSparseTridiagonal(n: number): math.Matrix {
  const entries: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    entries.push([i, i, 2]); // Main diagonal
    if (i > 0) entries.push([i, i - 1, -1]); // Subdiagonal
    if (i < n - 1) entries.push([i, i + 1, -1]); // Superdiagonal
  }
  return math.sparse(entries); // Creates a sparse matrix
}

// Main function to test speed difference
function main() {
  const n = 1000; // Matrix size (e.g., 1000x1000)
  console.log(`Matrix size: ${n} x ${n}`);

  // Step 1: Create the matrices
  console.log("Creating dense matrix...");
  const A_dense = createDenseTridiagonal(n);

  console.log("Creating sparse matrix...");
  const A_sparse = createSparseTridiagonal(n);

  // Step 2: Create the right-hand side vector
  const b = math.ones(n, 1); // Column vector of ones

  // Step 3: Solve with dense matrix and measure time
  console.log("Solving with dense matrix...");
  const t1 = performance.now();
  const x_dense = math.lusolve(A_dense, b);
  const t2 = performance.now();
  const time_dense = t2 - t1;

  // Step 4: Solve with sparse matrix and measure time
  console.log("Solving with sparse matrix...");
  const t3 = performance.now();
  const x_sparse = math.lusolve(A_sparse, b);
  const t4 = performance.now();
  const time_sparse = t4 - t3;

  // Step 5: Display results
  console.log(`Time for dense matrix: ${time_dense.toFixed(2)} ms`);
  console.log(`Time for sparse matrix: ${time_sparse.toFixed(2)} ms`);
  console.log(
    `Speedup (dense/sparse): ${(time_dense / time_sparse).toFixed(2)}`
  );
}

// Run the test
main();
