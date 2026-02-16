import { Mesh, Components, ComponentsType } from "../data-model";
import type { DesignTemplate, LineElementForces } from "./data-model";
import type { ActiveAnalysis } from "@awatif/ui";

export const getDesigns = ({
  mesh,
  components,
  templates,
  activeAnalysis,
}: {
  mesh: {
    nodes: Mesh["nodes"]["val"];
    elements: Mesh["elements"]["val"];
    geometryMapping: Mesh["geometryMapping"]["val"];
    internalForces: Mesh["internalForces"]["val"];
  };
  components: Components["val"];
  templates: Map<ComponentsType, Map<string, any>>;
  activeAnalysis?: ActiveAnalysis["val"];
}): Map<number, Record<string, any>> => {
  // Get design components
  const designComponents = components.get(ComponentsType.DESIGN) || [];

  // Get internal forces
  const internalForces = mesh.internalForces;
  if (!internalForces) {
    return new Map();
  }

  // Get geometry mapping
  const { lineToElements } = mesh.geometryMapping;

  // Build line → imperfection params lookup from imperfection components
  const imperfectionComponents =
    components.get(ComponentsType.IMPERFECTIONS) ?? [];
  const lineToImperfections = new Map<number, Record<string, unknown>>();
  for (const mc of imperfectionComponents) {
    const impTemplate = templates
      .get(ComponentsType.IMPERFECTIONS)
      ?.get(mc.templateId);
    const impParams = (mc.params ?? impTemplate?.defaultParams) as
      | Record<string, unknown>
      | undefined;
    if (!impParams) continue;
    for (const lineId of mc.geometry) {
      lineToImperfections.set(lineId, impParams);
    }
  }

  // Create new design results map
  const designResults = new Map<number, Record<string, any>>();

  // Process each design component
  for (const component of designComponents) {
    const template = templates
      .get(ComponentsType.DESIGN)
      ?.get(component.templateId) as DesignTemplate<any, any>;

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

      // Calculate length
      let length = 0;
      const nodes = mesh.nodes;
      const elements = mesh.elements;

      for (const elemIdx of elementIndices) {
        const [node1Idx, node2Idx] = elements[elemIdx];
        const node1 = nodes[node1Idx];
        const node2 = nodes[node2Idx];

        const dx = node2[0] - node1[0];
        const dy = node2[1] - node1[1];
        const dz = node2[2] - node1[2];

        length += Math.sqrt(dx * dx + dy * dy + dz * dz);
      }

      // Compute design result
      const designResult = template.getDesign({
        params: component.params ?? template.defaultParams,
        lineElementForces,
        length,
        activeAnalysis,
        imperfections: lineToImperfections.get(lineId),
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
