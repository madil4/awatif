import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Display } from "../../display/getDisplay";
import {
  WorkPlane,
  getWorkPlaneCenter,
  getWorkPlaneViewDirection,
} from "../common/workPlane";

export function getView2D({
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
  const view2D = display.view2D;
  const grid = display.grid;
  const workPlane = display.workPlane;
  let initialized = false;
  let skipNextAnimation = false;
  let cancelAnim: (() => void) | null = null;

  setCameraPose({
    camera,
    controls,
    pose: getGridFitPose({
      camera,
      gridSize: grid.size.rawVal,
      viewing2D: view2D.rawVal,
      plane: workPlane.plane.rawVal,
      offset: workPlane.offset.rawVal,
    }),
  });

  controls.addEventListener("start", () => {
    if ((controls as any).state === 0 && view2D.rawVal) {
      skipNextAnimation = true;
      view2D.val = false;
    }
  });

  van.derive(() => {
    const viewing2D = view2D.val;
    const gridSize = grid.size.val;
    // Changing the plane's orientation is a re-frame; sliding it along its
    // normal is not, or every keystroke in the offset input would fly the camera
    const plane = workPlane.plane.val;
    const offset = workPlane.offset.rawVal;

    if (!initialized) {
      initialized = true;
      return;
    }

    if (skipNextAnimation) {
      skipNextAnimation = false;
      return;
    }

    if (cancelAnim) {
      cancelAnim();
      cancelAnim = null;
    }

    const pose = getGridFitPose({
      camera,
      gridSize,
      viewing2D,
      plane,
      offset,
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
  viewing2D,
  plane,
  offset,
}: {
  camera: THREE.PerspectiveCamera;
  gridSize: number;
  viewing2D: boolean;
  plane: WorkPlane;
  offset: number;
}): { position: THREE.Vector3; target: THREE.Vector3 } {
  // Frame the work plane rather than a fixed X-Z one, so 2D view always looks
  // straight at the plane geometry is currently drawn on
  const target = getWorkPlaneCenter(plane, offset, gridSize);
  const direction = viewing2D
    ? getWorkPlaneViewDirection(plane)
    : new THREE.Vector3(0.423, -0.785, 0.453).normalize();
  const fitDistance =
    getGridFitDistance({ camera, gridSize }) * (viewing2D ? 1.2 : 1.55);

  return {
    position: target.clone().add(direction.multiplyScalar(fitDistance)),
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
    halfSize / Math.tan(Math.min(verticalFov, horizontalFov) / 2),
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
