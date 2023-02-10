import { AnalysisResults } from "../../interfaces";

export function cacheResults(
  connectivities: [number, number][],
  analysisResults: AnalysisResults | undefined,
  getColor: (value: number, max: number, min: number) => number[]
) {
  if (!analysisResults) return;

  const stresses: number[] = [];
  const forces: number[] = [];

  Object.keys(analysisResults).forEach((key) => {
    stresses.push(analysisResults[key].stress);
    forces.push(analysisResults[key].force);
  });

  const stressMax = Math.max(...stresses);
  const stressMin = Math.min(...stresses);
  const forceMax = Math.max(...forces);
  const forceMin = Math.min(...forces);

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

  return {
    stress: {
      colors: stressColors.flat(),
      max: stressMax,
      min: stressMin,
    },
    force: {
      colors: forceColors.flat(),
      max: forceMax,
      min: forceMin,
    },
  };
}
