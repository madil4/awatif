import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Display } from "../../display/getDisplay";

export function getExtrudeSectionAnimation({
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
  const extrudeSections = display.extrudeSections;

  const pivot = controls.target.clone();
  const dist2D = camera.position.distanceTo(controls.target);

  const R3D = dist2D * 1.3;
  const phi3D = THREE.MathUtils.degToRad(25);
  const theta3D = Math.PI / 6;

  let cancelAnim: (() => void) | null = null;
  let previousVisibility: {
    geometry: boolean;
    loads: boolean;
    memberIndex: boolean;
    mesh: boolean;
  } | null = null;

  van.derive(() => {
    const extruding = extrudeSections.val;
    const geometryVisible = display.geometry.val;
    const loadsVisible = display.loads.val;
    const memberIndexVisible = display.memberIndex.val;
    const meshVisible = display.mesh.val;

    if (extruding) {
      previousVisibility ??= {
        geometry: geometryVisible,
        loads: loadsVisible,
        memberIndex: memberIndexVisible,
        mesh: meshVisible,
      };

      if (geometryVisible) display.geometry.val = false;
      if (loadsVisible) display.loads.val = false;
      if (memberIndexVisible) display.memberIndex.val = false;
      if (meshVisible) display.mesh.val = false;
      return;
    }

    if (!previousVisibility) return;

    const visibilityToRestore = previousVisibility;
    previousVisibility = null;

    if (display.geometry.val !== visibilityToRestore.geometry)
      display.geometry.val = visibilityToRestore.geometry;
    if (display.loads.val !== visibilityToRestore.loads)
      display.loads.val = visibilityToRestore.loads;
    if (display.memberIndex.val !== visibilityToRestore.memberIndex)
      display.memberIndex.val = visibilityToRestore.memberIndex;
    if (display.mesh.val !== visibilityToRestore.mesh)
      display.mesh.val = visibilityToRestore.mesh;
  });

  van.derive(() => {
    const extruding = extrudeSections.val;

    if (cancelAnim) {
      cancelAnim();
      cancelAnim = null;
    }

    if (extruding) {
      cancelAnim = animateCamera({
        camera,
        controls,
        pivot,
        targetR: R3D,
        targetPhi: phi3D,
        targetTheta: theta3D,
        render,
        onComplete: () => {
          controls.enableRotate = true;
          cancelAnim = null;
        },
      });
    } else {
      cancelAnim = animateCamera({
        camera,
        controls,
        pivot,
        targetR: dist2D,
        targetPhi: 0,
        targetTheta: 0,
        render,
        onComplete: () => {
          controls.enableRotate = false;
          cancelAnim = null;
        },
      });
    }
  });
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function cartesianToSpherical(offset: THREE.Vector3) {
  const r = offset.length();
  if (r < 1e-9) return { r: 0, phi: 0, theta: 0 };
  const phi = Math.atan2(offset.y, Math.hypot(offset.x, offset.z));
  const theta = Math.atan2(offset.x, offset.z);
  return { r, phi, theta };
}

function sphericalToCartesian(r: number, phi: number, theta: number) {
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.sin(theta),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(theta),
  );
}

function animateCamera({
  camera,
  controls,
  pivot,
  targetR,
  targetPhi,
  targetTheta,
  duration = 600,
  render,
  onComplete,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  pivot: THREE.Vector3;
  targetR: number;
  targetPhi: number;
  targetTheta: number;
  duration?: number;
  render: () => void;
  onComplete?: () => void;
}): () => void {
  const startOffset = camera.position.clone().sub(pivot);
  const start = cartesianToSpherical(startOffset);
  const startTime = performance.now();

  controls.enabled = false;

  let frameId: number;

  function tick(now: number) {
    const elapsed = now - startTime;
    const rawT = Math.min(elapsed / duration, 1);
    const t = smoothstep(rawT);

    const r = THREE.MathUtils.lerp(start.r, targetR, t);
    const phi = THREE.MathUtils.lerp(start.phi, targetPhi, t);
    const theta = THREE.MathUtils.lerp(start.theta, targetTheta, t);

    const offset = sphericalToCartesian(r, phi, theta);
    camera.position.copy(pivot).add(offset);
    controls.target.copy(pivot);
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

  return () => cancelAnimationFrame(frameId);
}
