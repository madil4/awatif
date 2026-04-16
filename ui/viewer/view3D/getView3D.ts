import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Display } from "../../display/getDisplay";

export function getView3D({
  camera,
  controls,
  display,
  render,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  display: Display;
  render: () => void;
}): void {
  const view3D = display.view3D;
  const grid = display.grid;

  let cancelAnim: (() => void) | null = null;

  van.derive(() => {
    const viewing3D = view3D.val;
    const pose = getGridFitPose({
      camera,
      gridSize: grid.size.rawVal,
      viewing3D,
    });

    if (cancelAnim) {
      cancelAnim();
      cancelAnim = null;
    }

    cancelAnim = animateCamera({
      camera,
      controls,
      targetPosition: pose.position,
      targetPivot: pose.target,
      render,
      onComplete: () => {
        controls.enableRotate = viewing3D;
        cancelAnim = null;
      },
    });
  });
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function sphericalToCartesian(r: number, phi: number, theta: number) {
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.sin(theta),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(theta),
  );
}

function getGridFitPose({
  camera,
  gridSize,
  viewing3D,
}: {
  camera: THREE.PerspectiveCamera;
  gridSize: number;
  viewing3D: boolean;
}): { position: THREE.Vector3; target: THREE.Vector3 } {
  const target = new THREE.Vector3(gridSize / 2, gridSize / 2, 0);
  const phi3D = THREE.MathUtils.degToRad(25);
  const theta3D = Math.PI / 6;
  const direction = viewing3D
    ? sphericalToCartesian(1, phi3D, theta3D).normalize()
    : new THREE.Vector3(0, 0, 1);
  const fitDistance =
    getGridFitDistance({ camera, gridSize, direction }) *
    (viewing3D ? 1.15 : 1.2);

  return {
    position: target.clone().add(direction.multiplyScalar(fitDistance)),
    target,
  };
}

function getGridFitDistance({
  camera,
  gridSize,
  direction,
}: {
  camera: THREE.PerspectiveCamera;
  gridSize: number;
  direction: THREE.Vector3;
}): number {
  const halfSize = gridSize / 2;
  const viewDirection = direction.clone().normalize();
  const forward = viewDirection.clone().negate();
  const referenceUp =
    Math.abs(forward.dot(camera.up)) > 0.999
      ? new THREE.Vector3(0, 0, 1)
      : camera.up.clone().normalize();
  const right = new THREE.Vector3().crossVectors(forward, referenceUp);

  if (right.lengthSq() < 1e-9) {
    right.set(1, 0, 0);
  } else {
    right.normalize();
  }

  const up = new THREE.Vector3().crossVectors(right, forward).normalize();
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
  const tanVertical = Math.tan(verticalFov / 2);
  const tanHorizontal = Math.tan(horizontalFov / 2);
  const corners = [
    new THREE.Vector3(-halfSize, -halfSize, 0),
    new THREE.Vector3(-halfSize, halfSize, 0),
    new THREE.Vector3(halfSize, -halfSize, 0),
    new THREE.Vector3(halfSize, halfSize, 0),
  ];

  let distance = camera.near + 1;

  for (const corner of corners) {
    const depthOffset = corner.dot(viewDirection);
    const horizontal = Math.abs(corner.dot(right));
    const vertical = Math.abs(corner.dot(up));

    distance = Math.max(
      distance,
      depthOffset + horizontal / tanHorizontal,
      depthOffset + vertical / tanVertical,
    );
  }

  return distance;
}

function animateCamera({
  camera,
  controls,
  targetPosition,
  targetPivot,
  duration = 600,
  render,
  onComplete,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  targetPosition: THREE.Vector3;
  targetPivot: THREE.Vector3;
  duration?: number;
  render: () => void;
  onComplete?: () => void;
}): () => void {
  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const startTime = performance.now();

  controls.enabled = false;

  let frameId: number;

  function tick(now: number) {
    const elapsed = now - startTime;
    const rawT = Math.min(elapsed / duration, 1);
    const t = smoothstep(rawT);

    camera.position.lerpVectors(startPosition, targetPosition, t);
    controls.target.lerpVectors(startTarget, targetPivot, t);
    controls.update();
    render();

    if (rawT < 1) {
      frameId = requestAnimationFrame(tick);
    } else {
      controls.enabled = true;
      onComplete?.();
    }
  }

  frameId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frameId);
    controls.enabled = true;
  };
}
