import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Display } from "../../display/getDisplay";
import {
  WorkPlane,
  getWorkPlaneCenter,
  getWorkPlaneViewDirection,
} from "../common/workPlane";
import { CameraAnimator, CameraPose, getFitDistance } from "../common/camera";

export function getView2D({
  camera,
  controls,
  animator,
  display,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  animator: CameraAnimator;
  display: Display;
}): void {
  const view2D = display.view2D;
  const grid = display.grid;
  const workPlane = display.workPlane;
  let initialized = false;
  let skipNextAnimation = false;

  animator.set(
    getGridFitPose({
      camera,
      gridSize: grid.size.rawVal,
      viewing2D: view2D.rawVal,
      plane: workPlane.plane.rawVal,
      offset: workPlane.offset.rawVal,
    }),
  );

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

    animator.animate(
      getGridFitPose({
        camera,
        gridSize,
        viewing2D,
        plane,
        offset,
      }),
    );
  });
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
}): CameraPose {
  // Frame the work plane rather than a fixed X-Z one, so 2D view always looks
  // straight at the plane geometry is currently drawn on
  const target = getWorkPlaneCenter(plane, offset, gridSize);
  const direction = viewing2D
    ? getWorkPlaneViewDirection(plane)
    : new THREE.Vector3(0.423, -0.785, 0.453).normalize();
  const fitDistance = getFitDistance({
    camera,
    radius: gridSize / 2,
    viewing2D,
  });

  return {
    position: target.clone().add(direction.multiplyScalar(fitDistance)),
    target,
  };
}
