import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
} from "@awatif/components";

export function getLoads({
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
  display?: { loads: State<boolean> };
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

    const loadComponents = components.val.get(ComponentsType.LOADS) ?? [];
    const points = geometry.points.val;

    loadComponents.forEach((component) => {
      // Get the template for this component
      const loadTemplates = templates.get(ComponentsType.LOADS);
      if (!loadTemplates) return;

      const template = loadTemplates[component.templateIndex];
      if (!template || !("getObject3D" in template)) return;

      // For each geometry point in the component, create a visualization
      component.geometry.forEach((pointId) => {
        const position = points.get(pointId);
        if (!position) return;

        // Call the template's getObject3D function
        const loadObject = template.getObject3D?.({
          params: component.params as any,
          position: position as [number, number, number],
        });

        // Add to the group
        if (loadObject) group.add(loadObject);
      });
    });

    render();
  });

  return group;
}
