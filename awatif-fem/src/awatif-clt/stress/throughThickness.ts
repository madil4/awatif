import {
  LayerInPlaneStressProfile,
  ThroughThicknessPoint,
} from "./inPlane";
import { LayerTransverseStressProfile } from "./transverse";

export type InPlaneThroughThicknessComponent =
  | "sigmaX"
  | "sigmaY"
  | "tauXY"
  | "sigma1"
  | "sigma2"
  | "tau12";

export type TransverseThroughThicknessComponent =
  | "tauXZ"
  | "tauYZ"
  | "tau13"
  | "tau23";

export type ThroughThicknessSample = {
  layerIndex: number;
  point: ThroughThicknessPoint;
  zGlobal: number;
  value: number;
};

export type ThroughThicknessExtrema = {
  min: number;
  max: number;
  maxAbs: number;
  zAtMin?: number;
  zAtMax?: number;
  zAtMaxAbs?: number;
};

const Z_TOLERANCE = 1e-12;

export function sampleInPlaneThroughThickness(
  profile: LayerInPlaneStressProfile[],
  component: InPlaneThroughThicknessComponent,
  options?: { includeInterfaceDuplicates?: boolean },
): ThroughThicknessSample[] {
  const samples: ThroughThicknessSample[] = [];

  profile.forEach((layer) => {
    layer.points.forEach((point) => {
      const source =
        component === "sigma1" || component === "sigma2" || component === "tau12"
          ? point.stressLayer
          : point.stressShell;

      const index =
        component === "sigmaX" || component === "sigma1"
          ? 0
          : component === "sigmaY" || component === "sigma2"
          ? 1
          : 2;

      samples.push({
        layerIndex: layer.layerIndex,
        point: point.point,
        zGlobal: point.zGlobal,
        value: source[index],
      });
    });
  });

  return maybeDeduplicateInterfaces(samples, options?.includeInterfaceDuplicates ?? true);
}

export function sampleTransverseThroughThickness(
  profile: LayerTransverseStressProfile[],
  component: TransverseThroughThicknessComponent,
  options?: { includeInterfaceDuplicates?: boolean },
): ThroughThicknessSample[] {
  const samples: ThroughThicknessSample[] = [];

  profile.forEach((layer) => {
    layer.points.forEach((point) => {
      const source =
        component === "tau13" || component === "tau23"
          ? point.tauLayer
          : point.tauShell;
      // Shell/layer transverse component extraction follows physical labels:
      // tauXZ/tau13 -> vector index 1, tauYZ/tau23 -> vector index 0.
      const index = component === "tauXZ" || component === "tau13" ? 1 : 0;

      samples.push({
        layerIndex: layer.layerIndex,
        point: point.point,
        zGlobal: point.zGlobal,
        value: source[index],
      });
    });
  });

  return maybeDeduplicateInterfaces(samples, options?.includeInterfaceDuplicates ?? true);
}

export function getThroughThicknessExtrema(
  samples: ThroughThicknessSample[],
): ThroughThicknessExtrema {
  if (!samples.length) {
    return { min: 0, max: 0, maxAbs: 0 };
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  let zAtMin: number | undefined;
  let zAtMax: number | undefined;

  samples.forEach((sample) => {
    if (sample.value < min) {
      min = sample.value;
      zAtMin = sample.zGlobal;
    }
    if (sample.value > max) {
      max = sample.value;
      zAtMax = sample.zGlobal;
    }
  });

  const maxAbs = Math.max(Math.abs(min), Math.abs(max));
  const zAtMaxAbs =
    Math.abs(min) >= Math.abs(max)
      ? zAtMin
      : zAtMax;

  return { min, max, maxAbs, zAtMin, zAtMax, zAtMaxAbs };
}

function maybeDeduplicateInterfaces(
  samples: ThroughThicknessSample[],
  includeInterfaceDuplicates: boolean,
): ThroughThicknessSample[] {
  if (includeInterfaceDuplicates) return samples;

  const deduplicated: ThroughThicknessSample[] = [];
  let lastZ = Number.NaN;

  samples.forEach((sample) => {
    if (
      Number.isFinite(lastZ) &&
      Math.abs(sample.zGlobal - lastZ) <= Z_TOLERANCE
    ) {
      return;
    }

    deduplicated.push(sample);
    lastZ = sample.zGlobal;
  });

  return deduplicated;
}
