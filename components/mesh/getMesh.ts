import { Components, ComponentsType, Geometry, Mesh } from "../data-model";
import { MeshTemplate } from "./data-model";
import { applyImperfections } from "./imperfections/applyImperfections";

/**
 * Converts geometry lines into mesh nodes and elements.
 *
 * For each line:
 * - If a mesh component is assigned → uses that component's template and params
 * - If no component + linear analysis → creates a single 2-node element
 * - If no component + nonlinear analysis → auto-applies the "line-mesh" template
 *   with default spacing to subdivide the line
 */
export function getMesh({
  geometry,
  components,
  templates,
  activeAnalysis,
}: {
  components: Components["val"];
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeAnalysis: string;
}): {
  nodes: Mesh["nodes"]["val"];
  elements: Mesh["elements"]["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
} {
  const allNodes: Mesh["nodes"]["val"] = [];
  const allElements: Mesh["elements"]["val"] = [];
  const pointToNodes = new Map<number, number[]>();
  const lineToElements = new Map<number, number[]>();

  // Separate regular mesh components from imperfection components
  const allMeshComponents = components.get(ComponentsType.MESH) ?? [];
  const regularComponents = allMeshComponents.filter(
    (c) => c.templateId !== "imperfections",
  );
  const imperfectionComponents = allMeshComponents.filter(
    (c) => c.templateId === "imperfections",
  );

  // Build a mapping from lineId to its regular MESH component (if any)
  const lineToComponent = new Map<number, (typeof regularComponents)[number]>();

  regularComponents.forEach((component) => {
    component.geometry.forEach((lineId) => {
      // First component wins if multiple components reference the same line
      if (!lineToComponent.has(lineId)) {
        lineToComponent.set(lineId, component);
      }
    });
  });

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
        meshLineAsSimpleElement(
          lineId,
          startId,
          endId,
          startPoint,
          endPoint,
          allNodes,
          allElements,
          pointToNodes,
          lineToElements,
        );
        return;
      }

      meshLineWithTemplate(
        lineId,
        startId,
        endId,
        startPoint,
        endPoint,
        template,
        component.params ?? template.defaultParams,
        allNodes,
        allElements,
        pointToNodes,
        lineToElements,
      );
    } else if (activeAnalysis === "linear") {
      // Linear analysis: simple 2-node element (no subdivision needed)
      meshLineAsSimpleElement(
        lineId,
        startId,
        endId,
        startPoint,
        endPoint,
        allNodes,
        allElements,
        pointToNodes,
        lineToElements,
      );
    } else {
      // Nonlinear analysis: use default line-mesh template for subdivision
      const defaultTemplate = templates
        .get(ComponentsType.MESH)
        ?.get("line-mesh") as MeshTemplate<any> | undefined;

      if (!defaultTemplate) {
        meshLineAsSimpleElement(
          lineId,
          startId,
          endId,
          startPoint,
          endPoint,
          allNodes,
          allElements,
          pointToNodes,
          lineToElements,
        );
        return;
      }

      meshLineWithTemplate(
        lineId,
        startId,
        endId,
        startPoint,
        endPoint,
        defaultTemplate,
        defaultTemplate.defaultParams,
        allNodes,
        allElements,
        pointToNodes,
        lineToElements,
      );
    }
  });

  // Apply imperfections only for nonlinear analysis
  // (for linear analysis, imperfections are added analytically in the design calculation)
  if (activeAnalysis !== "linear") {
    applyImperfections(
      imperfectionComponents,
      templates,
      geometry,
      allNodes,
      allElements,
      lineToElements,
      pointToNodes,
    );
  }

  return {
    nodes: allNodes,
    elements: allElements,
    geometryMapping: { pointToNodes, lineToElements },
  };
}

// Helpers
function computeLineLength(
  startPoint: [number, number, number],
  endPoint: [number, number, number],
): number {
  return Math.sqrt(
    (endPoint[0] - startPoint[0]) ** 2 +
      (endPoint[1] - startPoint[1]) ** 2 +
      (endPoint[2] - startPoint[2]) ** 2,
  );
}

function getOrCreateNodeForPoint(
  pointId: number,
  point: [number, number, number],
  allNodes: Mesh["nodes"]["val"],
  pointToNodes: Map<number, number[]>,
): number {
  if (pointToNodes.has(pointId)) {
    return pointToNodes.get(pointId)![0];
  }

  const globalIdx = allNodes.length;
  allNodes.push([...point]);
  pointToNodes.set(pointId, [globalIdx]);
  return globalIdx;
}

function meshLineAsSimpleElement(
  lineId: number,
  startId: number,
  endId: number,
  startPoint: [number, number, number],
  endPoint: [number, number, number],
  allNodes: Mesh["nodes"]["val"],
  allElements: Mesh["elements"]["val"],
  pointToNodes: Map<number, number[]>,
  lineToElements: Map<number, number[]>,
) {
  const startNodeIdx = getOrCreateNodeForPoint(
    startId,
    startPoint,
    allNodes,
    pointToNodes,
  );
  const endNodeIdx = getOrCreateNodeForPoint(
    endId,
    endPoint,
    allNodes,
    pointToNodes,
  );

  const elementIdx = allElements.length;
  allElements.push([startNodeIdx, endNodeIdx]);
  lineToElements.set(lineId, [elementIdx]);
}

function meshLineWithTemplate(
  lineId: number,
  startId: number,
  endId: number,
  startPoint: [number, number, number],
  endPoint: [number, number, number],
  template: MeshTemplate<any>,
  params: any,
  allNodes: Mesh["nodes"]["val"],
  allElements: Mesh["elements"]["val"],
  pointToNodes: Map<number, number[]>,
  lineToElements: Map<number, number[]>,
) {
  const lineLength = computeLineLength(startPoint, endPoint);

  const { nodes: parametricNodes, elements } = template.getMesh({
    params,
    lineLength,
  });

  // Build local-to-global index mapping to reuse shared nodes
  const localToGlobal = new Map<number, number>();

  parametricNodes.forEach(([t], localIdx) => {
    const isStart = Math.abs(t) < 1e-10;
    const isEnd = Math.abs(t - 1) < 1e-10;

    if (isStart && pointToNodes.has(startId)) {
      localToGlobal.set(localIdx, pointToNodes.get(startId)![0]);
      return;
    }

    if (isEnd && pointToNodes.has(endId)) {
      localToGlobal.set(localIdx, pointToNodes.get(endId)![0]);
      return;
    }

    const node: [number, number, number] = [
      startPoint[0] + t * (endPoint[0] - startPoint[0]),
      startPoint[1] + t * (endPoint[1] - startPoint[1]),
      startPoint[2] + t * (endPoint[2] - startPoint[2]),
    ];

    const globalIdx = allNodes.length;
    allNodes.push(node);
    localToGlobal.set(localIdx, globalIdx);

    if (isStart) {
      if (!pointToNodes.has(startId)) pointToNodes.set(startId, []);
      pointToNodes.get(startId)!.push(globalIdx);
    }
    if (isEnd) {
      if (!pointToNodes.has(endId)) pointToNodes.set(endId, []);
      pointToNodes.get(endId)!.push(globalIdx);
    }
  });

  const remappedElements = elements.map((element) =>
    element.map((localIdx) => localToGlobal.get(localIdx)!),
  );

  const elementStartIdx = allElements.length;
  allElements.push(...remappedElements);

  lineToElements.set(
    lineId,
    remappedElements.map((_, i) => elementStartIdx + i),
  );
}
