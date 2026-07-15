import type { Mesh } from "../../../data-model";

type DenseMatrix = number[][];
type Vector3 = number[];
type ShellNodes = Mesh["nodes"]["val"];

export type ShellAxes = {
  localX: Vector3;
  localY: Vector3;
  localZ: Vector3;
};

type ShellMaterial = {
  elasticity: number;
  poissonRatio: number;
  thickness: number;
};

const shellDofCount = 18;
const degeneracyTolerance = 64 * Number.EPSILON;

type Point2 = readonly [number, number];

type LocalGeometry = Readonly<{
  axes: ShellAxes;
  points: readonly [Point2, Point2, Point2];
  area: number;
  derivatives: readonly [number[], number[]];
}>;

function zeroMatrix(rows: number, columns = rows): DenseMatrix {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function subtract(a: Vector3, b: Vector3): Vector3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function dot(a: readonly number[], b: readonly number[]): number {
  let value = 0;
  for (let index = 0; index < a.length; index++) value += a[index] * b[index];
  return value;
}

function cross(a: Vector3, b: Vector3): Vector3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm(vector: Vector3): number {
  return Math.hypot(vector[0], vector[1], vector[2]);
}

function scale(vector: Vector3, factor: number): Vector3 {
  return [vector[0] * factor, vector[1] * factor, vector[2] * factor];
}

function finiteNodes(nodes: ShellNodes): boolean {
  return nodes.every((node) => node.every(Number.isFinite));
}

function localGeometry(nodes: ShellNodes): LocalGeometry | null {
  if (nodes.length !== 3 || !finiteNodes(nodes)) return null;

  const edge12 = subtract(nodes[1], nodes[0]);
  const edge13 = subtract(nodes[2], nodes[0]);
  const edge23 = subtract(nodes[2], nodes[1]);
  const length12 = norm(edge12);
  const length13 = norm(edge13);
  const length23 = norm(edge23);
  const lengthScale = Math.max(length12, length13, length23);
  if (
    !(lengthScale > 0) ||
    length12 <= degeneracyTolerance * lengthScale
  ) {
    return null;
  }

  const areaVector = cross(edge12, edge13);
  const twiceArea = norm(areaVector);
  if (twiceArea <= degeneracyTolerance * lengthScale * lengthScale) return null;

  const localX = scale(edge12, 1 / length12);
  const localZ = scale(areaVector, 1 / twiceArea);
  const localY = cross(localZ, localX);
  const axes: ShellAxes = { localX, localY, localZ };
  const points = [
    [0, 0],
    [length12, 0],
    [dot(localX, edge13), dot(localY, edge13)],
  ] as const;

  const twiceSignedArea =
    (points[1][0] - points[0][0]) * (points[2][1] - points[0][1]) -
    (points[2][0] - points[0][0]) * (points[1][1] - points[0][1]);
  if (!(twiceSignedArea > 0)) return null;
  const area = twiceSignedArea / 2;

  const dNdx = [
    (points[1][1] - points[2][1]) / twiceSignedArea,
    (points[2][1] - points[0][1]) / twiceSignedArea,
    (points[0][1] - points[1][1]) / twiceSignedArea,
  ];
  const dNdy = [
    (points[2][0] - points[1][0]) / twiceSignedArea,
    (points[0][0] - points[2][0]) / twiceSignedArea,
    (points[1][0] - points[0][0]) / twiceSignedArea,
  ];

  return { axes, points, area, derivatives: [dNdx, dNdy] };
}

export function getShellLocalAxes(nodes: ShellNodes): ShellAxes | null {
  return localGeometry(nodes)?.axes ?? null;
}

export function getShellTransformationMatrix(nodes: ShellNodes): DenseMatrix {
  const geometry = localGeometry(nodes);
  const transformation = zeroMatrix(shellDofCount);
  if (!geometry) return transformation;

  const basis = [
    geometry.axes.localX,
    geometry.axes.localY,
    geometry.axes.localZ,
  ];
  for (let block = 0; block < 6; block++) {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        transformation[block * 3 + row][block * 3 + column] =
          basis[row][column];
      }
    }
  }
  return transformation;
}

function validMaterial(material: ShellMaterial): boolean {
  return (
    Number.isFinite(material.elasticity) &&
    Number.isFinite(material.poissonRatio) &&
    Number.isFinite(material.thickness) &&
    material.elasticity > 0 &&
    material.thickness > 0 &&
    material.poissonRatio > -1 &&
    material.poissonRatio < 0.5
  );
}

