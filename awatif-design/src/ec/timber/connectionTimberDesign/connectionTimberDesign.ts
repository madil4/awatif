import {
  AnalysisInput,
  AnalysisOutputs,
  Element,
  Node,
} from "../../../../../awatif-data-structure/src";
import {
  TimberBarConnectionDesignerInput,
  TimberBarConnectionDesignerOutput,
} from "./utils/types";
import { timberBarConnectionDesigner } from "./utils/timberBarConnectionDesigner";
import {
  getConnectedElements,
  getNodeNumbers,
  findNormalForceForElement,
} from "./utils/mapNodesAndElements";

import { processAnalysisOutputs } from "../../../../../awatif-ui/src/utils/processAnalysisOutputs";

export type ConnectionTimberDesignerInput = {
  node: number;
  connectionTimberDesign: TimberBarConnectionDesignerInput;
};

export type ConnectionTimberDesignerOutput = {
  node: number;
  elements: number[];
  forces: number[];
  connectionTimberDesign: TimberBarConnectionDesignerOutput[];
  // Add other properties from TimberBarConnectionDesignerOutput as needed
};

// function that loops through a node with several timber bars
export function connectionTimberDesign(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInput[],
  analysisOutputs: AnalysisOutputs,
  designInput: ConnectionTimberDesignerInput
): ConnectionTimberDesignerOutput {
  // from the nodes and elements list you can know which elements are connected to the connection
  const uniqueNodeNumbers = getNodeNumbers(elements);
  const connectedElements: number[] = [];
  const axialForces: number[] = [];

  uniqueNodeNumbers.forEach((nodei) => {
    const elementIds = getConnectedElements(nodei, elements);
    connectedElements.push(...elementIds);
  });
  let processedAnalysisOutputs = processAnalysisOutputs(analysisOutputs);

  // loop through the elements and compute the outputs of each element as you did in Python and Typescript
  const designPerElements: TimberBarConnectionDesignerOutput[] = [];
  connectedElements.forEach((element, index) => {
    // find load
    let axialForce = processedAnalysisOutputs.normal.get(element) ?? [0, 0];
    axialForces.push(axialForce[0]);

    // console.log("axialForce: ", axialForce);

    // you can get the axial force by searching in the analysisOutputs using the element index
    // similarly you can get serviceClass in designInput
    const timberBarConnectionDesignerInput: TimberBarConnectionDesignerInput = {
      serviceClass: 1,
      loadDurationClass: "permanent",
      beam: element,
      timberGrade: "GL24h",
      width: 400,
      height: 800,
      axialForce: axialForce[0],
      fastenerGrade: "S235",
      fastenerDiameter: 8,
      sheetGrade: "S235",
      sheetThickness: 5,
      sheetNo: 2,
    };

    const timberBarConnectionDesignerOutput = timberBarConnectionDesigner(
      timberBarConnectionDesignerInput
    );
    designPerElements.push(timberBarConnectionDesignerOutput);
  });

  return {
    node: designInput.node,
    forces: axialForces,
    elements: connectedElements,
    connectionTimberDesign: designPerElements,
  }; // Return only the array
}
