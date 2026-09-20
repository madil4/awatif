import * as THREE from "three";
import { State } from "vanjs-core";

// The work plane is the plane new geometry is drawn on. Two world axes span it
// and the third — its normal — is pinned to a constant offset, which is what
// lets the modeller reach any point in 3D while still clicking on a flat grid.
// Z is the vertical axis, so X-Z and Y-Z are elevations and X-Y is a plan.
export type WorkPlane = "XZ" | "XY" | "YZ";

export type WorkPlaneDisplay = {
  plane: State<WorkPlane>;
  offset: State<number>;
};

type Axis = 0 | 1 | 2;

// The spanning pair is ordered so the first axis maps to the grid's local X and
// the second to its local Z (up to sign, which no caller depends on)
const AXES: Record<WorkPlane, { span: [Axis, Axis]; normal: Axis }> = {
  XZ: { span: [0, 2], normal: 1 },
  XY: { span: [0, 1], normal: 2 },
  YZ: { span: [1, 2], normal: 0 },
};

// Rotations that carry an object's local +Y onto the work plane's normal, so a
// THREE.GridHelper (local X-Z) lands on the plane unchanged for "XZ"
const ROTATIONS: Record<WorkPlane, [number, number, number]> = {
  XZ: [0, 0, 0],
  XY: [Math.PI / 2, 0, 0],
  YZ: [0, 0, -Math.PI / 2],
};

// Direction from the orbit target to the camera for a straight-on view. Each is
// picked so the plane reads the conventional way: X to the right in a front
// elevation, Y to the right in a side elevation, and a plan seen from above.
const VIEW_DIRECTIONS: Record<WorkPlane, [number, number, number]> = {
  XZ: [0, -1, 0],
  XY: [0, 0, 1],
  YZ: [-1, 0, 0],
};

export const WORK_PLANES: WorkPlane[] = ["XZ", "XY", "YZ"];

export function getWorkPlaneAxes(plane: WorkPlane): {
  span: [Axis, Axis];
  normal: Axis;
} {
  return AXES[plane];
}

// Name of the axis the offset runs along, for labelling the offset input
export function getWorkPlaneNormalName(plane: WorkPlane): string {
  return ["X", "Y", "Z"][AXES[plane].normal];
}

export function getWorkPlaneRotation(plane: WorkPlane): THREE.Euler {
  return new THREE.Euler(...ROTATIONS[plane]);
}

export function getWorkPlaneViewDirection(plane: WorkPlane): THREE.Vector3 {
  return new THREE.Vector3(...VIEW_DIRECTIONS[plane]);
}

// The grid spans [0, gridSize] on both of the plane's own axes, mirroring how
// the X-Z grid has always been laid out from the origin
export function getWorkPlaneCenter(
  plane: WorkPlane,
  offset: number,
  gridSize: number,
): THREE.Vector3 {
  const { span, normal } = AXES[plane];
  const center: [number, number, number] = [0, 0, 0];

  center[span[0]] = gridSize / 2;
  center[span[1]] = gridSize / 2;
  center[normal] = offset;

  return new THREE.Vector3(...center);
}

// Snaps a raycast hit to the work plane's grid: the two spanning coordinates
// snap to the grid spacing and the out-of-plane one is set to the offset
// exactly, so appended points share positions across repeated clicks
export function snapToWorkPlane({
  plane,
  offset,
  point,
  snap,
}: {
  plane: WorkPlane;
  offset: number;
  point: THREE.Vector3;
  snap: (v: number) => number;
}): [number, number, number] {
  const { span, normal } = AXES[plane];
  const hit: [number, number, number] = [point.x, point.y, point.z];
  const snapped: [number, number, number] = [0, 0, 0];

  snapped[span[0]] = snap(hit[span[0]]);
  snapped[span[1]] = snap(hit[span[1]]);
  snapped[normal] = offset;

  return snapped;
}