function addBtDB(
  stiffness: DenseMatrix,
  strainDisplacement: DenseMatrix,
  constitutive: DenseMatrix,
  factor: number,
): void {
  const strainCount = strainDisplacement.length;
  const dofCount = strainDisplacement[0].length;
  for (let row = 0; row < dofCount; row++) {
    for (let column = row; column < dofCount; column++) {
      let value = 0;
      for (let alpha = 0; alpha < strainCount; alpha++) {
        for (let beta = 0; beta < strainCount; beta++) {
          value +=
            strainDisplacement[alpha][row] *
            constitutive[alpha][beta] *
            strainDisplacement[beta][column];
        }
      }
      stiffness[row][column] += factor * value;
      if (row !== column) stiffness[column][row] += factor * value;
    }
  }
}

function transposeMatrix(matrix: DenseMatrix): DenseMatrix {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

function multiplyMatrices(left: DenseMatrix, right: DenseMatrix): DenseMatrix {
  const rightTranspose = transposeMatrix(right);
  return left.map((row) =>
    rightTranspose.map((column) => dot(row, column)),
  );
}

function scaledMatrix(matrix: DenseMatrix, factor: number): DenseMatrix {
  return matrix.map((row) => row.map((value) => factor * value));
}

function addScaledMatrix(
  target: DenseMatrix,
  source: DenseMatrix,
  factor = 1,
): void {
  for (let row = 0; row < target.length; row++) {
    for (let column = 0; column < target[row].length; column++) {
      target[row][column] += factor * source[row][column];
    }
  }
}

function averageMatrices(left: DenseMatrix, right: DenseMatrix): DenseMatrix {
  return left.map((row, rowIndex) =>
    row.map((value, column) => (value + right[rowIndex][column]) / 2),
  );
}

function membraneStiffness(
  geometry: LocalGeometry,
  material: ShellMaterial,
): DenseMatrix {
  const { area, points } = geometry;
  const thickness = material.thickness;
  const factor = material.elasticity / (1 - material.poissonRatio ** 2);
  const hooke = [
    [factor, factor * material.poissonRatio, 0],
    [factor * material.poissonRatio, factor, 0],
    [0, 0, (factor * (1 - material.poissonRatio)) / 2],
  ];
  const x = (first: number, second: number): number =>
    points[first][0] - points[second][0];
  const y = (first: number, second: number): number =>
    points[first][1] - points[second][1];
  const lengthSquared = (first: number, second: number): number =>
    x(first, second) ** 2 + y(first, second) ** 2;

  const alpha = 1 / 8;
  const lumping = scaledMatrix(
    [
      [y(1, 2), 0, x(2, 1)],
      [0, x(2, 1), y(1, 2)],
      [
        (alpha / 6) * y(1, 2) * (y(0, 2) - y(1, 0)),
        (alpha / 6) * x(2, 1) * (x(2, 0) - x(0, 1)),
        (alpha / 3) * (x(2, 0) * y(0, 2) - x(0, 1) * y(1, 0)),
      ],
      [y(2, 0), 0, x(0, 2)],
      [0, x(0, 2), y(2, 0)],
      [
        (alpha / 6) * y(2, 0) * (y(1, 0) - y(2, 1)),
        (alpha / 6) * x(0, 2) * (x(0, 1) - x(1, 2)),
        (alpha / 3) * (x(0, 1) * y(1, 0) - x(1, 2) * y(2, 1)),
      ],
      [y(0, 1), 0, x(1, 0)],
      [0, x(1, 0), y(0, 1)],
      [
        (alpha / 6) * y(0, 1) * (y(2, 1) - y(0, 2)),
        (alpha / 6) * x(1, 0) * (x(1, 2) - x(2, 0)),
        (alpha / 3) * (x(1, 2) * y(2, 1) - x(2, 0) * y(0, 2)),
      ],
    ],
    thickness / 2,
  );
  const basic = scaledMatrix(
    multiplyMatrices(
      multiplyMatrices(lumping, hooke),
      transposeMatrix(lumping),
    ),
    1 / (area * thickness),
  );

  const hierarchicalRotation = scaledMatrix(
    [
      [x(2, 1), y(2, 1), 4 * area, x(0, 2), y(0, 2), 0, x(1, 0), y(1, 0), 0],
      [x(2, 1), y(2, 1), 0, x(0, 2), y(0, 2), 4 * area, x(1, 0), y(1, 0), 0],
      [x(2, 1), y(2, 1), 0, x(0, 2), y(0, 2), 0, x(1, 0), y(1, 0), 4 * area],
    ],
    1 / (4 * area),
  );

  const l21 = lengthSquared(1, 0);
  const l32 = lengthSquared(2, 1);
  const l13 = lengthSquared(0, 2);
  const naturalRows = [
    [
      y(1, 2) * y(0, 2) * l21,
      x(1, 2) * x(0, 2) * l21,
      (y(1, 2) * x(2, 0) + x(2, 1) * y(0, 2)) * l21,
    ],
    [
      y(2, 0) * y(1, 0) * l32,
      x(2, 0) * x(1, 0) * l32,
      (y(2, 0) * x(0, 1) + x(0, 2) * y(1, 0)) * l32,
    ],
    [
      y(0, 1) * y(2, 1) * l13,
      x(0, 1) * x(2, 1) * l13,
      (y(0, 1) * x(1, 2) + x(1, 0) * y(2, 1)) * l13,
    ],
  ];
  const naturalTransformation = scaledMatrix(
    transposeMatrix(naturalRows),
    1 / (4 * area ** 2),
  );
  const naturalHooke = multiplyMatrices(
    multiplyMatrices(transposeMatrix(naturalTransformation), hooke),
    naturalTransformation,
  );

  const beta = [1, 2, 1, 0, 1, -1, -1, -1, -2] as const;
  const qFactor = (2 * area) / 3;
  const q1 = scaledMatrix(
    [
      [beta[0] / l21, beta[1] / l21, beta[2] / l21],
      [beta[3] / l32, beta[4] / l32, beta[5] / l32],
      [beta[6] / l13, beta[7] / l13, beta[8] / l13],
    ],
    qFactor,
  );
  const q2 = scaledMatrix(
    [
      [beta[8] / l21, beta[6] / l21, beta[7] / l21],
      [beta[2] / l32, beta[0] / l32, beta[1] / l32],
      [beta[5] / l13, beta[3] / l13, beta[4] / l13],
    ],
    qFactor,
  );
  const q3 = scaledMatrix(
    [
      [beta[4] / l21, beta[5] / l21, beta[3] / l21],
      [beta[7] / l32, beta[8] / l32, beta[6] / l32],
      [beta[1] / l13, beta[2] / l13, beta[0] / l13],
    ],
    qFactor,
  );
  const naturalModes = [
    averageMatrices(q1, q2),
    averageMatrices(q2, q3),
    averageMatrices(q1, q3),
  ];
  const rotationStiffness = zeroMatrix(3);
  for (const naturalMode of naturalModes) {
    addScaledMatrix(
      rotationStiffness,
      multiplyMatrices(
        multiplyMatrices(transposeMatrix(naturalMode), naturalHooke),
        naturalMode,
      ),
      thickness / 3,
    );
  }

  const beta0 = alpha ** 2 / 4;
  const higher = scaledMatrix(
    multiplyMatrices(
      multiplyMatrices(
        transposeMatrix(hierarchicalRotation),
        rotationStiffness,
      ),
      hierarchicalRotation,
    ),
    beta0 * (9 / 4),
  );
  const stiffness = basic;
  addScaledMatrix(stiffness, higher);
  return stiffness;
}

function subtriangleShearB(
  points: readonly [Point2, Point2, Point2],
  vertexWeights: readonly [number[], number[], number[]],
): DenseMatrix {
  const edgeGaps = zeroMatrix(2, 9);
  for (let edge = 0; edge < 2; edge++) {
    const start = 0;
    const end = edge + 1;
    const dx = points[end][0] - points[start][0];
    const dy = points[end][1] - points[start][1];
    for (let node = 0; node < 3; node++) {
      const startWeight = vertexWeights[start][node];
      const endWeight = vertexWeights[end][node];
      edgeGaps[edge][node * 3] += endWeight - startWeight;
      edgeGaps[edge][node * 3 + 1] -=
        0.5 * dy * (startWeight + endWeight);
      edgeGaps[edge][node * 3 + 2] +=
        0.5 * dx * (startWeight + endWeight);
    }
  }

  const dx1 = points[1][0] - points[0][0];
  const dy1 = points[1][1] - points[0][1];
  const dx2 = points[2][0] - points[0][0];
  const dy2 = points[2][1] - points[0][1];
  const determinant = dx1 * dy2 - dx2 * dy1;
  const shearB = zeroMatrix(2, 9);
  for (let dof = 0; dof < 9; dof++) {
    shearB[0][dof] =
      (dy2 * edgeGaps[0][dof] - dy1 * edgeGaps[1][dof]) / determinant;
    shearB[1][dof] =
      (-dx2 * edgeGaps[0][dof] + dx1 * edgeGaps[1][dof]) / determinant;
  }
  return shearB;
}

function plateStiffness(
  geometry: LocalGeometry,
  material: ShellMaterial,
): DenseMatrix {
  const stiffness = zeroMatrix(9);
  const [dNdx, dNdy] = geometry.derivatives;
  const bendingB = zeroMatrix(3, 9);
  for (let node = 0; node < 3; node++) {
    const offset = node * 3;
    bendingB[0][offset + 2] = dNdx[node];
    bendingB[1][offset + 1] = -dNdy[node];
    bendingB[2][offset + 1] = -dNdx[node];
    bendingB[2][offset + 2] = dNdy[node];
  }

  const factor = material.elasticity / (1 - material.poissonRatio ** 2);
  const bendingConstitutive = [
    [factor, factor * material.poissonRatio, 0],
    [factor * material.poissonRatio, factor, 0],
    [0, 0, (factor * (1 - material.poissonRatio)) / 2],
  ];
  addBtDB(
    stiffness,
    bendingB,
    bendingConstitutive,
    (geometry.area * material.thickness ** 3) / 12,
  );

  const stableMean = (values: number[]): number => {
    values.sort((a, b) => Math.abs(a) - Math.abs(b));
    return (values[0] + values[1] + values[2]) / 3;
  };
  const centroid: Point2 = [
    stableMean(geometry.points.map((point) => point[0])),
    stableMean(geometry.points.map((point) => point[1])),
  ];
  const unitWeights = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const centroidWeights = [1 / 3, 1 / 3, 1 / 3];
  const smoothedShearB = zeroMatrix(2, 9);
  const subtriangleMatrices: DenseMatrix[] = [];
  const subtriangles = [
    [0, 1],
    [1, 2],
    [2, 0],
  ] as const;
  for (const [first, second] of subtriangles) {
    const subtrianglePoints = [
      geometry.points[first],
      geometry.points[second],
      centroid,
    ] as const;
    const subtriangleWeights = [
      unitWeights[first],
      unitWeights[second],
      centroidWeights,
    ] as const;
    subtriangleMatrices.push(
      subtriangleShearB(subtrianglePoints, subtriangleWeights),
    );
  }
  for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 9; column++) {
      const contributions = subtriangleMatrices
        .map((matrix) => matrix[row][column])
        .sort((a, b) => Math.abs(a) - Math.abs(b));
      smoothedShearB[row][column] =
        (contributions[0] + contributions[1] + contributions[2]) / 3;
    }
  }

  const shearModulus =
    material.elasticity / (2 * (1 + material.poissonRatio));
  addBtDB(
    stiffness,
    smoothedShearB,
    [
      [1, 0],
      [0, 1],
    ],
    geometry.area * material.thickness * (5 / 6) * shearModulus,
  );
  return stiffness;
}

