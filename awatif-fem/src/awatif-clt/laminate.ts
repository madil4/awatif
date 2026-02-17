import { CLTLayup, CLTLayer } from "../data-model";

type Mat2 = number[][];
type Mat3 = number[][];

type LayerState = {
  layer: CLTLayer;
  zTop: number;
  zBot: number;
  qLocal: Mat3;
  qShearLocal: Mat2;
};

export type LaminateESL = {
  t: number;
  A: Mat3;
  B: Mat3;
  D: Mat3;
  S: Mat2;
  rho13?: number;
  rho23?: number;
  alphaDeg?: number;
};

const DEG2RAD = Math.PI / 180;
const laminateEslCache = new WeakMap<CLTLayup, LaminateESL>();

export function computeLaminateESL(layup: CLTLayup): LaminateESL {
  const cached = laminateEslCache.get(layup);
  if (cached) return cached;

  if (!layup.layers.length) throw new Error("CLT layup must contain at least one layer.");

  const options = {
    strictSymmetryForElement: true,
    symmetryTolerance: 1e-6,
    r33: 1,
    r66: 1,
    r77: 1,
    r88: 1,
    ...layup.options,
  };

  const t = layup.layers.reduce((sum, layer) => sum + layer.thickness, 0);
  const states = buildLayerStates(layup.layers, t, options.noGlueAtNarrowSide);

  const A = zeros(3, 3);
  const B = zeros(3, 3);
  const D = zeros(3, 3);

  for (const state of states) {
    const dz = state.zTop - state.zBot;

    addScaled(A, state.qLocal, dz); // Eq. 21

    if (options.shearCoupling) {
      // Eq. 22 and Eq. 20 (with coupling between layers)
      addScaled(B, state.qLocal, 0.5 * (state.zTop ** 2 - state.zBot ** 2));
      addScaled(D, state.qLocal, (state.zTop ** 3 - state.zBot ** 3) / 3);
    } else {
      // Eq. 39 and Eq. 40 (without coupling)
      addScaled(D, state.qLocal, state.layer.thickness ** 3 / 12);
    }
  }

  if (!options.shearCoupling) zeroMatrix(B);

  let S = zeros(2, 2);
  let rho13: number | undefined;
  let rho23: number | undefined;
  let alphaDeg: number | undefined;

  if (options.shearCoupling) {
    // Eq. 29 main stiffness direction used by Eq. 23/27/28.
    const alpha = findMainStiffnessDirection(A);
    alphaDeg = alpha / DEG2RAD;

    const inMain = states.map((state) => {
      const phi = alpha - state.layer.thetaDeg * DEG2RAD;
      const qMain = rotateInPlaneReducedStiffness(layerInPlaneQ(state.layer, options.noGlueAtNarrowSide), phi);
      const qShearMain = rotate2x2(layerShearQ(state.layer), phi);
      return {
        zBot: state.zBot,
        zTop: state.zTop,
        q11: qMain[0][0],
        q22: qMain[1][1],
        q55: qShearMain[0][0],
        q44: qShearMain[1][1],
      };
    });

    rho13 = computeShearCorrection(
      inMain.map((it) => ({ zBot: it.zBot, zTop: it.zTop, qn: it.q11, qs: it.q55 })),
    );
    rho23 = computeShearCorrection(
      inMain.map((it) => ({ zBot: it.zBot, zTop: it.zTop, qn: it.q22, qs: it.q44 })),
    );

    const s55 = rho13 * inMain.reduce((sum, it) => sum + it.q55 * (it.zTop - it.zBot), 0);
    const s44 = rho23 * inMain.reduce((sum, it) => sum + it.q44 * (it.zTop - it.zBot), 0);

    // Eq. 28: transform from main direction back to shell local axes.
    S = rotateMainShearBack([[s55, 0], [0, s44]], alpha);
  } else {
    // Eq. 41 simplified 5/6 method (no shear coupling).
    for (const state of states) {
      addScaled(S, state.qShearLocal, state.zTop - state.zBot);
    }
    scaleInPlace(S, 5 / 6);
  }

  // CLT reduction factors (section 5.1.3): D66, A66, S55, S44
  A[2][2] *= options.r66;
  D[2][2] *= options.r33;
  S[0][0] *= options.r77;
  S[1][1] *= options.r88;

  const esl = { t, A, B, D, S, rho13, rho23, alphaDeg };
  // Layups are expected to be immutable analysis inputs for a run.
  laminateEslCache.set(layup, esl);
  return esl;
}

