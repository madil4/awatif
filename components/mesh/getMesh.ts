import { Components, ComponentsType, Geometry, Mesh } from "../data-model";
import { MeshTemplate, PolygonMeshTemplate } from "./data-model";
import { applyImperfections } from "../imperfections/applyImperfections";

/**
 * Converts geometry lines and polygons into mesh nodes and elements.
 *
 * For each line:
 * - If a mesh component is assigned → uses that component's template and params
 * - If no component → auto-applies a single element mesh (no subdivision)
 *
 * For each polygon:
 * - Triangulated into 3-node shell elements with the triangle-mesh template,
 *   using the params of a triangle-mesh MESH component assigned to the
 *   polygon (defaults if none)
 */
export function getMesh({
  geometry,
  components,
  templates,
}: {
  components: Components["val"];
  geometry: {
    points: Geometry["points"]["val"];
    lines: Geometry["lines"]["val"];
    polygons?: Geometry["polygons"]["val"];
  };
  templates: Map<ComponentsType, Map<string, any>>;
}): {
  nodes: Mesh["nodes"]["val"];
  elements: Mesh["elements"]["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
    polygonToElements: Map<number, number[]>;
  };
} {
  const allNodes: Mesh["nodes"]["val"] = [];
  const allElements: Mesh["elements"]["val"] = [];
  const pointToNodes = new Map<number, number[]>();
  const lineToElements = new Map<number, number[]>();
  const polygonToElements = new Map<number, number[]>();

  const regularComponents = components.get(ComponentsType.MESH) ?? [];
  const imperfectionComponents =
    components.get(ComponentsType.IMPERFECTIONS) ?? [];

  // Build mappings from lineId/polygonId to their MESH component (if any).
  // Line IDs and polygon IDs are independent number spaces: polygon mesh
  // components (templates with getPolygonMesh) reference polygons, the rest
  // reference lines
  const lineToComponent = new Map<number, (typeof regularComponents)[number]>();
  const polygonToComponent = new Map<
    number,
    (typeof regularComponents)[number]
  >();

  regularComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.MESH)
      ?.get(component.templateId);
    const target =
      template && "getPolygonMesh" in template
        ? polygonToComponent
        : lineToComponent;

    component.geometry.forEach((id) => {
      // First component wins if multiple components reference the same id
      if (!target.has(id)) {
        target.set(id, component);
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
        { ...template.defaultParams, ...component.params },
        allNodes,
        allElements,
        pointToNodes,
        lineToElements,
      );
    } else {
      // No component: auto-apply a simple element (no subdivision)
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
    }
  });

  // Mesh geometry polygons into 3-node shell elements
  geometry.polygons?.forEach((polygon, polygonId) => {
    if (polygon.length < 3) return;

    const points = polygon.map((pointId) => geometry.points.get(pointId));
    if (points.some((p) => !p)) return;

    const template = templates
      .get(ComponentsType.MESH)
      ?.get("triangle-mesh") as PolygonMeshTemplate<any>;
    if (!template) return;

    // Params come from a triangle-mesh MESH component assigned to this polygon
    const component = polygonToComponent.get(polygonId);

    const { nodes, elements } = template.getPolygonMesh({
      points: points as [number, number, number][],
      params: { ...template.defaultParams, ...component?.params },
    });

    // Local-to-global remap; polygon corner i is output node i (the
    // triangulation preserves input vertices first), so corners register in
    // pointToNodes and reuse nodes shared with meshed lines
    const localToGlobal = new Map<number, number>();

    nodes.forEach((node, localIdx) => {
      const pointId = polygon[localIdx]; // undefined for interior nodes

      if (pointId !== undefined && pointToNodes.has(pointId)) {
        localToGlobal.set(localIdx, pointToNodes.get(pointId)![0]);
        return;
      }

      const globalIdx = allNodes.length;
      allNodes.push([...node] as [number, number, number]);
      localToGlobal.set(localIdx, globalIdx);

      if (pointId !== undefined) pointToNodes.set(pointId, [globalIdx]);
    });

    const remappedElements = elements.map((element) =>
      element.map((localIdx) => localToGlobal.get(localIdx)!),
    );

    const elementStartIdx = allElements.length;
    allElements.push(...remappedElements);

    polygonToElements.set(
      polygonId,
      remappedElements.map((_, i) => elementStartIdx + i),
    );
  });

  applyImperfections(
    imperfectionComponents,
    templates,
    geometry,
    allNodes,
    allElements,
    lineToElements,
    pointToNodes,
  );

  return {
    nodes: allNodes,
    elements: allElements,
    geometryMapping: { pointToNodes, lineToElements, polygonToElements },
  };
}

// Helpers
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
  const { nodes: parametricNodes, elements } = template.getMesh({ params });

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
