import { SupportTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";
import { templates } from "../templates";

export function getSupports({
  geometryMapping,
  components,
}: {
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  components: Components["val"];
}): {
  // Map of node index to support values [Ux, Uy, Uz, Rx, Ry, Rz]
  supports: Map<number, [boolean, boolean, boolean, boolean, boolean, boolean]>;
} {
  const supports = new Map<
    number,
    [boolean, boolean, boolean, boolean, boolean, boolean]
  >();

  const supportComponents = components.get(ComponentsType.SUPPORTS) ?? [];

  supportComponents.forEach((component) => {
    const template = templates.get("SUPPORTS")?.[
      component.templateIndex
    ] as SupportTemplate<any>;
    if (!template) return;

    const { support } = template.getSupport({
      params: component.params as Parameters<
        typeof template.getSupport
      >[0]["params"],
    });

    component.geometry.forEach((pointId) => {
      const nodeIndices = geometryMapping.pointToNodes.get(pointId);
      if (!nodeIndices) return;

      // Apply support to all nodes that map to this geometry point
      nodeIndices.forEach((nodeIdx) => {
        const existingSupport = supports.get(nodeIdx);
        if (existingSupport) {
          // Combine supports if multiple components target the same node
          // A DOF is restrained if ANY support restrains it
          supports.set(nodeIdx, [
            existingSupport[0] || support[0],
            existingSupport[1] || support[1],
            existingSupport[2] || support[2],
            existingSupport[3] || support[3],
            existingSupport[4] || support[4],
            existingSupport[5] || support[5],
          ]);
        } else {
          supports.set(nodeIdx, [
            support[0],
            support[1],
            support[2],
            support[3],
            support[4],
            support[5],
          ]);
        }
      });
    });
  });

  return { supports };
}
