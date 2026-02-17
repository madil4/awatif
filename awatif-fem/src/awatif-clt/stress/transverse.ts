import { CLTLayup } from "../../data-model";
import { computeLaminateESL } from "../laminate";

const DEG2RAD = Math.PI / 180;

type Vec2 = [number, number];
type Mat2 = number[][];

export type TransverseRecoveryMode = "coupled" | "uncoupled";
export type ThroughThicknessPoint = "top" | "mid" | "bottom";

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

export function recoverLaminateTransverseShearProfile(
  layup: CLTLayup,
  gammaShell: Vec2,
  options?: { mode?: TransverseRecoveryMode },
): LayerTransverseStressProfile[] {
  const mode = options?.mode ?? defaultTransverseRecoveryMode(layup);
  if (mode === "coupled") {
    throw new Error(
      "Coupled transverse shear stress recovery is not implemented yet. Use mode='uncoupled' for Eq. 47 behavior.",
    );
  }

  const states = getLayerStates(layup);

  return states.map((state) => {
    const zMid = 0.5 * (state.zTop + state.zBot);
    const samples: Array<[ThroughThicknessPoint, number]> = [
      ["top", state.zTop],
      ["mid", zMid],
      ["bottom", state.zBot],
    ];

    const gammaLayer = mul2x2Vec2(state.tShellToLayer, gammaShell);
    const tauMaxLayer = scale2(mul2x2Vec2(state.qLayer, gammaLayer), 1.5 * (5 / 6));

    const points = samples.map(([point, zGlobal]) => {
      const zLocal = zGlobal - zMid;
      const shape = 1 - (2 * zLocal / state.thickness) ** 2;
      const tauLayer = scale2(tauMaxLayer, Math.max(0, shape));
      const tauShell = mul2x2Vec2(state.tLayerToShell, tauLayer);

      return {
        point,
        zGlobal,
        zLocal,
        tauShell,
        tauLayer,
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
  });
}

export function recoverLaminateTransverseResultantFromProfile(
  profile: LayerTransverseStressProfile[],
): Vec2 {
  const Q: Vec2 = [0, 0];
  for (const layer of profile) {
    const top = layer.points.find((p) => p.point === "top");
    const mid = layer.points.find((p) => p.point === "mid");
    const bot = layer.points.find((p) => p.point === "bottom");
    if (!top || !mid || !bot) continue;

    // Simpson integration across one layer thickness.
    const dz = layer.thickness;
    Q[0] += (dz / 6) * (top.tauShell[0] + 4 * mid.tauShell[0] + bot.tauShell[0]);
    Q[1] += (dz / 6) * (top.tauShell[1] + 4 * mid.tauShell[1] + bot.tauShell[1]);
  }
  return Q;
}

export function recoverLaminateTransverseResultantFromConstitutive(
  layup: CLTLayup,
  gammaShell: Vec2,
): Vec2 {
  const esl = computeLaminateESL({
    ...layup,
    options: { ...layup.options, shearCoupling: false },
  });
  return mul2x2Vec2(esl.S, gammaShell);
}

function defaultTransverseRecoveryMode(layup: CLTLayup): TransverseRecoveryMode {
  return layup.options.shearCoupling ? "coupled" : "uncoupled";
}

function getLayerStates(layup: CLTLayup): Array<{
  layerIndex: number;
  thickness: number;
  thetaDeg: number;
  zTop: number;
  zBot: number;
  qLayer: Mat2;
  tLayerToShell: Mat2;
  tShellToLayer: Mat2;
}> {
  let zTop = layup.layers.reduce((sum, layer) => sum + layer.thickness, 0) / 2;

  return layup.layers.map((layer, layerIndex) => {
    const zBot = zTop - layer.thickness;
    const qLayer: Mat2 = [
      [layer.Gxz, 0],
      [0, layer.Gyz],
    ];
    const theta = layer.thetaDeg * DEG2RAD;
    const tLayerToShell = [
      [Math.cos(theta), Math.sin(theta)],
      [-Math.sin(theta), Math.cos(theta)],
    ] as Mat2;
    const tShellToLayer = t2(tLayerToShell);

    const state = {
      layerIndex,
      thickness: layer.thickness,
      thetaDeg: layer.thetaDeg,
      zTop,
      zBot,
      qLayer,
      tLayerToShell,
      tShellToLayer,
    };
    zTop = zBot;
    return state;
  });
}

function mul2x2Vec2(a: Mat2, x: Vec2): Vec2 {
  return [
    a[0][0] * x[0] + a[0][1] * x[1],
    a[1][0] * x[0] + a[1][1] * x[1],
  ];
}

function scale2(v: Vec2, s: number): Vec2 {
  return [v[0] * s, v[1] * s];
}

function t2(a: Mat2): Mat2 {
  return [
    [a[0][0], a[1][0]],
    [a[0][1], a[1][1]],
  ];
}
