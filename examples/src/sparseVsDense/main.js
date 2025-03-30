import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import * as math from "mathjs";
import { performance } from "perf_hooks";

const results = [];

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper: Group test files by case
function getTestCases(testCasesDir) {
  const files = fs.readdirSync(testCasesDir);
  const testCases = {};
  // Expect file names like:
  // "Case 1 - Forces - Plate Example - 1 Size Mesh - 182 Elements.json"
  // "Case 1 - Stiffnesses - Plate Example - 1 Size Mesh - 182 Elements.json"
  files.forEach((file) => {
    const match = file.match(/^(Case \d+)\s*-\s*(Forces|Stiffnesses)/);
    if (match) {
      const caseName = match[1];
      const fileType = match[2].toLowerCase(); // forces or stiffnesses
      if (!testCases[caseName]) {
        testCases[caseName] = {};
      }
      testCases[caseName][fileType] = path.join(testCasesDir, file);
    }
  });
  return testCases;
}

// Run a single test case: read files, solve the linear system using different approaches, and compare.
function runTestCase(caseName, stiffnessFile, forcesFile) {
  console.log(`\n=== Running test case: ${caseName} ===`);

  // Read the stiffness matrix and force vector JSON files
  const stiffnessData = JSON.parse(fs.readFileSync(stiffnessFile, "utf8"));
  const forcesData = JSON.parse(fs.readFileSync(forcesFile, "utf8"));

  // Convert arrays to math.js matrices
  const A_dense = math.matrix(stiffnessData);
  const A_sparse = math.sparse(stiffnessData);
  const b = math.matrix(forcesData);

  // --- Approach 1: Direct Dense Solve ---
  console.log("Solving directly with dense matrix...");
  const t1 = performance.now();
  const x_dense = math.lusolve(A_dense, b);
  const t2 = performance.now();
  const time_dense = t2 - t1;

  // --- Approach 2: Dense LU Factorization Solve ---
  console.log("Solving using LU factorization on dense matrix...");
  const t3 = performance.now();
  const A_dense_lu = math.lup(A_dense);
  const x_dense_lu = math.lusolve(A_dense_lu, b);
  const t4 = performance.now();
  const time_dense_lu = t4 - t3;

  // --- Approach 3: Sparse LU Factorization Solve ---
  console.log("Solving using LU factorization on sparse matrix...");
  const t5 = performance.now();
  const A_sparse_lu = math.lup(A_sparse);
  const x_sparse_lu = math.lusolve(A_sparse_lu, b);
  const t6 = performance.now();
  const time_sparse_lu = t6 - t5;

  // Compare solutions (compute the maximum absolute differences)
  const diff_dense_denseLU = math.max(
    math.abs(math.subtract(x_dense, x_dense_lu))
  );
  const diff_dense_sparseLU = math.max(
    math.abs(math.subtract(x_dense, x_sparse_lu))
  );

  // Set tolerance and check equivalence for this test case
  const tolerance = 1e-10;
  const passCase =
    diff_dense_denseLU < tolerance && diff_dense_sparseLU < tolerance;

  // --- Speed-up Comparisons ---
  const speedup_denseLU = time_dense / time_dense_lu;
  const speedup_sparseLU = time_dense / time_sparse_lu;

  // Report timings and differences
  console.log(`Time for direct dense solve: ${time_dense.toFixed(2)} ms`);
  console.log(`Time for dense LU solve: ${time_dense_lu.toFixed(2)} ms`);
  console.log(`Time for sparse LU solve: ${time_sparse_lu.toFixed(2)} ms`);
  console.log(`Max difference (dense vs. dense LU): ${diff_dense_denseLU}`);
  console.log(`Max difference (dense vs. sparse LU): ${diff_dense_sparseLU}`);
  console.log(
    `Speed-up (dense LU vs direct): ${speedup_denseLU.toFixed(2)}× faster`
  );
  console.log(
    `Speed-up (sparse LU vs direct): ${speedup_sparseLU.toFixed(2)}× faster`
  );

  console.log(
    `Test result: ${
      passCase
        ? "PASS - All approaches produce equivalent solutions"
        : "FAIL - Approaches produce different solutions"
    }`
  );

  results.push({
    caseName,
    time_dense,
    time_dense_lu,
    time_sparse_lu,
    speedup_denseLU,
    speedup_sparseLU,
  });

  return passCase;
}

// Main function that runs all test cases in the folder
function main() {
  // Path to the folder with test files
  const testCasesDir = path.join(__dirname, "Plate.Example.Test.Cases");
  const testCases = getTestCases(testCasesDir);

  let overallPass = true;
  let totalCases = 0;
  let passedCases = 0;

  // Iterate over each case and run the test if both files are present.
  for (const caseName in testCases) {
    const testCase = testCases[caseName];
    if (testCase.forces && testCase.stiffnesses) {
      totalCases++;
      const pass = runTestCase(caseName, testCase.stiffnesses, testCase.forces);
      if (pass) {
        passedCases++;
      } else {
        overallPass = false;
      }
    } else {
      console.log(`Missing files for ${caseName}. Skipping this case.`);
    }
  }

  console.log("\n=== Overall Test Summary ===");
  console.log(`Total test cases: ${totalCases}`);
  console.log(`Passed test cases: ${passedCases}`);
  if (overallPass) {
    console.log("All test cases passed: All outputs are equivalent.");
  } else {
    console.log(
      "Some test cases failed: There are differences between outputs."
    );
  }

  // Save results to a JSON file for external plotting
  const outputFile = path.join(__dirname, "test_timings.json");
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`Timing data saved to ${outputFile}`);
}

// Run main function
main();
