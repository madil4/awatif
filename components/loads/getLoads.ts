import {
  LoadTemplate,
  LoadSelection,
  LoadCombination,
  ULS_COMBINATIONS,
} from "./data-model";
import { Components, ComponentsType } from "../data-model";

export function getLoads({
  components,
  geometryMapping,
  templates,
  activeLoadCase,
  nodes,
  elements,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeLoadCase?: LoadSelection;
  nodes?: number[][];
  elements?: number[][];
}): Map<number, [number, number, number, number, number, number]> {
  const loads = new Map<
    number,
    [number, number, number, number, number, number]
  >();

  const allLoadComponents = components.get(ComponentsType.LOADS) ?? [];
  const isCombination =
    activeLoadCase === "uls-live" || activeLoadCase === "uls-wind";

  // Combinations include all loads; individual cases filter to that case
  const loadComponents =
    activeLoadCase && !isCombination
      ? allLoadComponents.filter(
          (c) => (c.loadCase ?? "dead") === activeLoadCase,
        )
      : allLoadComponents;

  loadComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.LOADS)
      ?.get(component.templateId) as LoadTemplate<any>;
    if (!template) return;

    const { load: rawLoad } = template.getLoad({
      params: ({ ...template.defaultParams, ...component.params }) as Parameters<
        typeof template.getLoad
      >[0]["params"],
    });

    // Combinations apply per-case factors; individual cases are unfactored
    const componentCase = component.loadCase ?? "dead";
    const factor = isCombination
      ? ULS_COMBINATIONS[activeLoadCase as LoadCombination][componentCase]
      : 1;

    if (template.geometryKind === "line") {
      // Line-based template: rawLoad is in LOCAL element coordinates [Nx, Qy, Qz, Mx, My, Mz]
      // Convert to equivalent global nodal loads using the element direction vector
      if (!nodes || !elements) return;

      component.geometry.forEach((lineId) => {
        const elementIndices = geometryMapping.lineToElements.get(lineId);
        if (!elementIndices) return;

        elementIndices.forEach((elemIdx) => {
          const elem = elements[elemIdx];
          if (!elem || elem.length < 2) return;

          const [n1, n2] = elem;
          const pos1 = nodes[n1];
          const pos2 = nodes[n2];
          if (!pos1 || !pos2) return;

          const dx = pos2[0] - pos1[0];
          const dy = pos2[1] - pos1[1];
          const L = Math.sqrt(dx * dx + dy * dy);
          if (L === 0) return;

          // Local y unit vector (perpendicular to member, 90° clockwise in XY plane)
          const perpX = dy / L;
          const perpY = -dx / L;

          // rawLoad[1] is the load per unit length in the local y direction
          // Equivalent nodal load at each end = w * L / 2 in global coords
          const qy = rawLoad[1] * factor;
          const nodalFx = qy * perpX * L * 0.5;
          const nodalFy = qy * perpY * L * 0.5;

          const nodalLoad: [number, number, number, number, number, number] = [
            nodalFx,
            nodalFy,
            0,
            0,
            0,
            0,
          ];

          accumulateLoad(loads, n1, nodalLoad);
          accumulateLoad(loads, n2, nodalLoad);
        });
      });
    } else {
      // Point-based template (default): apply load directly to mapped nodes
      const load: [number, number, number, number, number, number] = [
        rawLoad[0] * factor,
        rawLoad[1] * factor,
        rawLoad[2] * factor,
        rawLoad[3] * factor,
        rawLoad[4] * factor,
        rawLoad[5] * factor,
      ];

      component.geometry.forEach((pointId) => {
        const nodeIndices = geometryMapping.pointToNodes.get(pointId);
        if (!nodeIndices) return;

        // Apply load to all nodes that map to this geometry point
        nodeIndices.forEach((nodeIdx) => {
          accumulateLoad(loads, nodeIdx, load);
        });
      });
    }
  });

  return loads;
}

function accumulateLoad(
  loads: Map<number, [number, number, number, number, number, number]>,
  nodeIdx: number,
  load: [number, number, number, number, number, number],
) {
  const existingLoad = loads.get(nodeIdx);
  if (existingLoad) {
    loads.set(nodeIdx, [
      existingLoad[0] + load[0],
      existingLoad[1] + load[1],
      existingLoad[2] + load[2],
      existingLoad[3] + load[3],
      existingLoad[4] + load[4],
      existingLoad[5] + load[5],
    ]);
  } else {
    loads.set(nodeIdx, [...load]);
  }
}
