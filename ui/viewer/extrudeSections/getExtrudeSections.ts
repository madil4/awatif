import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  Geometry,
  Components,
  templates as Templates,
  ComponentsType,
} from "@awatif/components";

type SectionPalette = {
  fill: number;
  edge: number;
};

function getSectionPalette(templateName?: string): SectionPalette {
  const name = templateName?.toLowerCase() ?? "";

  if (name.includes("steel")) {
    return {
      fill: 0x8fa6b8,
      edge: 0x4e6170,
    };
  }

  if (name.includes("concrete")) {
    return {
      fill: 0xcfc5b8,
      edge: 0x8a7d70,
    };
  }

  if (name.includes("timber")) {
    return {
      fill: 0xbe955f,
      edge: 0x7a5631,
    };
  }

  return {
    fill: 0xb4b4b4,
    edge: 0x6e6e6e,
  };
}

export function getExtrudeSections({
  geometry,
  components,
  templates,
  display,
  render,
}: {
  geometry: Geometry;
  components: Components;
  templates: typeof Templates;
  display: State<boolean>;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();

  van.derive(() => {
    if (!display.val) return;

    while (group.children.length > 0) group.remove(group.children[0]);

    const lines = geometry.lines.val;
    const points = geometry.points.val;
    const designComponents = components.val.get(ComponentsType.DESIGN) ?? [];
    const designTemplates = templates.get(ComponentsType.DESIGN);

    designComponents.forEach((component) => {
      const template = designTemplates?.get(component.templateId);
      if (!template?.getSection) return;

      const params = { ...template.defaultParams, ...component.params };
      const sectionPts = template.getSection(params as any);
      if (sectionPts.length < 3) return;
      const palette = getSectionPalette(template.name);

      component.geometry.forEach((lineId) => {
        const linePair = lines.get(lineId);
        if (!linePair) return;

        const start = points.get(linePair[0]);
        const end = points.get(linePair[1]);
        if (!start || !end) return;

        const startV = new THREE.Vector3(...start);
        const endV = new THREE.Vector3(...end);
        const dir = endV.clone().sub(startV);
        const length = dir.length();
        if (length < 1e-9) return;
        dir.normalize();

        // Compute local axes matching the FEM transformation (getTransformationMatrix.ts)
        const l = dir.x;
        const m = dir.y;
        const n = dir.z;
        const D = Math.sqrt(l * l + m * m);

        let localY: THREE.Vector3;
        let localZ: THREE.Vector3;
        if (Math.abs(n - 1) < 1e-9) {
          localY = new THREE.Vector3(0, 1, 0);
          localZ = new THREE.Vector3(-1, 0, 0);
        } else if (Math.abs(n + 1) < 1e-9) {
          localY = new THREE.Vector3(0, 1, 0);
          localZ = new THREE.Vector3(1, 0, 0);
        } else {
          localY = new THREE.Vector3(-m / D, l / D, 0);
          localZ = new THREE.Vector3((-l * n) / D, (-m * n) / D, D);
        }

        // Section x → FEM local y, section y → FEM local z
        const shape = new THREE.Shape(
          sectionPts.map(([x, y]: [number, number]) => new THREE.Vector2(y, x)),
        );
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: length,
          bevelEnabled: false,
        });

        const fillMaterial = new THREE.MeshBasicMaterial({
          color: palette.fill,
          transparent: true,
          opacity: 0.72,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geo, fillMaterial);

        const edgeMaterial = new THREE.LineBasicMaterial({ color: palette.edge });
        const edges = new THREE.EdgesGeometry(geo, 15);
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
        const sectionGroup = new THREE.Group();
        sectionGroup.add(mesh, edgeLines);
        sectionGroup.position.copy(startV);

        // Align: geometry X → localY, geometry Y → localZ, geometry Z (extrusion) → dir
        const rotMatrix = new THREE.Matrix4();
        rotMatrix.makeBasis(localY, localZ, dir);
        sectionGroup.setRotationFromMatrix(rotMatrix);

        group.add(sectionGroup);
      });
    });

    render();
  });

  van.derive(() => {
    group.visible = display.val;
    render();
  });

  return group;
}
