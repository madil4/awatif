import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type CameraPose = { position: THREE.Vector3; target: THREE.Vector3 };

// Owns every camera move the viewer makes, so two re-frames (e.g. toggling the
// 2D view while a centering animation runs) can never fight over the camera
export type CameraAnimator = {
  set: (pose: CameraPose) => void;
  animate: (pose: CameraPose) => void;
  cancel: () => void;
};

export function createCameraAnimator({
  camera,
  controls,
  render,
  duration = 600,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  render: () => void;
  duration?: number;
}): CameraAnimator {
  let cancelRunning: (() => void) | null = null;

  const cancel = () => {
    cancelRunning?.();
    cancelRunning = null;
  };

  return {
    cancel,
    set(pose) {
      cancel();

      camera.position.copy(pose.position);
      controls.target.copy(pose.target);
      controls.update();
    },
    animate(pose) {
      cancel();

      const startPosition = camera.position.clone();
      const startTarget = controls.target.clone();
      const startTime = performance.now();

      controls.enabled = false;

      let frameId: number;

      const tick = (now: number) => {
        const rawT = Math.min((now - startTime) / duration, 1);
        const t = smoothstep(rawT);

        camera.position.lerpVectors(startPosition, pose.position, t);
        controls.target.lerpVectors(startTarget, pose.target, t);
        controls.update();
        render();

        if (rawT < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          controls.enabled = true;
          cancelRunning = null;
        }
      };

      frameId = requestAnimationFrame(tick);

      cancelRunning = () => {
        cancelAnimationFrame(frameId);
        controls.enabled = true;
      };
    },
  };
}

// Distance at which a sphere of `radius` around the orbit target fills the same
// fraction of the viewport whatever its size, which is what keeps the model's
// perceived scale constant. The narrower of the two field of views drives it so
// the sphere fits in both directions, and the margins match the grid framing.
export function getFitDistance({
  camera,
  radius,
  viewing2D,
}: {
  camera: THREE.PerspectiveCamera;
  radius: number;
  viewing2D: boolean;
}): number {
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
  const margin = viewing2D ? 1.2 : 1.55;

  return Math.max(
    camera.near + 1,
    (radius / Math.tan(Math.min(verticalFov, horizontalFov) / 2)) * margin,
  );
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}
