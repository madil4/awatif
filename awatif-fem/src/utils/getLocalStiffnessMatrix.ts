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
    return getLocalStiffnessMatrixShell(nodes, elementInputs, index);
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

function getLocalStiffnessMatrixShell(
  nodes: Node[],
  elementInputs: ElementInputs,
  index: number
): number[][] {
  const elasticityX = elementInputs.elasticities?.get(index) ?? 0;
  const elasticityY = elementInputs.elasticitiesOrthogonal?.get(index) ?? 0;
  const poissonRatio = elementInputs.poissonsRatios?.get(index) ?? 0;
  const shearModulus = elementInputs.shearModuli?.get(index) ?? 0;
  const thickness = elementInputs.thicknesses?.get(index) ?? 0;

  // Determine if the material is orthotropic based on the presence of elasticityY
  const isOrthotropic = elasticityY > 0;

  const bendingStiffnessMatrix = isOrthotropic
    ? getOrthotropicBendingStiffnessMatrix(
        elasticityX,
        elasticityY,
        shearModulus,
        poissonRatio,
        thickness
      )
    : getIsotropicBendingStiffnessMatrix(elasticityX, poissonRatio, thickness);

  const shearStiffnessMatrix = isOrthotropic
    ? getOrthotropicShearStiffnessMatrix(shearModulus, thickness)
    : getIsotropicShearStiffnessMatrix(elasticityX, poissonRatio, thickness);

  const inPlaneConstitutiveMatrix = isOrthotropic
    ? getOrthotropicInPlaneConstitutiveMatrix(
        elasticityX,
        elasticityY,
        shearModulus,
        poissonRatio
      )
    : getIsotropicInPlaneConstitutiveMatrix(elasticityX, poissonRatio);

  // Extract node coordinates for clarity
  const nodeCoordinates = nodes.map(([x, y]) => [x, y]);

  // Calculate element area
  const x21 = nodeCoordinates[1][0] - nodeCoordinates[0][0];
  const x31 = nodeCoordinates[2][0] - nodeCoordinates[0][0];
  const y12 = nodeCoordinates[0][1] - nodeCoordinates[1][1];
  const y31 = nodeCoordinates[2][1] - nodeCoordinates[0][1];
  const elementArea = 0.5 * (x21 * y31 - x31 * -y12);

  const shearStrainDisplacementMatrix =
    getShearStrainDisplacementMatrix(nodeCoordinates);
  const bendingStrainDisplacementMatrix =
    getBendingStrainDisplacementMatrix(nodeCoordinates);
  const membraneStiffnessMatrix9x9 = getMembraneStiffnessMatrix(
    nodeCoordinates,
    inPlaneConstitutiveMatrix,
    thickness
  );

  // Calculate stiffness terms
  const shearTerm = multiply(
    multiply(transpose(shearStrainDisplacementMatrix), shearStiffnessMatrix),
    shearStrainDisplacementMatrix
  );
  const bendingTerm = multiply(
    multiply(
      transpose(bendingStrainDisplacementMatrix),
      bendingStiffnessMatrix
    ),
    bendingStrainDisplacementMatrix
  );

  // Initialize the full 18x18 stiffness matrix
  const localStiffnessMatrix = (
    zeros(18, 18) as Matrix
  ).toArray() as number[][];

  // Combine bending and shear terms (scaled by elementArea)
  const Kp = multiply(add(shearTerm, bendingTerm), elementArea) as Matrix;

  // Assemble the 9x9 membrane stiffness matrix into the 18x18 shell stiffness matrix
  // Assuming the node degrees of freedom are ordered as [ux1, uy1, wz1, rx1, ry1, rz1, ux2, ..., rz3]
  // The membrane terms (ux, uy, rz) correspond to indices 0, 1, 5; 6, 7, 11; 12, 13, 17 for each node.
  const membraneMapping = [
    [0, 1, 5], // Node 1: ux, uy, rz
    [6, 7, 11], // Node 2: ux, uy, rz
    [12, 13, 17], // Node 3: ux, uy, rz
  ];

  for (let i = 0; i < 3; i++) {
    // For each node (0, 1, 2)
    for (let j = 0; j < 3; j++) {
      // For each DOF within the 9x9 membrane matrix
      for (let k = 0; k < 3; k++) {
        // For each DOF within the 9x9 membrane matrix
        const globalRow = membraneMapping[i][j];
        const globalCol = membraneMapping[k][j]; // Corrected index for global column mapping
        localStiffnessMatrix[globalRow][globalCol] =
          membraneStiffnessMatrix9x9[i * 3 + j][k * 3 + j]; // This mapping needs careful review
      }
    }
  }

  // Overlay Kp (bending and shear) onto the appropriate DOFs of the 18x18 matrix
  // Kp directly corresponds to the 18x18 matrix for bending and shear DOFs
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 18; j++) {
      localStiffnessMatrix[i][j] =
        (localStiffnessMatrix[i][j] ?? 0) + Kp.get([i, j]);
    }
  }

  return localStiffnessMatrix;

  // Utils
  function getIsotropicBendingStiffnessMatrix(
    E: number,
    nu: number,
    t: number
  ): Matrix {
    const commonFactor = E / (1 - nu * nu);
    const Q = matrix([
      [commonFactor, commonFactor * nu, 0],
      [commonFactor * nu, commonFactor, 0],
      [0, 0, (commonFactor * (1 - nu)) / 2],
    ]);
    return multiply(t ** 3 / 12, Q) as Matrix;
  }

  function getIsotropicShearStiffnessMatrix(
    E: number,
    nu: number,
    t: number
  ): Matrix {
    const shearCorrectionFactor = 5 / 6;
    const shearModulus = E / (2 * (1 + nu));
    const diagonalValue = shearCorrectionFactor * shearModulus * t;
    return matrix([
      [diagonalValue, 0],
      [0, diagonalValue],
    ]);
  }

  function getOrthotropicBendingStiffnessMatrix(
    Ex: number,
    Ey: number,
    Gxy: number,
    nu_xy: number,
    t: number
  ): Matrix {
    const nu_yx = (Ey * nu_xy) / Ex;
    const denominator = 1 - nu_xy * nu_yx;
    const Q11 = Ex / denominator;
    const Q22 = Ey / denominator;
    const Q12 = (nu_xy * Ey) / denominator;
    const Q66 = Gxy;
    const Q = matrix([
      [Q11, Q12, 0],
      [Q12, Q22, 0],
      [0, 0, Q66],
    ]);
    return multiply(t ** 3 / 12, Q) as Matrix;
  }

  function getOrthotropicShearStiffnessMatrix(Gxy: number, t: number): Matrix {
    const shearCorrectionFactor = 5 / 6;
    const diagonalValue = shearCorrectionFactor * Gxy * t;
    return matrix([
      [diagonalValue, 0],
      [0, diagonalValue],
    ]);
  }

  function getShearStrainDisplacementMatrix(
    nodeCoordinates: number[][]
  ): number[][] {
    const bsMatrix = (zeros(2, 18) as Matrix).toArray() as number[][];
    const [x1, y1] = nodeCoordinates[0];
    const [x2, y2] = nodeCoordinates[1];
    const [x3, y3] = nodeCoordinates[2];

    const elementArea = 0.5 * ((x2 - x1) * (y3 - y1) - (x3 - x1) * -(y1 - y2));
    const centroidX = (x1 + x2 + x3) / 3;
    const centroidY = (y1 + y2 + y3) / 3;

    // Sub-triangles formed by the centroid and two nodes
    const triangle1CoordsX = [centroidX, x1, x2];
    const triangle1CoordsY = [centroidY, y1, y2];
    const triangle2CoordsX = [centroidX, x2, x3];
    const triangle2CoordsY = [centroidY, y2, y3];
    const triangle3CoordsX = [centroidX, x3, x1];
    const triangle3CoordsY = [centroidY, y3, y1];

    const oneThird = 1 / 3;

    const [bs1_1, bs2_1, bs3_1, area1] = getCellSmoothingTerms(
      triangle1CoordsX,
      triangle1CoordsY
    );
    const [bs1_2, bs2_2, bs3_2, area2] = getCellSmoothingTerms(
      triangle2CoordsX,
      triangle2CoordsY
    );
    const [bs1_3, bs2_3, bs3_3, area3] = getCellSmoothingTerms(
      triangle3CoordsX,
      triangle3CoordsY
    );

    const B1 = (zeros(2, 18) as Matrix).toArray() as number[][];
    const B2 = (zeros(2, 18) as Matrix).toArray() as number[][];
    const B3 = (zeros(2, 18) as Matrix).toArray() as number[][];

    // Assemble B1, B2, B3 matrices for each sub-triangle
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

    // Scale by sub-areas and sum to get the final Bs matrix
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

    const subTriangleArea = 0.5 * (x21 * y31 - x13 * y12);
    const a1 = 0.5 * y12 * x13;
    const a2 = 0.5 * y31 * x21;
    const a3 = 0.5 * x21 * x13;
    const a4 = 0.5 * y12 * y31;

    // Populate bs1
    bs1[0][2] = (0.5 * x32) / subTriangleArea;
    bs1[0][3] = -0.5;
    bs1[1][2] = (0.5 * y23) / subTriangleArea;
    bs1[1][4] = 0.5;

    // Populate bs2
    bs2[0][2] = (0.5 * x13) / subTriangleArea;
    bs2[0][3] = (0.5 * a1) / subTriangleArea;
    bs2[0][4] = (0.5 * a3) / subTriangleArea;
    bs2[1][2] = (0.5 * y31) / subTriangleArea;
    bs2[1][3] = (0.5 * a4) / subTriangleArea;
    bs2[1][4] = (0.5 * a2) / subTriangleArea;

    // Populate bs3
    bs3[0][2] = (0.5 * x21) / subTriangleArea;
    bs3[0][3] = (-0.5 * a2) / subTriangleArea;
    bs3[0][4] = (-0.5 * a3) / subTriangleArea;
    bs3[1][2] = (0.5 * y12) / subTriangleArea;
    bs3[1][3] = (-0.5 * a4) / subTriangleArea;
    bs3[1][4] = (-0.5 * a1) / subTriangleArea;

    return [bs1, bs2, bs3, subTriangleArea];
  }

  function getBendingStrainDisplacementMatrix(
    nodeCoordinates: number[][]
  ): number[][] {
    const bendingMatrix = (zeros(3, 18) as Matrix).toArray() as number[][];
    const [x1, y1] = nodeCoordinates[0];
    const [x2, y2] = nodeCoordinates[1];
    const [x3, y3] = nodeCoordinates[2];

    const x21 = x2 - x1;
    const x31 = x3 - x1;
    const x32 = x3 - x2;
    const y23 = y2 - y3;
    const y31 = y3 - y1;
    const y12 = y1 - y2;

    const elementArea = 0.5 * (x21 * y31 - x31 * -y12);

    // Derivatives of shape functions with respect to x and y
    const dNdx1 = y23 / (2 * elementArea);
    const dNdy1 = x32 / (2 * elementArea);
    const dNdx2 = y31 / (2 * elementArea);
    const dNdy2 = -x31 / (2 * elementArea);
    const dNdx3 = y12 / (2 * elementArea);
    const dNdy3 = x21 / (2 * elementArea);

    // Populate the bending matrix (Bb) based on the derived shape function derivatives
    bendingMatrix[0][4] = dNdx1;
    bendingMatrix[0][10] = dNdx2;
    bendingMatrix[0][16] = dNdx3;

    bendingMatrix[1][3] = -dNdy1;
    bendingMatrix[1][9] = -dNdy2;
    bendingMatrix[1][15] = -dNdy3;

    bendingMatrix[2][3] = -dNdx1;
    bendingMatrix[2][4] = dNdy1;
    bendingMatrix[2][9] = -dNdx2;
    bendingMatrix[2][10] = dNdy2;
    bendingMatrix[2][15] = -dNdx3;
    bendingMatrix[2][16] = dNdy3;

    return bendingMatrix;
  }

  function getIsotropicInPlaneConstitutiveMatrix(
    E: number,
    nu: number
  ): Matrix {
    const q1 = E / (1 - nu * nu);
    return matrix([
      [q1, q1 * nu, 0],
      [q1 * nu, q1, 0],
      [0, 0, (q1 * (1 - nu)) / 2],
    ]) as Matrix;
  }

  function getOrthotropicInPlaneConstitutiveMatrix(
    Ex: number,
    Ey: number,
    Gxy: number,
    nu_xy: number
  ): Matrix {
    const nu_yx = (Ey * nu_xy) / Ex;
    const denominator = 1 - nu_xy * nu_yx;
    const Q11 = Ex / denominator;
    const Q22 = Ey / denominator;
    const Q12 = (nu_xy * Ey) / denominator;
    const Q66 = Gxy;
    return matrix([
      [Q11, Q12, 0],
      [Q12, Q22, 0],
      [0, 0, Q66],
    ]) as Matrix;
  }

  function getMembraneStiffnessMatrix(
    nodeCoordinates: number[][],
    inPlaneConstitutiveMatrix: Matrix,
    thickness: number
  ): number[][] {
    let Km = (zeros(9, 9) as Matrix).toArray() as number[][];
    let Kh = (zeros(9, 9) as Matrix).toArray() as number[][];
    let Kb = (zeros(9, 9) as Matrix).toArray() as number[][];
    let L = (zeros(9, 3) as Matrix).toArray() as number[][];
    let T0 = (zeros(3, 9) as Matrix).toArray() as number[][];
    let Te = (zeros(3, 3) as Matrix).toArray() as number[][];
    let Q1_mat = (zeros(3, 3) as Matrix).toArray() as number[][];
    let Q2_mat = (zeros(3, 3) as Matrix).toArray() as number[][];
    let Q3_mat = (zeros(3, 3) as Matrix).toArray() as number[][];
    let Q4_mat = (zeros(3, 3) as Matrix).toArray() as number[][];
    let Q5_mat = (zeros(3, 3) as Matrix).toArray() as number[][];
    let Q6_mat = (zeros(3, 3) as Matrix).toArray() as number[][];
    let KO = (zeros(3, 3) as Matrix).toArray() as number[][];

    // Constants as in the original code
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

    const x1 = nodeCoordinates[0][0];
    const y1 = nodeCoordinates[0][1];
    const x2 = nodeCoordinates[1][0];
    const y2 = nodeCoordinates[1][1];
    const x3 = nodeCoordinates[2][0];
    const y3 = nodeCoordinates[2][1];

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

    const elementArea = 0.5 * (x21 * y31 - x31 * -y12);
    const A2 = 2 * elementArea;
    const A4 = 4 * elementArea;
    const h2 = 0.5 * thickness;
    const volume = elementArea * thickness;

    const LL21 = x21 ** 2 + y21 ** 2;
    const LL32 = x32 ** 2 + y32 ** 2;
    const LL13 = x13 ** 2 + y13 ** 2;

    // Lumping matrix (L)
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

    // Basic stiffness (Kb)
    Kb = (
      multiply(
        multiply(matrix(L), inPlaneConstitutiveMatrix),
        transpose(matrix(L))
      ) as Matrix
    ).toArray() as number[][];
    Kb = (multiply(matrix(Kb), 1 / volume) as Matrix).toArray() as number[][];

    // Transformation hierarchical rotations (T0)
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

    // Transformation natural pattern (Te)
    const A14 = 1 / (elementArea * A4);
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

    // Nodal strain-displacement matrices (Q1_mat, Q2_mat, Q3_mat)
    Q1_mat[0][0] = (A14b * b1) / LL21;
    Q1_mat[0][1] = (A14b * b2) / LL21;
    Q1_mat[0][2] = (A14b * b3) / LL21;
    Q1_mat[1][0] = (A14b * b4) / LL32;
    Q1_mat[1][1] = (A14b * b5) / LL32;
    Q1_mat[1][2] = (A14b * b6) / LL32;
    Q1_mat[2][0] = (A14b * b7) / LL13;
    Q1_mat[2][1] = (A14b * b8) / LL13;
    Q1_mat[2][2] = (A14b * b9) / LL13;

    Q2_mat[0][0] = (A14b * b9) / LL21;
    Q2_mat[0][1] = (A14b * b7) / LL21;
    Q2_mat[0][2] = (A14b * b8) / LL21;
    Q2_mat[1][0] = (A14b * b3) / LL32;
    Q2_mat[1][1] = (A14b * b1) / LL32;
    Q2_mat[1][2] = (A14b * b2) / LL32;
    Q2_mat[2][0] = (A14b * b6) / LL13;
    Q2_mat[2][1] = (A14b * b4) / LL13;
    Q2_mat[2][2] = (A14b * b5) / LL13;

    Q3_mat[0][0] = (A14b * b5) / LL21;
    Q3_mat[0][1] = (A14b * b6) / LL21;
    Q3_mat[0][2] = (A14b * b4) / LL21;
    Q3_mat[1][0] = (A14b * b8) / LL32;
    Q3_mat[1][1] = (A14b * b9) / LL32;
    Q3_mat[1][2] = (A14b * b7) / LL32;
    Q3_mat[2][0] = (A14b * b2) / LL13;
    Q3_mat[2][1] = (A14b * b3) / LL13;
    Q3_mat[2][2] = (A14b * b1) / LL13;

    Q4_mat = (
      multiply(add(matrix(Q1_mat), matrix(Q2_mat)), 0.5) as Matrix
    ).toArray() as number[][];
    Q5_mat = (
      multiply(add(matrix(Q2_mat), matrix(Q3_mat)), 0.5) as Matrix
    ).toArray() as number[][];
    Q6_mat = (
      multiply(add(matrix(Q3_mat), matrix(Q1_mat)), 0.5) as Matrix
    ).toArray() as number[][];

    const naturalStiffnessMatrix = multiply(
      multiply(transpose(matrix(Te)), inPlaneConstitutiveMatrix),
      matrix(Te)
    ) as Matrix;

    // Higher stiffness with respect to hierarchical rotations (KO)
    KO = (
      add(
        add(
          multiply(
            multiply(transpose(matrix(Q4_mat)), naturalStiffnessMatrix),
            matrix(Q4_mat)
          ),
          multiply(
            multiply(transpose(matrix(Q5_mat)), naturalStiffnessMatrix),
            matrix(Q5_mat)
          )
        ),
        multiply(
          multiply(transpose(matrix(Q6_mat)), naturalStiffnessMatrix),
          matrix(Q6_mat)
        )
      ) as Matrix
    ).toArray() as number[][];
    KO = (
      multiply(matrix(KO), (3 / 4) * b0 * volume) as Matrix
    ).toArray() as number[][];

    // Higher stiffness (Kh)
    Kh = (
      multiply(
        multiply(transpose(matrix(T0)), matrix(KO)),
        matrix(T0)
      ) as Matrix
    ).toArray() as number[][];

    // Final membrane stiffness matrix (Km)
    Km = (add(matrix(Kb), matrix(Kh)) as Matrix).toArray() as number[][];

    return Km;
  }
}
