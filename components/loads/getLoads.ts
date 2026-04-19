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

    const { load: rawLoad, coordinateSystem = "local" } = template.getLoad({
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
      // Line-based template: convert distributed load to equivalent global nodal loads.
      // coordinateSystem "local": rawLoad is [Nx, Qy, Qz, ...] in element local coords.
      // coordinateSystem "global": rawLoad is [Fx, Fy, Fz, ...] in global coords.
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
          const dz = (pos2[2] ?? 0) - (pos1[2] ?? 0);
          const L = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (L === 0) return;

          let nodalLoad: [number, number, number, number, number, number];

          if (coordinateSystem === "global") {
            // Global load: apply directly scaled by L/2 at each end
            nodalLoad = [
              rawLoad[0] * factor * L * 0.5,
              rawLoad[1] * factor * L * 0.5,
              rawLoad[2] * factor * L * 0.5,
              0,
              0,
              0,
            ];
          } else {
            // Local coordinate system
            // Local y: perpendicular to member, 90° clockwise in XY plane (legacy 2D convention)
            const perpX = dy / L;
            const perpY = -dx / L;
            const qy = rawLoad[1] * factor;

            // Local z: project global Z perpendicular to element axis
            const lx = [dx / L, dy / L, dz / L];
            const dotZ = lx[2]; // dot with [0, 0, 1]
            let lz: [number, number, number];
            if (Math.abs(dotZ) < 0.99) {
              const lzx = -dotZ * lx[0];
              const lzy = -dotZ * lx[1];
              const lzz = 1 - dotZ * lx[2];
              const lzLen = Math.sqrt(lzx * lzx + lzy * lzy + lzz * lzz);
              lz = [lzx / lzLen, lzy / lzLen, lzz / lzLen];
            } else {
              // Vertical member: use global X as reference
              const dotX = lx[0];
              const lzx = 1 - dotX * lx[0];
              const lzy = -dotX * lx[1];
              const lzz = -dotX * lx[2];
              const lzLen = Math.sqrt(lzx * lzx + lzy * lzy + lzz * lzz);
              lz = [lzx / lzLen, lzy / lzLen, lzz / lzLen];
            }
            const qz = rawLoad[2] * factor;

            nodalLoad = [
              (qy * perpX + qz * lz[0]) * L * 0.5,
              (qy * perpY + qz * lz[1]) * L * 0.5,
              qz * lz[2] * L * 0.5,
              0,
              0,
              0,
            ];
          }

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
