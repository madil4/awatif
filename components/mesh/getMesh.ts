import { Geometry } from "../data-model";
import { Elements, MeshComponents, Nodes } from "./data-model";
import { meshTemplates } from "./templates";

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
    const template = meshTemplates[component.templateIndex];
    if (!template) return;

    component.geometry.forEach((lineId) => {
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
