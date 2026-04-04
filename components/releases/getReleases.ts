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
      params: ({ ...template.defaultParams, ...component.params }) as Parameters<
        typeof template.getRelease
      >[0]["params"],
    });

    component.geometry.forEach((lineId) => {
      const elementIndices = geometryMapping.lineToElements.get(lineId);
      if (!elementIndices) return;

      elementIndices.forEach((elementIdx, i) => {
        const isFirst = i === 0;
        const isLast = i === elementIndices.length - 1;
        releases.set(elementIdx, [
          isFirst ? release[0] : false,
          isFirst ? release[1] : false,
          isLast ? release[2] : false,
          isLast ? release[3] : false,
        ]);
      });
    });
  });

  return releases;
}
