import * as THREE from "three";
import van, { State } from "vanjs-core";
import { Mesh } from "@awatif/components";
import { getText } from "../text/getText";
import { getElementLocalAxes } from "../common/getElementLocalAxes";

export type LineResultsDisplay =
  | "None"
  | "Axial"
  | "ShearY"
  | "ShearZ"
  | "BendingY"
  | "BendingZ"
  | "Torsion";

type Forces =
  NonNullable<Mesh["internalForces"]["val"]> extends Map<number, infer V>
    ? V
    : never;

type Endpoint = {
  diagramPos: THREE.Vector3;
  value: number;
};

type ResultConfig = {
  axis: "localY" | "localZ" | "torsion";
  label: string;
  getValues: (forces: Forces) => [number, number];
};

const RESULT_CONFIGS: Record<
  Exclude<LineResultsDisplay, "None">,
  ResultConfig
> = {
  Axial: {
    axis: "localY",
    label: "N",
    getValues: (forces) => forces.N,
  },
  ShearY: {
    axis: "localY",
    label: "Vy",
    getValues: (forces) => forces.Vy,
  },
  ShearZ: {
    axis: "localZ",
    label: "Vz",
    getValues: (forces) => forces.Vz,
  },
  BendingY: {
    axis: "localZ",
    label: "My",
    getValues: (forces) => forces.My,
  },
  BendingZ: {
    axis: "localY",
    label: "Mz",
    getValues: (forces) => forces.Mz,
  },
  Torsion: {
    axis: "torsion",
    label: "Mx",
    getValues: (forces) => forces.Mx,
  },
};

export function getLineResults({
  mesh,
  display,
  displayScale,
  render,
}: {
  mesh: Mesh;
  display: State<LineResultsDisplay>;
  displayScale: State<number>;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();
  group.renderOrder = 100; // Todo: align with the rest of objects renderOrder

  const clearGroup = () => {
    while (group.children.length) {
      const child = group.children[0];
      disposeObject(child);
      group.remove(child);
    }
  };

  van.derive(() => {
    clearGroup();
    const nodes = mesh.nodes.val;
    const elements = mesh.elements.val;
    const internalForces = mesh.internalForces?.val;
    const lineToElements = mesh.geometryMapping.val.lineToElements;

    if (!nodes?.length || !elements?.length || !internalForces) return render();
    if (display.val === "None") return render();

    const config = RESULT_CONFIGS[display.val];
    const s = displayScale.val;
    const color = "#0066cc";
    const lineMaterial = new THREE.LineBasicMaterial({ color, depthTest: false });

    let maxForceValue = 0;
    internalForces.forEach((forces: Forces) => {
      const [a, b] = config.getValues(forces);
      maxForceValue = Math.max(maxForceValue, Math.abs(a), Math.abs(b));
    });

    const scale = maxForceValue > 0 ? (s * 0.6) / maxForceValue : 0.05;
    const textSize = 0.3 * s;

    lineToElements.forEach((elementIndices: number[]) => {
      const endpoints: Endpoint[] = [];

      elementIndices.forEach((elementIdx) => {
        const forces = internalForces.get(elementIdx);
        if (!forces) return;

        const element = elements[elementIdx];
        if (!element || element.length < 2) return;

        const n1 = nodes[element[0]];
        const n2 = nodes[element[1]];
        if (!n1 || !n2) return;

        const start = new THREE.Vector3(n1[0], n1[1], n1[2] ?? 0);
        const end = new THREE.Vector3(n2[0], n2[1], n2[2] ?? 0);
        const axes = getElementLocalAxes(start, end);
        if (!axes) return;

        const [valStart, valEnd] = config.getValues(forces);

        const elementEndpoints =
          config.axis === "torsion"
            ? drawTorsionDiagram({
                group,
                lineMaterial,
                start,
                end,
                localX: axes.localX,
                localY: axes.localY,
                localZ: axes.localZ,
                length: axes.length,
                valStart,
                valEnd,
                scale,
              })
            : drawPlanarDiagram({
                group,
                lineMaterial,
                start,
                end,
                axis:
                  config.axis === "localY" ? axes.localY : axes.localZ,
                valStart,
                valEnd,
                scale,
              });

        endpoints.push(...elementEndpoints);
      });

      if (endpoints.length === 0) return;

      const sorted = [...endpoints].sort((a, b) => b.value - a.value);
      const max = sorted[0];
      const min = sorted[sorted.length - 1];

      if (Math.abs(max.value) > 0.001) {
        group.add(
          getText(
            `${config.label}: ${max.value.toFixed(2)}`,
            [max.diagramPos.x, max.diagramPos.y, max.diagramPos.z],
            color,
            textSize,
          ),
        );
      }
      if (
        Math.abs(min.value) > 0.001 &&
        Math.abs(min.value - max.value) > 0.01
      ) {
        group.add(
          getText(
            `${config.label}: ${min.value.toFixed(2)}`,
            [min.diagramPos.x, min.diagramPos.y, min.diagramPos.z],
            color,
            textSize,
          ),
        );
      }
    });

    render();
  });

  group.userData.dispose = () => {
    clearGroup();
  };

  return group;
}

function drawPlanarDiagram({
  group,
  lineMaterial,
  start,
  end,
  axis,
  valStart,
  valEnd,
  scale,
}: {
  group: THREE.Group;
  lineMaterial: THREE.LineBasicMaterial;
  start: THREE.Vector3;
  end: THREE.Vector3;
  axis: THREE.Vector3;
  valStart: number;
  valEnd: number;
  scale: number;
}): Endpoint[] {
  const diagramStart = start
    .clone()
    .add(axis.clone().multiplyScalar(valStart * scale));
  const diagramEnd = end.clone().add(axis.clone().multiplyScalar(valEnd * scale));

  if (Math.abs(valStart) > 0.001 || Math.abs(valEnd) > 0.001) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      start,
      diagramStart,
      diagramEnd,
      end,
    ]);
    group.add(new THREE.Line(geometry, lineMaterial));
  }

  return [
    { diagramPos: diagramStart, value: valStart },
    { diagramPos: diagramEnd, value: valEnd },
  ];
}

