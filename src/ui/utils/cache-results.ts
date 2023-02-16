import { AnalysisResults, DesignResults } from "../../interfaces";

export function cacheResults(
  connectivities: [number, number][],
  analysisResults: AnalysisResults | undefined,
  designResults: DesignResults | undefined,
  getColor: (value: number, max: number, min: number) => number[]
) {
  const stresses: number[] = [];
  const forces: number[] = [];
  const steels: number[] = [];

  analysisResults?.forEach((result) => {
    stresses.push(result.stress);
    forces.push(result.force);
  });

  designResults?.forEach((result) => {
    steels.push(result.ratio);
  });

  const stressMax = Math.max(...stresses);
  const stressMin = Math.min(...stresses);
  const forceMax = Math.max(...forces);
  const forceMin = Math.min(...forces);
  const steelMax = Math.max(...steels);
  const steelMin = Math.min(...steels);

  const stressColors: number[][] = [];
  connectivities.forEach((_, index) => {
    const color = analysisResults
      ? getColor(analysisResults[index]["stress"], stressMax, stressMin)
      : [1, 1, 1];
    stressColors.push(color);
    stressColors.push(color);
  });

  const forceColors: number[][] = [];
  connectivities.forEach((_, index) => {
    const color = analysisResults
      ? getColor(analysisResults[index]["force"], forceMax, forceMin)
      : [1, 1, 1];
    forceColors.push(color);
    forceColors.push(color);
  });

  const steelColors: number[][] = [];
  connectivities.forEach((_, index) => {
    const color = designResults
      ? getColor(designResults[index]["ratio"], steelMax, steelMin)
      : [1, 1, 1];
    steelColors.push(color);
    steelColors.push(color);
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
    steel: {
      colors: steelColors.flat(),
      max: isFinite(steelMax) ? steelMax : 0,
      min: isFinite(steelMin) ? steelMin : 0,
    },
  };
}
