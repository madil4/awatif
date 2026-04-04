import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
} from "@awatif/components";

export function getReleases({
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
  display?: { releases?: State<boolean> };
}): THREE.Group {
  const group = new THREE.Group();

  if (display?.releases) {
    van.derive(() => {
      group.visible = display.releases!.val;
      render();
    });
  }

  van.derive(() => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const s = displayScale.val;
    const releaseComponents =
      components.val.get(ComponentsType.RELEASES) ?? [];
    const points = geometry.points.val;
    const lines = geometry.lines.val;

    releaseComponents.forEach((component) => {
      const releaseTemplates = templates.get(ComponentsType.RELEASES);
      if (!releaseTemplates) return;

      const template = releaseTemplates.get(component.templateId);
      if (!template || !("getObject3D" in template)) return;

      component.geometry.forEach((lineId) => {
        const line = lines.get(lineId);
        if (!line) return;

        const [startPointId, endPointId] = line;
        const startPosition = points.get(startPointId);
        const endPosition = points.get(endPointId);
        if (!startPosition || !endPosition) return;

        const releaseObject = template.getObject3D?.({
          params: ({ ...template.defaultParams, ...component.params }) as any,
          startPosition: startPosition as [number, number, number],
          endPosition: endPosition as [number, number, number],
          displayScale: s,
        });

        if (releaseObject) group.add(releaseObject);
      });
    });

    render();
  });

  return group;
}
