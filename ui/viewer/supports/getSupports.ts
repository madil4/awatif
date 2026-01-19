import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
} from "@awatif/components";

export function getSupports({
  geometry,
  components,
  templates,
  render,
  display,
}: {
  geometry: Geometry;
  components: Components;
  templates: typeof Templates;
  render: () => void;
  display?: { supports: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  // Add reactive visibility
  if (display?.supports) {
    van.derive(() => {
      group.visible = display.supports.val;
      render();
    });
  }

  // Use van.derive to reactively update when components or geometry changes
  van.derive(() => {
    // Clear existing support visualizations
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const supportComponents = components.val.get(ComponentsType.SUPPORTS) ?? [];
    const points = geometry.points.val;

    supportComponents.forEach((component) => {
      // Get the template for this component
      const supportTemplates = templates.get(ComponentsType.SUPPORTS);
      if (!supportTemplates) return;

      const template = supportTemplates.get(component.templateId);
      if (!template || !("getObject3D" in template)) return;

      // For each geometry point in the component, create a visualization
      component.geometry.forEach((pointId) => {
        const position = points.get(pointId);
        if (!position) return;

        // Call the template's getObject3D function
        const supportObject = template.getObject3D?.({
          params: component.params as any,
          position: position as [number, number, number],
        });

        // Add to the group
        if (supportObject) group.add(supportObject);
      });
    });

    render();
  });

  return group;
}
