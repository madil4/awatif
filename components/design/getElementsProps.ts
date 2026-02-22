import { DesignTemplate, LineElementForces } from "./data-model";
import { Components, ComponentsType, Mesh } from "../data-model";
import type { ActiveAnalysis } from "@awatif/ui";

export function getElementsProps({
  components,
  geometryMapping,
  templates,
  activeAnalysis,
  internalForces,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeAnalysis?: ActiveAnalysis["val"];
  internalForces?: Mesh["internalForces"]["val"];
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

      // Build lineElementForces if internalForces available (for second-pass K2)
      let lineElementForces: LineElementForces | undefined;
      if (internalForces) {
        const elementForces = elementIndices
          .map((elemIdx) => internalForces.get(elemIdx))
          .filter((forces) => forces !== undefined);
        if (elementForces.length > 0) {
          lineElementForces = { elementIndices, elementForces };
        }
      }

      const props = template.getElementsProps({
        params: (component.params ?? template.defaultParams) as any,
        activeAnalysis,
        lineElementForces,
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
