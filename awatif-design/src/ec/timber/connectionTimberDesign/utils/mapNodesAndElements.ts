import { AnalysisInput, Element } from "awatif-data-structure";

// Function to find elements connected to a node
export function getConnectedElements(
  nodeNumber: number,
  elements: Element[]
): number[] {
  // Initialize an array to store the connected element IDs
  const connectedElementIds: number[] = [];

  // Iterate through the elements
  elements.forEach((element, index) => {
    // Check if the node number matches either the start or end node of the element
    if (element[0] === nodeNumber || element[1] === nodeNumber) {
      // Add the index of the element to the connected element IDs array
      connectedElementIds.push(index);
    }
  });

  // Return the array of connected element IDs
  return connectedElementIds;
}

// Function to extract unique node numbers from elements
export function getNodeNumbers(elements: Element[]): number[] {
  // Initialize an empty array to store unique node numbers
  const nodeNumbers: number[] = [];

  // Iterate through the elements
  elements.forEach((element) => {
    // Destructure the element to get start and end node numbers
    const [startNode, endNode] = element;

    // Add start and end node numbers to the array if not already present
    if (!nodeNumbers.includes(startNode)) {
      nodeNumbers.push(startNode);
    }
    if (!nodeNumbers.includes(endNode)) {
      nodeNumbers.push(endNode);
    }
  });

  // Sort and return the array of unique node numbers
  return nodeNumbers.sort((a, b) => a - b);
}

export function findLoadByNode(
  nodeNumber: number,
  inputs: AnalysisInput[]
): number[] | undefined {
  // Find the input corresponding to the node number and which has a 'load' property
  const nodeLoad = inputs.find(
    // @ts-ignore
    (input) => (input as NodeWithLoad).node === nodeNumber && "load" in input
    // @ts-ignore
  ) as NodeWithLoad | undefined;

  // Return the load if found, otherwise return undefined
  return nodeLoad ? nodeLoad.load : undefined;
}

export function findNormalForceForElement(elementNumber: number, inputs: any) {
  // Directly find the element normal array based on element number
  const element = inputs.find(
    // @ts-ignore
    (input) => input.element === elementNumber && input.normal !== undefined
  );
  // @ts-ignore
  return element ? element.normal : undefined;
}
