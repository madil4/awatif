import {
  AnalysisInput,
  DistributedLoadAnalysisInput,
  LoadAnalysisInput,
  FrameAnalysisInput,
  SupportAnalysisInput,
} from "awatif-data-structure";
import { ProcessedAnalysisInputs } from "../types";

export function processAnalysisInputs(
  analysisInputs: AnalysisInput[]
): ProcessedAnalysisInputs {
  const pai: ProcessedAnalysisInputs = {
    elasticities: new Map<number, FrameAnalysisInput["elasticity"]>(),
    areas: new Map<number, FrameAnalysisInput["area"]>(),
    loads: new Map<number, LoadAnalysisInput["load"]>(),
    supports: new Map<number, SupportAnalysisInput["support"]>(),
    momentOfInertiaZs: new Map<
      number,
      FrameAnalysisInput["momentOfInertiaZ"]
    >(),
    momentOfInertiaYs: new Map<
      number,
      FrameAnalysisInput["momentOfInertiaY"]
    >(),
    shearModuluses: new Map<number, FrameAnalysisInput["shearModulus"]>(),
    torsionalConstants: new Map<
      number,
      FrameAnalysisInput["torsionalConstant"]
    >(),
    distributedLoads: new Map<
      number,
      DistributedLoadAnalysisInput["distributedLoad"]
    >(),
  };

  analysisInputs.forEach((analysisInput) => {
    if ("area" in analysisInput)
      pai.areas.set(analysisInput.element, analysisInput.area);
    if ("elasticity" in analysisInput)
      pai.elasticities.set(analysisInput.element, analysisInput.elasticity);
    if ("load" in analysisInput)
      pai.loads.set(analysisInput.node, analysisInput.load);
    if ("support" in analysisInput)
      pai.supports.set(analysisInput.node, analysisInput.support);
    if ("momentOfInertiaZ" in analysisInput)
      pai.momentOfInertiaZs.set(
        analysisInput.element,
        analysisInput.momentOfInertiaZ
      );
    if ("momentOfInertiaY" in analysisInput)
      pai.momentOfInertiaYs.set(
        analysisInput.element,
        analysisInput.momentOfInertiaY
      );
    if ("torsionalConstant" in analysisInput)
      pai.torsionalConstants.set(
        analysisInput.element,
        analysisInput.torsionalConstant
      );
    if ("shearModulus" in analysisInput)
      pai.shearModuluses.set(analysisInput.element, analysisInput.shearModulus);
    if ("distributedLoad" in analysisInput)
      pai.distributedLoads.set(
        analysisInput.element,
        analysisInput.distributedLoad
      );
  });

  return pai;
}
