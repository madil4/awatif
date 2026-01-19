import { Mesh, Components, ComponentsType } from "../data-model";
import { DesignTemplate, LineElementForces, DesignResult } from "./data-model";

export const getDesignResults = ({
  mesh,
  components,
  templates,
}: {
  mesh: Mesh;
  components: Components;
  templates: Map<ComponentsType, any[]>;
}): Map<number, DesignResult> => {
  // Get design components
  const designComponents = components.val.get(ComponentsType.DESIGN) || [];

  // Get internal forces
  const internalForces = mesh.internalForces?.val;
  if (!internalForces) {
    return new Map();
  }

  // Get geometry mapping
  const { lineToElements } = mesh.geometryMapping.val;

  // Create new design results map
  const designResults = new Map<number, DesignResult>();

  // Process each design component
  for (const component of designComponents) {
    const template = templates.get(ComponentsType.DESIGN)?.[
      component.templateIndex
    ] as DesignTemplate<any>;

    // Skip if template doesn't have getDesign function
    if (!template?.getDesign) {
      continue;
    }

    // Process each line in the component's geometry
    for (const lineId of component.geometry) {
      // Get elements for this line
      const elementIndices = lineToElements.get(lineId);
      if (!elementIndices || elementIndices.length === 0) {
        continue;
      }

      // Get forces for each element
      const elementForces = elementIndices
        .map((elemIdx) => internalForces.get(elemIdx))
        .filter((forces): forces is typeof forces & {} => forces !== undefined);

      if (elementForces.length === 0) {
        continue;
      }

      // Create LineElementForces object
      const lineElementForces: LineElementForces = {
        elementIndices,
        elementForces,
      };

      // Compute design result
      const designResult = template.getDesign({
        params: component.params,
        lineElementForces,
      });

      // Store result (if multiple components affect same line, keep worst utilization)
      const existingResult = designResults.get(lineId);
      if (
        !existingResult ||
        designResult.utilization > existingResult.utilization
      ) {
        designResults.set(lineId, designResult);
      }
    }
  }

  return designResults;
};
