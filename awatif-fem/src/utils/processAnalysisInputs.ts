import {
  AnalysisInput,
  FrameAnalysisInput,
  SupportAnalysisInput,
  DistributedLoadAnalysisInput,
  LoadAnalysisInput,
} from "awatif-data-structure";

// don't refactor these types, they miss up with type.d.ts
export enum AnalysisType {
  Bar,
  Beam,
}

export type ProcessedAnalysisInputs = {
  analysisType: AnalysisType;
  elasticities: Map<number, FrameAnalysisInput["elasticity"]>;
  areas: Map<number, FrameAnalysisInput["area"]>;
  loads: Map<number, LoadAnalysisInput["load"]>;
  supports: Map<number, SupportAnalysisInput["support"]>;
  momentOfInertiaZs: Map<number, FrameAnalysisInput["momentOfInertiaZ"]>;
  momentOfInertiaYs: Map<number, FrameAnalysisInput["momentOfInertiaY"]>;
  shearModuluses: Map<number, FrameAnalysisInput["shearModulus"]>;
  torsionalConstants: Map<number, FrameAnalysisInput["torsionalConstant"]>;
  distributedLoads: Map<
    number,
    DistributedLoadAnalysisInput["distributedLoad"]
  >;
};

export function processAnalysisInputs(
  analysisInputs: AnalysisInput[]
): ProcessedAnalysisInputs {
  const pai = {
    analysisType: AnalysisType.Beam, // not because it is mostly used but it is processed first below
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

  analysisInputs.forEach((input) => {
    if ("area" in input) pai.areas.set(input.element, input.area);
    if ("elasticity" in input)
      pai.elasticities.set(input.element, input.elasticity);
    if ("load" in input) pai.loads.set(input.node, input.load);
    if ("support" in input) pai.supports.set(input.node, input.support);

    if (pai.supports.values().next().value?.length === 3)
      pai.analysisType = AnalysisType.Bar;

    if (pai.analysisType === AnalysisType.Beam) {
      if ("momentOfInertiaZ" in input)
        pai.momentOfInertiaZs.set(input.element, input.momentOfInertiaZ);
      if ("momentOfInertiaY" in input)
        pai.momentOfInertiaYs.set(input.element, input.momentOfInertiaY);
      if ("torsionalConstant" in input)
        pai.torsionalConstants.set(input.element, input.torsionalConstant);
      if ("shearModulus" in input)
        pai.shearModuluses.set(input.element, input.shearModulus);
      if ("distributedLoad" in input)
        pai.distributedLoads.set(input.element, input.distributedLoad);
    }
  });

  return pai;
}