function buildLayerStates(
  layers: CLTLayer[],
  totalThickness: number,
  noGlueAtNarrowSide: boolean,
): LayerState[] {
  let zTop = totalThickness / 2;
  const states: LayerState[] = [];

  for (const layer of layers) {
    const zBot = zTop - layer.thickness;
    const q = layerInPlaneQ(layer, noGlueAtNarrowSide);
    const qLocal = rotateInPlaneReducedStiffness(q, layer.thetaDeg * DEG2RAD);
    const qShearLocal = rotate2x2(layerShearQ(layer), layer.thetaDeg * DEG2RAD);

    states.push({ layer, zTop, zBot, qLocal, qShearLocal });
    zTop = zBot;
  }

  return states;
}

export function layerInPlaneQ(layer: CLTLayer, noGlueAtNarrowSide: boolean): Mat3 {
  const Ex = layer.Ex;
  const Ey = noGlueAtNarrowSide ? 0 : layer.Ey;
  const nuXY = layer.nuXY;
  const nuYX = Ex === 0 ? 0 : (nuXY * Ey) / Ex;
  const denominator = 1 - nuXY * nuYX;

  const Q11 = Ex / denominator;
  const Q22 = Ey / denominator;
  const Q12 = (nuXY * Ey) / denominator;
  const Q66 = layer.Gxy;

  return [
    [Q11, Q12, 0],
    [Q12, Q22, 0],
    [0, 0, Q66],
  ];
}

function layerShearQ(layer: CLTLayer): Mat2 {
  return [
    [layer.Gxz, 0],
    [0, layer.Gyz],
  ];
}

export function rotateInPlaneReducedStiffness(q: Mat3, theta: number): Mat3 {
  const m = Math.cos(theta);
  const n = Math.sin(theta);

  const Q11 = q[0][0];
  const Q22 = q[1][1];
  const Q12 = q[0][1];
  const Q66 = q[2][2];

  const m2 = m * m;
  const n2 = n * n;
  const m3 = m2 * m;
  const n3 = n2 * n;
  const m4 = m2 * m2;
  const n4 = n2 * n2;

  const Q11b = Q11 * m4 + 2 * (Q12 + 2 * Q66) * m2 * n2 + Q22 * n4;
  const Q22b = Q11 * n4 + 2 * (Q12 + 2 * Q66) * m2 * n2 + Q22 * m4;
  const Q12b = (Q11 + Q22 - 4 * Q66) * m2 * n2 + Q12 * (m4 + n4);
  const Q16b = (Q11 - Q12 - 2 * Q66) * m3 * n - (Q22 - Q12 - 2 * Q66) * m * n3;
  const Q26b = (Q11 - Q12 - 2 * Q66) * m * n3 - (Q22 - Q12 - 2 * Q66) * m3 * n;
  const Q66b = (Q11 + Q22 - 2 * Q12 - 2 * Q66) * m2 * n2 + Q66 * (m4 + n4);

  return [
    [Q11b, Q12b, Q16b],
    [Q12b, Q22b, Q26b],
    [Q16b, Q26b, Q66b],
  ];
}

export function rotate2x2(q: Mat2, theta: number): Mat2 {
  // Eq. 23/24 style rotation matrix.
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const T = [
    [c, s],
    [-s, c],
  ];
  return mm2(mm2(T, q), t2(T));
}

function rotateMainShearBack(sMain: Mat2, alpha: number): Mat2 {
  // Eq. 27/28 back transformation matrix.
  const c = Math.cos(alpha);
  const s = Math.sin(alpha);
  const T = [
    [c, -s],
    [s, c],
  ];
  return mm2(mm2(T, sMain), t2(T));
}

