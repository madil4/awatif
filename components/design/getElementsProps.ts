import { DesignTemplate } from "./data-model";
import { Components, ComponentsType, ElementProps } from "../data-model";
import type { ActiveAnalysis } from "./data-model";
import { genericMember } from "./generic-member/genericMember";

export function getElementsProps({
  components,
  geometryMapping,
  templates,
  activeAnalysis,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeAnalysis?: ActiveAnalysis;
}): Map<number, ElementProps> {
  const elementsProps = new Map<number, ElementProps>();

  const designComponents = components.get(ComponentsType.DESIGN) ?? [];

  designComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.DESIGN)
      ?.get(component.templateId) as DesignTemplate<any, any>;
    if (!template) return;

    component.geometry.forEach((lineId) => {
      const elementIndices = geometryMapping.lineToElements.get(lineId);
      if (!elementIndices) return;

      const props = template.getElementsProps({
        params: ({ ...template.defaultParams, ...component.params }) as any,
        activeAnalysis: activeAnalysis ?? "linear",
      });

      // Apply properties to all elements that map to this geometry line
      elementIndices.forEach((elementIdx) => {
        elementsProps.set(elementIdx, props);
      });
    });
  });

  const DEFAULT_PROPS = genericMember.getElementsProps({
    params: genericMember.defaultParams,
    activeAnalysis: activeAnalysis ?? "linear",
  });

  geometryMapping.lineToElements.forEach((elementIndices) => {
    elementIndices.forEach((elementIdx) => {
      if (!elementsProps.has(elementIdx)) {
        elementsProps.set(elementIdx, DEFAULT_PROPS);
      }
    });
  });

  return elementsProps;
}
