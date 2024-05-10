import {
    AnalysisInput,
    AnalysisOutputs,
    Element,
    Node,
  } from "../../../../../../awatif-data-structure/src"; 
// const elementAngles = calculateElementAngles(nodes, elements);


export function calculateElementAngles(nodes: Node[], elements: Element[]): number[] {
    return elements.map(([startIdx, endIdx]) => {
        const [x1, , z1] = nodes[startIdx]; // Ignore the y-coordinate if not required
        const [x2, , z2] = nodes[endIdx];

        // Calculate differences between the two nodes
        const dx = x2 - x1;
        const dz = z2 - z1;

        // Compute the angle relative to the horizontal axis in degrees
        const angleRad = Math.atan2(dz, dx); // atan2 gives the angle in radians
        const angleDeg = (angleRad * 180) / Math.PI; // Convert to degrees

        return angleDeg;
    });
}


// Calculate angles for each element
// const elementAngles = calculateElementAngles(nodes, elements);
