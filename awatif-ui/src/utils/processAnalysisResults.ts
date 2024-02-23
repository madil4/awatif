import { DeformationResult } from "awatif-fem";
import {
  AnalysisResults,
  BeamResult,
  ProcessedAnalysisResults,
  ReactionResult,
} from "../types";

export function processAnalysisResults(
  analysisResults: AnalysisResults
): ProcessedAnalysisResults {
  const par: ProcessedAnalysisResults = {
    normal: new Map<number, BeamResult["normal"]>(),
    shearY: new Map<number, BeamResult["shearY"]>(),
    shearZ: new Map<number, BeamResult["shearZ"]>(),
    torsion: new Map<number, BeamResult["torsion"]>(),
    bendingY: new Map<number, BeamResult["bendingY"]>(),
    bendingZ: new Map<number, BeamResult["bendingZ"]>(),
    deformation: new Map<number, DeformationResult["deformation"]>(),
    reaction: new Map<number, ReactionResult["reaction"]>(),
  };
  // you can also process nodes results here

  analysisResults["default"].forEach((result) => {
    if ("normal" in result) par.normal.set(result.element, result.normal);
    if ("shearY" in result) par.shearY.set(result.element, result.shearY);
    if ("shearZ" in result) par.shearZ.set(result.element, result.shearZ);
    if ("torsion" in result) par.torsion.set(result.element, result.torsion);
    if ("bendingY" in result) par.bendingY.set(result.element, result.bendingY);
    if ("bendingZ" in result) par.bendingZ.set(result.element, result.bendingZ);
    if ("deformation" in result)
      par.deformation.set(result.node, result.deformation);
    if ("reaction" in result) par.reaction.set(result.node, result.reaction);
  });

  return par;
}
