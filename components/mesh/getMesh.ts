import { MeshComponents } from "./data-model";
import { Geometry } from "../data-model";

export function getMesh({
  geometry,
  meshComponents,
}: {
  geometry: Geometry;
  meshComponents: MeshComponents;
}): { nodes: number[][]; elements: number[][] } {
  const allNodes: number[][] = [];
  const allElements: number[][] = [];
  let nodeOffset = 0;

  meshComponents.forEach((component, lineIndex) => {
    // Get the line from geometry using the Map key
    const [startIdx, endIdx] = geometry.lines.val[lineIndex];
    const startPoint = geometry.points.val[startIdx];
    const endPoint = geometry.points.val[endIdx];

    // Get parametric mesh from component
    const { nodes: parametricNodes, elements } = component.getMesh({
      params: component.params,
    });

    // Map parametric nodes to 3D positions
    const nodes = parametricNodes.map(([t]) => [
      startPoint[0] + t * (endPoint[0] - startPoint[0]),
      startPoint[1] + t * (endPoint[1] - startPoint[1]),
      startPoint[2] + t * (endPoint[2] - startPoint[2]),
    ]);

    // Add nodes
    allNodes.push(...nodes);

    // Adjust element indices and add elements
    const adjustedElements = elements.map((element) =>
      element.map((idx) => idx + nodeOffset)
    );
    allElements.push(...adjustedElements);

    nodeOffset += nodes.length;
  });

  return { nodes: allNodes, elements: allElements };
}
