import { Components, ComponentsType, Geometry } from "../data-model";
import { Elements, Nodes, MeshTemplate } from "./data-model";

export function getMesh({
  geometry,
  components,
  templates,
}: {
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
  };
  components: Components["val"];
  templates: Map<ComponentsType, Map<string, any>>;
}): {
  nodes: Nodes;
  elements: Elements;
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
} {
  const allNodes: Nodes = [];
  const allElements: Elements = [];
  const pointToNodes = new Map<number, number[]>();
  const lineToElements = new Map<number, number[]>();

  // Build a mapping from lineId to its MESH component (if any)
  const lineToComponent = new Map<number, (typeof meshComponents)[number]>();
  const meshComponents = components.get(ComponentsType.MESH) ?? [];

  meshComponents.forEach((component) => {
    component.geometry.forEach((lineId) => {
      // First component wins if multiple components reference the same line
      if (!lineToComponent.has(lineId)) {
        lineToComponent.set(lineId, component);
      }
    });
  });

  // Helper to get or create a node for a geometry point
  const getOrCreateNodeForPoint = (
    pointId: number,
    point: [number, number, number],
  ): number => {
    if (pointToNodes.has(pointId)) {
      return pointToNodes.get(pointId)![0];
    }

    const globalIdx = allNodes.length;
    allNodes.push([...point]);
    pointToNodes.set(pointId, [globalIdx]);
    return globalIdx;
  };

  // Loop through all geometry lines
  geometry.lines.forEach((line, lineId) => {
    const [startId, endId] = line;
    const startPoint = geometry.points.get(startId);
    const endPoint = geometry.points.get(endId);

    if (!startPoint || !endPoint) return;

    const component = lineToComponent.get(lineId);

    if (component) {
      // Line has a MESH component - use template's getMesh
      const template = templates
        .get(ComponentsType.MESH)
        ?.get(component.templateId) as MeshTemplate<any>;

      if (!template) {
        // Fallback to simple element if template not found
        meshLineAsSimpleElement(lineId, startId, endId, startPoint, endPoint);
        return;
      }

      const { nodes: parametricNodes, elements } = template.getMesh({
        params: (component.params ?? template.defaultParams) as Parameters<
          typeof template.getMesh
        >[0]["params"],
      });

      // Build local-to-global index mapping to reuse shared nodes
      const localToGlobal = new Map<number, number>();

      parametricNodes.forEach(([t], localIdx) => {
        const isStart = Math.abs(t) < 1e-10;
        const isEnd = Math.abs(t - 1) < 1e-10;

        // Check if we can reuse an existing node for shared geometry points
        if (isStart && pointToNodes.has(startId)) {
          localToGlobal.set(localIdx, pointToNodes.get(startId)![0]);
          return;
        }

        if (isEnd && pointToNodes.has(endId)) {
          localToGlobal.set(localIdx, pointToNodes.get(endId)![0]);
          return;
        }

        // Create new node by mapping parametric position to 3D
        const node: [number, number, number] = [
          startPoint[0] + t * (endPoint[0] - startPoint[0]),
          startPoint[1] + t * (endPoint[1] - startPoint[1]),
          startPoint[2] + t * (endPoint[2] - startPoint[2]),
        ];

        const globalIdx = allNodes.length;
        allNodes.push(node);
        localToGlobal.set(localIdx, globalIdx);

        // Track point-to-node mapping for endpoints
        if (isStart) {
          if (!pointToNodes.has(startId)) pointToNodes.set(startId, []);
          pointToNodes.get(startId)!.push(globalIdx);
        }
        if (isEnd) {
          if (!pointToNodes.has(endId)) pointToNodes.set(endId, []);
          pointToNodes.get(endId)!.push(globalIdx);
        }
      });

      // Remap element indices using the local-to-global mapping
      const remappedElements = elements.map((element) =>
        element.map((localIdx) => localToGlobal.get(localIdx)!),
      );

      const elementStartIdx = allElements.length;
      allElements.push(...remappedElements);

      // Map geometry line to its mesh elements
      lineToElements.set(
        lineId,
        remappedElements.map((_, i) => elementStartIdx + i),
      );
    } else {
      // Line has no MESH component - create a simple 2-node element
      meshLineAsSimpleElement(lineId, startId, endId, startPoint, endPoint);
    }
  });

  // Helper function to mesh a line as a simple 2-node element
  function meshLineAsSimpleElement(
    lineId: number,
    startId: number,
    endId: number,
    startPoint: [number, number, number],
    endPoint: [number, number, number],
  ) {
    const startNodeIdx = getOrCreateNodeForPoint(startId, startPoint);
    const endNodeIdx = getOrCreateNodeForPoint(endId, endPoint);

    const elementIdx = allElements.length;
    allElements.push([startNodeIdx, endNodeIdx]);
    lineToElements.set(lineId, [elementIdx]);
  }

  return {
    nodes: allNodes,
    elements: allElements,
    geometryMapping: { pointToNodes, lineToElements },
  };
}
