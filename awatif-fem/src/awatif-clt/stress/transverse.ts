import { CLTLayup } from "../../data-model";
import {
  computeLaminateESL,
  layerInPlaneQ,
  rotateInPlaneReducedStiffness,
} from "../laminate";
import { ThroughThicknessPoint } from "./inPlane";

const DEG2RAD = Math.PI / 180;
const EPS = 1e-12;

type Vec2 = [number, number];
type Mat2 = [[number, number], [number, number]];

export type TransverseRecoveryMode = "coupled" | "uncoupled";

export type LayerTransverseStressPoint = {
  point: ThroughThicknessPoint;
  zGlobal: number;
  zLocal: number;
  tauShell: Vec2;
  tauLayer: Vec2;
};

export type LayerTransverseStressProfile = {
  layerIndex: number;
  thetaDeg: number;
  thickness: number;
  zTop: number;
  zBot: number;
  points: LayerTransverseStressPoint[];
};

type LayerState = {
  layer: CLTLayup["layers"][number];
  layerIndex: number;
  thickness: number;
  thetaDeg: number;
  zTop: number;
  zBot: number;
  qLayer: Mat2;
  tLayerToShell: Mat2;
  tShellToLayer: Mat2;
};

type CoupledShearShape = {
  R: number;
  valueAt: (z: number) => number;
};

export function recoverLaminateTransverseShearProfile(
  layup: CLTLayup,
  gammaShell: Vec2,
  options?: { mode?: TransverseRecoveryMode },
): LayerTransverseStressProfile[] {
  const mode = options?.mode ?? defaultTransverseRecoveryMode(layup);

  return mode === "coupled"
    ? recoverCoupledTransverseShearProfile(layup, gammaShell)
    : recoverUncoupledTransverseShearProfile(layup, gammaShell);
}

export function recoverLaminateTransverseResultantFromProfile(
  profile: LayerTransverseStressProfile[],
): Vec2 {
  const Q: Vec2 = [0, 0];

  for (const layer of profile) {
    const top = getPoint(layer, "top");
    const mid = getPoint(layer, "mid");
    const bot = getPoint(layer, "bottom");
    if (!top || !mid || !bot) continue;

    // Simpson integration on each layer thickness.
    const dz = layer.thickness;
    Q[0] += (dz / 6) * (top.tauShell[0] + 4 * mid.tauShell[0] + bot.tauShell[0]);
    Q[1] += (dz / 6) * (top.tauShell[1] + 4 * mid.tauShell[1] + bot.tauShell[1]);
  }

  return Q;
}

export function recoverLaminateTransverseResultantFromConstitutive(
  layup: CLTLayup,
  gammaShell: Vec2,
  options?: { mode?: TransverseRecoveryMode },
): Vec2 {
  const mode = options?.mode ?? defaultTransverseRecoveryMode(layup);
  const esl = computeLaminateESL(withShearCouplingMode(layup, mode === "coupled"));
  return mul2x2Vec2(esl.S as Mat2, gammaShell);
}

function recoverUncoupledTransverseShearProfile(
  layup: CLTLayup,
  gammaShell: Vec2,
): LayerTransverseStressProfile[] {
  return buildLayerStates(layup).map((state) => {
    const gammaLayer = mul2x2Vec2(state.tShellToLayer, gammaShell);
    // Eq. 47 with parabolic layer profile and peak at layer mid-plane.
    const tauMaxLayer = scale2(mul2x2Vec2(state.qLayer, gammaLayer), 1.5 * (5 / 6));

    return buildLayerProfile(state, (zLocal) => {
      const shape = Math.max(0, 1 - (2 * zLocal / state.thickness) ** 2);
      const tauLayer = scale2(tauMaxLayer, shape);
      return {
        tauLayer,
        tauShell: mul2x2Vec2(state.tLayerToShell, tauLayer),
      };
    });
  });
}

