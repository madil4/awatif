import { LayerInPlaneStressProfile, ThroughThicknessPoint } from "./inPlane";
import { LayerTransverseStressProfile } from "./transverse";

export type CltElementScalarField = Map<number, [number, number, number]>;

export type InPlaneFieldComponent =
  | "sigmaX"
  | "sigmaY"
  | "tauXY"
  | "sigma1"
  | "sigma2"
  | "tau12";

export type TransverseFieldComponent = "tauXZ" | "tauYZ" | "tau13" | "tau23";

export function extractInPlaneStressField(
  profilesByElement: Map<number, LayerInPlaneStressProfile[]>,
  layerIndex: number,
  point: ThroughThicknessPoint,
  component: InPlaneFieldComponent,
): CltElementScalarField {
  const field: CltElementScalarField = new Map();

  profilesByElement.forEach((layers, elementIndex) => {
    const layer = layers[layerIndex];
    if (!layer) return;
    const p = layer.points.find((it) => it.point === point);
    if (!p) return;

    const source = component === "sigma1" || component === "sigma2" || component === "tau12"
      ? p.stressLayer
      : p.stressShell;
    const idx = component === "sigmaX" || component === "sigma1"
      ? 0
      : component === "sigmaY" || component === "sigma2"
      ? 1
      : 2;

    const v = source[idx];
    field.set(elementIndex, [v, v, v]);
  });

  return field;
}

export function extractTransverseStressField(
  profilesByElement: Map<number, LayerTransverseStressProfile[]>,
  layerIndex: number,
  point: ThroughThicknessPoint,
  component: TransverseFieldComponent,
): CltElementScalarField {
  const field: CltElementScalarField = new Map();

  profilesByElement.forEach((layers, elementIndex) => {
    const layer = layers[layerIndex];
    if (!layer) return;
    const p = layer.points.find((it) => it.point === point);
    if (!p) return;

    const source = component === "tau13" || component === "tau23" ? p.tauLayer : p.tauShell;
    const idx = component === "tauXZ" || component === "tau13" ? 1 : 0;
    const v = source[idx];
    field.set(elementIndex, [v, v, v]);
  });

  return field;
}

export function getFieldExtrema(field: CltElementScalarField): {
  min: number;
  max: number;
  maxAbs: number;
} {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  field.forEach((values) => {
    values.forEach((v) => {
      if (v < min) min = v;
      if (v > max) max = v;
    });
  });

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { min: 0, max: 0, maxAbs: 0 };
  }

  return { min, max, maxAbs: Math.max(Math.abs(min), Math.abs(max)) };
}
