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

export function buildOrthotropicDb(
  Ex: number,
  Ey: number,
  Gxy: number,
  nu_xy: number,
  t: number
): Matrix {
  // reciprocal Poisson
  const nu_yx = (Ey * nu_xy) / Ex;
  const denom = 1 - nu_xy * nu_yx;

  // reduced stiffnesses
  const Q11 = Ex / denom;
  const Q22 = Ey / denom;
  const Q12 = (nu_xy * Ey) / denom;
  const Q66 = Gxy;

  // base Q matrix
  let Q = matrix([
    [Q11, Q12, 0],
    [Q12, Q22, 0],
    [0, 0, Q66],
  ]);

  return multiply(t ** 3 / 12, Q) as Matrix;
}

function getLocalStiffnessMatrixPlate(
  nodes: Node[],
  elementInputs: ElementInputs,
  index: number
): number[][] {
  // Based on thesis: Development of Membrane, Plate and Flat Shell Elements in Java Chapter 4.4
  // https://vtechworks.lib.vt.edu/server/api/core/bitstreams/edb7e2db-eebf-43e9-aa1f-cfca4b8a46e9/content

  const E = elementInputs?.elasticities?.get(index) ?? 0;
  const Eo = elementInputs.elasticitiesOrthogonal?.get(index) ?? 0;
  const nu = elementInputs?.poissonsRatios?.get(index) ?? 0;
  const Gxy = elementInputs.shearModuli?.get(index) ?? 0;
  const thickness = elementInputs?.thicknesses?.get(index) ?? 0;

  let Db: Matrix;
  if (Eo) {
    Db = buildOrthotropicDb(E, Eo, Gxy, nu, thickness);
  } else {
    Db = buildIsoDb(E, nu, thickness);
  }

  // 1) extract coords
  const [x1, y1] = [nodes[0][0], nodes[0][1]];
  const [x2, y2] = [nodes[1][0], nodes[1][1]];
  const [x3, y3] = [nodes[2][0], nodes[2][1]];

  // 3) area factor
  const twoA = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
  const A = 0.5 * Math.abs(twoA);

  // 4) 3 integration points, each with weight=1/3 (over ref triangle area=1/2)
  //    => The factor will be 2A * w in the integral
  const gaussPoints: Array<[number, number, number]> = [
    [0.5, 0.0, 1 / 3],
    [0.0, 0.5, 1 / 3],
    [0.5, 0.5, 1 / 3],
  ];

  // 5) assemble K
  let K = zeros(9, 9) as Matrix;

  for (const [k, e, w] of gaussPoints) {
    // build B at (k,e)
    const B = buildBMatrix(k, e, x1, y1, x2, y2, x3, y3);
    const Bt = transpose(B) as Matrix;

    const factor = 2 * A * w; // "2A" because the reference triangle has area=1/2

    // B^T * Db * B
    const BtDb = multiply(Bt, Db) as Matrix; // (9x3)
    const BtDbB = multiply(BtDb, B) as Matrix; // (9x9)
    const stiffPart = multiply(factor, BtDbB) as Matrix;
    K = add(K, stiffPart) as Matrix;
  }

  // 6) return as a 2D array
  return expandStiffnessMatrix(K.toArray() as number[][]);

  // Utils
  function buildEdgeCoeffs(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) {
    // side vectors
    const x12 = x1 - x2,
      y12 = y1 - y2;
    const x23 = x2 - x3,
      y23 = y2 - y3;
    const x31 = x3 - x1,
      y31 = y3 - y1;

    // squared lengths
    const l12 = x12 * x12 + y12 * y12;
    const l23 = x23 * x23 + y23 * y23;
    const l31 = x31 * x31 + y31 * y31;

    // P4..P6, q4..q6, r4..r6, t4..t6
    const P4 = (-6 * x23) / l23;
    const P5 = (-6 * x31) / l31;
    const P6 = (-6 * x12) / l12;

    const q4 = (3 * x23 * y23) / l23;
    const q5 = (3 * x31 * y31) / l31;
    const q6 = (3 * x12 * y12) / l12;

    const r4 = (3 * (y23 * y23)) / l23;
    const r5 = (3 * (y31 * y31)) / l31;
    const r6 = (3 * (y12 * y12)) / l12;

    const t4 = (-6 * y23) / l23;
    const t5 = (-6 * y31) / l31;
    const t6 = (-6 * y12) / l12;

    return {
      x12,
      y12,
      x23,
      y23,
      x31,
      y31,
      l12,
      l23,
      l31,
      P4,
      P5,
      P6,
      q4,
      q5,
      q6,
      r4,
      r5,
      r6,
      t4,
      t5,
      t6,
    };
  }

  function buildHxk(
    k: number,
    e: number,
    ec: ReturnType<typeof buildEdgeCoeffs>
  ): number[] {
    const { P5, P6, q5, q6, r5, r6 } = ec;
    // directly transcribe from snippet
    // Hxk(9 entries):
    return [
      P6 * (1 - 2 * k) + (P5 - P6) * e,
      q6 * (1 - 2 * k) - (q5 + q6) * e,
      -4 + 6 * (k + e) + r6 * (1 - 2 * k) - e * (r5 + r6),
      -P6 * (1 - 2 * k) + e * (ec.P4 + P6),
      q6 * (1 - 2 * k) - e * (q6 - ec.q4),
      -2 + 6 * k + r6 * (1 - 2 * k) + e * (ec.r4 - r6),
      -e * (P5 + ec.P4),
      e * (ec.q4 - q5),
      -e * (r5 - ec.r4),
    ];
  }

  function buildHyk(
    k: number,
    e: number,
    ec: ReturnType<typeof buildEdgeCoeffs>
  ): number[] {
    const { t5, t6, r5, r6, q5, q6 } = ec;
    return [
      t6 * (1 - 2 * k) + e * (t5 - t6),
      1 + r6 * (1 - 2 * k) - e * (r5 + r6),
      -q6 * (1 - 2 * k) + e * (q5 + q6),
      -t6 * (1 - 2 * k) + e * (ec.t4 + t6),
      -1 + r6 * (1 - 2 * k) + e * (ec.r4 - r6),
      -q6 * (1 - 2 * k) - e * (ec.q4 - q6),
      -e * (ec.t4 + t5),
      e * (ec.r4 - r5),
      -e * (ec.q4 - q5),
    ];
  }

  function buildHxe(
    k: number,
    e: number,
    ec: ReturnType<typeof buildEdgeCoeffs>
  ): number[] {
    const { P4, P5, P6, q4, q5, q6, r4, r5, r6 } = ec;
    return [
      -P5 * (1 - 2 * e) - k * (P6 - P5),
      q5 * (1 - 2 * e) - k * (q5 + q6),
      -4 + 6 * (k + e) + r5 * (1 - 2 * e) - k * (r5 + r6),
      k * (P4 + P6),
      k * (q4 - q6),
      -k * (r6 - r4),
      P5 * (1 - 2 * e) - k * (P4 + P5),
      q5 * (1 - 2 * e) + k * (q4 - q5),
      -2 + 6 * e + r5 * (1 - 2 * e) + k * (r4 - r5),
    ];
  }

  function buildHye(
    k: number,
    e: number,
    ec: ReturnType<typeof buildEdgeCoeffs>
  ): number[] {
    const { t4, t5, t6, r4, r5, r6, q4, q5, q6 } = ec;
    return [
      -t5 * (1 - 2 * e) - k * (t6 - t5),
      1 + r5 * (1 - 2 * e) - k * (r5 + r6),
      -q5 * (1 - 2 * e) + k * (q5 + q6),
      k * (t4 + t6),
      k * (r4 - r6),
      -k * (q4 - q6),
      t5 * (1 - 2 * e) - k * (t4 + t5),
      -1 + r5 * (1 - 2 * e) + k * (r4 - r5),
      -q5 * (1 - 2 * e) - k * (q4 - q5),
    ];
  }

  function buildBMatrix(
    k: number,
    e: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): Matrix {
    // 1) signed 2*Area
    const twoA = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);

    // 2) gather edge coefficients (P4..P6, q4..q6, etc.)
    const ec = buildEdgeCoeffs(x1, y1, x2, y2, x3, y3);

    // 3) build partial arrays
    const Hxk = buildHxk(k, e, ec);
    const Hxe = buildHxe(k, e, ec);
    const Hyk = buildHyk(k, e, ec);
    const Hye = buildHye(k, e, ec);

    // 4) geometry pairs
    const { x31, y31, x12, y12 } = ec;

    // 5) assemble B
    let B = zeros(3, 9) as Matrix;

    for (let i = 0; i < 9; i++) {
      // row 0 => kappa_x
      const val0 = (y31 * Hxk[i] + y12 * Hxe[i]) / twoA;
      B.set([0, i], val0);

      // row 1 => kappa_y
      const val1 = (-x31 * Hyk[i] - x12 * Hye[i]) / twoA;
      B.set([1, i], val1);

      // row 2 => kappa_xy
      const val2 =
        (-x31 * Hxk[i] - x12 * Hxe[i] + y31 * Hyk[i] + y12 * Hye[i]) / twoA;
      B.set([2, i], val2);
    }

    return B;
  }

  function buildIsoDb(E: number, nu: number, t: number): Matrix {
    const factor = (E * t ** 3) / (12 * (1 - nu * nu));
    const data = [
      [1, nu, 0],
      [nu, 1, 0],
      [0, 0, (1 - nu) / 2],
    ].map((row) => row.map((val) => val * factor));
    return matrix(data);
  }

  /**
   * Expand the 9x9 DKT stiffness matrix to a full 18x18 matrix with all 6 DOFs per node
   * @param {Array<Array<number>>} K9 - The 9x9 DKT stiffness matrix
   * @returns {Array<Array<number>>} The expanded 18x18 stiffness matrix
   */
  function expandStiffnessMatrix(K9) {
    // Initialize 18x18 matrix with zeros
    const K18 = Array(18)
      .fill(0)
      .map(() => Array(18).fill(0));

    // Mapping from 9x9 to 18x18
    // Original DOF order: [Node1-DZ, Node1-DRX, Node1-DRY, Node2-DZ, Node2-DRX, Node2-DRY, Node3-DZ, Node3-DRX, Node3-DRY]
    // New DOF order: [Node1-DX, Node1-DY, Node1-DZ, Node1-DRX, Node1-DRY, Node1-DRZ,
    //                 Node2-DX, Node2-DY, Node2-DZ, Node2-DRX, Node2-DRY, Node2-DRZ,
    //                 Node3-DX, Node3-DY, Node3-DZ, Node3-DRX, Node3-DRY, Node3-DRZ]

    // Create mapping from old indices to new indices
    const mapping = [
      2, // Node1-DZ  -> index 2
      3, // Node1-DRX -> index 3
      4, // Node1-DRY -> index 4
      8, // Node2-DZ  -> index 8
      9, // Node2-DRX -> index 9
      10, // Node2-DRY -> index 10
      14, // Node3-DZ  -> index 14
      15, // Node3-DRX -> index 15
      16, // Node3-DRY -> index 16
    ];

    // Copy values from K9 to K18 using the mapping
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        K18[mapping[i]][mapping[j]] = K9[i][j];
      }
    }

    return K18;
  }
}
