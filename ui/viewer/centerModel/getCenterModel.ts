import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Geometry, Mesh } from "@awatif/components";
import { Display } from "../../display/getDisplay";
import { CameraAnimator, CameraPose, getFitDistance } from "../common/camera";
import { getWorkPlaneViewDirection } from "../common/workPlane";

// Bumping this counter asks the viewer to re-frame; the app mounts a single
// viewer, so keeping it module-level is what lets centerModel() be called from
// anywhere (the Display panel's button, or app code) without threading state
const request = van.state(0);

// Symbol sizes (arrows, supports, text) are authored for a model about this
// big, so scaling them with the model is what keeps them the same size on
// screen once the model itself fills a constant fraction of the viewport
const REFERENCE_MODEL_SIZE = 10; // m, the default grid size
// The Display panel's slider range, so the value it shows stays reachable
const MIN_DISPLAY_SCALE = 0.1;
const MAX_DISPLAY_SCALE = 10;
// A single point has no extent; frame it as if it were this big instead of
// flying the camera into it
const MIN_MODEL_RADIUS = 0.5; // m

/**
 * Centers the model in the viewer: the camera keeps its current direction and
 * moves so the model fills a constant fraction of the viewport, and the display
 * scale follows the model's size so annotations keep their perceived size too.
 */
export function centerModel(): void {
  request.val++;
}

export function setupCenterModel({
  camera,
  controls,
  animator,
  display,
  geometry,
  mesh,
  autoCenter = true,
  render,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  animator: CameraAnimator;
  display: Display;
  geometry?: Geometry;
  mesh?: Mesh;
  autoCenter?: boolean;
  render: () => void;
}): void {
  const center = (move: "set" | "animate") => {
    const sphere = getModelBoundingSphere({ geometry, mesh });
    if (!sphere) return;

    const radius = Math.max(sphere.radius, MIN_MODEL_RADIUS);

    display.displayScale.val = getDisplayScale(radius * 2);

    const pose = getModelFitPose({
      camera,
      controls,
      display,
      center: sphere.center,
      radius,
    });

    if (move === "set") animator.set(pose);
    else animator.animate(pose);

    render();
  };

  // Everything but the request counter is read raw: this reacts to the button,
  // not to the model changing under it
  van.derive(() => {
    if (request.val === 0) return;

    center("animate");
  });

  // A model that already has extent when the viewer is instantiated is framed
  // straight away, so an app opens on its model rather than on the grid. It is
  // a `set` rather than an `animate`: there is no previous view to fly from,
  // and it overrides the grid framing getView2D just set. A model built after
  // instantiation (a blank app being drawn in) keeps the grid framing, since
  // re-framing on the first point placed would yank the view mid-edit
  if (autoCenter) center("set");
}

function getModelFitPose({
  camera,
  controls,
  display,
  center,
  radius,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  display: Display;
  center: THREE.Vector3;
  radius: number;
}): CameraPose {
  const viewing2D = display.view2D.rawVal;
  // Centering re-frames what the camera looks at, not where it looks from, so
  // the current direction is kept — except in 2D, where the view must stay
  // square on to the work plane
  const direction = viewing2D
    ? getWorkPlaneViewDirection(display.workPlane.plane.rawVal)
    : camera.position.clone().sub(controls.target);

  if (direction.lengthSq() === 0) direction.set(0.423, -0.785, 0.453);
  direction.normalize();

  const distance = getFitDistance({ camera, radius, viewing2D });

  return {
    position: center.clone().add(direction.multiplyScalar(distance)),
    target: center.clone(),
  };
}

function getDisplayScale(modelSize: number): number {
  const scale = modelSize / REFERENCE_MODEL_SIZE;

  return Math.min(
    MAX_DISPLAY_SCALE,
    // Rounded to the slider's step so the panel shows the value it snaps to
    Math.max(MIN_DISPLAY_SCALE, Math.round(scale * 10) / 10),
  );
}

// The undeformed geometry defines the model's extent: the deformed shape is
// drawn at an arbitrary deformation scale and would make the framing depend on
// that slider
function getModelBoundingSphere({
  geometry,
  mesh,
}: {
  geometry?: Geometry;
  mesh?: Mesh;
}): THREE.Sphere | null {
  const box = new THREE.Box3();

  geometry?.points.rawVal.forEach((p) =>
    box.expandByPoint(new THREE.Vector3(...p)),
  );

  if (box.isEmpty())
    mesh?.nodes.rawVal.forEach((n) =>
      box.expandByPoint(new THREE.Vector3(...n)),
    );

  if (box.isEmpty()) return null;

  return box.getBoundingSphere(new THREE.Sphere());
}
