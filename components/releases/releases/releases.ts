import { html } from "lit-html";
import { ReleaseTemplate } from "../data-model";
import * as THREE from "three";

type ReleasesParams = {
  type: "both-ends" | "start" | "end";
};

const releaseMap: Record<
  ReleasesParams["type"],
  [boolean, boolean, boolean, boolean]
> = {
  "both-ends": [true, true, true, true],
  start: [true, true, false, false],
  end: [false, false, true, true],
};

export const releases: ReleaseTemplate<ReleasesParams> = {
  name: "Releases",
  defaultParams: {
    type: "both-ends",
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Bending Release At:</label>
        <select
          @change=${(e: Event) =>
            (params.val = {
              type: (e.target as HTMLSelectElement)
                .value as ReleasesParams["type"],
            })}
        >
          <option
            value="both-ends"
            .selected=${params.val.type === "both-ends"}
          >
            Both Ends
          </option>
          <option value="start" .selected=${params.val.type === "start"}>
            Start Only
          </option>
          <option value="end" .selected=${params.val.type === "end"}>
            End Only
          </option>
        </select>
      </div>
    `;
  },

  getRelease: ({ params }) => {
    return { release: releaseMap[params.type] };
  },

  getObject3D: ({ params, startPosition, endPosition, displayScale }) => {
    const group = new THREE.Group();

    const SIZE = 0.15 * displayScale;
    const COLOR = 0xff0000;
    const OFFSET_RATIO = 0.1;

    const dx = endPosition[0] - startPosition[0];
    const dy = endPosition[1] - startPosition[1];
    const dz = endPosition[2] - startPosition[2];

    if (params.type === "start" || params.type === "both-ends") {
      const x = startPosition[0] + dx * OFFSET_RATIO;
      const y = startPosition[1] + dy * OFFSET_RATIO;
      const z = startPosition[2] + dz * OFFSET_RATIO;
      group.add(createHingeCircle(x, y, z, SIZE, COLOR));
    }

    if (params.type === "end" || params.type === "both-ends") {
      const x = endPosition[0] - dx * OFFSET_RATIO;
      const y = endPosition[1] - dy * OFFSET_RATIO;
      const z = endPosition[2] - dz * OFFSET_RATIO;
      group.add(createHingeCircle(x, y, z, SIZE, COLOR));
    }

    group.renderOrder = 5;
    setMaterialOnTop(group);
    return group;
  },
};

function createHingeCircle(
  x: number,
  y: number,
  z: number,
  size: number,
  color: number,
): THREE.Mesh {
  const geometry = new THREE.RingGeometry(size * 0.7, size, 24);
  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(x, y, z);
  circle.rotateX(Math.PI / 2); // RingGeometry is in X-Y by default; rotate to face the -Y camera
  return circle;
}

function setMaterialOnTop(object: THREE.Object3D) {
  object.traverse((child) => {
    if ((child as THREE.Mesh).material) {
      const material = (child as THREE.Mesh).material as THREE.Material;
      material.depthTest = false;
    }
  });
}
