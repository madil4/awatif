import { LoadTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";

export function getLoads({
  components,
  geometryMapping,
  templates,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
}): Map<number, [number, number, number, number, number, number]> {
  const loads = new Map<
    number,
    [number, number, number, number, number, number]
  >();

  const loadComponents = components.get(ComponentsType.LOADS) ?? [];

  loadComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.LOADS)
      ?.get(component.templateId) as LoadTemplate<any>;
    if (!template) return;

    const { load } = template.getLoad({
      params: (component.params ?? template.defaultParams) as Parameters<
        typeof template.getLoad
      >[0]["params"],
    });

    component.geometry.forEach((pointId) => {
      const nodeIndices = geometryMapping.pointToNodes.get(pointId);
      if (!nodeIndices) return;

      // Apply load to all nodes that map to this geometry point
      nodeIndices.forEach((nodeIdx) => {
        const existingLoad = loads.get(nodeIdx);
        if (existingLoad) {
          // Accumulate loads if multiple components target the same node
          loads.set(nodeIdx, [
            existingLoad[0] + load[0],
            existingLoad[1] + load[1],
            existingLoad[2] + load[2],
            existingLoad[3] + load[3],
            existingLoad[4] + load[4],
            existingLoad[5] + load[5],
          ]);
        } else {
          loads.set(nodeIdx, [
            load[0],
            load[1],
            load[2],
            load[3],
            load[4],
            load[5],
          ]);
        }
      });
    });
  });

  return loads;
}
