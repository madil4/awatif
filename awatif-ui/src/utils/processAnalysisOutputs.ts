import {
  AnalysisOutputs,
  FrameAnalysisOutput,
  ReactionAnalysisOutput,
  DeformationAnalysisOutput,
  PositionAnalysisOutput,
} from "awatif-data-structure";
import { ProcessedAnalysisOutputs } from "../types";

export function processAnalysisOutputs(
  analysisOutputs: AnalysisOutputs
): ProcessedAnalysisOutputs {
  const pao: ProcessedAnalysisOutputs = {
    normal: new Map<number, FrameAnalysisOutput["normal"]>(),
    shearY: new Map<number, FrameAnalysisOutput["shearY"]>(),
    shearZ: new Map<number, FrameAnalysisOutput["shearZ"]>(),
    torsion: new Map<number, FrameAnalysisOutput["torsion"]>(),
    bendingY: new Map<number, FrameAnalysisOutput["bendingY"]>(),
    bendingZ: new Map<number, FrameAnalysisOutput["bendingZ"]>(),
    deformation: new Map<number, DeformationAnalysisOutput["deformation"]>(),
    position: new Map<number, PositionAnalysisOutput["position"][]>(),
    reaction: new Map<number, ReactionAnalysisOutput["reaction"]>(),
  };

  // you can also process nodes outputs here

  analysisOutputs["default"]?.forEach((output) => {
    if ("normal" in output) pao.normal.set(output.element, output.normal);
    if ("shearY" in output) pao.shearY.set(output.element, output.shearY);
    if ("shearZ" in output) pao.shearZ.set(output.element, output.shearZ);
    if ("torsion" in output) pao.torsion.set(output.element, output.torsion);
    if ("bendingY" in output) pao.bendingY.set(output.element, output.bendingY);
    if ("bendingZ" in output) pao.bendingZ.set(output.element, output.bendingZ);
    if ("deformation" in output)
      pao.deformation.set(output.node, output.deformation);
    if ("reaction" in output) pao.reaction.set(output.node, output.reaction);
  });

  // todo: use one loop instead
  Object.entries(analysisOutputs).forEach(([key, outputs]) => {
    if (!isNaN(Number(key))) {
      const frame = Number(key);
      let outputMap = new Map<number, PositionAnalysisOutput["position"]>();
      outputs.forEach((output) => {
        if ("position" in output) outputMap.set(output.node, output.position);
      });
      let positions: any = [];
      for (let i = 0; i < outputs.length; i++) {
        positions.push(outputMap.get(i));
      }
      pao.position.set(frame, positions);
    }
  });

  return pao;
}
