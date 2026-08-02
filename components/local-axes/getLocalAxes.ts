import { LocalAxesAngle, LocalAxesTemplate } from "./data-model";
import { Components, ComponentsType } from "../data-model";

// Only rotated (90°) entries are recorded, so an absent key means "unrotated"
export function getLocalAxesByLine({
  components,
  templates,
}: {
  components: Components["val"];
  templates: Map<ComponentsType, Map<string, any>>;
}): Map<number, LocalAxesAngle> {
  const localAxes = new Map<number, LocalAxesAngle>();

  const localAxesComponents = components.get(ComponentsType.LOCAL_AXES) ?? [];

  localAxesComponents.forEach((component) => {
    const template = templates
      .get(ComponentsType.LOCAL_AXES)
      ?.get(component.templateId) as LocalAxesTemplate<any>;
    if (!template) return;

    const angle = template.getAngle({
      params: { ...template.defaultParams, ...component.params } as Parameters<
        typeof template.getAngle
      >[0]["params"],
    });
    if (angle !== 90) return;

    component.geometry.forEach((lineId) => localAxes.set(lineId, angle));
  });

  return localAxes;
}

export function getLocalAxes({
  components,
  geometryMapping,
  templates,
}: {
  components: Components["val"];
  geometryMapping: {
    lineToElements: Map<number, number[]>;
  };
  templates: Map<ComponentsType, Map<string, any>>;
}): Map<number, LocalAxesAngle> {
  const byLine = getLocalAxesByLine({ components, templates });
  const byElement = new Map<number, LocalAxesAngle>();

  byLine.forEach((angle, lineId) => {
    const elementIndices = geometryMapping.lineToElements.get(lineId);
    if (!elementIndices) return;

    elementIndices.forEach((elementIdx) => byElement.set(elementIdx, angle));
  });

  return byElement;
}
