import {
    AnalysisInput,
    AnalysisOutput,
    Element,
    Node,
  } from "../../../awatif-data-structure/src";
import { TimberBarConnectionDesignerInput, TimberBarConnectionDesignerOutput } from './utils/types';
import { timberBarConnectionDesigner } from './utils/timberBarConnectionDesigner';
import { getConnectedElements, getNodeNumbers } from "./utils/mapNodesAndElements";

export type TimberBarNodeConnectionDesignerInput = {
    node: number;
    timberBarConnectionDesignerInput: TimberBarConnectionDesignerInput
  };

export type TimberBarNodeConnectionDesignerOutput = {
    node: number[];
    designPerElements: TimberBarConnectionDesignerOutput[];
    // Add other properties from TimberBarConnectionDesignerOutput as needed
}


// function that loops through a node with several timber bars
export function timberBarNodeConnectionDesigner(
    nodes: Node[],
    elements: Element[],
    analysisInputs: AnalysisInput[],
    analysisOutputs: AnalysisOutput[],
    designInput: TimberBarNodeConnectionDesignerInput,
  ): TimberBarNodeConnectionDesignerOutput {
    console.log(nodes)
    // from the nodes and elements list you can know which elements are connected to the connection
    const uniqueNodeNumbers = getNodeNumbers(elements);
    const connectedElements: number[] = [];

    uniqueNodeNumbers.forEach(nodei=>{
      const elementIds = getConnectedElements(nodei, elements);
      connectedElements.push(...elementIds)
    });
  
    // loop through the elements and compute the outputs of each element as you did in Python and Typescript
    const designPerElements: TimberBarConnectionDesignerOutput[] = []
    connectedElements.forEach((element, index)=>{
      // you can get the axial force by searching in the analysisOutputs using the element index
      // similarly you can get serviceClass in designInput
      const timberBarConnectionDesignerInput: TimberBarConnectionDesignerInput = {
        serviceClass: 1,
        loadDurationClass: "permanent",
        beam: element,
        timberGrade: "GL24h",
        width: 400,
        height: 800,
        axialForce: 100, 
        fastenerGrade: "S235",
        fastenerDiameter: 8,
        sheetGrade: "S235",
        sheetThickness: 5,
        sheetNo: 2,
    };

    const timberBarConnectionDesignerOutput = timberBarConnectionDesigner( timberBarConnectionDesignerInput );
    designPerElements.push( timberBarConnectionDesignerOutput );
    });
  
    return {
      node: uniqueNodeNumbers,
      designPerElements,
    }; // Return only the array
  }

  