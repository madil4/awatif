import * as THREE from "three";
import van, { State } from "vanjs-core";

export type Grid = {
  size: State<number>;
  division: State<number>;
};

export function getGrid({
  grid,
  render,
}: {
  grid: Grid;
  render: () => void;
}): THREE.Group {
  const group = new THREE.Group();
  let gridObj: THREE.GridHelper;

  // Events
  van.derive(() => {
    gridObj?.dispose();
    group.clear();

    gridObj = new THREE.GridHelper(
      grid.size.val,
      grid.division.val,
      0x404040,
      0x404040
    );
    gridObj.rotateX(Math.PI / 2); // because the helper is based on y as the normal axis
    gridObj.renderOrder = 0; // Ensure grid renders before geometry

    group.add(gridObj);

    render();
  });

  return group;
}
