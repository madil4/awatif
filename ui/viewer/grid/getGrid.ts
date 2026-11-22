import * as THREE from "three";
import van, { State } from "vanjs-core";
import {
  WorkPlaneDisplay,
  getGridPlacement,
  getWorkPlaneRotation,
} from "../common/workPlane";
import { getInfiniteGridMaterial } from "./infiniteGrid";

export type Grid = {
  size: State<number>;
  spacing: State<number>; // Grid spacing (e.g., 1, 0.5, 0.1) - smaller values = finer grid
  infinite: State<boolean>; // Blender-style grid running to the horizon, centred on the origin
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
  let current: THREE.GridHelper | THREE.Mesh | undefined;

  van.derive(() => {
    disposeObject(current);
    group.clear();

    const spacing = grid.spacing.val;
    const plane = workPlane.plane.val;
    const offset = workPlane.offset.val;
    const infinite = grid.infinite.val;
    const { size, center } = getGridPlacement(plane, offset, {
      size: grid.size.val,
      infinite,
    });

    // Both are laid out in their own X-Z plane, so the work plane rotation
    // carries them onto whichever plane geometry is currently drawn on
    if (infinite) {
      current = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size).rotateX(Math.PI / 2),
        getInfiniteGridMaterial({ plane, offset, spacing }),
      );
    } else {
      const numDivisions = Math.round(size / spacing);
      current = new THREE.GridHelper(size, numDivisions, 0x505050, 0x303030);
    }

    current.rotation.copy(getWorkPlaneRotation(plane));
    current.position.copy(center);
    group.add(current);

    render();
  });

  return group;
}

function disposeObject(object?: THREE.GridHelper | THREE.Mesh) {
  if (!object) return;

  if (object instanceof THREE.Mesh) {
    object.geometry.dispose();
    (object.material as THREE.Material).dispose();
  } else object.dispose();
}
