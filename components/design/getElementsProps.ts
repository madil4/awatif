import { DesignTemplate } from "./data-model";
import { Mesh, Components, ComponentsType } from "../data-model";
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
      ?.get(component.templateId) as DesignTemplate<any>;
    if (!template) return;

    component.geometry.forEach((lineId) => {
      const elementIndices = geometryMapping.lineToElements.get(lineId);
      if (!elementIndices) return;

      const elementForces = elementIndices
        .map((elemIdx) => internalForces?.get(elemIdx))
        .filter((forces): forces is typeof forces & {} => forces !== undefined);

      const lineElementForces =
        elementForces.length > 0
          ? { elementIndices, elementForces }
          : undefined;

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

  return elementsProps;
}
