import { DesignTemplate } from "./data-model";
import { Components, ComponentsType, ElementProps } from "../data-model";
import type { ActiveAnalysis } from "./data-model";
import { genericMember } from "./generic-member/genericMember";
import { genericShell } from "./generic-shell/genericShell";

export function getElementsProps({
  components,
  geometryMapping,
  templates,
  activeAnalysis,
  elements,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
    polygonToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeAnalysis?: ActiveAnalysis;
  elements?: number[][];
}): Map<number, ElementProps> {
  const elementsProps = new Map<number, ElementProps>();

  const designComponents = components.get(ComponentsType.DESIGN) ?? [];

  designComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.DESIGN)
      ?.get(component.templateId) as DesignTemplate<any, any>;
    if (!template) return;

    // Polygon design components reference polygon IDs → shell elements;
    // line design components reference line IDs → frame elements
    const idToElements =
      template.geometryKind === "polygon"
        ? geometryMapping.polygonToElements
        : geometryMapping.lineToElements;

    component.geometry.forEach((geometryId) => {
      const elementIndices = idToElements.get(geometryId);
      if (!elementIndices) return;

      const props = template.getElementsProps({
        params: ({ ...template.defaultParams, ...component.params }) as any,
        activeAnalysis: activeAnalysis ?? "linear",
      });

      // Apply properties to all elements that map to this geometry
      elementIndices.forEach((elementIdx) => {
        elementsProps.set(elementIdx, props);
      });
    });
  });

  const DEFAULT_PROPS = genericMember.getElementsProps({
    params: genericMember.defaultParams,
    activeAnalysis: activeAnalysis ?? "linear",
  });

  // Fallback for shell (3-node) elements whose polygon has no DESIGN component
  const SHELL_DEFAULT_PROPS = genericShell.getElementsProps({
    params: genericShell.defaultParams,
    activeAnalysis: activeAnalysis ?? "linear",
  });

  if (elements) {
    elements.forEach((element, elementIdx) => {
      if (!elementsProps.has(elementIdx)) {
        elementsProps.set(
          elementIdx,
          element.length === 3 ? SHELL_DEFAULT_PROPS : DEFAULT_PROPS,
        );
      }
    });
  } else {
    geometryMapping.lineToElements.forEach((elementIndices) => {
      elementIndices.forEach((elementIdx) => {
        if (!elementsProps.has(elementIdx)) {
          elementsProps.set(elementIdx, DEFAULT_PROPS);
        }
      });
    });
  }

  return elementsProps;
}
