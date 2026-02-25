import { ReleaseTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";

export function getReleases({
  components,
  geometryMapping,
  templates,
}: {
  components: Components["val"];
  geometryMapping: {
    pointToNodes: Map<number, number[]>;
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
}): Map<number, [boolean, boolean, boolean, boolean]> {
  const releases = new Map<number, [boolean, boolean, boolean, boolean]>();

  const releaseComponents = components.get(ComponentsType.RELEASES) ?? [];

  releaseComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.RELEASES)
      ?.get(component.templateId) as ReleaseTemplate<any>;
    if (!template) return;

    const { release } = template.getRelease({
      params: (component.params ?? template.defaultParams) as Parameters<
        typeof template.getRelease
      >[0]["params"],
    });

    component.geometry.forEach((lineId) => {
      const elementIndices = geometryMapping.lineToElements.get(lineId);
      if (!elementIndices) return;

      elementIndices.forEach((elementIdx) => {
        releases.set(elementIdx, [
          release[0],
          release[1],
          release[2],
          release[3],
        ]);
      });
    });
  });

  return releases;
}
