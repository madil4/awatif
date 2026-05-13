import { html } from "lit-html";
import { SupportTemplate } from "../data-model";
import * as THREE from "three";

type PointSupportParams = {
  type:
    | "fixed"
    | "pinned"
    | "horizontal-roller"
    | "vertical-roller"
    | "z-roller";
};

const supportMap: Record<
  PointSupportParams["type"],
  [boolean, boolean, boolean, boolean, boolean, boolean]
> = {
  fixed: [true, true, true, true, true, true],
  pinned: [true, true, true, false, false, false],
  "horizontal-roller": [false, true, true, false, false, false],
  "vertical-roller": [true, false, true, false, false, false],
  "z-roller": [true, true, false, false, false, false],
};

export const pointSupport: SupportTemplate<PointSupportParams> = {
  name: "Point Support",
  defaultParams: {
    type: "pinned",
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>Support Type:</label>
        <select
          @change=${(e: Event) =>
            (params.val = {
              type: (e.target as HTMLSelectElement)
                .value as PointSupportParams["type"],
            })}
        >
          <option value="fixed" .selected=${params.val.type === "fixed"}>
            Fixed
          </option>
          <option value="pinned" .selected=${params.val.type === "pinned"}>
            Pinned
          </option>
          <option
            value="horizontal-roller"
            .selected=${params.val.type === "horizontal-roller"}
          >
            X Roller
          </option>
          <option
            value="vertical-roller"
            .selected=${params.val.type === "vertical-roller"}
          >
            Y Roller
          </option>
          <option value="z-roller" .selected=${params.val.type === "z-roller"}>
            Z Roller
          </option>
        </select>
      </div>
    `;
  },

  getSupport: ({ params }) => {
    return { support: supportMap[params.type] };
  },

  getObject3D: ({ params, position, displayScale }) => {
    const group = new THREE.Group();

    const SIZE = 0.3 * displayScale;
    const COLOR = 0xff0000;

    group.position.set(position[0], position[1], position[2]);
    group.rotateX(Math.PI / 2); // Support geometry is built in X-Y; rotate to face -Y camera in X-Z plane
    group.renderOrder = 5;

    if (params.type === "fixed") {
      drawFixedSupport(group, SIZE, COLOR, displayScale);
    } else if (params.type === "pinned") {
      drawPinnedSupport(group, SIZE, COLOR, displayScale);
    } else if (params.type === "horizontal-roller") {
      drawRollerSupport(group, SIZE, COLOR, "x", displayScale);
    } else if (params.type === "vertical-roller") {
      drawRollerSupport(group, SIZE, COLOR, "y", displayScale);
    } else {
      drawRollerSupport(group, SIZE, COLOR, "z", displayScale);
    }

    setMaterialOnTop(group);
    return group;
  },
};

// Utils
function setMaterialOnTop(object: THREE.Object3D) {
  object.traverse((child) => {
    if ((child as THREE.Mesh).material) {
      const material = (child as THREE.Mesh).material as THREE.Material;
      material.depthTest = false; // Supports always appear on top
    }
  });
}

function drawFixedSupport(
  group: THREE.Group,
  size: number,
  color: number,
  displayScale: number,
) {
  const groundWidth = size * 1.5;
  const hatchLength = 0.15 * displayScale;
  const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });

  const groundPoints = [
    new THREE.Vector3(-groundWidth / 2, 0, 0),
    new THREE.Vector3(groundWidth / 2, 0, 0),
  ];
  const groundGeometry = new THREE.BufferGeometry().setFromPoints(groundPoints);
  const ground = new THREE.Line(groundGeometry, lineMaterial);
  group.add(ground);

  const numHatches = 5;
  const hatchSpacing = groundWidth / (numHatches + 1);

  for (let i = 1; i <= numHatches; i++) {
    const x = -groundWidth / 2 + i * hatchSpacing;
    const hatchPoints = [
      new THREE.Vector3(x, 0, 0),
      new THREE.Vector3(x - hatchLength * 0.7, -hatchLength, 0),
    ];
    const hatchGeometry = new THREE.BufferGeometry().setFromPoints(hatchPoints);
    const hatch = new THREE.Line(hatchGeometry, lineMaterial);
    group.add(hatch);
  }
}

function drawPinnedSupport(
  group: THREE.Group,
  size: number,
  color: number,
  displayScale: number,
) {
  // Draw triangle
  const trianglePoints = [
    new THREE.Vector3(0, 0, 0), // Apex at node
    new THREE.Vector3(-size / 2, -size, 0), // Bottom left
    new THREE.Vector3(size / 2, -size, 0), // Bottom right
    new THREE.Vector3(0, 0, 0), // Close the triangle
  ];

  const triangleGeometry = new THREE.BufferGeometry().setFromPoints(
    trianglePoints,
  );
  const triangleMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
  const triangle = new THREE.Line(triangleGeometry, triangleMaterial);
  group.add(triangle);

  // Draw circle outline
  const outlineGeometry = new THREE.RingGeometry(size * 0.15, size * 0.17, 16);
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
  outline.position.set(0, 0, 0);
  group.add(outline);

  // Draw ground line
  const groundPoints = [
    new THREE.Vector3(-size / 2 - 0.1 * displayScale, -size, 0),
    new THREE.Vector3(size / 2 + 0.1 * displayScale, -size, 0),
  ];
  const groundGeometry = new THREE.BufferGeometry().setFromPoints(groundPoints);
  const groundMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
  const ground = new THREE.Line(groundGeometry, groundMaterial);
  group.add(ground);
}

function drawRollerSupport(
  group: THREE.Group,
  size: number,
  color: number,
  freeAxis: "x" | "y" | "z",
  displayScale: number,
) {
  const subGroup = new THREE.Group();
  if (freeAxis === "y") {
    subGroup.rotation.z = Math.PI / 2;
  } else if (freeAxis === "z") {
    subGroup.rotation.y = Math.PI / 2;
  }

  // Draw triangle
  const trianglePoints = [
    new THREE.Vector3(0, 0, 0), // Apex at node
    new THREE.Vector3(-size / 2, -size * 0.7, 0), // Bottom left
    new THREE.Vector3(size / 2, -size * 0.7, 0), // Bottom right
    new THREE.Vector3(0, 0, 0), // Close the triangle
  ];

  const triangleGeometry = new THREE.BufferGeometry().setFromPoints(
    trianglePoints,
  );
  const triangleMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
  const triangle = new THREE.Line(triangleGeometry, triangleMaterial);
  subGroup.add(triangle);

  // Draw rollers (small circles)
  const rollerRadius = size * 0.1;
  const numRollers = 3;
  const rollerSpacing = size / (numRollers + 1);

  for (let i = 0; i < numRollers; i++) {
    const x = -size / 2 + rollerSpacing + i * rollerSpacing;
    const rollerGeometry = new THREE.CircleGeometry(rollerRadius, 12);
    const rollerMaterial = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
    const roller = new THREE.Mesh(rollerGeometry, rollerMaterial);
    roller.position.set(x, -size * 0.7 - rollerRadius, 0);
    subGroup.add(roller);

    // Roller outline
    const outlineGeometry = new THREE.RingGeometry(
      rollerRadius,
      rollerRadius * 1.2,
      12,
    );
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
    });
    const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline.position.set(x, -size * 0.7 - rollerRadius, 0);
    subGroup.add(outline);
  }

  // Draw ground line
  const groundY = -size * 0.7 - rollerRadius * 2.2;
  const groundPoints = [
    new THREE.Vector3(-size / 2 - 0.1 * displayScale, groundY, 0),
    new THREE.Vector3(size / 2 + 0.1 * displayScale, groundY, 0),
  ];
  const groundGeometry = new THREE.BufferGeometry().setFromPoints(groundPoints);
  const groundMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
  const ground = new THREE.Line(groundGeometry, groundMaterial);
  subGroup.add(ground);

  group.add(subGroup);
}
