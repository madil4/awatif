import { FrameAnalysisInput, FrameAnalysisOutput } from "awatif-data-structure";
import { getKmod } from "./utils/getKmod";

export type FrameTimberDesignInput = {
  element: number;
  frameTimberDesign: {
    tensileStrengthParallel: number; // Wooden member tension capacity
    serviceClass: string; // The service class (1,2, or 3)
    loadDuration: string; // The load duration category (e.g. 'permanent','longTerm', 'mediumTerm', 'shortTerm', 'instantaneous' )
    material: string; // Solid timber, Glued laminated timber, LVL ...etc
    gammaG: number; // Partial factor of safety for permanent load
    gammaM: number; //Partial factor of safety for the material
  };
};

export type FrameTimberDesignOutput = {
  element: number;
  frameTimberDesign: {
    appliedForce: number; // Axial force in member
    appliedStress: number; // Axial Stress in member
    kmod: number; // kmodmed factor from Table 3.3, DTS Vol2
    capacityStress: number; // Axial Stress Capacity of member
    utilizationRatio: number;
  };
};

export const frameTimberDesign = (
  analysisInput: FrameAnalysisInput,
  analysisOutput: FrameAnalysisOutput,
  designInput: FrameTimberDesignInput
) => {
  const i = designInput.frameTimberDesign;

  // applied tensile force
  const tensileForcePermanent = analysisOutput.normal
    ? analysisOutput.normal[0]
    : 0;
  const appliedForce = tensileForcePermanent * i.gammaG;
  const crossSectionalArea = analysisInput.area ?? 0;
  const appliedStress = appliedForce / crossSectionalArea;

  // design capacity
  const kmod = getKmod(i.serviceClass, i.loadDuration, i.material);
  const capacityStress = (i.tensileStrengthParallel * kmod) / i.gammaM;

  const utilizationRatio = Math.abs(appliedStress / capacityStress);

  return {
    element: designInput.element,
    frameTimberDesign: {
      appliedForce,
      appliedStress,
      kmod,
      capacityStress,
      utilizationRatio,
    },
  };
};
