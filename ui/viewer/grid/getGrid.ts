import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  WorkPlaneDisplay,
  getWorkPlaneCenter,
  getWorkPlaneRotation,
} from "../common/workPlane";

export type Grid = {
  size: State<number>;
  spacing: State<number>; // Grid spacing (e.g., 1, 0.5, 0.1) - smaller values = finer grid
};

export function getGrid({
  grid,
  workPlane,
  render,
}: {
  grid: Grid;
  workPlane: WorkPlaneDisplay;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();
  let gridHelper: THREE.GridHelper;

  van.derive(() => {
    gridHelper?.dispose();
    group.clear();

    const size = grid.size.val;
    const spacing = grid.spacing.val;
    const plane = workPlane.plane.val;
    const offset = workPlane.offset.val;
    const numDivisions = Math.round(size / spacing);

    // GridHelper is laid out in its own X-Z plane, so the work plane rotation
    // carries it onto whichever plane geometry is currently drawn on
    gridHelper = new THREE.GridHelper(size, numDivisions, 0x505050, 0x303030);
    gridHelper.rotation.copy(getWorkPlaneRotation(plane));
    gridHelper.position.copy(getWorkPlaneCenter(plane, offset, size));
    group.add(gridHelper);

    render();
  });

  return group;
}
