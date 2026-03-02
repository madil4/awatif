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
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeLoadCase?: LoadSelection;
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
      params: (component.params ?? template.defaultParams) as Parameters<
        typeof template.getLoad
      >[0]["params"],
    });

    // Combinations apply per-case factors; individual cases are unfactored
    const componentCase = component.loadCase ?? "dead";
    const factor = isCombination
      ? ULS_COMBINATIONS[activeLoadCase as LoadCombination][componentCase]
      : 1;
    const load: [number, number, number, number, number, number] = [
      rawLoad[0] * factor,
      rawLoad[1] * factor,
      rawLoad[2] * factor,
      rawLoad[3] * factor,
      rawLoad[4] * factor,
      rawLoad[5] * factor,
    ];

    const accumulateLoad = (nodeIdx: number) => {
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
    };

    if (template.geometryKind === "line") {
      component.geometry.forEach((lineId) => {
        const elementIndices = geometryMapping.lineToElements.get(lineId);
        if (!elementIndices) return;
        elementIndices.forEach(accumulateLoad);
      });
    } else {
      component.geometry.forEach((pointId) => {
        const nodeIndices = geometryMapping.pointToNodes.get(pointId);
        if (!nodeIndices) return;
        nodeIndices.forEach(accumulateLoad);
      });
    }
  });

  return loads;
}
