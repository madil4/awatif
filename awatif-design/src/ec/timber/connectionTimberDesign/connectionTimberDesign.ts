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
} from "./utils/mapNodesAndElements";
import { processAnalysisOutputs } from "../../../../../awatif-ui/src/utils/processAnalysisOutputs";
import { arrayToSet } from "./utils/sortData";
import { calculateElementAngles } from "./utils/calcBeamAngle";


export type ConnectionTimberDesignerInput = {
  node: number;
  connectionTimberDesign: TimberBarConnectionDesignerInput;
};

export type ConnectionTimberDesignerOutput = {
  node: number;
  elements: number[];
  connectedElements: number[][];
  forces: number[][];
  beamAngles: number[];
  connectionTimberDesign: TimberBarConnectionDesignerOutput[][];
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
  // console.log("nodes: ", nodes);
  // console.log("elements: ", elements);
  // console.log("analysisInputs: ", analysisInputs);
  // console.log("analysisOutputs: ", analysisOutputs);
  // console.log("designInput: ", designInput);

  // from the nodes and elements list you can know which elements are connected to the connection
  const nestedDesignPerElements: TimberBarConnectionDesignerOutput[][] = [];
  const nestedAxialForces: number[][] = [];
  const beamAngles = calculateElementAngles(nodes, elements);

  const uniqueNodeNumbers = getNodeNumbers(elements);
  const uniqueElements : number[] = [];
  const connectedElements: number[][] = [];


  uniqueNodeNumbers.forEach((nodei) => {
    const elementIds = getConnectedElements(nodei, elements);
    connectedElements.push(elementIds);
    uniqueElements.push(...elementIds)});
  const uniqueElementNumbers = arrayToSet(uniqueElements);

  // console.log("uniqueNodeNumbers: ", uniqueNodeNumbers); // array of node ids
  // console.log("uniqueElementNumbers: ", uniqueElementNumbers);  // array of element ids
  // console.log("connectedElements: ", connectedElements);  // array of element ids per node

  let processedAnalysisOutputs = processAnalysisOutputs(analysisOutputs);

  // loop through the elements and compute the outputs of each element as you did in Python and Typescript
  // connectedElements.forEach((element, index) => {

  connectedElements.forEach((elementss, index) => {
    const nodeOutputs: TimberBarConnectionDesignerOutput[] = [];
    const nodeAxialForces: number[] = [];


    elementss.forEach(element => {
      // console.log("index: ", index)

      // find load 
      let axialForce = processedAnalysisOutputs.normal.get(element)??[0,0]
      nodeAxialForces.push(axialForce[0]);

      // console.log("axialForce: ", axialForce);

      // you can get the axial force by searching in the analysisOutputs using the element index
      // similarly you can get serviceClass in designInput
      const timberBarConnectionDesignerInput: TimberBarConnectionDesignerInput = {
        serviceClass: 1,
        loadDurationClass: "permanent",
        beam: element,
        timberGrade: "GL24h",
        width: 400,
        height: 500,
        axialForce: axialForce[0],
        fastenerGrade: "S235",
        fastenerDiameter: 8,
        sheetGrade: "S235",
        sheetThickness: 5,
        sheetNo: 2,
        beamAngle: beamAngles[index],
      };

      // Call the design function and store the output
      const timberBarConnectionDesignerOutput = timberBarConnectionDesigner(timberBarConnectionDesignerInput);

      // Push the result into the node's output array
      nodeOutputs.push(timberBarConnectionDesignerOutput);

    });

    // Add the array of outputs for this node to the nested array
    nestedDesignPerElements.push(nodeOutputs);
    nestedAxialForces.push(nodeAxialForces);

});

console.log("beamAngles: ", beamAngles)

return {
  node: designInput.node,
  forces: nestedAxialForces,
  elements: uniqueElementNumbers,
  connectedElements: connectedElements,
  beamAngles: beamAngles,
  connectionTimberDesign: nestedDesignPerElements,
}; // Return only the array
}

