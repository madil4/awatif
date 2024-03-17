import {
  AnalysisResults,
  BeamResult,
  Element,
  Node,
} from "../../awatif-data-structure/src";
import { Assignment } from "../../awatif-ui/src";
import { TimberDesignAssignment, TimberDesignResult } from "./ec/timber";

export type DesignResults = {
  [key: string]: TimberDesignResult[];
};

export function design(
  nodes: Node[],
  elements: Element[],
  assignments: Array<Assignment | TimberDesignAssignment>,
  analysisResults: AnalysisResults,
  designs: ((
    assignment: TimberDesignAssignment["timberDesign"],
    beamResult: BeamResult,
    length: number
  ) => TimberDesignResult["timberDesign"])[]
): DesignResults {
  const timberDesign = designs[0];
  // const timberDesignResult = timberDesign(assignments[0],analysisResults[0]);

  return {
    loadCase: [
      {
        element: 1,
        timberDesign: {
          utilizationFactor: 1,
          forTemplate: nodes[1][0],
        },
      },
    ],
  };
}
