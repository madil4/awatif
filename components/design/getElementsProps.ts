import { DesignTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";

export function getElementsProps({
  geometryMapping,
  components,
  templates,
}: {
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  components: Components["val"];
  templates: Map<ComponentsType, any[]>;
}): {
  elementsProps: Map<
    number,
    {
      elasticity: number;
      area: number;
      momentInertia?: number;
      shearModulus?: number;
      torsionalConstant?: number;
    }
  >;
} {
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
    const template = templates.get(ComponentsType.DESIGN)?.[
      component.templateIndex
    ] as DesignTemplate<any>;
    if (!template) return;

    const props = template.getElementsProps({
      params: component.params as Parameters<
        typeof template.getElementsProps
      >[0]["params"],
    });

    component.geometry.forEach((lineId) => {
      const elementIndices = geometryMapping.lineToElements.get(lineId);
      if (!elementIndices) return;

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

  return { elementsProps };
}