function assembleSubmatrix(
  target: DenseMatrix,
  source: DenseMatrix,
  indices: readonly number[],
): void {
  for (let row = 0; row < indices.length; row++) {
    for (let column = 0; column < indices.length; column++) {
      target[indices[row]][indices[column]] += source[row][column];
    }
  }
}

function getShellStiffnessMatrix(
  nodes: ShellNodes,
  material: ShellMaterial,
): DenseMatrix {
  const geometry = localGeometry(nodes);
  if (!geometry || !validMaterial(material)) return zeroMatrix(shellDofCount);

  const stiffness = zeroMatrix(shellDofCount);
  assembleSubmatrix(
    stiffness,
    membraneStiffness(geometry, material),
    [0, 1, 5, 6, 7, 11, 12, 13, 17],
  );
  assembleSubmatrix(
    stiffness,
    plateStiffness(geometry, material),
    [2, 3, 4, 8, 9, 10, 14, 15, 16],
  );
  for (let row = 0; row < shellDofCount; row++) {
    for (let column = row + 1; column < shellDofCount; column++) {
      const symmetric = (stiffness[row][column] + stiffness[column][row]) / 2;
      stiffness[row][column] = symmetric;
      stiffness[column][row] = symmetric;
    }
  }
  return stiffness;
}

export function getShellLocalStiffnessMatrix(
  nodes: ShellNodes,
  elasticity: number,
  poissonRatio: number,
  thickness: number,
): DenseMatrix {
  return getShellStiffnessMatrix(nodes, {
    elasticity,
    poissonRatio,
    thickness,
  });
}
