import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
  ActiveLoadSelection,
  getCombinationFactors,
  resolveLoadInclusion,
} from "@awatif/components";
import { getLineLoadLabels, getPointLoadLabels } from "./getLoadLabels";

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
  display?: {
    loads: State<boolean>;
    activeLoadSelection?: State<ActiveLoadSelection>;
  };
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
    // Show exactly the loads the active selection analyses, at their
    // unfactored magnitudes
    const selection = display?.activeLoadSelection?.val ?? null;
    const combinationFactors =
      selection?.kind === "combination"
        ? getCombinationFactors(components.val, selection.id)
        : undefined;
    const loadComponents = allLoadComponents.filter(
      (c) =>
        resolveLoadInclusion(c.loadCase, selection, combinationFactors).included,
    );
    const points = geometry.points.val;
    const lines = geometry.lines.val;

    loadComponents.forEach((component) => {
      // Get the template for this component
      const loadTemplates = templates.get(ComponentsType.LOADS);
      if (!loadTemplates) return;

      const template = loadTemplates.get(component.templateId);
      if (!template) return;

      const params = {
        ...template.defaultParams,
        ...component.params,
      } as any;

      if (template.geometryKind === "line") {
        // Line-based template: use getLineObject3D
        component.geometry.forEach((lineId) => {
          const linePair = lines.get(lineId);
          if (!linePair) return;

          const startPos = points.get(linePair[0]);
          const endPos = points.get(linePair[1]);
          if (!startPos || !endPos) return;

          const startPosition = startPos as [number, number, number];
          const endPosition = endPos as [number, number, number];

          const loadObject = template.getLineObject3D?.({
            params,
            startPosition,
            endPosition,
            displayScale: s,
          });

          if (loadObject) group.add(loadObject);

          // Values are labelled here, not by the template, so every template
          // — built-in or plugin — shows its numbers the same way
          getLineLoadLabels({
            template,
            params,
            startPosition,
            endPosition,
            displayScale: s,
          }).forEach((label) => group.add(label));
        });
      } else {
        // Point-based template (default): use getObject3D
        component.geometry.forEach((pointId) => {
          const point = points.get(pointId);
          if (!point) return;

          const position = point as [number, number, number];

          const loadObject = template.getObject3D?.({
            params,
            position,
            displayScale: s,
          });

          if (loadObject) group.add(loadObject);

          getPointLoadLabels({
            template,
            params,
            position,
            displayScale: s,
          }).forEach((label) => group.add(label));
        });
      }
    });

    render();
  });

  return group;
}