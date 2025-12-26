import { Geometry } from "../data-model";
import { Elements, MeshComponents, Nodes } from "./data-model";

export function getMesh({
  geometry,
  meshComponents,
}: {
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
  };
  meshComponents: MeshComponents["val"];
}): { nodes: Nodes; elements: Elements } {
  const allNodes: Nodes = [];
  const allElements: Elements = [];
  let nodeOffset = 0;

  meshComponents.forEach((component, lineIndex) => {
    // Get the line from geometry using the Map key
    const [startIdx, endIdx] = geometry.lines[lineIndex];
    const startPoint = geometry.points[startIdx];
    const endPoint = geometry.points[endIdx];

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
