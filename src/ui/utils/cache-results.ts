import { AnalysisResults, DesignResults } from "../../interfaces";

export function cacheResults(
  connectivities: [number, number][],
  analysisResults: AnalysisResults | undefined,
  designResults: DesignResults | undefined,
  getColor: (value: number, max: number, min: number) => number[]
) {
  const stresses: Map<number, number> = new Map();
  const forces: Map<number, number> = new Map();
  const steels: Map<number, number> = new Map();
  const deformations: Map<number, number[][]> = new Map();

  analysisResults?.forEach((result) => {
    stresses.set(result.element, result.stress);
    forces.set(result.element, result.force);
    deformations.set(result.element, result.deformation);
  });

  designResults?.forEach((result) => {
    steels.set(result.element, result.ratio);
  });

  const stressMax = Math.max(...stresses.values());
  const stressMin = Math.min(...stresses.values());
  const forceMax = Math.max(...forces.values());
  const forceMin = Math.min(...forces.values());
  const steelMax = Math.max(...steels.values());
  const steelMin = Math.min(...steels.values());

  const defList = [...deformations.values()].flat();
  const defX = defList.map((x) => x[0]);
  const defY = defList.map((x) => x[1]);
  const defXMax = Math.max(...defX);
  const defXMin = Math.min(...defX);
  const defYMax = Math.max(...defY);
  const defYMin = Math.min(...defY);

  const stressColors: number[][] = [];
  const forceColors: number[][] = [];
  const steelColors: number[][] = [];
  const deformationXColors: number[][] = [];
  const deformationYColors: number[][] = [];
  connectivities.forEach((_, index) => {
    let color = getColor(stresses.get(index) ?? 0, stressMax, stressMin);
    stressColors.push(color);
    stressColors.push(color);

    color = getColor(forces.get(index) ?? 0, forceMax, forceMin);
    forceColors.push(color);
    forceColors.push(color);

    color = getColor(steels.get(index) ?? 0, steelMax, steelMin);
    steelColors.push(color);
    steelColors.push(color);

    const value = deformations.get(index) ?? [
      [0, 0, 0],
      [0, 0, 0],
    ];
    deformationXColors.push(getColor(value[0][0], defXMax, defXMin));
    deformationXColors.push(getColor(value[1][0], defXMax, defXMin));
    deformationYColors.push(getColor(value[0][1], defYMax, defYMin));
    deformationYColors.push(getColor(value[1][1], defYMax, defYMin));
  });

  return {
    stress: {
      colors: stressColors.flat(),
      max: isFinite(stressMax) ? stressMax : 0,
      min: isFinite(stressMin) ? stressMin : 0,
    },
    force: {
      colors: forceColors.flat(),
      max: isFinite(forceMax) ? forceMax : 0,
      min: isFinite(forceMin) ? forceMin : 0,
    },
    deformationX: {
      colors: deformationXColors.flat(),
      max: isFinite(defXMax) ? defXMax : 0,
      min: isFinite(defXMin) ? defXMin : 0,
    },
    deformationY: {
      colors: deformationYColors.flat(),
      max: isFinite(defYMax) ? defYMax : 0,
      min: isFinite(defYMin) ? defYMin : 0,
    },
    steel: {
      colors: steelColors.flat(),
      max: isFinite(steelMax) ? steelMax : 0,
      min: isFinite(steelMin) ? steelMin : 0,
    },
  };
}
