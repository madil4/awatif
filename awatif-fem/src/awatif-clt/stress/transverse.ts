import { CLTLayup } from "../../data-model";
import {
  computeLaminateESL,
  layerInPlaneQ,
  rotateInPlaneReducedStiffness,
} from "../laminate";

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
  return mode === "coupled"
    ? recoverCoupledTransverseShearProfile(layup, gammaShell)
    : recoverUncoupledTransverseShearProfile(layup, gammaShell);
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
  options?: { mode?: TransverseRecoveryMode },
): Vec2 {
  const mode = options?.mode ?? defaultTransverseRecoveryMode(layup);
  const esl = computeLaminateESL(withShearCouplingMode(layup, mode === "coupled"));
  return mul2x2Vec2(esl.S, gammaShell);
}

function defaultTransverseRecoveryMode(layup: CLTLayup): TransverseRecoveryMode {
  return layup.options.shearCoupling ? "coupled" : "uncoupled";
}

function recoverUncoupledTransverseShearProfile(
  layup: CLTLayup,
  gammaShell: Vec2,
): LayerTransverseStressProfile[] {
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

function recoverCoupledTransverseShearProfile(
  layup: CLTLayup,
  gammaShell: Vec2,
): LayerTransverseStressProfile[] {
  const states = getLayerStates(layup);
  if (!states.length) return [];

  const coupledLayup = withShearCouplingMode(layup, true);
  const esl = computeLaminateESL(coupledLayup);
  const alpha = (esl.alphaDeg ?? 0) * DEG2RAD;

  const tMainToShell: Mat2 = [
    [Math.cos(alpha), -Math.sin(alpha)],
    [Math.sin(alpha), Math.cos(alpha)],
  ];
  const tShellToMain = t2(tMainToShell);

  const qShell = mul2x2Vec2(esl.S, gammaShell);
  const qMain = mul2x2Vec2(tShellToMain, qShell);

  const noGlueAtNarrowSide = !!layup.options.noGlueAtNarrowSide;
  const inMain = states.map((state) => {
    const phi = alpha - state.thetaDeg * DEG2RAD;
    const qMainLayer = rotateInPlaneReducedStiffness(
      layerInPlaneQ(state.layer, noGlueAtNarrowSide),
      phi,
    );
    return {
      ...state,
      q11: qMainLayer[0][0],
      q22: qMainLayer[1][1],
    };
  });

  const shape13 = buildCoupledShearShape(
    inMain.map((state) => ({
      zBot: state.zBot,
      zTop: state.zTop,
      qn: state.q11,
    })),
  );
  const shape23 = buildCoupledShearShape(
    inMain.map((state) => ({
      zBot: state.zBot,
      zTop: state.zTop,
      qn: state.q22,
    })),
  );

  return inMain.map((state) => {
    const zMid = 0.5 * (state.zTop + state.zBot);
    const samples: Array<[ThroughThicknessPoint, number]> = [
      ["top", state.zTop],
      ["mid", zMid],
      ["bottom", state.zBot],
    ];

    const points = samples.map(([point, zGlobal]) => {
      const zLocal = zGlobal - zMid;
      const g1 = shape13.evaluate(zGlobal);
      const g2 = shape23.evaluate(zGlobal);

      const tauMain: Vec2 = [
        scaleWithShape(qMain[0], g1, shape13.R),
        scaleWithShape(qMain[1], g2, shape23.R),
      ];
      const tauShell = mul2x2Vec2(tMainToShell, tauMain);
      const tauLayer = mul2x2Vec2(state.tShellToLayer, tauShell);

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

function getLayerStates(layup: CLTLayup): Array<{
  layer: CLTLayup["layers"][number];
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
      layer,
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

function scaleWithShape(resultant: number, shape: number, R: number): number {
  const eps = 1e-18;
  return Math.abs(R) < eps ? 0 : (resultant / R) * shape;
}

function t2(a: Mat2): Mat2 {
  return [
    [a[0][0], a[1][0]],
    [a[0][1], a[1][1]],
  ];
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

function buildCoupledShearShape(
  layers: Array<{ zBot: number; zTop: number; qn: number }>,
): { R: number; evaluate: (z: number) => number } {
  const ordered = [...layers].sort((a, b) => a.zBot - b.zBot);
  if (!ordered.length) return { R: 0, evaluate: () => 0 };

  const eps = 1e-12;
  let numZn = 0;
  let denZn = 0;
  for (const layer of ordered) {
    numZn += layer.qn * 0.5 * (layer.zTop ** 2 - layer.zBot ** 2);
    denZn += layer.qn * (layer.zTop - layer.zBot);
  }
  const zn = Math.abs(denZn) < eps ? 0 : numZn / denZn;

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

  const evaluate = (zRaw: number): number => {
    const first = segments[0];
    const last = segments[segments.length - 1];
    const z = Math.max(first.zBot, Math.min(last.zTop, zRaw));
    const segment =
      segments.find((it) => z >= it.zBot - eps && z <= it.zTop + eps) ?? last;
    return (
      segment.gAtBot -
      0.5 * segment.qn * ((z - zn) ** 2 - (segment.zBot - zn) ** 2)
    );
  };

  return { R, evaluate };
}
