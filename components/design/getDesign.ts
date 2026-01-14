import { DesignTemplate } from "./data-model";
import { templates } from "../templates";
import { Components, ComponentsType } from "../data-model";

export function getDesign({
  geometryMapping,
  components,
}: {
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  components: Components["val"];
}): {
  designs: Map<number, { [key: string]: unknown }>;
} {
  const designs = new Map<number, { [key: string]: unknown }>();

  const designComponents = components.get(ComponentsType.DESIGN) ?? [];

  designComponents.forEach((component) => {
    const template = templates.get(ComponentsType.DESIGN)?.[
      component.templateIndex
    ] as DesignTemplate<any>;
    if (!template) return;

    const { design } = template.getDesign({
      params: component.params as Parameters<
        typeof template.getDesign
      >[0]["params"],
    });

    // Design components are associated with lines/elements
    component.geometry.forEach((lineId) => {
      const elementIndices = geometryMapping.lineToElements.get(lineId);
      if (!elementIndices) return;

      // Apply design to all elements that map to this geometry line
      elementIndices.forEach((elementIdx) => {
        const existingDesign = designs.get(elementIdx);
        if (existingDesign) {
          // Merge designs if multiple components target the same element
          designs.set(elementIdx, {
            ...existingDesign,
            ...design,
          });
        } else {
          designs.set(elementIdx, { ...design });
        }
      });
    });
  });

  return { designs };
}
