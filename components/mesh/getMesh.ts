import { Geometry, Nodes, Elements } from "../data-model";
import { MeshComponents } from "./data-model";
import { templates } from "./templates";

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

  meshComponents.forEach((component) => {
    // Get the template using templateIndex
    const template = templates[component.templateIndex];
    if (!template) return;

    // Iterate over each line index in the component's geometry
    component.geometry.forEach((lineId) => {
      // Get the line from geometry using the line ID
      const line = geometry.lines.get(lineId);
      if (!line) return;

      const [startId, endId] = line;
      const startPoint = geometry.points.get(startId);
      const endPoint = geometry.points.get(endId);

      if (!startPoint || !endPoint) return;

      // Get parametric mesh from template
      const { nodes: parametricNodes, elements } = template.getMesh({
        params: template.params,
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
  });

  return { nodes: allNodes, elements: allElements };
}