function drawTorsionDiagram({
  group,
  lineMaterial,
  start,
  end,
  localX,
  localY,
  localZ,
  length,
  valStart,
  valEnd,
  scale,
}: {
  group: THREE.Group;
  lineMaterial: THREE.LineBasicMaterial;
  start: THREE.Vector3;
  end: THREE.Vector3;
  localX: THREE.Vector3;
  localY: THREE.Vector3;
  localZ: THREE.Vector3;
  length: number;
  valStart: number;
  valEnd: number;
  scale: number;
}): Endpoint[] {
  const radiusStart = Math.abs(valStart * scale);
  const radiusEnd = Math.abs(valEnd * scale);
  const angleEnd = getTorsionRotation(valStart, valEnd) * Math.PI * 2;

  const startRadial = localY.clone().multiplyScalar(radiusStart);
  const endRadial = localY
    .clone()
    .multiplyScalar(Math.cos(angleEnd) * radiusEnd)
    .add(localZ.clone().multiplyScalar(Math.sin(angleEnd) * radiusEnd));

  if (Math.abs(valStart) > 0.001 || Math.abs(valEnd) > 0.001) {
    const helixPoints = getTorsionHelixPoints({
      start,
      localX,
      localY,
      localZ,
      length,
      radiusStart,
      radiusEnd,
      rotation: angleEnd,
    });

    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(helixPoints),
        lineMaterial,
      ),
    );

    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          start,
          start.clone().add(startRadial),
        ]),
        lineMaterial,
      ),
    );

    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([end, end.clone().add(endRadial)]),
        lineMaterial,
      ),
    );
  }

  return [
    {
      diagramPos: start.clone().add(startRadial),
      value: valStart,
    },
    {
      diagramPos: end.clone().add(endRadial),
      value: valEnd,
    },
  ];
}

function getTorsionHelixPoints({
  start,
  localX,
  localY,
  localZ,
  length,
  radiusStart,
  radiusEnd,
  rotation,
}: {
  start: THREE.Vector3;
  localX: THREE.Vector3;
  localY: THREE.Vector3;
  localZ: THREE.Vector3;
  length: number;
  radiusStart: number;
  radiusEnd: number;
  rotation: number;
}): THREE.Vector3[] {
  const segments = 32;
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const radius = THREE.MathUtils.lerp(radiusStart, radiusEnd, t);
    const angle = rotation * t;
    const radial = localY
      .clone()
      .multiplyScalar(Math.cos(angle) * radius)
      .add(localZ.clone().multiplyScalar(Math.sin(angle) * radius));

    points.push(
      start
        .clone()
        .add(localX.clone().multiplyScalar(length * t))
        .add(radial),
    );
  }

  return points;
}

function getTorsionRotation(valStart: number, valEnd: number): number {
  const dominantValue =
    Math.abs(valStart) >= Math.abs(valEnd) ? valStart : valEnd;
  const direction = Math.sign(dominantValue || valStart || valEnd || 1);
  return 1.25 * direction;
}

function disposeObject(object: THREE.Object3D) {
  if (object instanceof THREE.Sprite) {
    object.material.map?.dispose();
    object.material.dispose();
  }

  if (object instanceof THREE.Line || object instanceof THREE.Mesh) {
    object.geometry.dispose();

    if (Array.isArray(object.material)) {
      object.material.forEach((material) => material.dispose());
    } else {
      object.material.dispose();
    }
  }
}
