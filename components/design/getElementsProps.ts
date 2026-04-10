import { DesignTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";
import type { ActiveAnalysis } from "./data-model";

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
}): Map<
  number,
  {
    elasticity: number;
    area: number;
    momentInertia?: number;
    shearModulus?: number;
    torsionalConstant?: number;
  }
> {
  const elementsProps = new Map<
    number,
    {
      elasticity: number;
      area: number;
      momentInertia?: number;
      shearModulus?: number;
      torsionalConstant?: number;
    }
  >();

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
        elementsProps.set(elementIdx, {
          elasticity: props.elasticity,
          area: props.area,
          momentInertia: props.momentInertia,
          shearModulus: props.shearModulus,
          torsionalConstant: props.torsionalConstant,
        });
      });
    });
  });

  // Fill default RC-beam props for elements with no design assigned
  const DEFAULT_PROPS = {
    elasticity: 32_836_580,   // kN/m² — C30 Ecm, uncracked
    area: 0.0625,             // m²    — 250×250 mm
    momentInertia: 3.2552e-4, // m⁴   — 250×250 mm rectangular
  };

  geometryMapping.lineToElements.forEach((elementIndices) => {
    elementIndices.forEach((elementIdx) => {
      if (!elementsProps.has(elementIdx)) {
        elementsProps.set(elementIdx, DEFAULT_PROPS);
      }
    });
  });

  return elementsProps;
}