function recoverCoupledTransverseShearProfile(
  layup: CLTLayup,
  gammaShell: Vec2,
): LayerTransverseStressProfile[] {
  const states = buildLayerStates(layup);
  if (!states.length) return [];

  const esl = computeLaminateESL(withShearCouplingMode(layup, true));
  const alpha = (esl.alphaDeg ?? 0) * DEG2RAD;

  const tMainToShell = getMainToShellRotation(alpha);
  const tShellToMain = transpose2(tMainToShell);

  // Q (shell) -> Q (main stiffness direction) for Eq. 45/46.
  const qShell = mul2x2Vec2(esl.S as Mat2, gammaShell);
  const qMain = mul2x2Vec2(tShellToMain, qShell);

  const noGlueAtNarrowSide = !!layup.options.noGlueAtNarrowSide;
  const mainInPlaneLayerStiffness = states.map((state) => {
    const phi = alpha - state.thetaDeg * DEG2RAD;
    const qMainLayer = rotateInPlaneReducedStiffness(
      layerInPlaneQ(state.layer, noGlueAtNarrowSide),
      phi,
    );
    return {
      zBot: state.zBot,
      zTop: state.zTop,
      q11: qMainLayer[0][0],
      q22: qMainLayer[1][1],
    };
  });

  const shape13 = buildCoupledShearShape(
    mainInPlaneLayerStiffness.map((it) => ({ zBot: it.zBot, zTop: it.zTop, qn: it.q11 })),
  );
  const shape23 = buildCoupledShearShape(
    mainInPlaneLayerStiffness.map((it) => ({ zBot: it.zBot, zTop: it.zTop, qn: it.q22 })),
  );

  return states.map((state) =>
    buildLayerProfile(state, (_zLocal, zGlobal) => {
      const tauMain: Vec2 = [
        scaleResultantWithShape(qMain[0], shape13.valueAt(zGlobal), shape13.R),
        scaleResultantWithShape(qMain[1], shape23.valueAt(zGlobal), shape23.R),
      ];
      const tauShell = mul2x2Vec2(tMainToShell, tauMain);
      return {
        tauShell,
        tauLayer: mul2x2Vec2(state.tShellToLayer, tauShell),
      };
    }),
  );
}

function buildLayerProfile(
  state: LayerState,
  evaluate: (zLocal: number, zGlobal: number) => { tauShell: Vec2; tauLayer: Vec2 },
): LayerTransverseStressProfile {
  const zMid = 0.5 * (state.zTop + state.zBot);
  const samples: Array<[ThroughThicknessPoint, number]> = [
    ["top", state.zTop],
    ["mid", zMid],
    ["bottom", state.zBot],
  ];

  const points = samples.map(([point, zGlobal]) => {
    const zLocal = zGlobal - zMid;
    const tau = evaluate(zLocal, zGlobal);
    return {
      point,
      zGlobal,
      zLocal,
      tauShell: tau.tauShell,
      tauLayer: tau.tauLayer,
    };
  });

  return {
    layerIndex: state.layerIndex,
    thetaDeg: state.thetaDeg,
    thickness: state.thickness,
    zTop: state.zTop,
    zBot: state.zBot,
    points,
  };
}

function buildLayerStates(layup: CLTLayup): LayerState[] {
  let zTop = layup.layers.reduce((sum, layer) => sum + layer.thickness, 0) / 2;

  return layup.layers.map((layer, layerIndex) => {
    const zBot = zTop - layer.thickness;
    const theta = layer.thetaDeg * DEG2RAD;

    const qLayer: Mat2 = [
      [layer.Gxz, 0],
      [0, layer.Gyz],
    ];
    const tLayerToShell: Mat2 = [
      [Math.cos(theta), Math.sin(theta)],
      [-Math.sin(theta), Math.cos(theta)],
    ];

    const state: LayerState = {
      layer,
      layerIndex,
      thickness: layer.thickness,
      thetaDeg: layer.thetaDeg,
      zTop,
      zBot,
      qLayer,
      tLayerToShell,
      tShellToLayer: transpose2(tLayerToShell),
    };

    zTop = zBot;
    return state;
  });
}

