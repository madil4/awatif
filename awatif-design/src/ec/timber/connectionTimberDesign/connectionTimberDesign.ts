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
import { ProcessedAnalysisOutputs } from "../../../../../awatif-ui/src/types";
import { calculateElementLengthSingle } from "./utils/calcElementLengths";

export type ConnectionTimberDesignerGlobalOutput = {
  nodes: Node[];
  elements: Element[];
  analysisInputs: AnalysisInput[];
  processedOutput: ProcessedAnalysisOutputs;
  designGlobalInputs: TimberBarConnectionDesignerLocalInput[];
  designGlobalOutputs: TimberBarConnectionDesignerOutput[];
};

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
  ConnectionTimberDesignerGlobalOutput: ConnectionTimberDesignerGlobalOutput;
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

  // loop through the elements
  // process analysis output
  const processedOutput = processAnalysisOutputs(analysisOutputs);

  // empty list for the results
  const designInputs: TimberBarConnectionDesignerLocalInput[] = [];
  const designOutputs: TimberBarConnectionDesignerOutput[] = [];

  const designGlobalInputs: any[] = [];
  const designGlobalOutputs: TimberBarConnectionDesignerOutput[] = [];

  // local per node
  connectedElements.forEach((element, index) => {
    // get area and dimensions
    const width = 300;
    const height = 400;

    // get forces
    const axialForces = processedOutput.normal.get(element) ?? [0, 0];
    const axialForce = axialForces[0];

    // get the angle
    const [angleDeg, angleDeg2] = calculateElementAngle(
      nodes[designInput.node],
      nodes[elements[element][0]],
      nodes[elements[element][1]]
    );

    // calc element length
    const elementLength = calculateElementLengthSingle(
      elements[element],
      nodes
    );

    // combining global and local input parameters
    const timberBarConnectionDesignerInput = {
      ...designInput.connectionTimberDesign,
      element: element,
      elementLength: elementLength,
      axialForce: axialForce,
      beamAngle: angleDeg2,
      width: width,
      height: height,
    };

    // pass input to connectionTimberDesign
    const timberBarOutput = timberBarConnectionDesigner(
      timberBarConnectionDesignerInput
    );

    designOutputs.push(timberBarOutput);
    designInputs.push(timberBarConnectionDesignerInput);
  });

  // global all elements
  elements.forEach((element, index) => {
    // get area and dimensions
    const width = 300;
    const height = 400;

    // get forces
    const axialForces = processedOutput.normal.get(index) ?? [0, 0];
    const axialForce = axialForces[0];

    // get the angle
    const [angleDeg, angleDeg2] = calculateElementAngle(
      nodes[designInput.node],
      nodes[elements[index][0]],
      nodes[elements[index][1]]
    );

    // calc element length
    const elementLength = calculateElementLengthSingle(element, nodes);

    // combining global and local input parameters
    const timberBarConnectionDesignerInput = {
      ...designInput.connectionTimberDesign,
      element: index,
      elementLength: elementLength,
      axialForce: axialForce,
      beamAngle: angleDeg2,
      width: width,
      height: height,
    };

    // pass input to connectionTimberDesign
    const timberBarOutput = timberBarConnectionDesigner(
      timberBarConnectionDesignerInput
    );
    // console.log("timberBarOutput: ", timberBarOutput)

    designGlobalInputs.push(timberBarConnectionDesignerInput);
    designGlobalOutputs.push(timberBarOutput);
  });

  // calc max utilization
  const utilizationRatios = designOutputs.map((v) => [
    v.etaBlockFailure,
    v.etaAxialCheck,
    v.etaFastenerCheck,
  ]);
  const maxUtilization = Math.max(...utilizationRatios.flat());

  const output: ConnectionTimberDesignerGlobalOutput = {
    nodes,
    elements,
    analysisInputs,
    processedOutput,
    designGlobalInputs,
    designGlobalOutputs,
  };

  return {
    node: designInput.node,
    utilizationRatio: maxUtilization,
    designInput: designInputs,
    connectionTimberDesign: designOutputs,
    ConnectionTimberDesignerGlobalOutput: output,
  };
}
