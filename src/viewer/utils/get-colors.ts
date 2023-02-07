import { AnalysisResults } from "../../interfaces";

export const getColors = (
  connectivities: [number, number][],
  analysisResults: AnalysisResults | undefined,
  getColor: (value: number) => number[]
): number[] => {
  const colors: number[][] = [];
  connectivities.forEach((_, index) => {
    const color = analysisResults
      ? getColor(analysisResults[index].stress)
      : [1, 1, 1];
    colors.push(color);
    colors.push(color);
  });

  return colors.flat();
};