function buildCoupledShearShape(
  layers: Array<{ zBot: number; zTop: number; qn: number }>,
): CoupledShearShape {
  const ordered = [...layers].sort((a, b) => a.zBot - b.zBot);
  if (!ordered.length) return { R: 0, valueAt: () => 0 };

  // Eq. 34
  let numeratorZn = 0;
  let denominatorZn = 0;
  for (const layer of ordered) {
    numeratorZn += layer.qn * 0.5 * (layer.zTop ** 2 - layer.zBot ** 2);
    denominatorZn += layer.qn * (layer.zTop - layer.zBot);
  }
  const zn = Math.abs(denominatorZn) < EPS ? 0 : numeratorZn / denominatorZn;

  // Eq. 33
  let R = 0;
  for (const layer of ordered) {
    R += layer.qn * ((layer.zTop - zn) ** 3 - (layer.zBot - zn) ** 3) / 3;
  }

  const segments: Array<{
    zBot: number;
    zTop: number;
    qn: number;
    gAtBot: number;
  }> = [];

  // Eq. 32 accumulated piecewise through thickness.
  let gAtBot = 0;
  for (const layer of ordered) {
    segments.push({
      zBot: layer.zBot,
      zTop: layer.zTop,
      qn: layer.qn,
      gAtBot,
    });
    gAtBot -=
      0.5 * layer.qn * ((layer.zTop - zn) ** 2 - (layer.zBot - zn) ** 2);
  }

  return {
    R,
    valueAt: (zRaw: number) => {
      const z = clamp(zRaw, segments[0].zBot, segments[segments.length - 1].zTop);
      const segment = findSegmentForZ(segments, z);
      return (
        segment.gAtBot -
        0.5 * segment.qn * ((z - zn) ** 2 - (segment.zBot - zn) ** 2)
      );
    },
  };
}

function defaultTransverseRecoveryMode(layup: CLTLayup): TransverseRecoveryMode {
  return layup.options.shearCoupling ? "coupled" : "uncoupled";
}

function withShearCouplingMode(layup: CLTLayup, shearCoupling: boolean): CLTLayup {
  if (layup.options.shearCoupling === shearCoupling) return layup;
  return {
    ...layup,
    options: {
      ...layup.options,
      shearCoupling,
    },
  };
}

function findSegmentForZ(
  segments: Array<{ zBot: number; zTop: number; qn: number; gAtBot: number }>,
  z: number,
): { zBot: number; zTop: number; qn: number; gAtBot: number } {
  for (const segment of segments) {
    if (z <= segment.zTop + EPS) return segment;
  }
  return segments[segments.length - 1];
}

function getPoint(
  layer: LayerTransverseStressProfile,
  point: ThroughThicknessPoint,
): LayerTransverseStressPoint | undefined {
  return layer.points.find((p) => p.point === point);
}

function getMainToShellRotation(alpha: number): Mat2 {
  return [
    [Math.cos(alpha), -Math.sin(alpha)],
    [Math.sin(alpha), Math.cos(alpha)],
  ];
}

function mul2x2Vec2(a: Mat2, x: Vec2): Vec2 {
  return [
    a[0][0] * x[0] + a[0][1] * x[1],
    a[1][0] * x[0] + a[1][1] * x[1],
  ];
}

function scale2(v: Vec2, scale: number): Vec2 {
  return [v[0] * scale, v[1] * scale];
}

function scaleResultantWithShape(resultant: number, shape: number, R: number): number {
  return Math.abs(R) < 1e-18 ? 0 : (resultant / R) * shape;
}

function transpose2(a: Mat2): Mat2 {
  return [
    [a[0][0], a[1][0]],
    [a[0][1], a[1][1]],
  ];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
