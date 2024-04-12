import {
  FrameAnalysisInput,
  FrameAnalysisOutput,
} from "../../../../awatif-data-structure";
import { DesignFunction } from "../../design";

export type FrameTimberDesignInput = {
  element: number;
  frameTimberDesign: {
    strength: number;
  };
};

export type FrameTimberDesignOutput = {
  element: number;
  frameTimberDesign: {
    utilizationFactor: number;
    forReport: number;
  };
};

export const frameTimberDesign: DesignFunction = (
  analysisInput: FrameAnalysisInput,
  analysisOutput: FrameAnalysisOutput,
  designInput: FrameTimberDesignInput
) => {
  return {
    element: designInput.element,
    frameTimberDesign: {
      utilizationFactor: analysisOutput.normal?.[0] || 0,
      forReport: analysisInput.area || 0,
    },
  };
};
