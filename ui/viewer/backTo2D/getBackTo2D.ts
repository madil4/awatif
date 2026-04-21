import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Display } from "../../display/getDisplay";

export function getBackTo2D({
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
  const backTo2D = display.backTo2D;
  const grid = display.grid;
  let initialized = false;
  let cancelAnim: (() => void) | null = null;

  setCameraPose({
    camera,
    controls,
    pose: getGridFitPose({ camera, gridSize: grid.size.rawVal }),
  });

  // STATE 0 = ROTATE in OrbitControls internals
  controls.addEventListener("start", () => {
    if ((controls as any).state === 0 && backTo2D.rawVal)
      backTo2D.val = false;
  });

  van.derive(() => {
    if (!backTo2D.val) return;

    if (!initialized) {
      initialized = true;
      return;
    }

    if (cancelAnim) {
      cancelAnim();
      cancelAnim = null;
    }

    const pose = getGridFitPose({
      camera,
      gridSize: grid.size.rawVal,
    });

    cancelAnim = animateCamera({
      camera,
      controls,
      targetPosition: pose.position,
      targetPivot: pose.target,
      render,
      onComplete: () => {
        cancelAnim = null;
      },
    });
  });
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function setCameraPose({
  camera,
  controls,
  pose,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  pose: { position: THREE.Vector3; target: THREE.Vector3 };
}) {
  camera.position.copy(pose.position);
  controls.target.copy(pose.target);
  controls.update();
}

function getGridFitPose({
  camera,
  gridSize,
}: {
  camera: THREE.PerspectiveCamera;
  gridSize: number;
}): { position: THREE.Vector3; target: THREE.Vector3 } {
  const target = new THREE.Vector3(gridSize / 2, gridSize / 2, 0);
  const fitDistance = getGridFitDistance({ camera, gridSize }) * 1.2;

  return {
    position: target.clone().add(new THREE.Vector3(0, 0, fitDistance)),
    target,
  };
}

function getGridFitDistance({
  camera,
  gridSize,
}: {
  camera: THREE.PerspectiveCamera;
  gridSize: number;
}): number {
  const halfSize = gridSize / 2;
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

  return Math.max(
    camera.near + 1,
    halfSize / Math.tan(verticalFov / 2),
    halfSize / Math.tan(horizontalFov / 2),
  );
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
