import { html } from "lit-html";
import { SupportTemplate } from "../data-model";
import * as THREE from "three";

type PointSupportParams = {
  Ux: boolean; // Translation restraint in X
  Uy: boolean; // Translation restraint in Y
  Uz: boolean; // Translation restraint in Z
  Rx: boolean; // Rotation restraint about X
  Ry: boolean; // Rotation restraint about Y
  Rz: boolean; // Rotation restraint about Z
};

export const pointSupport: SupportTemplate<PointSupportParams> = {
  name: "Point Support",
  defaultParams: {
    Ux: true,
    Uy: true,
    Uz: true,
    Rx: false,
    Ry: false,
    Rz: false,
  },

  getParamsTemplate: ({ params }) => {
    return html`
      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Ux}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Ux: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Translation X
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Uy}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Uy: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Translation Y
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            .checked=${params.val.Rz}
            @change=${(e: Event) =>
              (params.val = {
                ...params.val,
                Rz: (e.target as HTMLInputElement).checked,
              })}
          />
          Restrain Rotation about Z
        </label>
      </div>
    `;
  },

  getSupport: ({ params }) => {
    const { Ux, Uy, Uz, Rx, Ry, Rz } = params;

    // Return support values: [Ux, Uy, Uz, Rx, Ry, Rz]
    // true = restrained, false = free
    return {
      support: [Ux, Uy, Uz, Rx, Ry, Rz],
    };
  },

  getObject3D: ({ params, position, displayScale }) => {
    const { Ux, Uy, Rz } = params; // Focus on 2D: X, Y translations and Z rotation
    const group = new THREE.Group();

    const SIZE = 0.4 * displayScale; // Base size for support symbol
    const COLOR = 0xff0000; // Red for support symbols

    group.position.set(position[0], position[1], position[2]);
    group.renderOrder = 5;

    if (Ux && Uy && Rz) {
      drawFixedSupport(group, SIZE, COLOR, displayScale);
    } else if (Ux && Uy && !Rz) {
      drawPinnedSupport(group, SIZE, COLOR, displayScale);
    } else if (!Ux && Uy && !Rz) {
      drawRollerSupport(group, SIZE, COLOR, "horizontal", displayScale);
    } else if (Ux && !Uy && !Rz) {
      drawRollerSupport(group, SIZE, COLOR, "vertical", displayScale);
    } else {
      drawCustomSupport(group, SIZE, COLOR, Ux, Uy, Rz, displayScale);
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
  const groundWidth = size * 1.5 * displayScale;
  const hatchLength = 0.2 * displayScale;
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
  direction: "horizontal" | "vertical",
  displayScale: number,
) {
  const rotation = direction === "vertical" ? Math.PI / 2 : 0;
  const subGroup = new THREE.Group();
  subGroup.rotation.z = rotation;

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

function drawCustomSupport(
  group: THREE.Group,
  size: number,
  color: number,
  Ux: boolean,
  Uy: boolean,
  Rz: boolean,
  displayScale: number,
) {
  // Draw a simple cross with indicators for each restraint
  const halfSize = size / 2;

  // X restraint indicator (vertical line)
  if (Ux) {
    const points = [
      new THREE.Vector3(-halfSize, 0, 0),
      new THREE.Vector3(halfSize, 0, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 3,
    });
    const line = new THREE.Line(geometry, material);
    group.add(line);

    // Add end markers
    const markerSize = 0.1 * displayScale;
    const leftMarker = [
      new THREE.Vector3(-halfSize, -markerSize, 0),
      new THREE.Vector3(-halfSize, markerSize, 0),
    ];
    const rightMarker = [
      new THREE.Vector3(halfSize, -markerSize, 0),
      new THREE.Vector3(halfSize, markerSize, 0),
    ];

    const leftGeo = new THREE.BufferGeometry().setFromPoints(leftMarker);
    const rightGeo = new THREE.BufferGeometry().setFromPoints(rightMarker);
    group.add(new THREE.Line(leftGeo, material));
    group.add(new THREE.Line(rightGeo, material));
  }

  // Y restraint indicator (horizontal line)
  if (Uy) {
    const points = [
      new THREE.Vector3(0, -halfSize, 0),
      new THREE.Vector3(0, halfSize, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 3,
    });
    const line = new THREE.Line(geometry, material);
    group.add(line);

    // Add end markers
    const markerSize = 0.1 * displayScale;
    const bottomMarker = [
      new THREE.Vector3(-markerSize, -halfSize, 0),
      new THREE.Vector3(markerSize, -halfSize, 0),
    ];
    const topMarker = [
      new THREE.Vector3(-markerSize, halfSize, 0),
      new THREE.Vector3(markerSize, halfSize, 0),
    ];

    const bottomGeo = new THREE.BufferGeometry().setFromPoints(bottomMarker);
    const topGeo = new THREE.BufferGeometry().setFromPoints(topMarker);
    group.add(new THREE.Line(bottomGeo, material));
    group.add(new THREE.Line(topGeo, material));
  }

  // Rotation restraint indicator (small arc)
  if (Rz) {
    const arcRadius = size * 0.3;
    const arcGeometry = new THREE.CircleGeometry(arcRadius, 16, 0, Math.PI);
    const arcMaterial = new THREE.LineBasicMaterial({ color: color });
    const arcLine = new THREE.LineLoop(arcGeometry, arcMaterial);
    group.add(arcLine);
  }
}
