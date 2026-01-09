import { Geometry } from "../data-model";
import { Elements, Components, Nodes } from "./data-model";
import { templates } from "../templates";

export function getMesh({
  geometry,
  components,
}: {
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
  };
  components: Components["val"];
}): { nodes: Nodes; elements: Elements } {
  const allNodes: Nodes = [];
  const allElements: Elements = [];
  let nodeOffset = 0;

  // Track which lines have been meshed to prevent duplicate meshing
  const meshedLines = new Set<number>();

  const meshComponents = components.get("MESH") ?? [];
  
  meshComponents.forEach((component) => {
    const template = templates.get("MESH")?.[component.templateIndex];
    if (!template) return;

    component.geometry.forEach((lineId) => {
      // Skip if this line has already been meshed by another component
      if (meshedLines.has(lineId)) return;
      meshedLines.add(lineId);

      const line = geometry.lines.get(lineId);
      if (!line) return;

      const [startId, endId] = line;
      const startPoint = geometry.points.get(startId);
      const endPoint = geometry.points.get(endId);

      if (!startPoint || !endPoint) return;

      const { nodes: parametricNodes, elements } = template.getMesh({
        params: component.params as Parameters<
          typeof template.getMesh
        >[0]["params"],
      });

      // Map parametric nodes to 3D positions
      const nodes = parametricNodes.map(([t]) => [
        startPoint[0] + t * (endPoint[0] - startPoint[0]),
        startPoint[1] + t * (endPoint[1] - startPoint[1]),
        startPoint[2] + t * (endPoint[2] - startPoint[2]),
      ]);

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
