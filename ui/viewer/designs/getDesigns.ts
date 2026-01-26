import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
} from "@awatif/components";
import { getText } from "../text/getText";

export function getDesigns({
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
  display?: { design: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  // Add reactive visibility
  if (display?.design) {
    van.derive(() => {
      group.visible = display.design.val;
      render();
    });
  }

  // Use van.derive to reactively update when components or geometry changes
  van.derive(() => {
    // Clear existing design visualizations
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const designComponents = components.val.get(ComponentsType.DESIGN) ?? [];
    const lines = geometry.lines.val;
    const points = geometry.points.val;

    designComponents.forEach((component) => {
      // Get the template for this component
      const designTemplates = templates.get(ComponentsType.DESIGN);
      if (!designTemplates) return;

      const template = designTemplates.get(component.templateId);
      if (!template) return;

      // For each geometry line in the component, create a text visualization
      component.geometry.forEach((lineId) => {
        const line = lines.get(lineId);
        if (!line) return;

        // Get the start and end points of the line
        const startPoint = points.get(line[0]);
        const endPoint = points.get(line[1]);
        if (!startPoint || !endPoint) return;

        // Calculate the midpoint of the line
        const midpoint: [number, number, number] = [
          (startPoint[0] + endPoint[0]) / 2,
          (startPoint[1] + endPoint[1]) / 2,
          (startPoint[2] + endPoint[2]) / 2,
        ];

        // Create text label with line number and component name
        const labelText = `#${lineId}`;

        // Use accent color from the layout theme (#4a9eff)
        const textSprite = getText(labelText, midpoint, "#fff", 0.5);

        // Add to the group
        group.add(textSprite);
      });
    });

    render();
  });

  return group;
}