function findMainStiffnessDirection(A: Mat3): number {
  const A11 = A[0][0];
  const A22 = A[1][1];
  const A12 = A[0][1];
  const A66 = A[2][2];
  const A16 = A[0][2];
  const A26 = A[1][2];

  // Common CLT case: laminate axes are aligned with shell axes (A16 ~= A26 ~= 0).
  // Skip global scan when principal direction is directly available.
  const scale = Math.max(
    1,
    Math.abs(A11),
    Math.abs(A22),
    Math.abs(A12),
    Math.abs(A66),
  );
  const couplingTol = 1e-12 * scale;
  if (Math.abs(A16) <= couplingTol && Math.abs(A26) <= couplingTol) {
    return A11 >= A22 ? 0 : Math.PI / 2;
  }

  const valueAt = (alpha: number) => {
    const c = Math.cos(alpha);
    const s = Math.sin(alpha);
    const c2 = c * c;
    const s2 = s * s;
    const c3 = c2 * c;
    const s3 = s2 * s;
    const c4 = c2 * c2;
    const s4 = s2 * s2;
    return (
      c4 * A11 +
      s4 * A22 +
      c2 * s2 * (2 * A12 + 4 * A66) +
      4 * c3 * s * A16 +
      4 * c * s3 * A26
    );
  };

  let bestAlpha = 0;
  let bestValue = Number.NEGATIVE_INFINITY;

  // Global scan over [0, pi): robust for general laminates.
  const coarseStep = Math.PI / 7200; // 0.025 degree
  for (let alpha = 0; alpha < Math.PI; alpha += coarseStep) {
    const val = valueAt(alpha);
    if (val > bestValue) {
      bestValue = val;
      bestAlpha = alpha;
    }
  }

  return bestAlpha;
}

function computeShearCorrection(
  layers: Array<{ zBot: number; zTop: number; qn: number; qs: number }>,
): number {
  const ordered = [...layers].sort((a, b) => a.zBot - b.zBot);
  const eps = 1e-12;

  let numZn = 0;
  let denZn = 0;
  for (const layer of ordered) {
    numZn += layer.qn * 0.5 * (layer.zTop ** 2 - layer.zBot ** 2);
    denZn += layer.qn * (layer.zTop - layer.zBot);
  }
  const zn = denZn === 0 ? 0 : numZn / denZn; // Eq. 34

  let R = 0;
  for (const layer of ordered) {
    R += layer.qn * ((layer.zTop - zn) ** 3 - (layer.zBot - zn) ** 3) / 3; // Eq. 33
  }

  let d = 0;
  let denomIntegral = 0;
  let gAtBot = 0;

  for (const layer of ordered) {
    const { zBot, zTop, qn, qs } = layer;
    d += qs * (zTop - zBot); // Eq. 36

    const c0 = gAtBot + 0.5 * qn * (zBot - zn) ** 2;
    const a = -0.5 * qn;
    const b = qn * zn;
    const c = c0 - 0.5 * qn * zn ** 2;

    // Integrate (a z^2 + b z + c)^2 / qs on [zBot, zTop]
    const F = (z: number) =>
      (a ** 2) * (z ** 5) / 5 +
      (2 * a * b) * (z ** 4) / 4 +
      (2 * a * c + b ** 2) * (z ** 3) / 3 +
      (2 * b * c) * (z ** 2) / 2 +
      c ** 2 * z;

    denomIntegral += (F(zTop) - F(zBot)) / Math.max(qs, eps);

    const gAtTop = gAtBot - 0.5 * qn * ((zTop - zn) ** 2 - (zBot - zn) ** 2); // Eq. 32
    gAtBot = gAtTop;
  }

  const denom = Math.max(d * denomIntegral, eps);
  return (R * R) / denom; // Eq. 37 / Eq. 38
}

function mm2(a: Mat2, b: Mat2): Mat2 {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

function t2(a: Mat2): Mat2 {
  return [
    [a[0][0], a[1][0]],
    [a[0][1], a[1][1]],
  ];
}

function zeros(r: number, c: number): number[][] {
  return Array.from({ length: r }, () => Array(c).fill(0));
}

function addScaled(target: number[][], source: number[][], scale: number): void {
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < target[0].length; j++) {
      target[i][j] += source[i][j] * scale;
    }
  }
}

function scaleInPlace(target: number[][], scale: number): void {
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < target[0].length; j++) {
      target[i][j] *= scale;
    }
  }
}

function zeroMatrix(target: number[][]): void {
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < target[0].length; j++) {
      target[i][j] = 0;
    }
  }
}
