import { CLTLayup } from "../../data-model";
import {
  layerInPlaneQ,
  rotateInPlaneReducedStiffness,
} from "../laminate";

const DEG2RAD = Math.PI / 180;

type Vec3 = [number, number, number];
type Mat3 = number[][];

export type InPlaneRecoveryMode = "coupled" | "uncoupled";
export type ThroughThicknessPoint = "top" | "mid" | "bottom";

export type LayerInPlaneStressPoint = {
  point: ThroughThicknessPoint;
  zGlobal: number;
  zLocal: number;
  strainShell: Vec3;
  stressShell: Vec3;
  strainLayer: Vec3;
  stressLayer: Vec3;
};

export type LayerInPlaneStressProfile = {
  layerIndex: number;
  thetaDeg: number;
  thickness: number;
  zTop: number;
  zBot: number;
  points: LayerInPlaneStressPoint[];
};

export type InPlaneResultants = {
  N: Vec3;
  M: Vec3;
};

export function recoverLaminateInPlaneStressProfile(
  layup: CLTLayup,
  eps0: Vec3,
  kappa: Vec3,
  options?: {
    mode?: InPlaneRecoveryMode;
  },
): LayerInPlaneStressProfile[] {
  const mode = options?.mode ?? defaultInPlaneRecoveryMode(layup);
  const states = getLayerStates(layup);

  return states.map((state) => {
    const zMid = 0.5 * (state.zTop + state.zBot);
    const samples: Array<[ThroughThicknessPoint, number]> = [
      ["top", state.zTop],
      ["mid", zMid],
      ["bottom", state.zBot],
    ];

    const points = samples.map(([point, zGlobal]) => {
      const zLocal = zGlobal - zMid;
      const zForStrain = mode === "coupled" ? zGlobal : zLocal;
      const strainShell = add3(eps0, scale3(kappa, zForStrain));
      const stressShell = mul3x3Vec3(state.qShell, strainShell);
      const strainLayer = strainShellToLayer(strainShell, state.thetaDeg * DEG2RAD);
      const stressLayer = mul3x3Vec3(state.qLayer, strainLayer);

      return {
        point,
        zGlobal,
        zLocal,
        strainShell,
        stressShell,
        strainLayer,
        stressLayer,
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

export function recoverLaminateInPlaneResultants(
  layup: CLTLayup,
  eps0: Vec3,
  kappa: Vec3,
  options?: {
    mode?: InPlaneRecoveryMode;
  },
): InPlaneResultants {
  const mode = options?.mode ?? defaultInPlaneRecoveryMode(layup);
  const states = getLayerStates(layup);
  const N: Vec3 = [0, 0, 0];
  const M: Vec3 = [0, 0, 0];

  for (const state of states) {
    const dz = state.zTop - state.zBot;
    if (mode === "coupled") {
      const z2 = 0.5 * (state.zTop ** 2 - state.zBot ** 2);
      const z3 = (state.zTop ** 3 - state.zBot ** 3) / 3;

      addAssign3(N, scale3(mul3x3Vec3(state.qShell, eps0), dz));
      addAssign3(N, scale3(mul3x3Vec3(state.qShell, kappa), z2));

      addAssign3(M, scale3(mul3x3Vec3(state.qShell, eps0), z2));
      addAssign3(M, scale3(mul3x3Vec3(state.qShell, kappa), z3));
    } else {
      const z3Local = state.thickness ** 3 / 12;
      addAssign3(N, scale3(mul3x3Vec3(state.qShell, eps0), dz));
      addAssign3(M, scale3(mul3x3Vec3(state.qShell, kappa), z3Local));
    }
  }

  return { N, M };
}

function defaultInPlaneRecoveryMode(layup: CLTLayup): InPlaneRecoveryMode {
  return layup.options.shearCoupling ? "coupled" : "uncoupled";
}

function getLayerStates(layup: CLTLayup): Array<{
  layerIndex: number;
  thickness: number;
  thetaDeg: number;
  zTop: number;
  zBot: number;
  qLayer: Mat3;
  qShell: Mat3;
}> {
  if (!layup.layers.length) return [];

  let zTop = layup.layers.reduce((sum, layer) => sum + layer.thickness, 0) / 2;
  const noGlue = layup.options.noGlueAtNarrowSide;

  return layup.layers.map((layer, layerIndex) => {
    const zBot = zTop - layer.thickness;
    const qLayer = layerInPlaneQ(layer, noGlue);
    const qShell = rotateInPlaneReducedStiffness(
      qLayer,
      layer.thetaDeg * DEG2RAD,
    );

    const state = {
      layerIndex,
      thickness: layer.thickness,
      thetaDeg: layer.thetaDeg,
      zTop,
      zBot,
      qLayer,
      qShell,
    };

    zTop = zBot;
    return state;
  });
}

function strainShellToLayer(strainShell: Vec3, thetaRad: number): Vec3 {
  const [epsX, epsY, gammaXY] = strainShell;
  const m = Math.cos(thetaRad);
  const n = Math.sin(thetaRad);
  const m2 = m * m;
  const n2 = n * n;
  const mn = m * n;

  const eps1 = m2 * epsX + n2 * epsY + mn * gammaXY;
  const eps2 = n2 * epsX + m2 * epsY - mn * gammaXY;
  const gamma12 = -2 * mn * epsX + 2 * mn * epsY + (m2 - n2) * gammaXY;

  return [eps1, eps2, gamma12];
}

function mul3x3Vec3(a: Mat3, x: Vec3): Vec3 {
  return [
    a[0][0] * x[0] + a[0][1] * x[1] + a[0][2] * x[2],
    a[1][0] * x[0] + a[1][1] * x[1] + a[1][2] * x[2],
    a[2][0] * x[0] + a[2][1] * x[1] + a[2][2] * x[2],
  ];
}

function add3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale3(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function addAssign3(target: Vec3, add: Vec3): void {
  target[0] += add[0];
  target[1] += add[1];
  target[2] += add[2];
}
