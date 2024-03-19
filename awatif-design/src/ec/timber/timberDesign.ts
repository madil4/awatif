import { BeamResult } from "../../../../awatif-data-structure/";

// consider changing assignment to input
export type TimberDesignAssignment = {
  element: number;
  timberDesign: {
    strength: number;
  };
};

export type TimberDesignResult = {
  element: number;
  timberDesign: {
    utilizationFactor: number;
    forTemplate: number;
  };
};

export function timberDesign(
  timberInput: TimberDesignAssignment["timberDesign"],
  analysisResult: BeamResult
): TimberDesignResult["timberDesign"] {
  return {
    utilizationFactor: 0.5,
    forTemplate: 10,
  };
}
