import { DesignTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";
import type { ActiveAnalysis } from "@awatif/ui";

export function getElementsProps({
  components,
  geometryMapping,
  templates,
  activeAnalysis,
  nodes,
  elements,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
  activeAnalysis?: ActiveAnalysis["val"];
  nodes: number[][];
  elements: number[][];
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

      // Calculate length
      let length = 0;
      elementIndices.forEach((elemIdx) => {
        const [node1Idx, node2Idx] = elements[elemIdx];
        const node1 = nodes[node1Idx];
        const node2 = nodes[node2Idx];

        const dx = node2[0] - node1[0];
        const dy = node2[1] - node1[1];
        const dz = node2[2] - node1[2];

        length += Math.sqrt(dx * dx + dy * dy + dz * dz);
      });

      const props = template.getElementsProps({
        params: (component.params ?? template.defaultParams) as any,
        activeAnalysis,
        length,
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
