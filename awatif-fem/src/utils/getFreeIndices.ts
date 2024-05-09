import * as mathjs from "mathjs";
import { AnalysisType, ProcessedAnalysisInputs } from "./processAnalysisInputs";

function bar(supports: ProcessedAnalysisInputs["supports"], dof: number) {
  let supportsInd: number[] = [];

  supports.forEach((support, index) => {
    if (support[0]) supportsInd.push(index * 3);
    if (support[1]) supportsInd.push(index * 3 + 1);
    if (support[2]) supportsInd.push(index * 3 + 2);
  });

  return mathjs.setDifference(mathjs.range(0, dof), supportsInd);
}

function beam(supports: ProcessedAnalysisInputs["supports"], dof: number) {
  let supportsInd: number[] = [];

  supports.forEach((support, index) => {
    if (support[0]) supportsInd.push(index * 6);
    if (support[1]) supportsInd.push(index * 6 + 1);
    if (support[2]) supportsInd.push(index * 6 + 2);
    if (support[3]) supportsInd.push(index * 6 + 3);
    if (support[4]) supportsInd.push(index * 6 + 4);
    if (support[5]) supportsInd.push(index * 6 + 5);
  });

  return mathjs.setDifference(mathjs.range(0, dof), supportsInd);
}

export const getFreeIndices = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam,
};
