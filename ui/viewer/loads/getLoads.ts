import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
  LoadSelection,
} from "@awatif/components";

export function getLoads({
  geometry,
  components,
  templates,
  displayScale,
  render,
  display,
}: {
  geometry: Geometry;
  components: Components;
  templates: typeof Templates;
  displayScale: State<number>;
  render: () => void;
  display?: { loads: State<boolean>; loadCase?: State<LoadSelection> };
}): THREE.Group {
  const group = new THREE.Group();

  // Add reactive visibility
  if (display?.loads) {
    van.derive(() => {
      group.visible = display.loads.val;
      render();
    });
  }

  // Use van.derive to reactively update when components or geometry changes
  van.derive(() => {
    // Clear existing load visualizations
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const s = displayScale.val;
    const allLoadComponents = components.val.get(ComponentsType.LOADS) ?? [];
    const activeLoadCase = display?.loadCase?.val;
    const isCombination =
      activeLoadCase === "uls-live" || activeLoadCase === "uls-wind";
    // Combinations show all loads; individual cases filter to that case
    const loadComponents =
      activeLoadCase && !isCombination
        ? allLoadComponents.filter(
            (c) => (c.loadCase ?? "dead") === activeLoadCase,
          )
        : allLoadComponents;
    const points = geometry.points.val;

    loadComponents.forEach((component) => {
      // Get the template for this component
      const loadTemplates = templates.get(ComponentsType.LOADS);
      if (!loadTemplates) return;

      const template = loadTemplates.get(component.templateId);
      if (!template || !("getObject3D" in template)) return;

      if (template.geometryKind === "line") {
        const lines = geometry.lines.val;
        component.geometry.forEach((lineId) => {
          const line = lines.get(lineId);
          if (!line) return;
          const start = points.get(line[0]) as [number, number, number] | undefined;
          const end = points.get(line[1]) as [number, number, number] | undefined;
          if (!start || !end) return;
          const position: [number, number, number] = [
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2,
          ];
          const loadObject = template.getObject3D?.({
            params: (component.params ?? template.defaultParams) as any,
            position,
            displayScale: s,
            line: { start, end },
          });
          if (loadObject) group.add(loadObject);
        });
      } else {
        component.geometry.forEach((pointId) => {
          const position = points.get(pointId);
          if (!position) return;
          const loadObject = template.getObject3D?.({
            params: (component.params ?? template.defaultParams) as any,
            position: position as [number, number, number],
            displayScale: s,
          });
          if (loadObject) group.add(loadObject);
        });
      }
    });

    render();
  });

  return group;
}
