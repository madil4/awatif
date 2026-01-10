import { Geometry } from "../data-model";
import { Elements, Components, Nodes, MeshTemplate } from "./data-model";
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

  // Track which lines have been meshed to prevent duplicate meshing
  const meshedLines = new Set<number>();

  const meshComponents = components.get("MESH") ?? [];

  meshComponents.forEach((component) => {
    const template = templates.get("MESH")?.[
      component.templateIndex
    ] as MeshTemplate<any>;
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
        element.map((localIdx) => localToGlobal.get(localIdx)!)
      );

      const elementStartIdx = allElements.length;
      allElements.push(...remappedElements);

      // Map geometry line to its mesh elements
      lineToElements.set(
        lineId,
        remappedElements.map((_, i) => elementStartIdx + i)
      );
    });
  });

  return {
    nodes: allNodes,
    elements: allElements,
    geometryMapping: { pointToNodes, lineToElements },
  };
}
