import {
  AnalysisInput,
  AnalysisOutputs,
  Element,
  Node,
} from "../../../../../awatif-data-structure/src";
import {
  TimberBarConnectionDesignerInput,
  TimberBarConnectionDesignerLocalInput,
  TimberBarConnectionDesignerOutput,
} from "./utils/types";
import { timberBarConnectionDesigner } from "./utils/timberBarConnectionDesigner";
import { calculateElementAngle } from "./utils/calcBeamAngle";
import { processAnalysisOutputs } from "../../../../../awatif-ui/src/utils/processAnalysisOutputs";

export type ConnectionTimberDesignerInput = {
  node: number;
  connectionTimberDesign: TimberBarConnectionDesignerInput;
};

// per node
export type ConnectionTimberDesignerOutput = {
  node: number;
  designInput: TimberBarConnectionDesignerLocalInput[];
  utilizationRatio: number;
  connectionTimberDesign: TimberBarConnectionDesignerOutput[];
};

// function that loops through a node with several timber bars
export function connectionTimberDesign(
  nodes: Node[],
  elements: Element[],
  analysisInputs: AnalysisInput[],
  analysisOutputs: AnalysisOutputs,
  designInput: ConnectionTimberDesignerInput
): ConnectionTimberDesignerOutput {

  // get elements inside the node
  let connectedElements: number[] = [];
  elements.forEach((element, index) => {
    if (element.includes(designInput.node)) {
      connectedElements.push(index);
    } 
  });
  // console.log("node", nodes[designInput.node])
  // console.log("connectedElements", connectedElements)


  // loop through the elements
  // process analysis output
  const processedOutput = processAnalysisOutputs(analysisOutputs);


  

  // empty list for the results
  const designInputs: TimberBarConnectionDesignerLocalInput[] = [];
  const designOutputs: TimberBarConnectionDesignerOutput[] = [];

  connectedElements.forEach((element, index) => {
    
    // get area and dimensions
    const width = 300;
    const height = 400;

    // get forces
    const axialForces = processedOutput.normal.get(element)??[0, 0]
    const axialForce = axialForces[0];

    // get the angle
    const [angleDeg, angleDeg2] = calculateElementAngle(nodes[designInput.node], nodes[elements[element][0]], nodes[elements[element][1]]);
    // console.log("element", element)
    // console.log("angle", angle)

    // combining global and local input parameters
    const timberBarConnectionDesignerInput = {...designInput.connectionTimberDesign, element: element, axialForce: axialForce, beamAngle: angleDeg2, width: width, height: height}
    // console.log("timberBarConnectionDesignerInput", timberBarConnectionDesignerInput)

    // pass input to connectionTimberDesign
    const timberBarOutput = timberBarConnectionDesigner(timberBarConnectionDesignerInput)
    // console.log("timberBarOutput: ", timberBarOutput)
    designOutputs.push(timberBarOutput)
    designInputs.push(timberBarConnectionDesignerInput)

  });

  // calc max utilization
  const utilizationRatios = designOutputs.map( (v) => [v.etaBlockFailure, v.etaAxialCheck, v.fastenerCheck] )
  const maxUtilization = Math.max(...utilizationRatios.flat())
  // console.log("maxUtilization", maxUtilization)


return {
  node: designInput.node,
  utilizationRatio: maxUtilization,
  designInput: designInputs,
  connectionTimberDesign: designOutputs,
}; 
}

