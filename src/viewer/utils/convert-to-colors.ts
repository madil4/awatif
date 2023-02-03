import { AnalysisResults } from "../../interfaces";
import { Lut } from "./lut";

export const convertToColors = (
  connectivities: [number, number][],
  analysisResults: AnalysisResults | undefined,
  colorMapper: Lut
): number[] => {
  const colors: [number, number, number][] = [];
  connectivities.forEach((_, index) => {
    const color = analysisResults
      ? colorMapper.getColor(analysisResults[index].stress).toArray()
      : [1, 1, 1];
    colors.push(color);
    colors.push(color);
  });

  return colors.flat();
};
